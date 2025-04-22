
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// myapp.com/dashboard/* is a protected route
const isProctectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
    const authObject = await auth(); // Await the auth promise

    if (isProctectedRoute(req) && !authObject.userId) {
        return authObject.redirectToSignIn(); // Redirect to sign-in page
    }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};