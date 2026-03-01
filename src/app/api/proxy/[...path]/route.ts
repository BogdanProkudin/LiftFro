import { NextRequest, NextResponse } from "next/server";
type RequestInitWithDuplex = RequestInit & { duplex?: "half" };
const HOP_BY_HOP_HEADERS = new Set([
  "connection",
  "keep-alive",
  "proxy-authenticate",
  "proxy-authorization",
  "te",
  "trailers",
  "transfer-encoding",
  "upgrade",
  "content-length",
]);

const RESPONSE_HEADERS_TO_SKIP = new Set([
  "transfer-encoding",
  "content-encoding",
  "connection",
]);

function buildTargetUrl(req: NextRequest): string {
  const backendUrl = process.env.BACKEND_API_URL;

  if (!backendUrl) {
    throw new Error("BACKEND_API_URL is not defined");
  }

  const { pathname, search } = new URL(req.url);

  const strippedPath = pathname.replace(/^\/api\/proxy/, "");

  return `${backendUrl}${strippedPath}${search}`;
}

function buildRequestHeaders(req: NextRequest): Headers {
  const headers = new Headers();

  for (const [key, value] of req.headers.entries()) {
    if (
      !HOP_BY_HOP_HEADERS.has(key.toLowerCase()) &&
      key.toLowerCase() !== "host"
    ) {
      headers.set(key, value);
    }
  }

  const clientIp =
    req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip");

  if (clientIp) {
    headers.set("x-forwarded-for", clientIp);
  }

  return headers;
}

async function buildRequestBody(
  req: NextRequest,
  headers: Headers,
): Promise<BodyInit | undefined> {
  if (req.method === "GET" || req.method === "HEAD") {
    return undefined;
  }

  const contentType = req.headers.get("content-type") ?? "";

  if (contentType.startsWith("multipart/form-data")) {
    headers.delete("content-type");
    return req.formData();
  }

  return req.text();
}

function buildResponseHeaders(response: Response): Headers {
  const headers = new Headers();

  for (const [key, value] of response.headers.entries()) {
    if (!RESPONSE_HEADERS_TO_SKIP.has(key.toLowerCase())) {
      headers.set(key, value);
    }
  }

  return headers;
}

async function handler(req: NextRequest): Promise<NextResponse> {
  let url: string;

  try {
    url = buildTargetUrl(req);
  } catch {
    return NextResponse.json(
      { error: "BACKEND_API_URL is not defined" },
      { status: 500 },
    );
  }

  const requestHeaders = buildRequestHeaders(req);
  const body = await buildRequestBody(req, requestHeaders);

  try {
    const fetchOptions: RequestInitWithDuplex = {
      method: req.method,
      headers: requestHeaders,
      body,
      redirect: "manual",
      duplex: "half",
    };
    const response = await fetch(url, fetchOptions);

    const responseHeaders = buildResponseHeaders(response);

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error(`[Proxy] ${req.method} ${url} →`, error);

    return NextResponse.json(
      { error: "Upstream request failed" },
      { status: 502 },
    );
  }
}

export {
  handler as DELETE,
  handler as GET,
  handler as PATCH,
  handler as POST,
  handler as PUT,
};
