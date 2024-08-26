import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export async function middleware(request: NextRequest) {
    // gets the token
    const token = request.cookies.get('access_token');
  
    // checks if the token is available in cookies, if not redirect to login
    if (!token) {
       // Allow access to /login, /signup, and / (home) without a token
       if (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup' || request.nextUrl.pathname === '/') {
        return NextResponse.next();
    }

        return NextResponse.redirect(new URL('/login', request.url));
      }

        // Ensure the token is a string
    const tokenString = String(token.value);

    
    //   if we have token in cookie and check if the token is valid
      const verifyResponse = await fetch('http://localhost:8000/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenString}`
        }
      });
        // If the token is valid, allow access
      if (verifyResponse.ok) {
         // Redirect logged-in users from /, /login, or /signup to /boards
         if (request.nextUrl.pathname === '/' || request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup') {
          return NextResponse.redirect(new URL('/boards', request.url));
        }
      return NextResponse.next();
      } else {
      // if not valid, delete the token and redirect to login
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('access_token');
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    export const config = {
      matcher: [
        '/boards/:path*',  // Protect /boards and all its subroutes
        '/',               // Add the home route to the matcher
        '/login',          // Add the login route to the matcher
        '/signup',         // Add the signup route to the matcher
      ],
  };