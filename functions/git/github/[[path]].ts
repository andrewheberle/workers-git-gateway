import { PluginArgs } from "andrewheberle/workers-git-gateway"

type GitGatewayPagesPluginFunction<
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>,
> = PagesPluginFunction<Env, Params, Data, PluginArgs>

export const onRequest: GitGatewayPagesPluginFunction  = async (ctx) => {
    // get plugin args
    const { repo, token } = ctx.pluginArgs

    // new url
    const url = new URL(ctx.request.url)

    // check access
    const allowed = new RegExp(/^\/\.netlify\/git\/github\/((git|contents|pulls|branches|merges|statuses|compare|commits)\/?|(issues\/(\\d+)\/labels))/)
    if (!allowed.test(url.pathname)) {
        return new Response("Unauthorized", { status: 401 })
    }

    // rewrite url
    url.host = "api.github.com"
    const re = new RegExp(/^\/\.netlify\/git\/github\//)
    url.pathname = url.pathname.replace(re, `/repos/${repo}/`)

    // set up request
    const request = new Request(url.toString(), ctx.request)
    request.headers.set("Authorization", `Bearer ${token}`)

    // return API response
    return await fetch(request)
}
