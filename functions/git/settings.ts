export const onRequestGet: PagesFunction = () => {
  return Response.json({ github_enabled: true })
}
