import { NextResponse } from "next/server";
import { decrypt } from "./pages/api/auth/lib";

export async function middleware(request) {
    const token = request.cookies.get('token')?.value;
    if (!token) {
        if (!['/', '/login', '/register'].includes(new URL(request.url).pathname)) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        return NextResponse.next();
    }

    const payload = await decrypt(token);
    if (!payload) {
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('token');
        return response;
    }

    if (['/', '/login', '/register'].includes(new URL(request.url)?.pathname)) {
        return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/', '/login', '/register', '/dashboard'],
};