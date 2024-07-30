import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {
    // gets the token
    const token = request.cookies.get('access_token');

    // checks if the token is available in cookies, if not redirect to login
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    
    //   if we have token in cookie and check if the token is valid
      const verifyResponse = await fetch('http://localhost:8000/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (verifyResponse.ok) {
        return NextResponse.next();
      } else {
        // if not valid, redirect to login
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    export const config = {
        matcher: [
          '/boards/:path*',  // Protect /boards and all its subroutes
        ],
      };