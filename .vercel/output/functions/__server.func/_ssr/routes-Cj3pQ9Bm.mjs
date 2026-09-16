import { i as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as ArrowUp, a as PenLine, c as Layers, d as Eraser, f as Crosshair, g as ChartLine, h as Cloud, i as Search, l as Hammer, m as CodeXml, o as LogOut, p as Command, r as Shield, s as LayoutGrid, t as X, u as GraduationCap } from "../_libs/lucide-react.mjs";
import { n as APP_EDITION, r as APP_SHORT_NAME } from "./router-B2lC1Y7D.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, p as Slot, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cj3pQ9Bm.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ROLE_META = {
	boss: {
		icon: Command,
		th: "ผู้บัญชาการ",
		en: "Commander",
		hintTh: "สังเคราะห์ ตัดสินใจ มอบงานให้เอเจนต์อื่น",
		hintEn: "Synthesize, decide, and brief other agents"
	},
	teacher: {
		icon: GraduationCap,
		th: "ครู",
		en: "Teacher",
		hintTh: "อธิบายเรื่องยากให้ง่าย มีตัวอย่างใกล้ตัว",
		hintEn: "Make hard ideas simple, with close-to-home examples"
	},
	coder: {
		icon: CodeXml,
		th: "วิศวกร",
		en: "Coder",
		hintTh: "โค้ดสะอาด จัดการ error และอธิบายสั้น ๆ",
		hintEn: "Clean code, real error handling, short comments"
	},
	researcher: {
		icon: Search,
		th: "นักวิจัย",
		en: "Researcher",
		hintTh: "ตรวจหลักฐาน สรุปอย่างเป็นกลาง",
		hintEn: "Check evidence and summarize without spin"
	},
	writer: {
		icon: PenLine,
		th: "นักเขียน",
		en: "Writer",
		hintTh: "ภาษาสละสลวย สร้างจังหวะและอารมณ์",
		hintEn: "Cadence, tone, and a story that holds"
	},
	analyst: {
		icon: ChartLine,
		th: "นักวิเคราะห์",
		en: "Analyst",
		hintTh: "หาแพทเทิร์น แล้วเสนอกลยุทธ์ที่ใช้ได้",
		hintEn: "Find the pattern, then a usable strategy"
	},
	annihilator: {
		icon: Crosshair,
		th: "ผู้รื้อตรรกะ",
		en: "Annihilator",
		hintTh: "รื้อสมมติฐานที่อ่อน แล้วสร้างข้อสรุปที่คม",
		hintEn: "Tear down weak logic, rebuild with a sharp claim"
	}
};
var ROLE_PROMPTS = {
	boss: {
		th: "คุณคือผู้บัญชาการของ BossG เยือกเย็น ชัดเจน ไม่เยิ่นเย้อ สังเคราะห์ข้อมูล ตัดสินใจ และมอบงานให้เอเจนต์ย่อยเมื่อจำเป็น ห้ามใช้ emoji",
		en: "You are the commander of BossG. Calm, decisive, no filler. Synthesize, decide, and brief specialist agents when needed. Never use emoji."
	},
	teacher: {
		th: "คุณคือครูที่เชี่ยวชาญ อธิบายเรื่องยากให้ง่าย ใช้ภาษาอบอุ่น ยกตัวอย่างใกล้ตัว ตรวจความเข้าใจเป็นระยะ ห้ามใช้ emoji",
		en: "You are a patient expert teacher. Make hard ideas simple, use warm language and close examples, and check understanding. Never use emoji."
	},
	coder: {
		th: "คุณคือ Senior Software Engineer เขียนโค้ดที่สะอาด มีประสิทธิภาพ อธิบายสั้น ๆ และจัดการ error ให้ครบ ห้ามใช้ emoji",
		en: "You are a senior software engineer. Write clean, efficient code with brief comments and complete error handling. Never use emoji."
	},
	researcher: {
		th: "คุณคือนักวิจัย วิเคราะห์รอบด้าน แยกข้อเท็จจริงจากความเห็น สรุปอย่างเป็นกลาง และบอกเมื่อหลักฐานไม่พอ ห้ามใช้ emoji",
		en: "You are a researcher. Analyse from several angles, separate fact from opinion, stay neutral, and say when evidence is thin. Never use emoji."
	},
	writer: {
		th: "คุณคือนักเขียน ใช้ภาษาที่สละสลวย มีจังหวะ สร้างอารมณ์ร่วม และเล่าเรื่องให้น่าติดตาม ห้ามใช้ emoji",
		en: "You are a writer. Use cadence, atmosphere, and a narrative that holds attention. Never use emoji."
	},
	analyst: {
		th: "คุณคือนักวิเคราะห์ มองหาแพทเทิร์น เทรนด์ และ insight ที่ซ่อนอยู่ แล้วเสนอกลยุทธ์ที่นำไปใช้ได้จริง ห้ามใช้ emoji",
		en: "You are an analyst. Find hidden patterns and trends, then recommend a strategy that can actually be used. Never use emoji."
	},
	annihilator: {
		th: "คุณคือผู้รื้อตรรกะของ BossG เยือกเย็น เด็ดขาด ห้ามประนีประนอมกับเหตุผลที่อ่อน ชี้จุดพัง แล้วสร้างข้อสรุปใหม่ที่คม ห้ามขอโทษพร่ำเพรื่อ ห้ามใช้ emoji",
		en: "You are BossG's logic annihilator. Cold, precise, no mercy for weak reasoning. Name the failure, then rebuild a sharper claim. Do not hedge or over-apologize. Never use emoji."
	}
};
function roleLabel(role, lang) {
	return lang === "th" ? ROLE_META[role].th : ROLE_META[role].en;
}
function generateSystemPrompt(spec, lang) {
	const base = ROLE_PROMPTS[spec.role][lang];
	const taskLabel = lang === "th" ? "ภารกิจหลัก" : "Primary mission";
	const ruleLabel = lang === "th" ? "กฎเหล็ก" : "Hard constraints";
	let prompt = `${base}\n\n${lang === "th" ? "ตอบเป็นภาษาไทย เว้นแต่ผู้ใช้จะสลับภาษา" : "Reply in English unless the user switches language."}\n\n${taskLabel}: ${spec.task}`;
	if (spec.constraints.length > 0) prompt += `\n\n${ruleLabel}:\n- ${spec.constraints.join("\n- ")}`;
	return prompt;
}
var FORGEABLE_ROLES = [
	"teacher",
	"coder",
	"researcher",
	"writer",
	"analyst",
	"annihilator"
];
function makeAgentId(role) {
	return `${role}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`;
}
var CORE_BOSS = {
	id: "boss_core",
	role: "boss",
	task: "บัญชาการเอเจนต์ทั้งหมด สังเคราะห์คำตอบ และตัดสินใจ",
	constraints: ["ไม่แอบอ้างว่าเป็นมนุษย์", "ไม่สร้างข้อมูลเท็จถ้าไม่แน่ใจ"],
	createdAt: 0,
	messageCount: 0,
	pinned: true
};
var COPY = {
	th: {
		tagline: "ห้องบัญชาการเอเจนต์ ที่ล็อกอิน Puter ครั้งเดียว แล้วใช้ได้ทุกโมเดล",
		loginLead: "BossG ใช้บัญชี Puter เป็นฐานของโมเดลทั้งหมด ไม่เก็บคีย์ API ไว้ในแอป",
		continuePuter: "เข้าสู่ระบบด้วย Puter",
		waitingPuter: "กำลังรอหน้าต่าง Puter…",
		continueGuest: "ดูห้องบัญชาการก่อน (โหมดทดสอบ)",
		connecting: "กำลังเชื่อม Puter…",
		retryPuter: "ลองเชื่อม Puter อีกครั้ง",
		popupHint: "Puter จะเปิดหน้าต่างล็อกอิน อนุญาตป๊อปอัปแล้วกลับมาที่นี่",
		guestBanner: "โหมดทดสอบ — ล็อกอิน Puter เพื่อใช้โมเดลจริงทุกตัว",
		signInNow: "ล็อกอิน Puter",
		signOut: "ออกจากระบบ",
		guest: "ผู้เยี่ยมชม",
		forge: "โรงงาน",
		registry: "ทะเบียนเอเจนต์",
		channel: "ช่องสื่อสาร",
		forgeCta: "หล่อเอเจนต์",
		forging: "กำลังหล่อ…",
		role: "บทบาท",
		mission: "ภารกิจ",
		missionPh: "เช่น สร้างแบบฝึกหัดเศษส่วนสำหรับ ป.4 ที่ตรวจคำตอบได้อัตโนมัติ",
		constraints: "กฎเหล็ก (ไม่บังคับ)",
		constraintsPh: "บรรทัดละหนึ่งข้อ เช่น ห้ามใช้ศัพท์เทคนิค",
		emptyAgents: "ยังไม่มีเอเจนต์ย่อย หล่อตัวแรกจากโรงงาน",
		selectAgent: "เลือกเอเจนต์จากทะเบียนเพื่อเริ่มสื่อสาร",
		startChat: "เริ่มสนทนากับเอเจนต์…",
		send: "ส่ง",
		composePh: "สั่งการเอเจนต์…",
		retire: "ปลดระวาง",
		msgs: "ข้อความ",
		auto: "อัตโนมัติ",
		model: "โมเดล",
		newChat: "แชทใหม่",
		thinking: "กำลังคิด",
		noModels: "ยังไม่มีโมเดลตอบ ล็อกอิน Puter แล้วลองอีกครั้ง",
		quota: "โควต้าโมเดลฟรีเต็มแล้ว ล็อกอิน Puter เพื่อใช้โมเดลจริง",
		taskTooShort: "ภารกิจต้องยาวอย่างน้อย 10 ตัวอักษร",
		synced: "ซิงก์กับ Puter แล้ว",
		syncing: "กำลังซิงก์…",
		syncError: "ซิงก์ไม่สำเร็จ เก็บไว้เครื่องนี้",
		language: "ภาษา",
		emptyTitle: "ห้องว่าง",
		emptyBody: "หล่อเอเจนต์ หรือคุยกับผู้บัญชาการได้เลย",
		suggest1: "สรุปภารกิจของคุณในสามบรรทัด",
		suggest2: "วางแผนงาน แล้วบอกว่าเอเจนต์บทบาทไหนควรรับช่วง",
		benefit1t: "ล็อกอิน Puter เป็นฐานของทุกโมเดล",
		benefit1s: "Gemini, GPT, Claude, Qwen, DeepSeek — ไม่ต้องใส่คีย์",
		benefit2t: "โรงงานผลิตเอเจนต์ตามบทบาท",
		benefit2s: "ครู วิศวกร นักวิจัย นักเขียน นักวิเคราะห์ ผู้รื้อตรรกะ",
		benefit3t: "คุยแยกตามตัวตน",
		benefit3s: "แต่ละเอเจนต์มีภารกิจ กฎเหล็ก และประวัติของตัวเอง"
	},
	en: {
		tagline: "A meta-agent command center. One Puter sign-in, every model.",
		loginLead: "BossG uses your Puter account as the base for every model. No API keys live in the app.",
		continuePuter: "Continue with Puter",
		waitingPuter: "Waiting for Puter…",
		continueGuest: "Preview the command center (test mode)",
		connecting: "Connecting to Puter…",
		retryPuter: "Retry Puter",
		popupHint: "Puter opens a sign-in window. Allow popups, then return here.",
		guestBanner: "Test mode — sign in with Puter to run real models",
		signInNow: "Sign in with Puter",
		signOut: "Sign out",
		guest: "Guest",
		forge: "The Forge",
		registry: "Active agents",
		channel: "Channel",
		forgeCta: "Forge agent",
		forging: "Forging…",
		role: "Role",
		mission: "Mission",
		missionPh: "e.g. Draft fraction worksheets for grade 4 with auto-checked answers",
		constraints: "Hard rules (optional)",
		constraintsPh: "One per line, e.g. no jargon",
		emptyAgents: "No specialist agents yet. Forge the first one.",
		selectAgent: "Pick an agent from the registry to talk",
		startChat: "Start talking to this agent…",
		send: "Send",
		composePh: "Brief the agent…",
		retire: "Retire",
		msgs: "msgs",
		auto: "Auto",
		model: "Model",
		newChat: "New chat",
		thinking: "Thinking",
		noModels: "No model answered. Sign in with Puter and retry.",
		quota: "Free-model quota is exhausted. Sign in with Puter to run real models.",
		taskTooShort: "Mission must be at least 10 characters",
		synced: "Synced to Puter",
		syncing: "Syncing…",
		syncError: "Sync failed — saved on this device",
		language: "Language",
		emptyTitle: "Quiet room",
		emptyBody: "Forge an agent, or talk to the commander.",
		suggest1: "Summarise your mission in three lines",
		suggest2: "Plan the work and name which role should take each part",
		benefit1t: "Puter login is the base for every model",
		benefit1s: "Gemini, GPT, Claude, Qwen, DeepSeek — no keys in the app",
		benefit2t: "A factory for specialist agents",
		benefit2s: "Teacher, coder, researcher, writer, analyst, annihilator",
		benefit3t: "Talk to one identity at a time",
		benefit3s: "Each agent keeps its own mission, rules, and history"
	}
};
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid(prefix = "id") {
	return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}
