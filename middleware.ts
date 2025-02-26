import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {LRUCache} from "lru-cache"
// setup lru-cache
const cache = new LRUCache<string, boolean>({
  max: 500, // store upto 500 tokens
  ttl: 1000 * 60 * 5 // cache for 5 minutes
})


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

    // check if token is in the cache
    if (cache.has(tokenString)){
      console.log(" Using cached token validation");
      return handleRedirects(request);
    }

    
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
        cache.set(tokenString, true);
         // Redirect logged-in users from /, /login, or /signup to /boards
         return handleRedirects(request);
      } else {
        // if not valid, delete the token and redirect to login
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('access_token');
        return response
      }
    }

    function handleRedirects(request: NextRequest) {
      if (['/', '/login', '/signup'].includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/boards', request.url));
      }
      return NextResponse.next();
    }

    export const config = {
      matcher: [
        '/boards/:path*',  // Protect /boards and all its subroutes
        '/',               // Add the home route to the matcher
        '/login',          // Add the login route to the matcher
        '/signup',         // Add the signup route to the matcher
      ],
  };