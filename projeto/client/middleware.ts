import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({ req, secret: '123' });
    const { pathname } = req.nextUrl;

    console.log('Middleware token:', token);

    if (pathname.startsWith('/auth') || token) {
        return NextResponse.next();
    }

    if (!token && pathname !== '/auth/login') {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }
}

export const config = {
    matcher: ['/home/:path*', '/settings/:path*', '/settings'],
};
