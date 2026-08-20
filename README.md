# RONIN — CTFd Theme

**浪人 — Way of the Cyber Ronin**

A dark, feudal-Japan themed CTFd theme with splash intro, Japanese kanji rank hierarchy (天皇 Tenno → 将軍 Shogun → 大名 Daimyo → 侍 Samurai → 農民 Peasant), echarts-powered score graphs, and full CTFd page coverage.

![theme-version](https://img.shields.io/badge/version-1.0.0-red) ![ctfd](https://img.shields.io/badge/CTFd-3.x-black)

---

## Table of Contents

1. [Requirements](#requirements)
2. [Quick Start (Docker)](#quick-start-docker)
3. [Deploying into an Existing CTFd Instance](#deploying-into-an-existing-ctfd-instance)
4. [Build from Source (Optional)](#build-from-source-optional)
5. [Activating the Theme in the Admin Panel](#activating-the-theme-in-the-admin-panel)
6. [Features](#features)
7. [Hierarchy Ranking System](#hierarchy-ranking-system)
8. [Admin Cheat Sheet](#admin-cheat-sheet)
9. [Troubleshooting](#troubleshooting)

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

### Option A — Host volume mount (recommended for Docker setups)

1. Copy the theme into your CTFd deployment's theme directory:

   ```bash
   # On your CTFd host
   cp -r ronin-theme/ronin /opt/CTFd/CTFd/themes/ronin
   # — or, if your docker-compose mounts the repo: place it in
   # /home/<user>/CTFd/CTFd/themes/ronin
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
docker exec ctfd-ctfd-1 chown -R 1000:1000 /opt/CTFd/CTFd/themes/ronin
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
