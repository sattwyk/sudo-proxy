# piko

Simple reverse proxy to bypass CORS.

---

### features:
 - Deployable on many platforms - thanks to nitro
 - header rewrites - read and write protected headers
 - bypass CORS - always allows browser to send requests through it
 - secure it with turnstile - prevent bots from using your proxy

> [!WARNING]
> Turnstile integration only works properly with cloudflare workers as platform

### usage:

Start a local dev server:
```
pnpm install
pnpm dev
```

Basic health check:
```
curl -s http://localhost:3000/
```

Proxy a request:
```
curl -i "http://localhost:3000/?destination=https://example.com"
```

Pass protected headers using X-* mappings:
```
curl -i "http://localhost:3000/?destination=https://example.com" \
  -H "X-Referer: https://example.com" \
  -H "X-User-Agent: MyApp/1.0"
```

Response notes:
- Upstream `Set-Cookie` is returned as `X-Set-Cookie`.
- `X-Final-Destination` shows the final URL after redirects.

#### turnstile/jwt:

Set secrets:
```
TURNSTILE_SECRET=your_turnstile_secret
JWT_SECRET=your_jwt_secret
```

First request with a Turnstile token:
```
curl -i "http://localhost:3000/?destination=https://example.com" \
  -H "X-Token: turnstile|<turnstile_token>"
```

The response includes `X-Token` containing a JWT. Use it on subsequent requests:
```
curl -i "http://localhost:3000/?destination=https://example.com" \
  -H "X-Token: jwt|<jwt_from_previous_response>"
```

#### deploy:

Build per target:
```
pnpm build:cloudflare
pnpm build:aws
pnpm build:node
pnpm build:netlify
```

Node runtime:
```
pnpm build:node
pnpm start
```

### supported platforms:
 - cloudflare workers
 - AWS lambda
 - nodejs
 - netlify edge functions
