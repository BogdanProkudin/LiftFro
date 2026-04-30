import { NextRequest, NextResponse } from "next/server";

const AUTH_PAGES = [
  "/login",
  "/registration",
  "/forgot-password",
  "/reset-password",
  "/auth/verify",
  "/error",
];

const ONBOARDING_PAGES = ["/onboarding"];

const PUBLIC_PAGES = [...AUTH_PAGES, ...ONBOARDING_PAGES];

function isAuthPage(pathname: string): boolean {
  return AUTH_PAGES.some((page) => pathname.startsWith(page));
}

function isOnboardingPage(pathname: string): boolean {
  return ONBOARDING_PAGES.some((page) => pathname.startsWith(page));
}

function isPublicPage(pathname: string): boolean {
  return PUBLIC_PAGES.some((page) => pathname.startsWith(page));
}

export function proxy(request: NextRequest): NextResponse {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;
  const isOnboarded = request.cookies.get("isOnboarding")?.value;

  const isAuthenticated = Boolean(accessToken || refreshToken);

  // Authenticated user trying to access auth pages → redirect to home (or onboarding)
  if (isAuthenticated && isAuthPage(pathname)) {
    if (!isOnboarded) {
      return NextResponse.redirect(new URL("/onboarding", request.url));
    }
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Not authenticated → allow auth pages, block everything else
  if (!isAuthenticated && !isAuthPage(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Authenticated but not onboarded → force onboarding (except onboarding page itself)
  if (isAuthenticated && !isOnboarded && !isOnboardingPage(pathname)) {
    return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  // Already onboarded → block access to onboarding page
  if (isAuthenticated && isOnboarded && isOnboardingPage(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap, robots
     * - public assets
     */
  ],
};
