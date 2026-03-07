# Admin Panel (Vercel) Setup

## 1) Random admin URL
Admin panel path:

- `/<random-folder>/<random-file>.html`
- In this repo: `Kh7pQzM2vA9nL3/DKDSLVksdvslk.html`

Keep this URL private.

## 2) Vercel Edge Config
Create an **Edge Config** in Vercel and connect it to this project.

Important:

- Do **not** rename the environment variable when connecting Edge Config.
- The `@vercel/edge-config` SDK is **read-only**. Writes are done via the **Vercel REST API**.

Create (or plan to manage) these keys in Edge Config:

- `committees` (array)
- `team` (array)
- `schedule` (array)

The site reads them from these endpoints:

- `GET /api/public/committees`
- `GET /api/public/team`
- `GET /api/public/schedule`

## 3) Environment variables (Vercel Project Settings)
Add these env vars to your Vercel project:

- `ADMIN_PASSPHRASE`
  - A long passphrase (min 20+ chars recommended)
  - Used by:
    - `GET /api/admin/get`
    - `POST /api/admin/update`
    - `POST /api/admin/bootstrap`

Edge Config variables (provided by Vercel when you connect Edge Config):

- `EDGE_CONFIG`
- `VERCEL_EDGE_CONFIG_ID`
- `VERCEL_EDGE_CONFIG_TOKEN`

Note: `@vercel/edge-config` uses these automatically.

Write access (required for admin panel Save):

- `VERCEL_API_TOKEN`
  - A Vercel **Access Token** with permission to update Edge Config
  - Used by the serverless endpoint `POST /api/admin/update`

## 4) How to use the admin panel
1. Open `Kh7pQzM2vA9nL3/DKDSLVksdvslk.html`
2. Enter passphrase
3. Click **Load Data**
4. Select a tab:
   - Committees
   - Team
   - Schedule
5. Edit JSON
6. Click **Format** to auto-format
7. Click **Save**

## 5) First-time bootstrap (optional)
If your Edge Config is empty, the website will fall back to embedded data.

To initialize Edge Config with your current defaults, call:

- `POST /api/admin/bootstrap`

Body JSON example:

```json
{
  "committees": [],
  "team": [],
  "schedule": []
}
```

Headers:

- `x-admin-passphrase: <ADMIN_PASSPHRASE>`

## 6) Security notes (static/Vercel)
- The admin page is not truly secure by being hidden; it only reduces discovery.
- Real protection is the server-side passphrase check in `/api/admin/*`.
- Do not store passphrase in browser localStorage.
- Rotate `ADMIN_PASSPHRASE` if it leaks.
