import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const AUTH_USER = process.env.ADMIN_USER;
const AUTH_PASS = process.env.ADMIN_PASS;

export function middleware(req: NextRequest) {
	if (req.nextUrl.pathname.startsWith("/admin")) {
		if (!isAuthenticated(req)) {
			return new NextResponse("Authentication required", {
				status: 401,
				headers: { "WWW-Authenticate": "Basic" },
			});
		}

		return NextResponse.next();
	}
}

function isAuthenticated(req: NextRequest) {
	const authheader =
		req.headers.get("authorization") || req.headers.get("Authorization");

	if (!authheader) {
		return false;
	}

	const auth = Buffer.from(authheader.split(" ")[1], "base64")
		.toString()
		.split(":");
	const user = auth[0];
	const pass = auth[1];

	if (user == AUTH_USER && pass == AUTH_PASS) {
		return true;
	} else {
		return false;
	}
}

export const config = {
	matcher: ["/admin", "/admin/:path*"],
};
