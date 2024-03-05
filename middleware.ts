import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isAuth = request.cookies.get("token")?.value;

  if (isAuth && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  if (!isAuth && request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname === "/") {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
