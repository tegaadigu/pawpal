import { NextResponse } from 'next/server';
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET; 

export function middleware(req: NextRequest) {
  const { cookies } = req;
  
  // Get the token from cookies or Authorization header
  const token = cookies.get('token') || req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    // If no token, redirect to login page or return an unauthorized response
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    // Verify the JWT
    const decoded = jwt.verify(token, SECRET_KEY);

    // Optionally, attach user data to the request (you can pass this to API routes later if needed)
    req.nextUrl.searchParams.set('userId', decoded.id);

    // Continue to the requested page
    return NextResponse.next();
  } catch (err) {
    console.error('JWT validation error', err);
    // Redirect to login page or show error
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/store/:path*'],  // Routes that require authentication
  // Exclude the '/login' route
};