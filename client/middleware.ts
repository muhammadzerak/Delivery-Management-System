import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token"); // optional if storing JWT in cookies
    const pathname = req.nextUrl.pathname;

    if (!token && (pathname.startsWith("/dashboard") || pathname.startsWith("/partner"))) {
        return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
}
