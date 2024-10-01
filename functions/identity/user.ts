import { PluginArgs } from "andrewheberle/workers-git-gateway"

type GitGatewayPagesPluginFunction<
  Env = unknown,
  Params extends string = any,
  Data extends Record<string, unknown> = Record<string, unknown>,
> = PagesPluginFunction<Env, Params, Data, PluginArgs>

export const onRequestGet: GitGatewayPagesPluginFunction = async (ctx) => {
    const { email } = ctx.pluginArgs

    const user = {
        id: "11111111-2222-3333-4444-5555555555555",
        email: email,
        user_metadata: {}
    }
    return Response.json(user)
}
