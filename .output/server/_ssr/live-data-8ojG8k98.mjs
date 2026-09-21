import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CN-evIEF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live-data-8ojG8k98.js
/**
* Live online data — server-side fetch (football, wiki, news-ish).
* Used by skills so the browser never hits CORS walls.
*/
var FOOTBALL_BASE = "https://worldcup26.ir/get/soccer";
var LEAGUE_MAP = [
	{
		keys: /premier|พรีเมียร์|epl|eng\.?1/i,
		slug: "eng.1",
		name: "Premier League"
	},
	{
		keys: /la\s*liga|ลาลีกา|esp\.?1|spain/i,
		slug: "esp.1",
		name: "La Liga"
	},
	{
		keys: /bundesliga|บุนเดส|ger\.?1|germany/i,
		slug: "ger.1",
		name: "Bundesliga"
	},
	{
		keys: /serie\s*a|เซเรีย|ita\.?1|italy/i,
		slug: "ita.1",
		name: "Serie A"
	},
	{
		keys: /ligue\s*1|ลีกเอิง|fra\.?1|france/i,
		slug: "fra.1",
		name: "Ligue 1"
	},
	{
		keys: /champions\s*league|ucl|แชมเปียนส์/i,
		slug: "uefa.champions",
		name: "UCL"
	}
];
function yyyymmdd(d = /* @__PURE__ */ new Date()) {
	return `${d.getUTCFullYear()}${String(d.getUTCMonth() + 1).padStart(2, "0")}${String(d.getUTCDate()).padStart(2, "0")}`;
}
function isFootballQuery(q) {
	return /ผลบอล|บอล|football|soccer|match|score|fixture|พรีเมียร์|ลาลีกา|บุนเดส|เซเรีย|ลีกเอิง|champions\s*league|ucl|premier\s*league|standings|ตารางคะแนน/i.test(q);
}
function pickLeague(q) {
	for (const row of LEAGUE_MAP) if (row.keys.test(q)) return row;
	return {
		slug: "eng.1",
		name: "Premier League"
	};
}
function formatEvent(ev) {
	const c0 = (Array.isArray(ev.competitions) ? ev.competitions : [])[0] ?? ev;
	const status = c0.status ?? {};
	const st = status.type ?? {};
	const teams = Array.isArray(c0.competitors) ? c0.competitors : [];
	const home = teams.find((t) => t.homeAway === "home") ?? teams[0];
	const away = teams.find((t) => t.homeAway === "away") ?? teams[1];
	if (!home || !away) {
		const name = String(ev.name ?? ev.shortName ?? "");
		if (!name) return null;
		return {
			source: "football",
			title: name,
			detail: String(st.shortDetail ?? st.description ?? "")
		};
	}
	const hs = home.score != null ? String(home.score) : "-";
	const as_ = away.score != null ? String(away.score) : "-";
	const hn = String(home.name ?? home.displayName ?? home.abbreviation ?? "Home");
	const an = String(away.name ?? away.displayName ?? away.abbreviation ?? "Away");
	const clock = String(status.displayClock ?? st.shortDetail ?? st.detail ?? "");
	const when = String(ev.date ?? c0.date ?? "").slice(0, 16).replace("T", " ");
	return {
		source: "football",
		title: `${hn} ${hs}–${as_} ${an}`,
		detail: [clock, when].filter(Boolean).join(" · ")
	};
}
async function fetchFootball(query) {
	const league = pickLeague(query);
	const dates = [];
	const today = /* @__PURE__ */ new Date();
	for (const off of [
		-1,
		0,
		1
	]) {
		const d = new Date(today);
		d.setUTCDate(d.getUTCDate() + off);
		dates.push(yyyymmdd(d));
	}
	const hits = [];
	for (const date of dates) try {
		const url = `${FOOTBALL_BASE}/${league.slug}/scoreboard?dates=${date}`;
		const res = await fetch(url, {
			headers: {
				Accept: "application/json",
				"User-Agent": "BossnuGrok/1.0"
			},
			signal: AbortSignal.timeout(12e3)
		});
		if (!res.ok) continue;
		const json = await res.json();
		for (const ev of json.events ?? []) {
			const hit = formatEvent(ev);
			if (hit) {
				hit.detail = `${league.name} · ${hit.detail}`;
				hits.push(hit);
			}
		}
	} catch {}
	if (hits.length === 0) try {
		const from = dates[0];
		const to = dates[dates.length - 1];
		const url = `${FOOTBALL_BASE}/${league.slug}/fixtures?from=${from}&to=${to}&limit=30`;
		const res = await fetch(url, {
			headers: {
				Accept: "application/json",
				"User-Agent": "BossnuGrok/1.0"
			},
			signal: AbortSignal.timeout(12e3)
		});
		if (res.ok) {
			const json = await res.json();
			for (const ev of json.events ?? []) {
				const hit = formatEvent(ev);
				if (hit) {
					hit.detail = `${league.name} · ${hit.detail}`;
					hits.push(hit);
				}
			}
		}
	} catch {}
	return hits.slice(0, 20);
}
async function fetchWikipedia(query, lang) {
	const host = lang === "th" ? "th.wikipedia.org" : "en.wikipedia.org";
	const url = `https://${host}/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(query)}&utf8=1&format=json&origin=*`;
	try {
		const res = await fetch(url, {
			headers: { Accept: "application/json" },
			signal: AbortSignal.timeout(1e4)
		});
		if (!res.ok) return [];
		return ((await res.json()).query?.search ?? []).slice(0, 5).map((r) => ({
			source: `wikipedia:${lang}`,
			title: r.title,
			detail: r.snippet.replace(/<[^>]+>/g, ""),
			url: `https://${host}/wiki/${encodeURIComponent(r.title.replace(/ /g, "_"))}`
		}));
	} catch {
		return [];
	}
}
async function fetchDuckDuckGo(query) {
	const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`;
	try {
		const res = await fetch(url, {
			headers: { Accept: "application/json" },
			signal: AbortSignal.timeout(1e4)
		});
		if (!res.ok) return [];
		const json = await res.json();
		const hits = [];
		if (json.AbstractText) hits.push({
			source: "duckduckgo",
			title: json.Heading || query,
			detail: json.AbstractText,
			url: json.AbstractURL
		});
		for (const t of json.RelatedTopics ?? []) {
			if (!t.Text) continue;
			hits.push({
				source: "duckduckgo",
				title: t.Text.slice(0, 80),
				detail: t.Text,
				url: t.FirstURL
			});
			if (hits.length >= 6) break;
		}
		return hits;
	} catch {
		return [];
	}
}
function buildSummary(query, kind, hits) {
	if (hits.length === 0) return `ไม่พบผลลัพธ์ออนไลน์สำหรับ “${query}” ตอนนี้`;
	const lines = [
		`ผลค้นหาออนไลน์ · ${kind} · “${query}”`,
		`พบ ${hits.length} รายการ`,
		""
	];
	for (const h of hits.slice(0, 12)) {
		lines.push(`• [${h.source}] ${h.title}`);
		if (h.detail) lines.push(`  ${h.detail.slice(0, 180)}`);
		if (h.url) lines.push(`  ${h.url}`);
	}
	return lines.join("\n");
}
var fetchLiveData_createServerFn_handler = createServerRpc({
	id: "115610eaad7abc0e589848361f3223445819da3a28b6b34c2dd9a4d7cdb29e27",
	name: "fetchLiveData",
	filename: "src/lib/live-data.ts"
}, (opts) => fetchLiveData.__executeServer(opts));
var fetchLiveData = createServerFn({ method: "POST" }).validator((input) => input).handler(fetchLiveData_createServerFn_handler, async ({ data }) => {
	const query = data.query.trim().slice(0, 200);
	if (query.length < 2) return {
		ok: false,
		error: "คำค้นสั้นเกินไป"
	};
	try {
		if (isFootballQuery(query)) {
			const hits = await fetchFootball(query);
			if (hits.length < 3) {
				const wiki = await fetchWikipedia(query, /[ก-๙]/.test(query) ? "th" : "en");
				hits.push(...wiki);
			}
			return {
				ok: true,
				query,
				kind: "football",
				hits,
				summary: buildSummary(query, "football", hits)
			};
		}
		const lang = /[ก-๙]/.test(query) ? "th" : "en";
		const [wiki, ddg] = await Promise.all([fetchWikipedia(query, lang), fetchDuckDuckGo(query)]);
		const hits = [...ddg, ...wiki].slice(0, 12);
		return {
			ok: true,
			query,
			kind: "web",
			hits,
			summary: buildSummary(query, "web", hits)
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : String(err)
		};
	}
});
//#endregion
export { fetchLiveData_createServerFn_handler };