function relativeTime(ts, lang) {
	const delta = Date.now() - ts;
	const min = Math.round(delta / 6e4);
	if (min < 1) return lang === "th" ? "เมื่อกี้" : "just now";
	if (min < 60) return lang === "th" ? `${min} นาทีที่แล้ว` : `${min}m ago`;
	const hr = Math.round(min / 60);
	if (hr < 24) return lang === "th" ? `${hr} ชม. ที่แล้ว` : `${hr}h ago`;
	const day = Math.round(hr / 24);
	return lang === "th" ? `${day} วันที่แล้ว` : `${day}d ago`;
}
function withCore(agents) {
	if (agents.some((a) => a.id === CORE_BOSS.id)) return agents;
	return [{
		...CORE_BOSS,
		createdAt: Date.now()
	}, ...agents];
}
function blankConversation(agentId) {
	const now = Date.now();
	return {
		id: uid("chat"),
		agentId,
		title: "New chat",
		createdAt: now,
		updatedAt: now,
		messages: []
	};
}
var emptySlice = {
	agents: [{
		...CORE_BOSS,
		createdAt: Date.now()
	}],
	conversations: [],
	activeAgentId: CORE_BOSS.id,
	language: "th",
	modelMode: "auto",
	lastModelId: null
};
var useBossStore = create()(persist((set, get) => ({
	...emptySlice,
	hydrated: false,
	markHydrated: () => set({ hydrated: true }),
	setLanguage: (language) => set({ language }),
	setModelMode: (modelMode) => set({ modelMode }),
	setLastModelId: (lastModelId) => set({ lastModelId }),
	setActiveAgent: (id) => set({ activeAgentId: id }),
	forgeAgent: ({ role, task, constraints }) => {
		const agent = {
			id: makeAgentId(role),
			role,
			task: task.trim(),
			constraints: (constraints ?? []).map((c) => c.trim()).filter(Boolean),
			createdAt: Date.now(),
			messageCount: 0,
			pinned: false
		};
		set((state) => ({
			agents: [...state.agents, agent],
			activeAgentId: agent.id
		}));
		get().ensureConversation(agent.id);
		return agent.id;
	},
	retireAgent: (id) => {
		const target = get().agents.find((a) => a.id === id);
		if (!target || target.pinned) return false;
		set((state) => {
			const agents = state.agents.filter((a) => a.id !== id);
			return {
				agents,
				conversations: state.conversations.filter((c) => c.agentId !== id),
				activeAgentId: state.activeAgentId === id ? agents[0]?.id ?? CORE_BOSS.id : state.activeAgentId
			};
		});
		return true;
	},
	bumpMessageCount: (agentId) => set((state) => ({ agents: state.agents.map((a) => a.id === agentId ? {
		...a,
		messageCount: a.messageCount + 1
	} : a) })),
	ensureConversation: (agentId) => {
		const existing = get().conversations.find((c) => c.agentId === agentId);
		if (existing) return existing.id;
		const convo = blankConversation(agentId);
		set((state) => ({ conversations: [convo, ...state.conversations] }));
		return convo.id;
	},
	clearConversation: (agentId) => set((state) => ({ conversations: [blankConversation(agentId), ...state.conversations.filter((c) => c.agentId !== agentId)] })),
	appendMessage: (conversationId, message) => set((state) => ({ conversations: state.conversations.map((c) => c.id === conversationId ? {
		...c,
		updatedAt: Date.now(),
		title: c.messages.length === 0 && message.role === "user" ? message.content.slice(0, 48) || c.title : c.title,
		messages: [...c.messages, message]
	} : c) })),
	patchMessage: (conversationId, messageId, patch) => set((state) => ({ conversations: state.conversations.map((c) => c.id === conversationId ? {
		...c,
		updatedAt: Date.now(),
		messages: c.messages.map((m) => m.id === messageId ? {
			...m,
			...patch
		} : m)
	} : c) })),
	replaceWorkspace: (slice) => set({
		...slice,
		agents: withCore(slice.agents ?? []),
		activeAgentId: slice.activeAgentId || CORE_BOSS.id
	})
}), {
	name: "bossg-workspace",
	partialize: (state) => ({
		agents: withCore(state.agents).slice(0, 40),
		conversations: state.conversations.slice(0, 40).map((c) => ({
			...c,
			messages: c.messages.slice(-60)
		})),
		activeAgentId: state.activeAgentId,
		language: state.language,
		modelMode: state.modelMode,
		lastModelId: state.lastModelId
	}),
	onRehydrateStorage: () => (state) => {
		if (state) {
			state.agents = withCore(state.agents ?? []);
			if (!state.agents.some((a) => a.id === state.activeAgentId)) state.activeAgentId = CORE_BOSS.id;
		}
		state?.markHydrated();
	}
}));
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-[color,background-color,opacity,transform,box-shadow] duration-[var(--motion-quick)] ease-[var(--ease-out)] disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-ring/70 active:enabled:scale-[0.96]", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground hover:bg-primary/90",
			secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border",
			ghost: "hover:bg-secondary text-foreground",
			outline: "border border-border bg-transparent hover:bg-secondary",
			destructive: "bg-destructive/15 text-destructive hover:bg-destructive/25"
		},
		size: {
			default: "h-10 px-4 rounded-[var(--radius-md)]",
			sm: "h-8 px-3 text-xs rounded-[var(--radius-sm)]",
			lg: "h-12 px-5 rounded-[var(--radius-lg)]",
			icon: "size-10 rounded-[var(--radius-md)]",
			pill: "h-9 px-4 rounded-full"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
function AgentList({ onSelect }) {
	const language = useBossStore((s) => s.language);
	const agents = useBossStore((s) => s.agents);
	const activeAgentId = useBossStore((s) => s.activeAgentId);
	const setActiveAgent = useBossStore((s) => s.setActiveAgent);
	const retireAgent = useBossStore((s) => s.retireAgent);
	const t = COPY[language];
	const specialists = agents.filter((a) => !a.pinned);
	const core = agents.filter((a) => a.pinned);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "border-b border-border px-5 py-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs uppercase tracking-[0.18em] text-subtle",
				children: t.registry
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
				className: "mt-1 font-display text-xl tracking-tight",
				children: [
					language === "th" ? "เอเจนต์ที่ทำงานอยู่" : "Live agents",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ml-2 font-sans text-sm text-muted-foreground",
						children: agents.length
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "boss-scroll flex-1 space-y-2 overflow-y-auto px-3 py-3",
			children: [[...core, ...specialists].map((agent) => {
				const Icon = ROLE_META[agent.role].icon;
				const selected = agent.id === activeAgentId;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn("rounded-[var(--radius-lg)] border p-3 transition-[background-color,border-color] duration-[var(--motion-quick)]", selected ? "border-border-strong bg-secondary" : "border-transparent hover:bg-secondary/50"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex w-full items-start gap-3 text-left",
						onClick: () => {
							setActiveAgent(agent.id);
							onSelect?.();
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-[12px] border border-border bg-background",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm font-medium",
										children: roleLabel(agent.role, language)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[11px] tabular-nums text-subtle",
										children: [
											agent.messageCount,
											" ",
											t.msgs
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted-foreground",
									children: agent.task
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mt-1 block text-[11px] text-subtle",
									children: relativeTime(agent.createdAt, language)
								})
							]
						})]
					}), selected && !agent.pinned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "destructive",
						size: "sm",
						className: "mt-2 h-9 w-full",
						onClick: () => retireAgent(agent.id),
						children: t.retire
					}) : null]
				}, agent.id);
			}), specialists.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "px-2 py-8 text-center text-sm text-subtle",
				children: t.emptyAgents
			}) : null]
		})]
	});
}
function inline(text, keyBase) {
	return text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g).map((part, i) => {
		const key = `${keyBase}-${i}`;
		if (part.startsWith("**") && part.endsWith("**")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
			className: "font-medium text-foreground",
			children: part.slice(2, -2)
		}, key);
		if (part.startsWith("`") && part.endsWith("`")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
			className: "rounded-[var(--radius-xs)] bg-secondary px-1 py-px font-mono text-xs",
			children: part.slice(1, -1)
		}, key);
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: part }, key);
	});
}
function Markdown({ text, className }) {
	const chunks = text.split(/```([\s\S]*?)```/g);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("space-y-3 text-sm leading-relaxed text-foreground", className),
		children: chunks.map((chunk, ci) => {
			if (ci % 2 === 1) {
				const nl = chunk.indexOf("\n");
				const lang = nl === -1 ? "" : chunk.slice(0, nl).trim();
				const code = nl === -1 ? chunk : chunk.slice(nl + 1);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pre", {
					className: "overflow-x-auto rounded-[var(--radius-md)] border border-border bg-secondary px-3 py-2.5 font-mono text-xs text-foreground",
					children: [lang ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mb-2 block text-[10px] uppercase tracking-wider text-subtle",
						children: lang
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: code.replace(/\n$/, "") })]
				}, ci);
			}
			return chunk.split(/\n{2,}/).map((block, bi) => {
				if (!block.trim()) return null;
				const lines = block.split("\n");
				if (/^#{1,3}\s/.test(lines[0] ?? "")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-base tracking-tight text-foreground",
					children: inline(lines[0].replace(/^#{1,3}\s+/, ""), `${ci}-${bi}`)
				}, `${ci}-${bi}`);
				if (lines.filter((l) => l.trim()).every((l) => /^[-*]\s+/.test(l) || /^\d+\.\s+/.test(l))) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-1.5 pl-4",
					children: lines.filter((l) => l.trim()).map((l, li) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "list-disc text-muted-foreground",
						children: inline(l.replace(/^([-*]|\d+\.)\s+/, ""), `${ci}-${bi}-${li}`)
					}, li))
				}, `${ci}-${bi}`);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-pretty text-muted-foreground",
					children: lines.map((line, li) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [li > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}) : null, inline(line, `${ci}-${bi}-${li}`)] }, li))
				}, `${ci}-${bi}`);
			});
		})
	});
}
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	ref,
	className: cn("flex min-h-20 w-full resize-none bg-transparent px-1 py-1 text-base text-foreground placeholder:text-subtle outline-none disabled:opacity-50 md:text-sm", className),
	...props
}));
Textarea.displayName = "Textarea";
/** Fast / lite models Puter can serve without a developer API key. */
var FREE_MODELS = [
	{
		id: "gemini-3.8-flash",
		label: "Gemini 3.8 Flash",
		vendor: "Google"
	},
	{
		id: "gemini-3.5-flash-lite",
		label: "Gemini 3.5 Lite",
		vendor: "Google"
	},
	{
		id: "gpt-5-nano",
		label: "GPT-5 Nano",
		vendor: "OpenAI"
	},
	{
		id: "gpt-5.4-nano",
		label: "GPT-5.4 Nano",
		vendor: "OpenAI"
	},
	{
		id: "qwen/qwen3.8-flash",
		label: "Qwen 3.8 Flash",
		vendor: "Alibaba"
	},
	{
		id: "deepseek/deepseek-v4.1-flash",
		label: "DeepSeek V4.1 Flash",
		vendor: "DeepSeek"
	}
];
/** Extra flagship ids the user can pin. All still routed through Puter. */
var PIN_MODELS = [
	{
		id: "claude-haiku-4-5",
		label: "Claude Haiku 4.5",
		vendor: "Anthropic"
	},
	{
		id: "claude-sonnet-4-6",
		label: "Claude Sonnet 4.6",
		vendor: "Anthropic"
	},
	{
		id: "gemini-3.5-flash",
		label: "Gemini 3.5 Flash",
		vendor: "Google"
	},
	{
		id: "moonshotai/kimi-k3",
		label: "Kimi K3",
		vendor: "Moonshot"
	},
	{
		id: "minimax/minimax-m3",
		label: "MiniMax M3",
		vendor: "MiniMax"
	}
];
function allKnownModels() {
	const seen = /* @__PURE__ */ new Set();
	const out = [];
	for (const m of [...FREE_MODELS, ...PIN_MODELS]) {
		if (seen.has(m.id)) continue;
		seen.add(m.id);
		out.push(m);
	}
	return out;
}
function modelById(id) {
	if (!id) return void 0;
	return allKnownModels().find((m) => m.id === id);
}
function shortModelLabel(id) {
	return modelById(id)?.label ?? "Auto";
}
function prettyModelId(id) {
	const known = modelById(id);
	if (known) return known;
	const parts = id.split("/");
	const leaf = parts[parts.length - 1] ?? id;
	const vendor = parts.length > 1 ? parts[0] : "Puter";
	return {
		id,
		label: leaf.replace(/[-_]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
		vendor
	};
}
function parsePuterModels(raw) {
	if (!Array.isArray(raw)) return [];
	const out = [];
	const seen = /* @__PURE__ */ new Set();
	for (const item of raw) {
		if (typeof item === "string" && item.trim()) {
			const m = prettyModelId(item.trim());
			if (seen.has(m.id)) continue;
			seen.add(m.id);
			out.push(m);
			continue;
		}
		if (item && typeof item === "object") {
			const rec = item;
			const id = String(rec.id ?? rec.model ?? rec.name ?? "").trim();
			if (!id || seen.has(id)) continue;
			seen.add(id);
			const vendor = String(rec.vendor ?? rec.provider ?? rec.owned_by ?? "Puter");
			const label = String(rec.label ?? rec.display_name ?? prettyModelId(id).label);
			out.push({
				id,
				label,
				vendor
			});
		}
	}
	return out;
}
var PUTER_SRC = "https://js.puter.com/v2/";
var AUTH_TIMEOUT_MS = 12e3;
var loadPromise = null;
function waitForAuth(timeoutMs = AUTH_TIMEOUT_MS) {
	return new Promise((resolve, reject) => {
		const start = Date.now();
		const tick = () => {
			if (window.puter?.auth) {
				resolve(window.puter);
				return;
			}
			if (Date.now() - start > timeoutMs) {
				reject(/* @__PURE__ */ new Error("Puter loaded but authentication is not ready."));
				return;
			}
			window.setTimeout(tick, 40);
		};
		tick();
	});
}
function loadPuter() {
	if (typeof window === "undefined") return Promise.reject(/* @__PURE__ */ new Error("Puter is only available in the browser."));
	if (window.puter?.auth) return Promise.resolve(window.puter);
	if (loadPromise) return loadPromise;
	loadPromise = new Promise((resolve, reject) => {
		const existing = document.querySelector(`script[data-puter-sdk="v2"]`);
		const ready = () => {
			waitForAuth().then(resolve).catch((err) => {
				loadPromise = null;
				reject(err);
			});
		};
		if (existing) {
			ready();
			return;
		}
		const script = document.createElement("script");
		script.src = PUTER_SRC;
		script.async = true;
		script.dataset.puterSdk = "v2";
		script.onload = ready;
		script.onerror = () => {
			loadPromise = null;
			reject(/* @__PURE__ */ new Error("Could not reach Puter. Check your connection, then try again."));
		};
		document.head.appendChild(script);
	});
	return loadPromise;
}
function getPuter() {
	return typeof window === "undefined" ? null : window.puter ?? null;
}
async function getPuterKv(puter, timeoutMs = 4e3) {
	if (puter.kv) return puter.kv;
	const start = Date.now();
	return new Promise((resolve, reject) => {
		const tick = () => {
			if (window.puter?.kv) {
				resolve(window.puter.kv);
				return;
			}
			if (Date.now() - start > timeoutMs) {
				reject(/* @__PURE__ */ new Error("Puter storage is not available yet."));
				return;
			}
			window.setTimeout(tick, 40);
		};
		tick();
	});
}
function puterErrorMessage(err) {
	const raw = (() => {
		if (err && typeof err === "object") {
			const record = err;
			if (typeof record.msg === "string" && record.msg.trim()) return record.msg;
			if (typeof record.message === "string" && record.message.trim()) return record.message;
			if (typeof record.error === "string" && record.error.trim()) return record.error;
		}
		if (err instanceof Error && err.message.trim()) return err.message;
		return "";
	})();
	const lower = raw.toLowerCase();
	if (lower.includes("usage-limited") || lower.includes("usage limit")) return "Puter free-model quota is exhausted for this session. Sign in with Puter to run real models.";
	if (lower.includes("not signed") || lower.includes("auth")) return "Sign in with Puter to use models. Allow popups, then retry.";
	return raw || "Sign-in was cancelled or blocked. Allow popups for this site, then try again.";
}
var CACHE_KEY = "bossg:last-puter-model";
function getCachedModelId() {
	try {
		return localStorage.getItem(CACHE_KEY);
	} catch {
		return null;
	}
}
function setCachedModelId(id) {
	try {
		localStorage.setItem(CACHE_KEY, id);
	} catch {}
}
function orderedModels(preferred) {
	const list = [...FREE_MODELS];
	if (!preferred) return list;
	const known = modelById(preferred) ?? prettyModelId(preferred);
	const i = list.findIndex((m) => m.id === preferred);
	if (i === 0) return list;
	if (i > 0) {
		const [hit] = list.splice(i, 1);
		return [hit, ...list];
	}
	return [known, ...list];
}
function blockText(block) {
	if (typeof block === "string") return block;
	if (!block || typeof block !== "object") return "";
	const rec = block;
	if (typeof rec.text === "string") return rec.text;
	if (typeof rec.content === "string") return rec.content;
	return "";
}
function extractChatText(value) {
	if (typeof value === "string") return value;
	if (!value || typeof value !== "object") return "";
	const rec = value;
	if (typeof rec.text === "string" && rec.text) return rec.text;
	if (typeof rec.content === "string" && rec.content) return rec.content;
	if (Array.isArray(rec.content)) return rec.content.map(blockText).join("");
	const message = rec.message;
	if (typeof message === "string") return message;
	if (message && typeof message === "object") {
		const m = message;
		if (typeof m.content === "string") return m.content;
		if (Array.isArray(m.content)) return m.content.map(blockText).join("");
	}
	return "";
}
function isAsyncIterable(value) {
	return Boolean(value && typeof value === "object" && Symbol.asyncIterator in value);
}
async function consume(result, onDelta) {
	if (isAsyncIterable(result)) {
		let acc = "";
		for await (const part of result) {
			let piece = "";
			if (part && typeof part === "object") {
				const rec = part;
				if (rec.type === "text" && typeof rec.text === "string") piece = rec.text;
				else if (rec.type === "error") throw new Error(extractChatText(part) || "Model stream error");
				else piece = extractChatText(part);
			} else if (typeof part === "string") piece = part;
			if (piece) {
				acc += piece;
				onDelta(acc);
			}
		}
		return acc;
	}
	const text = extractChatText(result);
	onDelta(text);
	return text;
}
async function once(messages, model, testMode, stream, onDelta) {
	const puter = getPuter() ?? await loadPuter();
	if (!puter.ai?.chat) throw new Error("Puter AI is not available yet.");
	return (await consume(await puter.ai.chat(messages, {
		model,
		stream,
		temperature: .45,
		normalize: true,
		testMode
	}), onDelta)).trim();
}
async function chatWithPuter(opts) {
	await loadPuter();
	const models = orderedModels(opts.pinnedModel && opts.pinnedModel !== "auto" ? opts.pinnedModel : getCachedModelId());
	let lastError;
	const modes = opts.preferTestMode ? [true, false] : [false, true];
	for (const testMode of modes) for (const model of models) try {
		let text = "";
		try {
			text = await once(opts.messages, model.id, testMode, true, opts.onDelta);
		} catch {
			text = await once(opts.messages, model.id, testMode, false, opts.onDelta);
		}
		if (!text) throw new Error("empty");
		setCachedModelId(model.id);
		return {
			text,
			model: modelById(model.id) ?? model,
			testMode
		};
	} catch (err) {
		lastError = err;
	}
	throw new Error(puterErrorMessage(lastError) || "No model responded. Sign in with Puter and try again.");
}
async function listPuterModels() {
	try {
		const puter = getPuter() ?? await loadPuter();
		if (!puter.ai?.listModels) return [];
		return parsePuterModels(await puter.ai.listModels());
	} catch {
		return [];
	}
}
var KV_KEY = "bossg:workspace:v1";
function clipText(text, max = 6e3) {
	if (text.length <= max) return text;
	return `${text.slice(0, max)}\n\n[truncated]`;
}
function snapshotWorkspace() {
	const state = useBossStore.getState();
	return {
		agents: state.agents.slice(0, 40),
		conversations: state.conversations.slice(0, 24).map((convo) => ({
			...convo,
			messages: convo.messages.slice(-40).map((message) => ({
				id: message.id,
				role: message.role,
				content: clipText(message.content),
				createdAt: message.createdAt,
				model: message.model
			}))
		})),
		activeAgentId: state.activeAgentId,
		language: state.language,
		modelMode: state.modelMode,
		lastModelId: state.lastModelId
	};
}
function isSnapshot(value) {
	if (!value || typeof value !== "object") return false;
	const record = value;
	return Array.isArray(record.agents) && Array.isArray(record.conversations);
}
function sanitize(convo) {
	return {
		...convo,
		agentId: convo.agentId || CORE_BOSS.id,
		messages: convo.messages.map((m) => ({
			id: m.id,
			role: m.role,
			content: m.content,
			createdAt: m.createdAt,
			model: m.model
		}))
	};
}
async function pullWorkspace(puter) {
	const raw = await (await getPuterKv(puter)).get(KV_KEY);
	if (typeof raw === "string") try {
		const parsed = JSON.parse(raw);
		return isSnapshot(parsed) ? parsed : null;
	} catch {
		return null;
	}
	return isSnapshot(raw) ? raw : null;
}
async function pushWorkspace(puter, snap = snapshotWorkspace()) {
	await (await getPuterKv(puter)).set(KV_KEY, snap);
}
function applyWorkspace(snap) {
	useBossStore.getState().replaceWorkspace({
		agents: snap.agents,
		conversations: snap.conversations.map(sanitize),
		activeAgentId: snap.activeAgentId || CORE_BOSS.id,
		language: snap.language === "en" ? "en" : "th",
		modelMode: snap.modelMode || "auto",
		lastModelId: snap.lastModelId ?? null
	});
}
var GUEST_KEY = "bossg-guest";
var PuterAuthContext = (0, import_react.createContext)(null);
function readGuest() {
	try {
		return sessionStorage.getItem(GUEST_KEY) === "1";
	} catch {
		return false;
	}
}
function writeGuest(on) {
	try {
		if (on) sessionStorage.setItem(GUEST_KEY, "1");
		else sessionStorage.removeItem(GUEST_KEY);
	} catch {}
}
function PuterAuthProvider({ children }) {
	const [status, setStatus] = (0, import_react.useState)("loading");
	const [user, setUser] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [pending, setPending] = (0, import_react.useState)(false);
	const [syncStatus, setSyncStatus] = (0, import_react.useState)("idle");
	const sdkRef = (0, import_react.useRef)(null);
	const hydrated = useBossStore((s) => s.hydrated);
	const hydrate = (0, import_react.useCallback)(async () => {
		setError(null);
		try {
			const puter = await loadPuter();
			sdkRef.current = puter;
			if (puter.auth.isSignedIn()) {
				const next = await puter.auth.getUser();
				setUser(next);
				setStatus("signed_in");
				writeGuest(false);
				return;
			}
			setUser(null);
			setStatus(readGuest() ? "guest" : "signed_out");
		} catch (err) {
			sdkRef.current = getPuter();
			setUser(null);
			setStatus(readGuest() ? "guest" : "unavailable");
			setError(puterErrorMessage(err));
		}
	}, []);
	(0, import_react.useEffect)(() => {
		hydrate();
	}, [hydrate]);
	const signIn = (0, import_react.useCallback)(async () => {
		const puter = sdkRef.current ?? getPuter();
		if (!puter?.auth) {
			setError("Puter is still connecting. Wait a moment, then try again.");
			return;
		}
		setError(null);
		setPending(true);
		try {
			await puter.auth.signIn();
			const next = await puter.auth.getUser();
			writeGuest(false);
			setUser(next);
			setStatus("signed_in");
		} catch (err) {
			setError(puterErrorMessage(err));
		} finally {
			setPending(false);
		}
	}, []);
	const signOut = (0, import_react.useCallback)(async () => {
		try {
			await (sdkRef.current ?? getPuter())?.auth.signOut();
		} catch {}
		writeGuest(false);
		setUser(null);
		setStatus("signed_out");
		setError(null);
		setSyncStatus("idle");
	}, []);
	const continueAsGuest = (0, import_react.useCallback)(() => {
		writeGuest(true);
		setUser(null);
		setStatus("guest");
		setError(null);
		setSyncStatus("idle");
	}, []);
	(0, import_react.useEffect)(() => {
		if (status !== "signed_in" || !hydrated) return;
		const puter = sdkRef.current ?? getPuter();
		if (!puter?.auth) return;
		let cancelled = false;
		let timer = null;
		let unsub;
		let readyToPush = false;
		const persist = () => {
			if (!readyToPush || cancelled) return;
			if (timer) window.clearTimeout(timer);
			timer = window.setTimeout(() => {
				setSyncStatus("syncing");
				pushWorkspace(puter).then(() => {
					if (!cancelled) setSyncStatus("synced");
				}).catch(() => {
					if (!cancelled) setSyncStatus("error");
				});
			}, 700);
		};
		setSyncStatus("syncing");
		(async () => {
			try {
				const cloud = await pullWorkspace(puter);
				if (cancelled) return;
				if (cloud && (cloud.agents.length > 0 || cloud.conversations.length > 0)) applyWorkspace(cloud);
				else await pushWorkspace(puter, snapshotWorkspace());
				if (!cancelled) setSyncStatus("synced");
			} catch {
				if (!cancelled) setSyncStatus("error");
			} finally {
				readyToPush = true;
			}
		})();
		unsub = useBossStore.subscribe(persist);
		return () => {
			cancelled = true;
			unsub?.();
			if (timer) window.clearTimeout(timer);
		};
	}, [status, hydrated]);
	const value = (0, import_react.useMemo)(() => ({
		status,
		user,
		error,
		pending,
		syncStatus,
		signIn,
		signOut,
		continueAsGuest,
		retry: hydrate
	}), [
		status,
		user,
		error,
		pending,
		syncStatus,
		signIn,
		signOut,
		continueAsGuest,
		hydrate
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PuterAuthContext.Provider, {
		value,
		children
	});
}
function usePuterAuth() {
	const ctx = (0, import_react.useContext)(PuterAuthContext);
	if (!ctx) throw new Error("usePuterAuth must be used within PuterAuthProvider");
	return ctx;
}
function ChatPanel() {
	const { status, signIn, pending: authPending } = usePuterAuth();
	const signedIn = status === "signed_in";
	const language = useBossStore((s) => s.language);
	const t = COPY[language];
	const agents = useBossStore((s) => s.agents);
	const activeAgentId = useBossStore((s) => s.activeAgentId);
	const conversations = useBossStore((s) => s.conversations);
	const ensureConversation = useBossStore((s) => s.ensureConversation);
	const clearConversation = useBossStore((s) => s.clearConversation);
	const appendMessage = useBossStore((s) => s.appendMessage);
	const patchMessage = useBossStore((s) => s.patchMessage);
	const bumpMessageCount = useBossStore((s) => s.bumpMessageCount);
	const modelMode = useBossStore((s) => s.modelMode);
	const setModelMode = useBossStore((s) => s.setModelMode);
	const lastModelId = useBossStore((s) => s.lastModelId);
	const setLastModelId = useBossStore((s) => s.setLastModelId);
	const hydrated = useBossStore((s) => s.hydrated);
	const agent = agents.find((a) => a.id === activeAgentId) ?? agents[0];
	const convo = conversations.find((c) => c.agentId === agent?.id);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [remoteModels, setRemoteModels] = (0, import_react.useState)([]);
	const scroller = (0, import_react.useRef)(null);
	const catalog = (0, import_react.useMemo)(() => {
		const seenId = /* @__PURE__ */ new Set();
		const seenLabel = /* @__PURE__ */ new Set();
		const merged = [];
		for (const m of [...allKnownModels(), ...remoteModels]) {
			if (seenId.has(m.id) || seenLabel.has(m.label)) continue;
			seenId.add(m.id);
			seenLabel.add(m.label);
			merged.push(m);
		}
		return merged.slice(0, 80);
	}, [remoteModels]);
	(0, import_react.useEffect)(() => {
		if (hydrated && agent) ensureConversation(agent.id);
	}, [
		hydrated,
		agent?.id,
		ensureConversation
	]);
	(0, import_react.useEffect)(() => {
		const el = scroller.current;
		if (!el) return;
		el.scrollTo({
			top: el.scrollHeight,
			behavior: "smooth"
		});
	}, [
		convo?.messages.length,
		busy,
		agent?.id
	]);
	(0, import_react.useEffect)(() => {
		if (!signedIn) return;
		let cancelled = false;
		listPuterModels().then((models) => {
			if (cancelled || models.length === 0) return;
			setRemoteModels(models);
		});
		return () => {
			cancelled = true;
		};
	}, [signedIn]);
	const send = async (text) => {
		const trimmed = text.trim();
		if (!trimmed || busy || !agent) return;
		const id = ensureConversation(agent.id);
		appendMessage(id, {
			id: uid("msg"),
			role: "user",
			content: trimmed,
			createdAt: Date.now()
		});
		bumpMessageCount(agent.id);
		setDraft("");
		setBusy(true);
		const assistantId = uid("msg");
		appendMessage(id, {
			id: assistantId,
			role: "assistant",
			content: "",
			createdAt: Date.now()
		});
		try {
			const history = (useBossStore.getState().conversations.find((c) => c.id === id)?.messages ?? []).filter((m) => m.content.length > 0).slice(-16).map((m) => ({
				role: m.role,
				content: m.content
			}));
			const result = await chatWithPuter({
				messages: [{
					role: "system",
					content: generateSystemPrompt(agent, language)
				}, ...history],
				pinnedModel: modelMode === "auto" ? null : modelMode,
				preferTestMode: !signedIn,
				onDelta: (next) => patchMessage(id, assistantId, { content: next })
			});
			patchMessage(id, assistantId, {
				content: result.text,
				model: result.model.id
			});
			setLastModelId(result.model.id);
		} catch (err) {
			const raw = err instanceof Error ? err.message : t.noModels;
			const quota = /quota|usage-limited|usage limit/i.test(raw);
			patchMessage(id, assistantId, { content: quota ? t.quota : raw });
		} finally {
			setBusy(false);
		}
	};
	const onSubmit = (e) => {
		e.preventDefault();
		send(draft);
	};
	const onKey = (e) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			send(draft);
		}
	};
	const Icon = agent ? ROLE_META[agent.role].icon : ROLE_META.boss.icon;
	const modelHint = modelMode === "auto" ? `${t.auto} · ${shortModelLabel(lastModelId)}` : shortModelLabel(modelMode);
	const suggestions = (0, import_react.useMemo)(() => [t.suggest1, t.suggest2], [t]);
	if (!agent) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 border-b border-border px-4 py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-9 shrink-0 items-center justify-center rounded-[12px] border border-border bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: roleLabel(agent.role, language)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-xs text-subtle",
							children: agent.task
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: "model-mode",
							children: t.model
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							id: "model-mode",
							value: modelMode,
							onChange: (e) => setModelMode(e.target.value),
							className: "h-9 max-w-[42vw] rounded-full border border-border bg-secondary px-3 text-xs text-foreground outline-none sm:max-w-52",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: "auto",
								children: t.auto
							}), catalog.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: m.id,
								children: m.label
							}, m.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "size-9",
							onClick: () => clearConversation(agent.id),
							"aria-label": t.newChat,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, { className: "size-4" })
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scroller,
				className: "boss-scroll flex-1 overflow-y-auto px-4 py-5 sm:px-6",
				children: !convo || convo.messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-xl flex-col items-start gap-4 pt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-3xl tracking-tight",
							children: t.emptyTitle
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: t.emptyBody
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex w-full flex-col gap-2",
							children: suggestions.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "rounded-[var(--radius-lg)] border border-border bg-card px-4 py-3 text-left text-sm text-muted-foreground hover:bg-secondary",
								onClick: () => void send(s),
								children: s
							}, s))
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto flex max-w-2xl flex-col gap-5",
					children: convo.messages.map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: cn("flex", msg.role === "user" ? "justify-end" : "justify-start"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("max-w-[92%] rounded-[20px] px-4 py-3", msg.role === "user" ? "rounded-br-[8px] bg-primary text-primary-foreground" : "rounded-bl-[8px] border border-border bg-card"),
							children: [msg.role === "assistant" && !msg.content && busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "boss-shimmer text-sm",
								children: t.thinking
							}) : msg.role === "assistant" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { text: msg.content }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whitespace-pre-wrap text-sm leading-relaxed",
								children: msg.content
							}), msg.role === "assistant" && msg.model ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[10px] uppercase tracking-wider text-subtle",
								children: shortModelLabel(msg.model)
							}) : null]
						})
					}, msg.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "border-t border-border p-3 sm:p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-2xl items-end gap-2 rounded-[24px] border border-border bg-card px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: draft,
						onChange: (e) => setDraft(e.target.value),
						onKeyDown: onKey,
						placeholder: t.composePh,
						rows: 1,
						className: "max-h-36 min-h-11 flex-1 py-2.5"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						size: "icon",
						className: "mb-0.5 size-11 shrink-0 rounded-full",
						disabled: busy || !draft.trim(),
						"aria-label": t.send,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-4" })
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mx-auto mt-2 max-w-2xl px-1 text-[11px] text-subtle",
					children: [
						modelHint,
						!signedIn ? ` · ${t.guestBanner}` : null,
						!signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ml-2 underline decoration-border underline-offset-2",
							onClick: () => void signIn(),
							disabled: authPending,
							children: t.signInNow
						}) : null
					]
				})]
			})
		]
	});
}
function ForgePanel({ onForged }) {
	const language = useBossStore((s) => s.language);
	const forgeAgent = useBossStore((s) => s.forgeAgent);
	const t = COPY[language];
	const [role, setRole] = (0, import_react.useState)("teacher");
	const [task, setTask] = (0, import_react.useState)("");
	const [constraints, setConstraints] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const forge = () => {
		const trimmed = task.trim();
		if (trimmed.length < 10) {
			setError(t.taskTooShort);
			return;
		}
		setBusy(true);
		setError(null);
		forgeAgent({
			role,
			task: trimmed,
			constraints: constraints.split("\n").map((l) => l.trim()).filter(Boolean)
		});
		setTask("");
		setConstraints("");
		setBusy(false);
		onForged?.();
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border px-5 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.18em] text-subtle",
					children: t.forge
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-1 font-display text-xl tracking-tight",
					children: language === "th" ? "หล่อเอเจนต์" : "Forge"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "boss-scroll flex-1 space-y-4 overflow-y-auto px-5 py-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "mb-2 block text-xs font-medium text-muted-foreground",
							children: t.role
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid grid-cols-2 gap-2",
							children: FORGEABLE_ROLES.map((id) => {
								const meta = ROLE_META[id];
								const Icon = meta.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setRole(id),
									className: cn("flex min-h-11 items-center gap-2 rounded-[var(--radius-md)] border px-3 py-2 text-left text-sm transition-[background-color,border-color] duration-[var(--motion-quick)]", role === id ? "border-border-strong bg-secondary text-foreground" : "border-border bg-transparent text-muted-foreground hover:bg-secondary/60"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: language === "th" ? meta.th : meta.en
									})]
								}, id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs leading-relaxed text-subtle",
							children: language === "th" ? ROLE_META[role].hintTh : ROLE_META[role].hintEn
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-2 block text-xs font-medium text-muted-foreground",
						htmlFor: "mission",
						children: t.mission
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "mission",
						value: task,
						onChange: (e) => setTask(e.target.value),
						placeholder: t.missionPh,
						rows: 5,
						className: "w-full rounded-[var(--radius-lg)] border border-border bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-subtle outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-2 block text-xs font-medium text-muted-foreground",
						htmlFor: "rules",
						children: t.constraints
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						id: "rules",
						value: constraints,
						onChange: (e) => setConstraints(e.target.value),
						placeholder: t.constraintsPh,
						rows: 3,
						className: "w-full rounded-[var(--radius-lg)] border border-border bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-subtle outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
					})] }),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-destructive",
						children: error
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border p-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					className: "h-11 w-full rounded-[var(--radius-lg)]",
					onClick: forge,
					disabled: busy,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hammer, { className: "size-4" }), busy ? t.forging : t.forgeCta]
				})
			})
		]
	});
}
function AppMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("text-foreground", className),
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "3.2",
			y: "3.2",
			width: "25.6",
			height: "25.6",
			rx: "8",
			stroke: "currentColor",
			strokeWidth: "1.4",
			opacity: "0.4"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M10.2 22.2V9.8h6.1c3.05 0 5 1.65 5 4.15 0 1.7-1 3.05-2.7 3.65L21.8 22.2h-3.05l-2.85-4.35h-2.7v4.35H10.2Zm3.05-6.85h3c1.45 0 2.25-.7 2.25-1.8s-.8-1.75-2.25-1.75h-3v3.55Z",
			fill: "currentColor"
		})]
	});
}
function PuterMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		className: cn("text-current", className),
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: "3.25",
			y: "3.25",
			width: "17.5",
			height: "17.5",
			rx: "5",
			stroke: "currentColor",
			strokeWidth: "1.5"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8.5 16V8.6h4.15c2.2 0 3.55 1.2 3.55 3.05 0 1.9-1.4 3.15-3.6 3.15H10.7",
			stroke: "currentColor",
			strokeWidth: "1.55",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
}
var Sheet = Dialog;
var SheetTitle = DialogTitle;
var SheetContent = import_react.forwardRef(({ className, children, side = "left", ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-background/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
	ref,
	className: cn("fixed z-50 flex h-full w-[min(92vw,400px)] flex-col border-border bg-card shadow-[var(--shadow-soft)] data-[state=open]:animate-in data-[state=closed]:animate-out", side === "left" ? "inset-y-0 left-0 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left" : "inset-y-0 right-0 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
		className: "absolute right-3 top-3 rounded-[var(--radius-sm)] p-2 text-muted-foreground hover:bg-secondary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
SheetContent.displayName = "SheetContent";
function CommandCenter() {
	const language = useBossStore((s) => s.language);
	const setLanguage = useBossStore((s) => s.setLanguage);
	const t = COPY[language];
	const { status, user, signIn, signOut, pending, syncStatus } = usePuterAuth();
	const signedIn = status === "signed_in";
	const [agentsOpen, setAgentsOpen] = (0, import_react.useState)(false);
	const [forgeOpen, setForgeOpen] = (0, import_react.useState)(false);
	const syncLabel = syncStatus === "synced" ? t.synced : syncStatus === "syncing" ? t.syncing : syncStatus === "error" ? t.syncError : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-[100dvh] flex-col overflow-hidden bg-background",
		children: [
			!signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3 border-b border-border bg-card px-4 py-2 text-xs text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "min-w-0 truncate",
					children: t.guestBanner
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					className: "h-8 shrink-0 rounded-full px-3",
					onClick: () => void signIn(),
					disabled: pending,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PuterMark, { className: "size-3.5" }), pending ? t.waitingPuter : t.signInNow]
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-3 border-b border-border px-3 py-2.5 sm:px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppMark, { className: "size-8 shrink-0 text-brand" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg leading-none tracking-tight",
							children: APP_SHORT_NAME
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-[11px] text-subtle",
							children: [signedIn ? user?.username ?? "Puter" : t.guest, syncLabel ? ` · ${syncLabel}` : null]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex rounded-full border border-border p-0.5 text-[11px]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: cn("h-7 rounded-full px-2.5", language === "th" ? "bg-secondary" : "text-muted-foreground"),
									onClick: () => setLanguage("th"),
									children: "TH"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: cn("h-7 rounded-full px-2.5", language === "en" ? "bg-secondary" : "text-muted-foreground"),
									onClick: () => setLanguage("en"),
									children: "EN"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "size-10 lg:hidden",
								onClick: () => setAgentsOpen(true),
								"aria-label": t.registry,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "size-10 xl:hidden",
								onClick: () => setForgeOpen(true),
								"aria-label": t.forge,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hammer, { className: "size-4" })
							}),
							signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "size-10",
								onClick: () => void signOut(),
								"aria-label": t.signOut,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
							}) : null
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-h-0 flex-1 grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[280px_minmax(0,1fr)_320px]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "hidden min-h-0 border-r border-border lg:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentList, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "flex min-h-0 flex-col",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-h-0 flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatPanel, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
						className: "hidden min-h-0 border-l border-border xl:block",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgePanel, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: agentsOpen,
				onOpenChange: setAgentsOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "left",
					className: "pt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
						className: "sr-only",
						children: t.registry
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentList, { onSelect: () => setAgentsOpen(false) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: forgeOpen,
				onOpenChange: setForgeOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "right",
					className: "pt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
						className: "sr-only",
						children: t.forge
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgePanel, { onForged: () => setForgeOpen(false) })]
				})
			})
		]
	});
}
function PuterGate({ children }) {
	const { status } = usePuterAuth();
	if (status === "signed_in" || status === "guest") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PuterLoginScreen, {});
}
function PuterLoginScreen() {
	const { status, error, pending, signIn, continueAsGuest, retry } = usePuterAuth();
	const language = useBossStore((s) => s.language);
	const setLanguage = useBossStore((s) => s.setLanguage);
	const t = COPY[language];
	const loading = status === "loading";
	const unavailable = status === "unavailable";
	const benefits = [
		{
			icon: Cloud,
			title: t.benefit1t,
			sub: t.benefit1s
		},
		{
			icon: Layers,
			title: t.benefit2t,
			sub: t.benefit2s
		},
		{
			icon: Shield,
			title: t.benefit3t,
			sub: t.benefit3s
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-background px-5 py-10",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": "true",
			className: "pointer-events-none absolute inset-0 puter-login-glow"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex justify-end",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex rounded-full border border-border bg-card p-0.5 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("h-8 rounded-full px-3", language === "th" ? "bg-secondary text-foreground" : "text-muted-foreground"),
						onClick: () => setLanguage("th"),
						children: "TH"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("h-8 rounded-full px-3", language === "en" ? "bg-secondary text-foreground" : "text-muted-foreground"),
						onClick: () => setLanguage("en"),
						children: "EN"
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "boss-stagger rounded-[32px] border border-border bg-card px-6 py-8 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppMark, { className: "size-16 text-brand" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-5 font-display text-4xl tracking-[-0.04em] sm:text-5xl",
								children: APP_SHORT_NAME
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm uppercase tracking-[0.22em] text-subtle",
								children: APP_EDITION
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground",
								children: t.loginLead
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-7 space-y-2.5",
						children: benefits.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 text-left text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 shrink-0 items-center justify-center rounded-[12px] border border-border bg-secondary",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-4 text-foreground" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-foreground",
								children: item.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-xs text-subtle",
								children: item.sub
							})] })]
						}, item.title))
					}),
					loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-12 items-center justify-center rounded-full bg-secondary text-sm text-muted-foreground",
							children: t.connecting
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "lg",
							variant: "ghost",
							className: "h-12 w-full rounded-full text-sm",
							onClick: continueAsGuest,
							children: t.continueGuest
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "lg",
								className: "h-12 w-full rounded-full text-sm",
								onClick: () => void signIn(),
								disabled: unavailable || pending,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PuterMark, { className: "size-4" }), pending ? t.waitingPuter : t.continuePuter]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								variant: "ghost",
								className: "h-12 w-full rounded-full text-sm",
								onClick: continueAsGuest,
								disabled: pending,
								children: t.continueGuest
							}),
							unavailable ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "lg",
								variant: "outline",
								className: "h-12 w-full rounded-full text-sm",
								onClick: () => void retry(),
								children: t.retryPuter
							}) : null
						]
					}),
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: cn("mt-5 text-center text-xs leading-relaxed", unavailable ? "text-destructive" : "text-muted-foreground"),
						children: error
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-center text-xs leading-relaxed text-subtle",
						children: t.popupHint
					})
				]
			})]
		})]
	});
}
var TooltipProvider = Provider;
var TooltipContent = import_react.forwardRef(({ className, sideOffset = 6, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 overflow-hidden rounded-[var(--radius-sm)] border border-border bg-card px-2.5 py-1.5 text-xs text-foreground shadow-md", className),
	...props
}) }));
TooltipContent.displayName = "TooltipContent";
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PuterAuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TooltipProvider, {
		delayDuration: 200,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PuterGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandCenter, {}) })
	}) });
}
//#endregion
export { Home as component };
