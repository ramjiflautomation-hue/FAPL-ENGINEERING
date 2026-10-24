FAPL MATERIAL REQUEST PORTAL — COMPLETE DEPLOYMENT PACKAGE

CONTENTS

GitHub / Cloudflare Pages files:
- github/index.html                 Main frontend; deploy at repository root as index.html
- github/netlify-api-bridge.js      Frontend bridge (must remain at repository root)
- github/functions/api.js           Cloudflare Pages Function; must be at functions/api.js

Google Apps Script backend:
- google-apps-script/Code.gs        Existing backend, with PM Checklist/roster/permission API handlers added to doPost allowlist

IMPORTANT ARCHITECTURE
The public frontend is hosted on Cloudflare Pages. Code.gs runs as a Google Apps Script Web App API.
The frontend HTML should be deployed to GitHub/Cloudflare, not pasted into the Apps Script editor.
The Cloudflare function forwards requests to the deployed Apps Script Web App URL.

DEPLOYMENT STEPS
1. Back up the current GitHub main branch and existing Apps Script project before replacing anything.
2. Copy github/index.html to the repository root, replacing the currently served index.html only after reviewing the diff.
3. Copy github/netlify-api-bridge.js to the repository root.
4. Copy github/functions/api.js into the repository's functions/ folder.
5. In Cloudflare Pages project settings, set an environment variable named APPS_SCRIPT_WEBAPP_URL to the deployed Apps Script Web App URL ending in /exec. Keep it private; do not commit it into GitHub.
6. In the existing Apps Script project, update Code.gs with google-apps-script/Code.gs. Preserve any project-specific changes made after the supplied backup.
7. Save, then Deploy > Manage deployments > Edit > New version > Deploy. Ensure access settings allow the Cloudflare server to call the Web App, consistent with your organization's security requirements.
8. Commit/push GitHub files to the production branch and wait for Cloudflare Pages deployment to finish.
9. Test login, PM Checklist, save condition/ETA, dashboard, request submission, permission controls, and roster before considering it production-ready.

PM CHECKLIST FIX
The API allowlist now includes getPMChecklist, savePMChecklistRow, getT3004ShiftRoster, getCurrentPortalPermissions, getPortalPermissionMatrix, savePortalPermissionMatrix, setupPMOverdueNotificationTrigger, and setupT3004RosterNotificationTrigger.

LIMITATIONS / SAFETY
- These files have not been deployed to your Cloudflare or Google accounts from this chat.
- Live spreadsheet access, Web App permissions, credentials, and login workflows cannot be verified here.
- Do not paste or share passwords, session IDs, or the Web App URL in public GitHub files.
- Test on a backup/staging copy first. Replacing the backend can overwrite newer project changes not present in the supplied source.
