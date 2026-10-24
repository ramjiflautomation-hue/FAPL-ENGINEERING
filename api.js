export async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== "POST") {
    return Response.json({ success: false, message: "Method not allowed. Use POST." }, { status: 405 });
  }
  const appsScriptUrl = env.APPS_SCRIPT_WEBAPP_URL;
  if (!appsScriptUrl) {
    return Response.json({ success: false, message: "APPS_SCRIPT_WEBAPP_URL environment variable is not configured." }, { status: 500 });
  }
  try {
    const body = await request.text();
    const upstream = await fetch(appsScriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body,
      redirect: "follow"
    });
    const text = await upstream.text();
    return new Response(text, {
      status: upstream.status,
      headers: {
        "Content-Type": upstream.headers.get("content-type") || "application/json",
        "Cache-Control": "no-store",
        "Access-Control-Allow-Origin": "*"
      }
    });
  } catch (error) {
    return Response.json({ success: false, message: error?.message || String(error) }, { status: 502 });
  }
}
