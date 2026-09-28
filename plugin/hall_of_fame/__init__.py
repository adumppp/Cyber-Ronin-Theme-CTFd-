# Hall of Fame plugin for CTFd
# Admin-managed registry of Tenno (reigning #1) achievers with portraits,
# age, batch (joined -> graduation years) and their words.
# Data is stored as JSON in the CTFd config table.

import json
import os

from flask import Blueprint, flash, redirect, render_template, request, url_for

from CTFd.utils import get_config, set_config
from CTFd.utils.decorators import admins_only
from CTFd.utils.uploads import upload_file

CONFIG_KEY = "hof_inductees"
PLUGIN_DIR = os.path.dirname(__file__)

hall_of_fame = Blueprint(
    "hall_of_fame", __name__, template_folder="templates", static_folder="assets"
)


def load_inductees():
    raw = get_config(CONFIG_KEY)
    if not raw:
        return []
    try:
        data = json.loads(raw)
        return data if isinstance(data, list) else []
    except (ValueError, TypeError):
        return []


def save_inductees(items):
    set_config(CONFIG_KEY, json.dumps(items))


def to_public(items):
    return [
        {
            "name": i.get("name") or "Name Unknown",
            "user_id": (str(i.get("user_id")) if i.get("user_id") else None),
            "age": i.get("age") or "",
            "batch": i.get("batch") or "",
            "image": i.get("image") or "",
            "quote": i.get("quote") or "",
            "current": bool(i.get("current")),
        }
        for i in items
    ]


def _store_upload(file_obj):
    """Store an uploaded portrait via CTFd's upload pipeline, return its URL."""
    if not file_obj or not file_obj.filename:
        return None
    try:
        result = upload_file(file=file_obj, type="standard")
        if result is None:
            return None
        location = getattr(result, "location", None)
        if not location:
            return None
        return url_for("views.files", path=location)
    except Exception:
        return None


@hall_of_fame.route("/admin/hall_of_fame", methods=["GET", "POST"])
@admins_only
def admin_view():
    if request.method == "POST":
        items = load_inductees()
        action = request.form.get("action") or "add"

        if action == "delete":
            try:
                idx = int(request.form.get("idx", -1))
            except ValueError:
                idx = -1
            if 0 <= idx < len(items):
                removed = items.pop(idx)
                save_inductees(items)
                flash(
                    "Removed {} from the Hall of Fame.".format(
                        removed.get("name") or "inductee"
                    ),
                    "success",
                )
        else:
            entry = {
                "name": (request.form.get("name") or "").strip(),
                "user_id": (request.form.get("user_id") or "").strip(),
                "age": (request.form.get("age") or "").strip(),
                "batch": (request.form.get("batch") or "").strip(),
                "quote": (request.form.get("quote") or "").strip(),
                "current": request.form.get("current") == "on",
                "image": (request.form.get("image_url") or "").strip(),
            }

            if not entry["name"] and entry["user_id"]:
                entry["name"] = "User {}".format(entry["user_id"])

            uploaded = _store_upload(request.files.get("image_file"))
            if uploaded:
                entry["image"] = uploaded

            if entry["current"]:
                for existing in items:
                    existing["current"] = False

            try:
                idx = int(request.form.get("idx", -1))
            except ValueError:
                idx = -1
            if action == "edit" and 0 <= idx < len(items):
                items[idx] = entry
                flash("Inductee updated.", "success")
            else:
                items.append(entry)
                flash("{} inducted into the Hall of Fame.".format(entry["name"]), "success")

            save_inductees(items)

        return redirect(url_for("hall_of_fame.admin_view"))

    return render_template(
        "plugins/hall_of_fame/admin/hall_of_fame.html",
        items=load_inductees(),
    )


@hall_of_fame.route("/plugins/hall_of_fame/api/inductees")
def api_inductees():
    return {"success": True, "data": to_public(load_inductees())}


@hall_of_fame.route("/hall-of-fame")
def public_page():
    # Rendered through the active theme (ronin): page.html detects the
    # /hall-of-fame path and renders the Hall of Emperors layout. The layout's
    # JS pulls inductee data from api_inductees above.
    return render_template("page.html", title="Hall of Fame", content="")


def load(app):
    app.register_blueprint(hall_of_fame)
