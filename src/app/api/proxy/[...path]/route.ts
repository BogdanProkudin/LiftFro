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
      if (key.toLowerCase() !== "set-cookie") {
        headers.set(key, value);
      }
    }
  }

  const cookies = response.headers.getSetCookie?.() ?? [];

  for (const cookie of cookies) {
    headers.append("set-cookie", cookie);
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

    console.log(response);
    console.log(response);
    const responseHeaders = buildResponseHeaders(response);

    const setCookieValues: string[] = [];
    responseHeaders.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        setCookieValues.push(value);
      }
    });
    responseHeaders.delete("set-cookie");

    const nextResponse = new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });

    setCookieValues.forEach((cookie) => {
      nextResponse.headers.append("set-cookie", cookie);
    });

    console.log("=== SET-COOKIE DEBUG ===");
    console.log("1. Raw from backend:", response.headers.getSetCookie?.());
    console.log("2. setCookieValues array:", setCookieValues);
    console.log(
      "3. Final response headers set-cookie:",
      nextResponse.headers.getSetCookie?.(),
    );
    console.log("4. All final headers:");
    nextResponse.headers.forEach((value, key) => {
      console.log(`  ${key}: ${value}`);
    });
    return nextResponse;
  } catch (error) {
    // Temporary structured logging until proper logger is added
    console.error("[API Proxy Error]", {
      url,
      method: req.method,
      error: error instanceof Error ? error.message : "Unknown error",
    });
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
