FAPL ENGINEERING / MATERIAL REQUEST PORTAL — PREPARED UPDATE

Files for Cloudflare Pages:
- index.html: new portal UI, with the API bridge script included.
- netlify-api-bridge.js: maps google.script.run calls to POST /api.
- functions/api.js: Cloudflare Pages Function proxy to the Apps Script Web App.

Backend:
- apps-script-backend/Code.gs is a copy of the supplied Apps Script backend.
  Do NOT upload this file to the Cloudflare site root as a replacement for its frontend.
  If backend changes from this file are required, update the existing Apps Script project,
  deploy a new Web App version, and verify the URL configured in Cloudflare Pages.

Before production:
1. Make a backup/branch of the current GitHub main branch.
2. Ensure Cloudflare Pages project root/build output settings match the existing deployment.
3. Ensure the existing Cloudflare Pages Function is at functions/api.js.
4. Configure APPS_SCRIPT_WEBAPP_URL in Cloudflare Pages environment variables to the deployed Apps Script /exec URL.
5. Commit the new index.html and bridge/function files to the configured production branch.
6. Test login, API calls, dashboard, request submission, and all key workflows.
