const STATUS_TITLES = {
  400: "Bad request",
  401: "Authorization required",
  403: "Access denied",
  404: "Page not found",
  405: "Method not allowed",
  408: "Request timed out",
  409: "Request conflict",
  410: "Page no longer available",
  413: "Request too large",
  414: "Address too long",
  415: "Unsupported request",
  422: "Request could not be processed",
  425: "Request not ready",
  426: "Request upgrade required",
  428: "Request needs confirmation",
  429: "Too many requests",
  431: "Request headers too large",
  451: "Content unavailable",
  500: "Internal server error",
  501: "Service not implemented",
  502: "Bad gateway",
  503: "Service temporarily unavailable",
  504: "Gateway timed out",
  507: "Storage unavailable",
  508: "Request loop detected",
  510: "Service extension unavailable",
  511: "Network authentication required"
};

function renderErrorPage(status) {
  const isServerError = status >= 500;
  const title =
    STATUS_TITLES[status] ||
    (isServerError ? "Service error" : "Request error");
  const message =
    status === 404
      ? "We couldn't find that page. It may have moved or the address may be incorrect."
      : isServerError
        ? "The site couldn't complete your request right now. Please try again later."
        : "We couldn't complete this request. Check the address or contact our team if you need help.";

  return `<!doctype html>
<html lang="en-IN">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex,follow" />
    <meta name="theme-color" content="#071b8c" />
    <title>${status} ${title} | AdCool India</title>
    <link rel="icon" href="/favicon.ico" sizes="any" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <header>
      <nav class="nav container">
        <a class="brand" href="/" aria-label="AdCool India Private Limited home">
          <img src="/assets/adcool-logo.png" alt="AdCool India Private Limited logo" />
        </a>
        <a class="btn" href="/contact/">Get a Quote</a>
      </nav>
    </header>
    <main id="main-content">
      <section class="page-hero">
        <div class="container">
          <p class="breadcrumbs">HTTP ${status}</p>
          <h1>${title}</h1>
          <p>${message}</p>
          <div class="hero-actions">
            <a class="btn" href="/">Go to Home</a>
            <a class="btn btn-outline" href="/panel-air-conditioner/">Panel Air Conditioner</a>
            <a class="btn btn-outline" href="/contact/">Contact AdCool</a>
          </div>
        </div>
      </section>
    </main>
  </body>
</html>`;
}

function acceptsHtml(request) {
  return (request.headers.get("Accept") || "")
    .toLowerCase()
    .includes("text/html");
}

function errorResponse(request, status, originalResponse) {
  const headers = new Headers(originalResponse ? originalResponse.headers : {});
  headers.set("Content-Type", "text/html; charset=utf-8");
  headers.set("Cache-Control", "no-store");
  headers.set("X-Robots-Tag", "noindex, follow");
  headers.delete("Content-Length");
  headers.delete("Content-Encoding");
  headers.delete("Content-Range");
  headers.delete("ETag");
  headers.delete("Last-Modified");

  const isHtmlRequest = acceptsHtml(request);
  const body =
    request.method === "HEAD"
      ? null
      : isHtmlRequest
        ? renderErrorPage(status)
        : "The request could not be completed.";

  if (!isHtmlRequest) {
    headers.set("Content-Type", "text/plain; charset=utf-8");
  }

  return new Response(body, { status, headers });
}

export async function onRequest(context) {
  let response;

  try {
    response = await context.next();
  } catch (error) {
    console.error("Cloudflare Pages request failed", error);
    return errorResponse(context.request, 500);
  }

  if (
    response.status < 400 ||
    response.status === 402 ||
    !acceptsHtml(context.request)
  ) {
    return response;
  }

  return errorResponse(context.request, response.status, response);
}
