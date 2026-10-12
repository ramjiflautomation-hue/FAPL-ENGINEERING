MATERIAL REQUEST PORTAL - CLOUDFLARE PAGES + GITHUB

1. GitHub par new repository banayein: material-request-portal
2. Is folder ke andar ki files/folders repository ke ROOT mein upload karein. ZIP file ko as-is upload na karein.
3. Cloudflare Dashboard > Workers & Pages > Create > Pages > Connect to Git.
4. GitHub repo select karein.
5. Build command: exit 0
6. Build output directory: public
7. Deploy karein. Functions folder repository root par hi rehna chahiye.
8. Cloudflare Pages project > Settings > Variables and Secrets (or Environment variables) mein variable add karein:
   APPS_SCRIPT_WEBAPP_URL = aapka actual deployed Google Apps Script Web App /exec URL
9. Redeploy karein.
10. Apps Script backend mein required PVC Belt handlers hone chahiye; Code.gs supplied here contains the package backend. If updating Apps Script, deploy a New version and make sure Web App access is set as needed for your portal.

IMPORTANT:
- public/index.html calls /api through public/netlify-api-bridge.js. Cloudflare Pages Functions in functions/api.js provides that /api endpoint.
- Never put the Apps Script URL or other secrets in public JavaScript. Use the environment variable above.
- Test login, existing portal features, and PVC Belt Received/Consumed after deployment.
