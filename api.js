// Cloudflare Pages Function: POST /api
// Set APPS_SCRIPT_WEBAPP_URL to the deployed Google Apps Script Web App URL ending in /exec.
export async function onRequestPost({ request, env }) {
  const endpoint = (env.APPS_SCRIPT_WEBAPP_URL || "").trim();
  if (!endpoint || !/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(endpoint)) {
    return Response.json({ success: false, message: "Server configuration error: APPS_SCRIPT_WEBAPP_URL is missing or invalid." }, { status: 500 });
  }
  let body;
  try { body = await request.json(); } catch (_) { return Response.json({ success: false, message: "Invalid JSON request." }, { status: 400 }); }
  if (!body || typeof body.fn !== "string" || !Array.isArray(body.args)) return Response.json({ success: false, message: "Request must contain fn and args." }, { status: 400 });
  try {
    const upstream = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body), redirect: "follow" });
    const text = await upstream.text();
    let payload;
    try { payload = JSON.parse(text); } catch (_) { return Response.json({ success: false, message: "Apps Script returned a non-JSON response. Check Web App deployment and permissions." }, { status: 502 }); }
    return Response.json(payload, { status: upstream.ok ? 200 : 502 });
  } catch (err) { return Response.json({ success: false, message: "Could not reach Apps Script: " + (err?.message || String(err)) }, { status: 502 }); }
}
export async function onRequestGet() { return Response.json({ success: true, message: "API bridge is online. Send a POST request to use portal functions." }); }
