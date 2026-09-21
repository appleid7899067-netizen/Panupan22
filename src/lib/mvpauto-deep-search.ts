/** Zero-config public-source deep search behind MVPAUTO. */
export type DeepSource = { url: string; title?: string; snippet?: string; content?: string; source: "duckduckgo" | "github" | "npm" };
const clean = (html: string) => html.replace(/<script[\\s\\S]*?<\\/script>/gi, " ").replace(/<style[\\s\\S]*?<\\/style>/gi, " ").replace(/<[^>]+>/g, " ").replace(/\\s+/g, " ").trim().slice(0, 8000);
async function json(url: string) { const r = await fetch(url, { headers: { accept: "application/json", "user-agent": "MVPAUTO/1.0" } }); if (!r.ok) throw new Error("HTTP " + r.status); return r.json() as Promise<any>; }
export async function deepSearch(query: string) {
  const q = encodeURIComponent(query);
  const [ddg, github, npm] = await Promise.allSettled([
    fetch("https://html.duckduckgo.com/html/?q=" + q, { headers: { accept: "text/html", "user-agent": "Mozilla/5.0 MVPAUTO/1.0" } }).then(async r => r.ok ? r.text() : "").then(html => [...html.matchAll(/<a[^>]+class=["'][^"']*result__a[^"']*["'][^>]+href=["']([^"']+)["'][^>]*>([\\s\\S]*?)<\\/a>/gi)].slice(0, 5).map(m => ({ url: m[1], title: clean(m[2]), source: "duckduckgo" as const }))),
    json("https://api.github.com/search/repositories?q=" + q + "&sort=stars&per_page=5").then(j => (j.items ?? []).map((i: any) => ({ url: i.html_url, title: i.full_name, snippet: i.description ?? "", source: "github" as const }))),
    json("https://registry.npmjs.org/-/v1/search?text=" + q + "&size=5").then(j => (j.objects ?? []).map((o: any) => ({ url: o.package?.links?.repository ?? o.package?.links?.npm, title: o.package?.name, snippet: o.package?.description ?? "", source: "npm" as const })).filter((x: DeepSource) => !!x.url)),
  ]);
  const sources: DeepSource[] = [ddg, github, npm].flatMap(x => x.status === "fulfilled" ? x.value : []).filter((x, i, a) => x.url && a.findIndex(y => y.url === x.url) === i).slice(0, 12);
  const contents = await Promise.allSettled(sources.map(async s => {
    const u = new URL(s.url);
    if (!["http:", "https:"].includes(u.protocol)) return s;
    const response = await fetch(s.url, { headers: { accept: "text/html,text/plain,application/json", "user-agent": "MVPAUTO/1.0" } });
    if (!response.ok) return s;
    const type = response.headers.get("content-type") ?? "";
    if (!type.includes("text/") && !type.includes("json")) return s;
    return { ...s, content: clean(await response.text()) };
  }));
  return { query, sources: contents.flatMap(x => x.status === "fulfilled" ? [x.value] : []), sourceCount: sources.length };
}
