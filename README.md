# RONIN — CTFd Theme

**浪人 — Way of the Cyber Ronin**

A dark, feudal-Japan themed CTFd theme with splash intro, Japanese kanji rank hierarchy (天皇 Tenno → 将軍 Shogun → 大名 Daimyo → 侍 Samurai → 農民 Peasant), echarts-powered score graphs, and full CTFd page coverage.

![theme-version](https://img.shields.io/badge/version-1.0.0-red) ![ctfd](https://img.shields.io/badge/CTFd-3.x-black) ![live](https://img.shields.io/badge/Live-ctf.cyberoninctf.xyz-E63946)

**See it live:** [https://ctf.cyberoninctf.xyz](https://ctf.cyberoninctf.xyz)

---

## 📸 Preview

![Landing Page](screenshots%20preview/screenshots%201.png)
![Page 2](screenshots%20preview/screenshots%202.png)
![Page 3](screenshots%20preview/screenshots%203.png)
![Page 4](screenshots%20preview/screenshots%204.png)
![Page 5](screenshots%20preview/screenshots%205.png)
![Page 6](screenshots%20preview/screenshots%206.png)
![Page 7](screenshots%20preview/screenshots%207.png)
![Page 8](screenshots%20preview/screenshots%208.png)


## Table of Contents

1. [Requirements](#requirements)
2. [Quick Start (Docker)](#quick-start-docker)
3. [Deploying into an Existing CTFd Instance](#deploying-into-an-existing-ctfd-instance)
4. [Build from Source (Optional)](#build-from-source-optional)
5. [Activating the Theme in the Admin Panel](#activating-the-theme-in-the-admin-panel)
6. [Features](#features)
7. [Hierarchy Ranking System](#hierarchy-ranking-system)
8. [Admin Cheat Sheet](#admin-cheat-sheet)
9. [Hall of Fame Setup](#hall-of-fame-setup)
10. [Troubleshooting](#troubleshooting)

---

## Requirements

| Component | Version |
|-----------|---------|
| CTFd | 3.x |
| Node.js | 18+ (only if rebuilding assets) |
| npm | 9+ (only if rebuilding assets) |

> **Note:** Pre-built assets are bundled in `static/assets/` — you only need Node if you modify the theme source.

---

## Quick Start (Docker)

The fastest path — spin up a fresh CTFd with the ronin theme pre-installed:

```bash
git clone <your-repo-url> ronin-theme
cd ronin-theme
```

Use this `docker-compose.yml`:

```yaml
version: "2"

services:
  ctfd:
    build: .
    user: root
    restart: always
    ports:
      - "8000:8000"
    environment:
      - UPLOAD_FOLDER=/var/uploads
      - DATABASE_URL=mysql+pymysql://ctfd:ctfd@db/ctfd
      - REDIS_URL=redis://cache:6379
      - WORKERS=1
      - FLASK_DEBUG=0
      - ACCESS_LOG=-
      - ERROR_LOG=-
      - REVERSE_PROXY=true
    volumes:
      - .:/opt/CTFd:ro                      # CTFd source — see note below
      - .data/CTFd/logs:/opt/CTFd/CTFd/logs
      - .data/CTFd/uploads:/var/uploads
    depends_on:
      - db
    networks:
      default:
      internal:

  db:
    image: mariadb:10.4.12
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=ctfd
      - MYSQL_USER=ctfd
      - MYSQL_PASSWORD=ctfd
      - MYSQL_DATABASE=ctfd
    volumes:
      - .data/mysql:/var/lib/mysql
    networks:
      internal:
    command: [mysqld, --character-set-server=utf8mb4, --collation-server=utf8mb4_unicode_ci]

  cache:
    image: redis:4
    restart: always
    volumes:
      - .data/redis:/data
    networks:
      internal:

networks:
  default:
  internal:
    internal: true
```

> **Important:** the `.:/opt/CTFd:ro` mount binds a *CTFd source checkout* into the container. If you're mounting only the theme, use `/opt/CTFd/CTFd/themes/ronin` as the target instead (see next section). Do not bind-mount your theme over the whole CTFd tree.

Then:

```bash
docker compose up -d
```

Open `http://localhost:8000`, complete the CTFd setup wizard, then activate the theme (next section).

---

## Deploying into an Existing CTFd Instance

> The repo ships **two** parts: `ronin/` (the theme) and `plugin/hall_of_fame/` (the Hall of Fame registry plugin). The theme works alone, but `/hall-of-fame` and its admin registry need the plugin — see [Hall of Fame Setup](#hall-of-fame-setup).

### Option A — Host volume mount (recommended for Docker setups)

1. Copy the theme **and plugin** into your CTFd deployment:

   ```bash
   # On your CTFd host
   cp -r ronin-theme/ronin /opt/CTFd/CTFd/themes/ronin
   cp -r ronin-theme/plugin/hall_of_fame /opt/CTFd/CTFd/plugins/
   # — or, if your docker-compose mounts the repo: place them in
   # /home/<user>/CTFd/CTFd/themes/ronin and /home/<user>/CTFd/CTFd/plugins/hall_of_fame
   ```

2. **Critical:** CTFd reads `static/manifest.json` (NOT `.vite/manifest.json`). The theme ships both, but if you rebuild assets you must re-copy:

   ```bash
   cp static/.vite/manifest.json static/manifest.json
   ```

3. Restart and flush the asset cache (CTFd memoizes the manifest in Redis):

   ```bash
   docker compose restart ctfd
   docker exec ctfd-cache-1 redis-cli FLUSHALL
   ```

### Option B — Into the running container (no host mount)

```bash
docker cp ronin-theme/ronin ctfd-ctfd-1:/opt/CTFd/CTFd/themes/ronin
docker cp ronin-theme/plugin/hall_of_fame ctfd-ctfd-1:/opt/CTFd/CTFd/plugins/
docker exec ctfd-ctfd-1 chown -R 1000:1000 /opt/CTFd/CTFd/themes/ronin /opt/CTFd/CTFd/plugins/hall_of_fame
docker compose restart ctfd
docker exec ctfd-cache-1 redis-cli FLUSHALL
```

### Option C — Bare metal / manual install

1. Locate your CTFd installation (e.g. `/opt/CTFd`).
2. `cp -r ronin /opt/CTFd/CTFd/themes/ronin`
3. Restart your CTFd service (systemd / supervisor / gunicorn reload).

---

## Build from Source (Optional)

The theme ships with pre-built assets. Only needed if you modify `assets/scss/main.scss` or `assets/js/index.js`:

```bash
cd ronin
npm install
npm run build
cp static/.vite/manifest.json static/manifest.json   # REQUIRED after every build
```

**Never forget step 3** — Vite writes its manifest to `static/.vite/manifest.json` while CTFd looks for `static/manifest.json`. Without it, CTFd silently falls back to the core theme's CSS and your pages render unstyled (or break).

After rebuilding on a running instance:

```bash
docker compose restart ctfd
docker exec ctfd-cache-1 redis-cli FLUSHALL   # CTFd caches the manifest in Redis
```

---

## Activating the Theme in the Admin Panel

1. Log in to CTFd as **admin**.
2. Go to **Admin Panel → Config → Theme** (or **Appearance → Theme** in newer versions).
3. Select **ronin** from the dropdown.
4. Click **Update**. The player-facing site immediately re-skins.
5. Hard-refresh your browser (Ctrl+Shift+R) — the splash intro only shows once per browser session.

> The **admin panel itself keeps the core theme** — only player-facing pages are skinned. That's normal CTFd behavior.

---

## Features

### Pages covered

| Page | Route | Highlights |
|------|-------|-----------|
| Landing | `/` | Splash intro (浪人), enso canvas, masked-line hero, live stats, marquee, Four Laws, torii CTA |
| Challenges | `/challenges` | Category filter (Web/Crypto/Pwn/Forensics/Reversing/Osipint/Misc), search, difficulty tags, modal with hints, files, **connection info, author, links** |
| Scoreboard | `/scoreboard` | Teams/Players tabs, podium, **kanji hierarchy badges**, tournament pulse chart, clickable names |
| Users list | `/users` | Ranked warriors, clickable profiles |
| Teams list | `/teams` | Ranked clans, clickable profiles |
| Player profile | `/users/<id>` | Stats grid, solves table, awards, strike-rate bar, category breakdown, score graph, skills radar, My Clan card |
| Clan profile | `/teams/<id>` | Clan stats, members |
| My Clan | `/team` | Full clan page + **Clan Forge** (captain-only: rename, password, invite, captain transfer, disband) |
| Settings | `/settings` | Edit name/email/password/affiliation/website |
| Auth | `/login`, `/register`, `/reset_password`, `/confirm` | RONIN-styled forms |
| Errors | `403/404/429/500/502` | Themed error pages in `templates/errors/` |
| Notifications | `/notifications` | Announcement feed |
| Hall of Fame | `/hall-of-fame` | **Reigning Tenno** spotlight (registry-designated or live scoreboard) + **Past Emperors** gallery, rank ladder (農民→侍→大名→将軍→天皇), election explainer |

### CDN dependencies (require internet at runtime)

- **Tailwind CSS** (via CDN + inline config) — layout utilities
- **echarts** — radar, score graphs, tournament pulse
- **Google Fonts** — Cinzel, Noto Serif JP, JetBrains Mono, Plus Jakarta Sans
- **Unsplash** — hero/torii imagery

> For air-gapped CTFs, vendor these locally and update `templates/base.html`.

---

## Hierarchy Ranking System

Ranks are computed live on the scoreboard, no backend needed:

```
Completion_Rate = (account_score / total_available_points) × 100
```

| Rank | Kanji | Rule |
|------|-------|------|
| **Tenno** | 天皇 | The reigning **#1** — exactly one holder, always |
| Shogun | 将軍 | ≥66% completion |
| Daimyo | 大名 | 41–65% |
| Samurai | 侍 | 21–40% |
| Peasant | 農民 | 0–20% |

- **Points-weighted** (Pro-Tip A): totals are summed from challenge *values*, not solve counts — Shoguns must actually solve hard challenges.
- **Dynamically recalculated** (Pro-Tip B): add challenges and every rank updates automatically; a 90% Emperor can drop to Shogun until they solve the new content.
- **Total points** are fetched from `/api/v1/challenges` (authed) with a scoreboard-detail fallback for guests.

---

## Admin Cheat Sheet

Challenge editor fields that surface in the player modal:

| Admin field | Player sees |
|-------------|-------------|
| **Connection Info** | Cyan 接続 box; URLs auto-linked |
| **Author / attribution** | Gold 匠 "Crafted by" line |
| **Tags** | `author=Name` → fallback author display; `link=https://…` → red link chips |

---

## Hall of Fame Setup

The `/hall-of-fame` page honors every warrior who has held the **Tenno (天皇)** crown — the reigning #1 on the honor scroll. It is powered by the **hall_of_fame CTFd plugin** bundled in this repo under `plugin/hall_of_fame/`, so managing inductees is a form in the admin panel — no HTML editing.

### Part 1 — Install the plugin (required)

The theme renders the page; the **plugin** provides the admin registry, the data API, and the `/hall-of-fame` route itself. Without it the page 404s.

```bash
git clone https://github.com/adumppp/Cyber-Ronin-Theme-CTFd-.git /tmp/ronin-repo

# Copy BOTH pieces into your CTFd checkout
sudo cp -r /tmp/ronin-repo/ronin                /path/to/CTFd/CTFd/themes/ronin
sudo cp -r /tmp/ronin-repo/plugin/hall_of_fame  /path/to/CTFd/CTFd/plugins/

# Manifest sync (theme) — CTFd reads static/manifest.json, not .vite/
sudo cp /path/to/CTFd/CTFd/themes/ronin/static/.vite/manifest.json \
        /path/to/CTFd/CTFd/themes/ronin/static/manifest.json

# Restart + flush cache
sudo docker compose restart ctfd
sudo docker exec ctfd-cache-1 redis-cli FLUSHALL
```

The plugin registers itself in the **admin top bar** as **Hall of Fame** (next to Config), linking to `/admin/hall_of_fame`.

### Part 2 — The public page

Visiting `/hall-of-fame` renders the Hall of Emperors:

1. **Reigning Tenno spotlight** — the inductee currently ticked as *Reigning* in the registry, rendered as a full testimonial card with their **live score/rank** pulled from CTFd. If nobody is designated, it falls back to the live scoreboard #1.
2. **The Path to the Throne** — the rank ladder (農民 Peasant → 侍 Samurai → 大名 Daimyo → 将軍 Shogun → 天皇 Tenno) with mastery tiers, plus the election rules: mastery = (honor earned ÷ total honor available) × 100, and rank #1 wears the crown.
3. **Past Emperors** — full-width testimonial rows (portrait left, info right): every former holder. The reigning Tenno is automatically excluded from this gallery.

### Part 3 — Induct a Tenno

1. Log in as admin → **Hall of Fame** in the admin top bar (or `/admin/hall_of_fame`).
2. Fill the form — only the **Warrior Name** is required:
   - **CTFd User ID** — links the card to their profile and shows their live score
   - **Age** (齢) — displayed as a fact chip
   - **Batch** (期) — years joined until graduation, e.g. `2021 – 2025` or `Class of 2025`
   - **Portrait** — paste an image URL **or upload a file** (upload wins; stored via CTFd's own uploads pipeline)
   - **Words from the Tenno** — their quote, rendered as a gold-marked testimonial
   - **Reigning** — tick for the current holder; tick the next one when the crown changes hands and the old holder moves to Past Emperors automatically
3. Click **Induct**. The page updates instantly — no rebuild, no restart.

### Updating each season

When a new warrior takes #1:

1. Open the registry and click **Edit** on the outgoing Tenno → untick **Reigning** → Save. They now appear in Past Emperors.
2. **Induct** the new holder with their details → tick **Reigning** → Save.
3. Done — the throne and the gallery update themselves.

### CMS-page fallback (optional)

The theme still supports the old approach: create a CMS page with route `hall-of-fame` and embed `<article class="tenno-inductee" data-name="…" data-user-id="…" data-img="…">quote</article>` blocks. The theme parses these only when the plugin API returns no inductees — the plugin is the recommended path.

---

## Troubleshooting

**Pages render with core/default styling**
→ `static/manifest.json` is missing or stale. Run `cp static/.vite/manifest.json static/manifest.json` and flush Redis: `docker exec ctfd-cache-1 redis-cli FLUSHALL`.

**500 error on `/settings`**
→ Old theme versions called `Forms.users.UserSettingsForm()` (removed API). Current version uses `Forms.self.SettingsForm` — update your copy.

**Asset URLs serve old hashes after a rebuild**
→ CTFd memoizes the manifest in Redis. Flush it: `docker exec ctfd-cache-1 redis-cli FLUSHALL`, then restart the ctfd container.

**Team captain panel missing on `/team`**
→ The panel shows only when `team.captain_id == your_user_id`. Teams created without a captain have `captain_id = NULL` — set one via Admin Panel → Teams, or the panel stays hidden.

**Splash intro replays on every visit**
→ It's once per browser session (`sessionStorage`). Hard refresh or new tab = replay. To disable entirely, remove the `#splash-intro` block from `templates/components/landing.html`.

**Charts don't render**
→ echarts loads from CDN — check internet connectivity, or vendor `echarts.min.js` into `static/` and update `templates/base.html`.

---

**主無き物、コードで切る** — Masterless warriors cut through code.
