# wokers-git-gateway

This Cloudflare Pages Plugin provides a bare bones implementation of the Netlify Git Gateway for use by DecapCMS.

## Installation

```
npm install andrewheberle/workers-git-gateway
```

## Authentication/Security

As this plugin provides no authentication, you must ensure your CMS path (eg `/admin`) and the path used for the git gateway (ie `/.netlify`) are protected by Cloudflare Access.

If you do not do this then you are essentially providing access to any repository the provided GitHub Access Token can read/write.

## Usage

Create a `[[path]].ts` file at `/functions/.netlify` as follows:

```typescript
import gitGatewayPlugin from "andrewheberle/workers-git-gateway"

export const onRequest: PagesFunction = gitGatewayPlugin({
    repo: "example/repo",
    token: "gh-ACCESS-TOKEN",
})
```

In addition you should ensure the `/admin` path is protected by Cloudflare Access under the same Application.
