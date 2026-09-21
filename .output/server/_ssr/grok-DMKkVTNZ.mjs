import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-CN-evIEF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/grok-DMKkVTNZ.js
var CHAT_MODEL = "grok-4.5";
var IMAGE_MODEL = "grok-imagine-image";
var MAX_TOKENS = 1400;
var MAX_PROMPT = 8e3;
function clip(text, max = MAX_PROMPT) {
	if (text.length <= max) return text;
	return `${text.slice(0, max)}\n\n[truncated]`;
}
var chatGrok_createServerFn_handler = createServerRpc({
	id: "7e07b01eafd062e35c7d52d1f74f2d478cd3a47e70d72e8193c87df3f0482d0a",
	name: "chatGrok",
	filename: "src/lib/grok.ts"
}, (opts) => chatGrok.__executeServer(opts));
var chatGrok = createServerFn({ method: "POST" }).validator((input) => input).handler(chatGrok_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Grok is not available in this environment."
	};
	const messages = [];
	if (data.system?.trim()) messages.push({
		role: "system",
		content: clip(data.system, 4e3)
	});
	for (const m of data.messages.slice(-18)) {
		if (!m?.content?.trim()) continue;
		if (m.role !== "user" && m.role !== "assistant" && m.role !== "system") continue;
		messages.push({
			role: m.role,
			content: clip(m.content)
		});
	}
	if (messages.length === 0) return {
		ok: false,
		error: "Empty message."
	};
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: CHAT_MODEL,
			messages,
			max_tokens: MAX_TOKENS,
			temperature: .5,
			...data.liveSearch ? { search_parameters: {
				mode: "auto",
				return_citations: true
			} } : {}
		})
	});
	if (!res.ok) {
		const body = await res.text().catch(() => "");
		if (res.status === 429) return {
			ok: false,
			error: "Grok is busy. Wait a moment, then retry."
		};
		return {
			ok: false,
			error: `xAI error ${res.status}${body ? `: ${body.slice(0, 180)}` : ""}`
		};
	}
	const text = (await res.json()).choices?.[0]?.message?.content?.trim() ?? "";
	if (!text) return {
		ok: false,
		error: "Grok returned an empty reply."
	};
	return {
		ok: true,
		text,
		model: CHAT_MODEL
	};
});
var imagineGrok_createServerFn_handler = createServerRpc({
	id: "ed8b339efa8a2cab68902bd9dbbfb7a4c7fb5209b805a609339a84872d18318b",
	name: "imagineGrok",
	filename: "src/lib/grok.ts"
}, (opts) => imagineGrok.__executeServer(opts));
var imagineGrok = createServerFn({ method: "POST" }).validator((input) => input).handler(imagineGrok_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "Imagine is not available in this environment."
	};
	const prompt = data.prompt.trim().slice(0, 1500);
	if (prompt.length < 3) return {
		ok: false,
		error: "Prompt is too short."
	};
	const res = await fetch("https://api.x.ai/v1/images/generations", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: IMAGE_MODEL,
			prompt,
			n: 1,
			response_format: "url"
		})
	});
	if (!res.ok) {
		const body = await res.text().catch(() => "");
		if (res.status === 429) return {
			ok: false,
			error: "Imagine is busy. Wait a moment, then retry."
		};
		return {
			ok: false,
			error: `Imagine error ${res.status}${body ? `: ${body.slice(0, 180)}` : ""}`
		};
	}
	const url = (await res.json()).data?.[0]?.url ?? "";
	if (!url) return {
		ok: false,
		error: "Imagine returned no image."
	};
	return {
		ok: true,
		url,
		model: IMAGE_MODEL
	};
});
//#endregion
export { chatGrok_createServerFn_handler, imagineGrok_createServerFn_handler };
