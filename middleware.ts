import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { ROUTES } from "./lib/constants/routes";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    if (!token && !req.nextUrl.pathname.startsWith("/auth")) {
        const loginUrl = new URL(ROUTES.AUTH, req.url);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: [ROUTES.ROOT, ROUTES.PROFILE],
};
