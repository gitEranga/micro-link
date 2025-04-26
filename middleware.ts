// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export function middleware(request: NextRequest) {
  // Generate request ID if not present
  const requestId = request.headers.get('x-request-id') || uuidv4();
  
  // Clone the request headers
  const requestHeaders = new Headers(request.headers);
  
  // Add request ID header
  requestHeaders.set('x-request-id', requestId);
  
  // Get response
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  
  // Add request ID to response headers
  response.headers.set('x-request-id', requestId);
  
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
};