/** Server-only Google Search adapter for MVPAUTO. */
export type GoogleSearchItem = { title: string; link: string; snippet: string };
export type GoogleSearchResult = { ok: boolean; provider: "google"; query: string; items: GoogleSearchItem[]; nextStart?: number; totalResults?: string; error?: string };
export async function searchGoogle(query: string, start = 1): Promise<GoogleSearchResult> {
  const key = process.env.GOOGLE_API_KEY;
  const cx = process.env.GOOGLE_CSE_ID;
  if (!key || !cx) return { ok: false, provider: "google", query, items: [], error: "Google Search is not configured: GOOGLE_API_KEY/GOOGLE_CSE_ID missing" };
  const url = new URL("https://www.googleapis.com/customsearch/v1");
  url.searchParams.set("key", key); url.searchParams.set("cx", cx); url.searchParams.set("q", query); url.searchParams.set("start", String(Math.max(1, Math.floor(start))));
  const response = await fetch(url, { headers: { accept: "application/json" } });
  const data = await response.json().catch(() => null) as any;
  if (!response.ok) return { ok: false, provider: "google", query, items: [], error: data?.error?.message || ("Google Search HTTP " + response.status) };
  const items = Array.isArray(data?.items) ? data.items.map((item: any) => ({ title: String(item.title ?? ""), link: String(item.link ?? ""), snippet: String(item.snippet ?? "") })).filter((item: GoogleSearchItem) => item.link) : [];
  const nextStart = data?.queries?.nextPage?.[0]?.startIndex;
  return { ok: true, provider: "google", query, items, nextStart, totalResults: data?.searchInformation?.totalResults };
}
