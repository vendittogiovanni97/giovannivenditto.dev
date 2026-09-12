import { NextRequest, NextResponse } from "next/server";

/**
 * IT is the default, unprefixed locale — every URL indexed before this
 * migration (e.g. /studio, /work/foo) keeps working exactly as-is. EN lives
 * under /en. Bare paths are rewritten (not redirected) to /it/* internally
 * so the address bar never shows the /it prefix.
 *
 * No Accept-Language/cookie-based redirect on purpose: that would make the
 * response vary per visitor and defeat CDN caching, which is the whole
 * point of this migration (see the "everything is BYPASS" finding).
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already locale-prefixed (either /en/* — the real public prefix — or the
  // literal /it/* Next.js generates internally for things like the
  // og:image URL on IT pages): let it resolve directly, no rewrite needed.
  if (/^\/(en|it)(\/|$)/.test(pathname)) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = pathname === "/" ? "/it" : `/it${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip: Next internals, API routes, root-level metadata routes/files, and
  // any request for a file with an extension (static assets in /public).
  matcher: ["/((?!_next|api|opengraph-image|favicon\\.ico|robots\\.txt|sitemap\\.xml|manifest\\.json|sw\\.js|.*\\..*).*)"],
};
