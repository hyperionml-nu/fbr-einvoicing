export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (shouldProxyToBackend(url.pathname)) {
      return proxyToBackend(request, env, url);
    }

    return env.ASSETS.fetch(request);
  },
};

function shouldProxyToBackend(pathname) {
  return (
    pathname === "/health" ||
    pathname === "/api-docs" ||
    pathname.startsWith("/api-docs/") ||
    pathname.startsWith("/api/")
  );
}

async function proxyToBackend(request, env, incomingUrl) {
  if (!env.BACKEND_ORIGIN) {
    return Response.json(
      { error: "BACKEND_ORIGIN is not configured for this Worker." },
      { status: 503 },
    );
  }

  const backendOrigin = new URL(env.BACKEND_ORIGIN);
  const basePath = backendOrigin.pathname.replace(/\/$/, "");
  const targetUrl = new URL(request.url);

  targetUrl.protocol = backendOrigin.protocol;
  targetUrl.hostname = backendOrigin.hostname;
  targetUrl.port = backendOrigin.port;
  targetUrl.username = backendOrigin.username;
  targetUrl.password = backendOrigin.password;
  targetUrl.pathname = `${basePath}${incomingUrl.pathname}`;

  const backendRequest = new Request(targetUrl, request);
  backendRequest.headers.set("x-forwarded-host", incomingUrl.host);
  backendRequest.headers.set("x-forwarded-proto", incomingUrl.protocol.replace(":", ""));

  return fetch(backendRequest);
}
