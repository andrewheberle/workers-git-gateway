import { PluginArgs } from "andrewheberle/workers-git-gateway"
import { IttyRouter, IRequest, json, error } from "itty-router"

type GitGatewayPagesPluginFunction<
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>,
> = PagesPluginFunction<Env, Params, Data, PluginArgs>

const user = {
    id: "11111111-2222-3333-4444-5555555555555",
    email: "jdoe@example.com",
    user_metadata: {},
}

const settings = {
    github_enabled: true,
}

const token = {
    access_token: "deadbeef",
}

// new router
const router = IttyRouter<IRequest, [PluginArgs]>()
router
    .get("/.netlify/git/settings", () => { return json(settings) })
    .all("/.netlify/git/*", async (req, args) => {
        const url = new URL(req.url)

        // check access
        const allowed = new RegExp(/^\/\.netlify\/git\/github\/((git|contents|pulls|branches|merges|statuses|compare|commits)\/?|(issues\/(\\d+)\/labels))/)
        if (!allowed.test(url.pathname)) {
            return error(401)
        }

        // rewrite url
        url.host = "api.github.com"
        const re = new RegExp(/^\/\.netlify\/git\/github\//)
        url.pathname = url.pathname.replace(re, `/repos/${args.repo}/`)

        // set up request
        const request = new Request(url.toString(), req)
        request.headers.set("Authorization", `Bearer ${args.token}`)

        // return API response
        return await fetch(request)
    })
    .post("/.netlify/identity/token", () => { return json(token) })
    .get("/.netlify/identity/user", () => { return json(user) })
    .all("*", () => { return error(404) })

export const onRequest: GitGatewayPagesPluginFunction  = async (ctx) => {
    return await router.fetch(ctx.request, ctx.pluginArgs)
}
