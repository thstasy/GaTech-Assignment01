export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    const pathname = url.pathname;

    // Allow access to the /cdait directory
    if (pathname.startsWith('/cdait')) {
      return env.ASSETS.fetch(request);
    }

    // Check if the pathname starts with '/login'
    if (url.pathname.startsWith('/login')) {
      // Check if the query parameter 'v' exists and has exactly 8 alphanumeric characters
      const vParam = url.searchParams.get('v');
      const isValid = /^[a-zA-Z0-9]{8}$/.test(vParam);

      if (isValid) {
        // If valid, serve the static page
        return env.ASSETS.fetch(request);
      } else {
        // If the 'v' parameter is invalid, return 400 Bad Request
        return new Response('Bad Request', {
          headers: { 'content-type': 'text/html' },
          status: 400
        });
      }
    }

    // Otherwise, return 404 for all other paths
    return new Response('Page not found', {
      headers: { 'content-type': 'text/html' },
      status: 404
    });
  }
}
