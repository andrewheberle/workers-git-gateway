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

    // rewrite url host
    url.host = "api.github.com"
    url.pathname = url.pathname.replace("/.netlify/git/github/", `/repos/${repo}/`)

    // set up request
    const request = new Request(url.toString(), ctx.request)
    request.headers.set("Authorization", `Bearer ${token}`)

    // TODO: add access controls here

    // return API response
    return await fetch(request)
}
