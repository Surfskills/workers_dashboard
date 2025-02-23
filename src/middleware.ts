

export async function middleware() {
  // Simply allow all requests to pass through
  return null;
}

// Add the /dashboard path to the matcher
export const config = {
  matcher: ['/dashboard'],
};
