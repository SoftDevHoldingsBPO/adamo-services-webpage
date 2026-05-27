import { AuthQueryUtils } from "@/features/auth/utils/auth-query.utils";

import { type NextRequest, NextResponse } from "next/server";

const LOVABLE_APP_URL = "https://adamoservices.lovable.app/";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

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
