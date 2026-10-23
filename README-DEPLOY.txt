PM CHECKLIST FIX — DEPLOYMENT PACKAGE

Cloudflare Pages files:
- index.html
- netlify-api-bridge.js
- functions/api.js

Apps Script backend:
- apps-script-backend/Code.gs

IMPORTANT:
1. Back up the current GitHub production branch and Apps Script project first.
2. Copy index.html, netlify-api-bridge.js, and functions/api.js into the Cloudflare Pages project root (keep functions/api.js in the functions folder).
3. In the EXISTING Apps Script project, replace/update Code.gs with apps-script-backend/Code.gs, save, and deploy a NEW Web App version. Keep the existing deployment URL if updating the deployment version in-place is supported by your setup.
4. Ensure Cloudflare Pages environment variable APPS_SCRIPT_WEBAPP_URL points to the deployed Apps Script /exec URL.
5. Commit and deploy the Cloudflare files.
6. Test PM Checklist read and save on two different sheet tabs, verify Column P updates, and verify status shows Completed only for OK; blank/Not OK shows Open/Pending.
7. Also regression-test login, dashboard, material requests, and Tool 3004/6327 roster features before production use.

This package does not deploy to Cloudflare or Apps Script automatically. The Apps Script backend must be updated separately from the frontend.
