import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isAuthenticatedRoute = createRouteMatcher([
  "/dashboard",
  "/dashboard/(.*)",
  "/api/(.*)"
]);

export default clerkMiddleware(async (auth, req) => {
  if (isAuthenticatedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/api/:path*"],
};