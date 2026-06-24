import { AuthQueryUtils } from "@/features/auth/utils/auth-query.utils";

import { type NextRequest, NextResponse } from "next/server";

const LOVABLE_APP_URL = "https://adamoservices.lovable.app/";
const LOCAL_DEVELOPMENT_HOSTNAMES = new Set([
  "localhost",
  "127.0.0.1",
  "landing-services-local.adamoservices.co",
  "dev-sign.adamoservices.co",
  "dev-id.adamoservices.co",
]);

function isLocalDevelopmentRequest(request: NextRequest): boolean {
  return LOCAL_DEVELOPMENT_HOSTNAMES.has(request.nextUrl.hostname);
}

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  if (isLocalDevelopmentRequest(request)) {
    return NextResponse.next();
  }

  if (AuthQueryUtils.shouldSkipLovableRedirect(searchParams, pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(LOVABLE_APP_URL);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)",
  ],
};
