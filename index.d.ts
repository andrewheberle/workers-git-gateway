export type PluginArgs = {
    repo: string
    token: string
    email: string
}

export default function (args: PluginArgs): PagesFunction
