import { NextResponse, type NextRequest } from "next/server";

/**
 * worldofthedevelopers.com and www.worldofthedevelopers.com both resolve to
 * this app, which splits SEO signal between two URLs Google treats as
 * separate pages. Canonicalize on the apex (non-www) domain with a
 * permanent redirect — stronger than a <link rel="canonical"> hint alone,
 * since it stops the www version from being crawled/indexed at all.
 */
export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";

  if (host.startsWith("www.")) {
    // Built explicitly (not via request.nextUrl.clone()) — the cloned
    // NextURL can carry the app's internal listening port along even
    // after overwriting .host, which leaked ":3000" into production
    // redirects and sent visitors (and Googlebot) to an unreachable URL.
    const apexHost = host.slice(4).split(":")[0];
    const url = new URL(
      `${request.nextUrl.pathname}${request.nextUrl.search}`,
      `https://${apexHost}`,
    );
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
