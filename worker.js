const ORIGIN = 'https://www.lineon.cn';
const PREFIX = '/p/915fbf7dd334';

export default {
  async fetch(request) {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method Not Allowed', { status: 405 });
    }
    const incoming = new URL(request.url);
    const path = incoming.pathname.startsWith(PREFIX + '/')
      ? incoming.pathname
      : PREFIX + (incoming.pathname === '/' ? '/' : incoming.pathname);
    const upstream = new URL(path + incoming.search, ORIGIN);
    const headers = new Headers();
    for (const name of ['accept', 'accept-encoding', 'range', 'if-none-match', 'if-modified-since']) {
      const value = request.headers.get(name);
      if (value) headers.set(name, value);
    }
    const asset = /\.[a-z0-9]{2,6}$/i.test(incoming.pathname);
    const response = await fetch(upstream, {
      method: request.method,
      headers,
      cf: { cacheEverything: true, cacheTtlByStatus: { '200-299': asset ? 86400 : 300, '300-399': 60, '400-599': 0 } }
    });
    const result = new Response(response.body, response);
    result.headers.set('X-Portfolio-Source', 'lineon-edge-cache');
    return result;
  }
};
