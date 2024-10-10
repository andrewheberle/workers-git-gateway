# wokers-git-gateway

This Cloudflare Pages Plugin provides a bare bones implementation of the Netlify Git Gateway for use by DecapCMS.

## Installation

```
npm install workers-git-gateway
```

## Authentication/Security

As this plugin provides _no authentication_, you **must** ensure your CMS path (eg `/admin`) and the path used for the git gateway (ie `/.netlify`) are protected by Cloudflare Access/Cloudflare Zero Trust.

If you do not do this then you are essentially providing unrestricted access to any repository the provided GitHub Access Token can read/write.

## Usage

Create a `[[path]].ts` file at `/functions/.netlify` as follows:

```typescript
import gitGatewayPlugin from "workers-git-gateway"

export const onRequest: PagesFunction = gitGatewayPlugin({
    repo: "example/repo",
    token: "gh-ACCESS-TOKEN",
})
```

In addition you should ensure the `/admin` path is protected by Cloudflare Access under the same Application.

## Important!

**Note:** Once again, the plugin does **not** perform any authentication of the requests it receives as it is assumes the requests are secured "upstream" via Cloudflare Access/Cloudflare Zero Trust.
