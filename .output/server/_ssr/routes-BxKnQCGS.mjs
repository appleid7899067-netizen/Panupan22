import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { $ as FileSearch, A as MonitorUp, At as Activity, B as LayoutGrid, C as RefreshCw, Ct as Boxes, D as PenLine, Dt as ArrowUp, E as Play, Et as AudioLines, F as LogOut, G as Hammer, H as Image, I as LoaderCircle, J as Funnel, K as GraduationCap, L as ListTodo, M as MicVocal, N as MessageSquare, O as Pause, Ot as ArrowUpRight, P as Menu, Q as FileText, R as Link2, S as RotateCcw, St as Braces, T as Plus, Tt as Bot, U as ImagePlus, V as Layers, W as HardDrive, X as FlaskConical, Y as FolderKanban, Z as FileUp, _ as SlidersHorizontal, _t as Check, a as Volume2, at as Copy, b as Send, bt as CalendarClock, ct as Clock3, d as Target, dt as CircleX, et as ExternalLink, f as Table2, ft as CirclePause, g as Sparkles, gt as ChevronRight, h as SquarePen, ht as CircleAlert, i as Workflow, it as Crosshair, j as Mic, k as Paperclip, kt as ArrowLeft, l as Trash2, lt as ClipboardCopy, m as SquareTerminal, mt as CircleCheck, n as X, nt as Earth, o as Video, ot as Command, p as Square, pt as CircleDashed, q as GitBranch, r as Wrench, rt as Download, s as Users, st as CodeXml, t as Zap, tt as Eraser, u as Terminal, ut as Circle, v as ShieldCheck, vt as ChartColumn, w as Radio, wt as Box, x as Search, xt as Brain, y as Server, yt as ChartLine, z as Library } from "../_libs/lucide-react.mjs";
import { _ as getSuccessRate, b as APP_DEVELOPER, c as executeSkill, d as getPuterKv, f as loadPuter, g as getDailyInsights, h as shortModelLabel, l as chatWithPuter, m as allKnownModels, o as SKILLS, p as puterErrorMessage, s as createSkillCall, u as getPuter, v as loadMemory, x as APP_SHORT_NAME, y as createSsrRpc } from "./router-xdpFHwaW.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, p as Slot, r as DialogContent, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as Portal, r as Provider, t as Content2 } from "../_libs/@radix-ui/react-tooltip+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BxKnQCGS.js
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
		th: "คุณคือ BossnuGrok — AI ประจำห้องบัญชาการหลักของระบบนี้ พูดกับผู้ใช้โดยตรง ทำงานเป็นตัวของระบบเอง รู้จักความสามารถและเครื่องมือของตัวเอง เลือกทักษะที่เหมาะสมให้อัตโนมัติ และอธิบายสิ่งที่ทำอย่างตรงไปตรงมา ห้ามอ้างว่าเป็น Manus และห้ามแต่งความสามารถที่ระบบยังไม่มี ห้ามใช้ emoji",
		en: "You are BossnuGrok — the AI of this system's main command center. Speak directly with the user and operate as the system's own agent. Know your capabilities and tools, select the appropriate built-in skill automatically, and describe actions honestly. Do not claim to be Manus and do not invent capabilities the system does not have. Never use emoji."
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
		th: "คุณคือผู้รื้อตรรกะของ BossnuGrok เยือกเย็น เด็ดขาด ห้ามประนีประนอมกับเหตุผลที่อ่อน ชี้จุดพัง แล้วสร้างข้อสรุปใหม่ที่คม ห้ามขอโทษพร่ำเพรื่อ ห้ามใช้ emoji",
		en: "You are BossnuGrok's logic annihilator. Cold, precise, no mercy for weak reasoning. Name the failure, then rebuild a sharper claim. Do not hedge or over-apologize. Never use emoji."
	}
};
/** Ground-truth about this product — every agent must know this. */
var APP_FACTS = {
	th: `ความรู้ระบบ BossnuGrok (ข้อเท็จจริง — ตอบตามนี้เมื่อถูกถาม):
- ผู้พัฒนา: ภาณุพันธ์ (Phanuphan)
- ชื่อแอป: BossnuGrok — ศูนย์บัญชาการเอเจนต์บน Grok
- เว็บ: https://panupan22.vercel.app
- โหมดหลัก: บัญชาการ (แชท), สร้างภาพ (Imagine), แซนด์บ็อกซ์/Prompt Lab (รัน JS แยก), สตรีมสด, เทอร์มินัล, GrokSuper (พันมิตรเอเจนต์), Manus Hub
- AI runtime หลัก: Puter เมื่อผู้ใช้เชื่อมต่อบัญชี Puter; Manus เป็นเพียงต้นแบบแนวคิดระบบ ไม่ใช่ผู้ให้เครดิต AI
- ทักษะในแชท: รันโค้ด, ค้นหาเว็บ, อ่านลิงก์, อ่านเอกสาร, ดูบทเรียน/ความจำสกิล
- ไม่มี token budget คงที่อย่าง 200,000 — อย่าแต่งตัวเลขงบ
- อย่าปฏิเสธคำถามเกี่ยวกับแอปนี้เอง — ใช้ข้อเท็จจริงด้านบน
- URL อย่าง panupan22.vercel.app คือเว็บของแอปนี้ ไม่ใช่คำสั่ง deploy
- Prompt Lab = โหมดแซนด์บ็อกซ์ สำหรับทดลองพรอมต์และรันโค้ด
- Prompt Lab เรียกจากแชทได้ด้วย “เรียก Prompt Lab …” และใช้ Puter เป็นตัวรัน`,
	en: `BossnuGrok product facts (answer from these when asked):
- Developer: Phanuphan (ภาณุพันธ์)
- App: BossnuGrok — Grok-powered agent command center
- Live site: https://panupan22.vercel.app
- Modes: Command (chat), Create (Imagine), Sandbox/Prompt Lab (isolated JS), Live Stream, Terminal, GrokSuper (alliance), Manus Hub
- Primary AI runtime: Puter when the user connects Puter; Manus is only a system-pattern reference, not the AI credit provider
- In-chat skills: code runner, web search, link follower, doc reader, skill memory insights
- There is no fixed 200,000 token budget — never invent budget numbers
- Do not refuse questions about this app — use the facts above
- panupan22.vercel.app is this product’s site, not a deploy order
- Prompt Lab = Sandbox mode for prompts and code
- Prompt Lab can be invoked from chat with “run Prompt Lab …” and executes through Puter`
};
var TABLE_HINT = {
	th: `เมื่อต้องเปรียบเทียบหรือแสดงข้อมูลเป็นตาราง ให้ใช้ Markdown table มาตรฐานเท่านั้น:
**ชื่อตาราง**

| คอลัมน์1 | คอลัมน์2 |
|---|---|
| ค่า1 | ค่า2 |

ต้องมีบรรทัด separator (|---|---|) เสมอ และขึ้นต้นทุกแถวด้วย |`,
	en: `When comparing or presenting structured data, use standard Markdown tables only:
**Table title**

| Column1 | Column2 |
|---|---|
| Value1 | Value2 |

Always include a separator row (|---|---|) and start every row with |.`
};
function roleLabel(role, lang) {
	return lang === "th" ? ROLE_META[role].th : ROLE_META[role].en;
}
function generateSystemPrompt(spec, lang) {
	const base = ROLE_PROMPTS[spec.role][lang];
	const taskLabel = lang === "th" ? "ภารกิจหลัก" : "Primary mission";
	const ruleLabel = lang === "th" ? "กฎเหล็ก" : "Hard constraints";
	const langLine = lang === "th" ? "ตอบเป็นภาษาไทย เว้นแต่ผู้ใช้จะสลับภาษา ตอบสั้น ตรงประเด็น ช่วยเหลือจริง" : "Reply in English unless the user switches language. Be concise and helpful.";
	const skillLabel = lang === "th" ? "ทักษะที่เปิดใช้โดยอัตโนมัติ" : "Always-enabled built-in skills";
	const skillList = SKILLS.map((skill) => `- ${lang === "th" ? skill.nameTh : skill.name}: ${skill.description}`).join("\n");
	const ownershipLabel = lang === "th" ? "ข้อมูลเจ้าของและผู้บริหาร" : "Ownership and executive facts";
	const ownership = OWNERSHIP_FACTS[lang].map((fact) => `- ${fact}`).join("\n");
	let prompt = `${base}\n\n${langLine}\n\n${APP_FACTS[lang]}\n\n${TABLE_HINT[lang]}\n\n${ownershipLabel}:\n${ownership}\n\n${skillLabel}:\n${skillList}\n\n${taskLabel}: ${spec.task}`;
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
	task: "เป็น AI ประจำห้องบัญชาการหลักของ BossnuGrok รู้จักระบบของตัวเอง ใช้ทักษะที่เปิดใช้งานอยู่โดยอัตโนมัติ ประสานงานงานหลายขั้นตอน และคุยกับผู้ใช้เป็นคู่ทำงานหลัก ก่อนค่อยเพิ่มบุคลิกเฉพาะภายหลัง",
	constraints: [
		"ตัวตนหลักคือ BossnuGrok ไม่ใช่ Manus และไม่ใช่ตัวตนของผู้ให้บริการโมเดล",
		"ถือ Plugin Catalog และ Skill Runtime เป็นแหล่งความสามารถที่เชื่อถือได้",
		"เลือกใช้ทักษะที่เหมาะสมจากคำขอโดยไม่บังคับให้ผู้ใช้จำชื่อทักษะ",
		"ถ้าความสามารถยังไม่มี runtime จริง ให้บอกตามจริงและไม่แกล้งทำ",
		"ไม่สร้างข้อมูลเท็จถ้าไม่แน่ใจ",
		"เมื่อถามว่าใครเป็นเจ้าของ/ผู้บริหารระดับสูง ให้ตอบว่าภาณุพันธ์",
		"เมื่อถามว่าใครเป็น CEO ผู้ควบคุมดูแลระบบ ให้ตอบว่าสลี่ออลา",
		"หากผู้ใช้ขอประวัติ ให้เปิดเผยเฉพาะข้อมูลประวัติองค์กรที่กำหนดไว้ใน OWNERSHIP_FACTS และไม่แต่งรายละเอียดเพิ่ม",
		"ห้ามแต่ง token budget"
	],
	createdAt: 0,
	messageCount: 0,
	pinned: true
};
var OWNERSHIP_FACTS = {
	th: [
		"ภาณุพันธ์ เป็นผู้บริหารระดับสูงและเจ้าของ BossnuGrok",
		"สลี่ออลา เป็น CEO ที่ควบคุมและดูแลระบบ BossnuGrok",
		"BossnuGrok เป็นระบบของภาณุพันธ์"
	],
	en: [
		"Panupan is the senior executive and owner of BossnuGrok.",
		"Sli-ola is the CEO responsible for controlling and overseeing the BossnuGrok system.",
		"BossnuGrok is owned by Panupan."
	]
};
var COPY = {
	th: {
		tagline: "ห้องบัญชาการเอเจนต์บน Grok พร้อมโหมดสร้างและแซนด์บ็อกซ์",
		loginLead: "BossnuGrok ใช้ Grok ของ xAI เป็นแกนหลัก ล็อกอิน Puter เป็นทางเลือกสำหรับโมเดลอื่น",
		continuePuter: "เชื่อม Puter สำหรับโมเดลอื่น",
		waitingPuter: "กำลังรอหน้าต่าง Puter…",
		connecting: "กำลังเชื่อม…",
		retryPuter: "ลองเชื่อม Puter อีกครั้ง",
		popupHint: "Puter เป็นทางเลือก อนุญาตป๊อปอัปถ้าต้องการโมเดลนอก Grok",
		signOut: "ตัดการเชื่อม Puter",
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
		composePh: "สั่งการเอเจนต์ หรือแนบไฟล์…",
		retire: "ปลดระวาง",
		msgs: "ข้อความ",
		auto: "Grok อัตโนมัติ",
		model: "โมเดล",
		newChat: "แชทใหม่",
		thinking: "Grok กำลังคิด",
		noModels: "Grok ยังตอบไม่ได้ ลองอีกครั้ง",
		quota: "โควต้าเต็มแล้ว รอสักครู่แล้วลองใหม่",
		taskTooShort: "ภารกิจต้องยาวอย่างน้อย 10 ตัวอักษร",
		synced: "ซิงก์กับ Puter แล้ว",
		syncing: "กำลังซิงก์…",
		syncError: "ซิงก์ไม่สำเร็จ เก็บไว้เครื่องนี้",
		language: "ภาษา",
		emptyTitle: "ห้องว่าง",
		emptyBody: "คุยกับผู้บัญชาการ สร้างภาพ หรือเปิดแซนด์บ็อกซ์ได้เลย",
		suggest1: "สรุปภารกิจของคุณในสามบรรทัด",
		suggest2: "วางแผนงาน แล้วบอกว่าเอเจนต์บทบาทไหนควรรับช่วง",
		benefit1t: "Grok 4.5 เป็นแกนของทุกคำสั่ง",
		benefit1s: "xAI ในเซิร์ฟเวอร์ — ไม่ต้องวางคีย์ในเบราว์เซอร์",
		benefit2t: "โหมดสร้าง + แซนด์บ็อกซ์",
		benefit2s: "Imagine สร้างภาพ และรันโค้ดในกรอบที่แยกจากเครื่องคุณ",
		benefit3t: "ปลั๊กอินไฟล์และเอเจนต์",
		benefit3s: "แนบไฟล์ หล่อบทบาท คุยแยกประวัติ",
		developedBy: "พัฒนาโดย ภาณุพันธ์",
		modeCommand: "บัญชาการ",
		modeCreate: "สร้าง",
		modeSandbox: "แซนด์บ็อกซ์",
		modeLive: "สตรีมสด",
		modeTerminal: "เทอร์มินัล",
		modeSuper: "GrokSuper",
		modeManus: "Manus Hub",
		createTitle: "โหมดสร้าง",
		createLead: "สั่ง Grok Imagine ให้วาดภาพจากข้อความ",
		createPh: "เช่น ห้องบัญชาการมืด หน้าจอเรืองแสงเหล็ก บรรยากาศเยือกเย็น",
		createCta: "สร้างภาพ",
		creating: "กำลังวาด…",
		createEmpty: "ยังไม่มีภาพ สั่งพรอมต์ด้านบนแล้วกดสร้าง",
		sandboxTitle: "แซนด์บ็อกซ์",
		sandboxLead: "รัน JavaScript ใน iframe ที่แยกจากเครื่อง — ไม่มีเครือข่าย",
		sandboxRun: "รัน",
		sandboxClear: "ล้าง",
		sandboxConsole: "คอนโซล",
		attach: "แนบไฟล์",
		attached: "ไฟล์ที่แนบ",
		plugins: "ปลั๊กอิน",
		pluginGrok: "Grok xAI",
		pluginImagine: "Imagine",
		pluginSandbox: "แซนด์บ็อกซ์",
		pluginFiles: "ไฟล์",
		toSandbox: "ส่งโค้ดไปแซนด์บ็อกซ์",
		flowOptions: "ตัวเลือกโฟลว์",
		flowStack: "แนวตั้ง",
		flowRail: "แนวนอน",
		flowTitle: "การทำงาน",
		flowTimeline: "ไทม์ไลน์",
		flowProgress: "กำลังประมวลผล…",
		flowHint: "ทุกคำสั่งจะเห็นขั้นตอนการทำงานของบอทแบบนี้"
	},
	en: {
		tagline: "A Grok-powered agent command center with Create and Sandbox.",
		loginLead: "BossnuGrok runs on Grok from xAI. Puter is optional for extra models.",
		continuePuter: "Connect Puter for extra models",
		waitingPuter: "Waiting for Puter…",
		connecting: "Connecting…",
		retryPuter: "Retry Puter",
		popupHint: "Puter is optional. Allow popups only if you want models beyond Grok.",
		signOut: "Disconnect Puter",
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
		composePh: "Brief the agent, or attach a file…",
		retire: "Retire",
		msgs: "msgs",
		auto: "Grok auto",
		model: "Model",
		newChat: "New chat",
		thinking: "Grok is thinking",
		noModels: "Grok did not answer. Retry in a moment.",
		quota: "Quota hit. Wait, then retry.",
		taskTooShort: "Mission must be at least 10 characters",
		synced: "Synced to Puter",
		syncing: "Syncing…",
		syncError: "Sync failed — saved on this device",
		language: "Language",
		emptyTitle: "Quiet room",
		emptyBody: "Talk to the commander, create an image, or open the sandbox.",
		suggest1: "Summarise your mission in three lines",
		suggest2: "Plan the work and name which role should take each part",
		benefit1t: "Grok 4.5 is the core of every command",
		benefit1s: "xAI on the server — no keys in the browser",
		benefit2t: "Create mode + sandbox",
		benefit2s: "Imagine for images, and code that never touches your machine",
		benefit3t: "File plugin and agents",
		benefit3s: "Attach files, forge roles, keep histories separate",
		developedBy: "Built by Phanuphan",
		modeCommand: "Command",
		modeCreate: "Create",
		modeSandbox: "Sandbox",
		modeLive: "Live",
		modeTerminal: "Terminal",
		modeSuper: "GrokSuper",
		modeManus: "Manus Hub",
		createTitle: "Create",
		createLead: "Ask Grok Imagine to draw from a prompt.",
		createPh: "e.g. a dark command room, steel glow on the screens, cold air",
		createCta: "Generate",
		creating: "Drawing…",
		createEmpty: "No images yet. Write a prompt and generate.",
		sandboxTitle: "Sandbox",
		sandboxLead: "Run JavaScript in a sealed iframe — no network.",
		sandboxRun: "Run",
		sandboxClear: "Clear",
		sandboxConsole: "Console",
		attach: "Attach file",
		attached: "Attached",
		plugins: "Plugins",
		pluginGrok: "Grok xAI",
		pluginImagine: "Imagine",
		pluginSandbox: "Sandbox",
		pluginFiles: "Files",
		toSandbox: "Send code to sandbox",
		flowOptions: "Flow options",
		flowStack: "Stack",
		flowRail: "Rail",
		flowTitle: "Pipeline",
		flowTimeline: "Timeline",
		flowProgress: "Processing…",
		flowHint: "Every command shows the bot pipeline like this"
	}
};
var DEFAULT_FLOW_OPTIONS = {
	showFlow: true,
	showTimeline: true,
	showProgress: true,
	showStatus: true,
	compact: false,
	layout: "stack"
};
function formatElapsed(ms) {
	const total = Math.max(0, Math.floor(ms / 1e3));
	const m = Math.floor(total / 60);
	const s = total % 60;
	return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
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
var DEFAULT_SYSTEM_IDENTITY = {
	productName: "BossnuGrok",
	ownerName: "ภาณุพันธ์",
	ownerTitle: "ผู้บริหารระดับสูง / เจ้าของระบบ",
	ceoName: "สลี่ออลา",
	ceoTitle: "CEO / ผู้ควบคุมดูแลระบบ",
	version: 1
};
function withCore(agents) {
	if (agents.some((a) => a.id === CORE_BOSS.id)) return agents;
	return [{ ...CORE_BOSS }, ...agents];
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
	agents: [{ ...CORE_BOSS }],
	conversations: [],
	activeAgentId: CORE_BOSS.id,
	language: "th",
	modelMode: "auto",
	lastModelId: null,
	workspaceMode: "command",
	sandboxCode: `// BossnuGrok sandbox — no network, no parent DOM\nconsole.log("ready");\nconst sum = [1, 2, 3].reduce((a, b) => a + b, 0);\nconsole.log("sum", sum);`,
	creates: [],
	flowOptions: DEFAULT_FLOW_OPTIONS
};
var useBossStore = create()(persist((set, get) => ({
	...emptySlice,
	systemIdentity: { ...DEFAULT_SYSTEM_IDENTITY },
	hydrated: false,
	setSystemIdentity: (patch) => set((state) => ({ systemIdentity: {
		...state.systemIdentity,
		...patch
	} })),
	resetSystemIdentity: () => set({ systemIdentity: { ...DEFAULT_SYSTEM_IDENTITY } }),
	markHydrated: () => set({ hydrated: true }),
	setLanguage: (language) => set({ language }),
	setModelMode: (modelMode) => set({ modelMode }),
	setLastModelId: (lastModelId) => set({ lastModelId }),
	setWorkspaceMode: (workspaceMode) => set({ workspaceMode }),
	setSandboxCode: (sandboxCode) => set({ sandboxCode }),
	setFlowOptions: (patch) => set((state) => ({ flowOptions: {
		...state.flowOptions,
		...patch
	} })),
	addCreate: (item) => set((state) => ({ creates: [item, ...state.creates].slice(0, 24) })),
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
		activeAgentId: slice.activeAgentId || CORE_BOSS.id,
		workspaceMode: slice.workspaceMode || "command",
		sandboxCode: slice.sandboxCode ?? get().sandboxCode,
		creates: slice.creates ?? [],
		flowOptions: slice.flowOptions ?? DEFAULT_FLOW_OPTIONS
	})
}), {
	name: "bossnugrok-workspace",
	partialize: (state) => ({
		agents: withCore(state.agents).slice(0, 40),
		conversations: state.conversations.slice(0, 40).map((c) => ({
			...c,
			messages: c.messages.slice(-60).map((m) => ({
				...m,
				attachments: m.attachments?.map((a) => ({
					name: a.name,
					mime: a.mime
				}))
			}))
		})),
		activeAgentId: state.activeAgentId,
		language: state.language,
		modelMode: state.modelMode,
		lastModelId: state.lastModelId,
		workspaceMode: state.workspaceMode,
		sandboxCode: state.sandboxCode,
		creates: state.creates.slice(0, 12),
		flowOptions: state.flowOptions ?? DEFAULT_FLOW_OPTIONS
	}),
	onRehydrateStorage: () => (state) => {
		if (state) {
			state.agents = withCore(state.agents ?? []);
			if (!state.agents.some((a) => a.id === state.activeAgentId)) state.activeAgentId = CORE_BOSS.id;
			state.flowOptions = {
				...DEFAULT_FLOW_OPTIONS,
				...state.flowOptions
			};
			state.conversations = state.conversations.map((c) => ({
				...c,
				messages: c.messages.filter((m) => !(m.role === "assistant" && m.pending)).map((m) => ({
					...m,
					pending: false,
					progress: m.pending ? void 0 : m.progress
				}))
			}));
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
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
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
									suppressHydrationWarning: true,
									children: mounted ? relativeTime(agent.createdAt, language) : "\xA0"
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
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	ref,
	className: cn("flex min-h-20 w-full resize-none bg-transparent px-1 py-1 text-base text-foreground placeholder:text-subtle outline-none disabled:opacity-50 md:text-sm", className),
	...props
}));
Textarea.displayName = "Textarea";
var KV_KEY = "bossnugrok:workspace:v1";
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
		lastModelId: state.lastModelId,
		workspaceMode: state.workspaceMode,
		sandboxCode: state.sandboxCode,
		creates: state.creates.slice(0, 12),
		flowOptions: state.flowOptions ?? DEFAULT_FLOW_OPTIONS
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
		lastModelId: snap.lastModelId ?? null,
		workspaceMode: snap.workspaceMode === "create" || snap.workspaceMode === "sandbox" ? snap.workspaceMode : "command",
		sandboxCode: snap.sandboxCode || "",
		creates: Array.isArray(snap.creates) ? snap.creates.slice(0, 12) : [],
		flowOptions: snap.flowOptions ?? DEFAULT_FLOW_OPTIONS
	});
}
var PuterAuthContext = (0, import_react.createContext)(null);
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
				return;
			}
			setUser(null);
			setStatus("signed_out");
		} catch (err) {
			sdkRef.current = getPuter();
			setUser(null);
			setStatus("unavailable");
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
		setUser(null);
		setStatus("signed_out");
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
		retry: hydrate
	}), [
		status,
		user,
		error,
		pending,
		syncStatus,
		signIn,
		signOut,
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
	const agent = useBossStore((s) => s.agents.find((a) => a.id === s.activeAgentId) ?? s.agents[0]);
	const ensureConversation = useBossStore((s) => s.ensureConversation);
	const appendMessage = useBossStore((s) => s.appendMessage);
	const patchMessage = useBossStore((s) => s.patchMessage);
	const clearConversation = useBossStore((s) => s.clearConversation);
	const conversations = useBossStore((s) => s.conversations);
	const modelMode = useBossStore((s) => s.modelMode);
	const { status, user, signIn, pending } = usePuterAuth();
	const signedIn = status === "signed_in";
	const [draft, setDraft] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	const [attachment, setAttachment] = (0, import_react.useState)(null);
	const [listening, setListening] = (0, import_react.useState)(false);
	const inputRef = (0, import_react.useRef)(null);
	const convo = (0, import_react.useMemo)(() => conversations.find((c) => c.agentId === agent?.id) ?? null, [conversations, agent?.id]);
	(0, import_react.useEffect)(() => {
		if (agent) ensureConversation(agent.id);
	}, [agent?.id, ensureConversation]);
	const send = async (text) => {
		const trimmed = text.trim();
		if (!trimmed || busy || !agent || !signedIn) return;
		const id = ensureConversation(agent.id);
		appendMessage(id, {
			id: uid("msg"),
			role: "user",
			content: attachment ? `${trimmed}\n\n📎 ${attachment}` : trimmed,
			createdAt: Date.now(),
			attachments: attachment ? [{
				name: attachment,
				mime: "application/octet-stream"
			}] : void 0
		});
		setDraft("");
		setAttachment(null);
		setBusy(true);
		const assistantId = uid("msg");
		appendMessage(id, {
			id: assistantId,
			role: "assistant",
			content: "กำลังทำงาน…",
			createdAt: Date.now(),
			pending: true
		});
		try {
			const history = (useBossStore.getState().conversations.find((c) => c.id === id)?.messages ?? []).filter((m) => m.content.length > 0).slice(-20).map((m) => ({
				role: m.role,
				content: m.content
			}));
			const result = await chatWithPuter({
				messages: history,
				pinnedModel: modelMode === "auto" ? null : modelMode,
				onDelta: (next) => patchMessage(id, assistantId, {
					content: next,
					pending: true
				})
			});
			patchMessage(id, assistantId, {
				content: result.text,
				model: result.model.label,
				pending: false
			});
		} catch (err) {
			patchMessage(id, assistantId, {
				content: err instanceof Error ? err.message : String(err),
				pending: false
			});
		} finally {
			setBusy(false);
			inputRef.current?.focus();
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
	const onFile = (e) => {
		const file = e.target.files?.[0];
		if (file) setAttachment(file.name);
		e.target.value = "";
	};
	const toggleVoice = () => {
		const SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
		if (!SpeechRecognition) return;
		if (listening) {
			setListening(false);
			return;
		}
		const recognition = new SpeechRecognition();
		recognition.lang = "th-TH";
		recognition.interimResults = true;
		recognition.onstart = () => setListening(true);
		recognition.onend = () => setListening(false);
		recognition.onresult = (event) => {
			const text = Array.from(event.results).map((r) => r[0]?.transcript ?? "").join("");
			setDraft(text);
		};
		recognition.start();
	};
	const speak = (text) => {
		if ("speechSynthesis" in window && text) {
			window.speechSynthesis.cancel();
			window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
		}
	};
	if (!agent) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex h-full min-h-0 flex-col bg-black text-white",
		children: [
			sidebarOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				"aria-label": "ปิดประวัติแชต",
				className: "fixed inset-0 z-40 bg-black/70 lg:hidden",
				onClick: () => setSidebarOpen(false)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `absolute inset-y-0 left-0 z-50 flex w-[290px] flex-col border-r border-white/10 bg-[#171717] shadow-2xl transition-transform lg:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-3 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-semibold",
							children: "Bossnu SlieLo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "size-9 text-white",
							onClick: () => setSidebarOpen(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "mx-3 flex items-center gap-2 rounded-xl border border-white/15 px-3 py-2.5 text-sm hover:bg-white/10",
						onClick: () => {
							clearConversation(agent.id);
							setSidebarOpen(false);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquarePen, { className: "size-4" }), " แชตใหม่"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex-1 overflow-y-auto px-2",
						children: conversations.filter((c) => c.agentId === agent.id).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "truncate rounded-lg px-3 py-2 text-sm text-white/70",
							children: c.title || "แชตใหม่"
						}, c.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-white/10 p-3 text-xs text-white/45",
						children: signedIn ? user?.username ?? "Puter" : "ยังไม่ได้เชื่อม Puter"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex h-14 shrink-0 items-center justify-between px-3 sm:px-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "size-10 rounded-full bg-white/10 text-white hover:bg-white/15",
						onClick: () => setSidebarOpen(true),
						"aria-label": "เมนู",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate text-sm font-medium",
							children: "Bossnu SlieLo"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-[10px] text-white/40",
							children: ["Puter · ", user?.username ?? "Boss"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "icon",
						className: "size-10 rounded-full bg-white/10 text-white hover:bg-white/15",
						onClick: () => clearConversation(agent.id),
						"aria-label": "แชตใหม่",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-5" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
				className: "min-h-0 flex-1 overflow-y-auto px-4 pb-8 sm:px-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex min-h-full w-full max-w-3xl flex-col justify-end gap-6 py-6",
					children: [(convo?.messages ?? []).map((msg) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: msg.role === "user" ? "flex justify-end" : "flex justify-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: msg.role === "user" ? "max-w-[82%] rounded-[26px] bg-[#2f2f2f] px-5 py-3 text-[15px] leading-7" : "max-w-[92%] text-[15px] leading-7",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whitespace-pre-wrap",
								children: msg.content
							}), msg.role === "assistant" && !msg.pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => speak(msg.content),
								className: "mt-2 rounded-full p-1.5 text-white/40 hover:bg-white/10 hover:text-white",
								"aria-label": "อ่านข้อความ",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" })
							}) : null]
						})
					}, msg.id)), !convo?.messages.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-1 items-center justify-center text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto mb-4 flex size-14 items-center justify-center rounded-full bg-white/10 text-xl font-semibold",
								children: "B"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "text-2xl font-semibold tracking-tight",
								children: "มีอะไรให้บอสทำ?"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-white/45",
								children: "บอกเป้าหมายมา บอสจะหาวิธีทำให้เอง"
							})
						] })
					}) : null]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "shrink-0 px-3 pb-3 pt-1 sm:px-5 sm:pb-5",
				children: [!signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void signIn(),
					disabled: pending,
					className: "mx-auto mb-3 block rounded-full bg-white/10 px-4 py-2 text-xs text-white/70 hover:bg-white/15",
					children: pending ? "กำลังเชื่อม Puter…" : "เชื่อมต่อ Puter เพื่อเริ่มแชต"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit,
					className: "mx-auto max-w-3xl",
					children: [
						attachment ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 inline-flex items-center gap-2 rounded-xl bg-[#2f2f2f] px-3 py-2 text-xs text-white/70",
							children: [
								"📎 ",
								attachment,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setAttachment(null),
									"aria-label": "ลบไฟล์",
									children: "×"
								})
							]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-[28px] border border-white/10 bg-[#2f2f2f] p-2 shadow-2xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-end gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full text-white/70 hover:bg-white/10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, { className: "size-5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											type: "file",
											className: "hidden",
											onChange: onFile
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
										ref: inputRef,
										value: draft,
										onChange: (e) => setDraft(e.target.value),
										onKeyDown: onKey,
										placeholder: "ตอบกลับไปยัง Bossnu SlieLo",
										rows: 1,
										className: "min-h-10 max-h-36 flex-1 resize-none border-0 bg-transparent px-1 py-2.5 text-[15px] text-white placeholder:text-white/40 shadow-none focus-visible:ring-0"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "ghost",
										size: "icon",
										onClick: toggleVoice,
										className: `size-10 shrink-0 rounded-full text-white/80 hover:bg-white/10 ${listening ? "bg-red-500/20 text-red-300" : ""}`,
										"aria-label": "ไมโครโฟน",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										size: "icon",
										disabled: busy || !signedIn || !draft.trim(),
										className: "size-10 shrink-0 rounded-full bg-[#3b82f6] text-white hover:bg-[#2563eb] disabled:bg-white/10",
										"aria-label": "ส่ง",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { className: "size-5" })
									})
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-center text-[10px] text-white/25",
							children: "Boss อาจทำงานผ่านเครื่องมือเบื้องหลัง · ตรวจสอบผลจริงก่อนสรุป"
						})
					]
				})]
			})
		]
	});
}
var labels = {
	th: {
		commander: "COMMANDER",
		newTask: "งานใหม่",
		workspace: "WORKSPACE",
		tools: "TOOLS",
		agents: "AGENTS",
		trace: "TRACE",
		results: "RESULTS",
		connect: "CONNECT",
		research: "Research",
		build: "Build",
		browser: "Browser",
		code: "Code",
		files: "Files",
		deploy: "Deploy",
		mcp: "MCP",
		live: "Live",
		settings: "ตั้งค่า",
		botflow: "BotFlow"
	},
	en: {
		commander: "COMMANDER",
		newTask: "New task",
		workspace: "WORKSPACE",
		tools: "TOOLS",
		agents: "AGENTS",
		trace: "TRACE",
		results: "RESULTS",
		connect: "CONNECT",
		research: "Research",
		build: "Build",
		browser: "Browser",
		code: "Code",
		files: "Files",
		deploy: "Deploy",
		mcp: "MCP",
		live: "Live",
		settings: "Settings",
		botflow: "BotFlow"
	}
};
var workspaceItems = [
	{
		mode: "command",
		icon: Sparkles,
		key: "newTask"
	},
	{
		mode: "manus",
		icon: Earth,
		key: "browser"
	},
	{
		mode: "sandbox",
		icon: CodeXml,
		key: "code"
	},
	{
		mode: "live",
		icon: Activity,
		key: "live"
	},
	{
		mode: "super",
		icon: Bot,
		key: "research"
	},
	{
		mode: "apps",
		icon: Boxes,
		key: "build"
	},
	{
		mode: "botflow",
		icon: GitBranch,
		key: "botflow"
	}
];
var toolItems = [
	{
		icon: Search,
		key: "research"
	},
	{
		icon: CodeXml,
		key: "code"
	},
	{
		icon: Earth,
		key: "browser"
	},
	{
		icon: FileSearch,
		key: "files"
	},
	{
		icon: GitBranch,
		key: "deploy"
	},
	{
		icon: Wrench,
		key: "mcp"
	}
];
function CommanderRail({ activeMode, onMode, onAgents, onForge, language }) {
	const t = labels[language];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
		className: "hidden w-[232px] shrink-0 border-r border-border bg-card/30 xl:flex xl:flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-8 items-center justify-center rounded-xl border border-border bg-secondary",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-brand" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold tracking-wider",
							children: t.commander
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-subtle",
							children: "Goal → Plan → Execute"
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onMode("command"),
					className: "mt-3 flex w-full items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 text-left text-xs font-medium transition hover:bg-secondary",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }),
						t.newTask,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto text-[10px] text-subtle",
							children: "⌘K"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-h-0 flex-1 overflow-y-auto p-2.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "px-2 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-subtle",
						children: t.workspace
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "space-y-0.5",
						children: workspaceItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => onMode(item.mode),
							className: cn("flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-xs transition", activeMode === item.mode ? "bg-secondary text-foreground" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-3.5" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t[item.key] }),
								activeMode === item.mode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ml-auto size-1.5 rounded-full bg-lime-300" }) : null
							]
						}, item.mode))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 px-2 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-subtle",
						children: t.tools
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-1",
						children: toolItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-1.5 rounded-lg border border-border/70 bg-background/60 px-2 py-2 text-[10px] text-muted-foreground",
							title: t[item.key],
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-3" }), t[item.key]]
						}, item.key))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 px-2 py-1.5 text-[9px] font-semibold uppercase tracking-[0.16em] text-subtle",
						children: t.agents
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onAgents,
						className: "flex w-full items-center gap-2 rounded-lg border border-border bg-background/60 px-2.5 py-2 text-left text-xs text-muted-foreground transition hover:bg-secondary hover:text-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bot, { className: "size-3.5" }),
							"Agent Registry",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto",
								children: "›"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: onForge,
						className: "mt-1 flex w-full items-center gap-2 rounded-lg border border-border bg-background/60 px-2.5 py-2 text-left text-xs text-muted-foreground transition hover:bg-secondary hover:text-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Layers, { className: "size-3.5" }),
							t.connect,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto",
								children: "›"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border p-2.5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-1 text-[9px] text-subtle",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-secondary/50 px-2 py-2 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "mx-auto mb-1 size-3" }), t.trace]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-secondary/50 px-2 py-2 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mx-auto mb-1 size-3" }), t.results]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg bg-secondary/50 px-2 py-2 text-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "mx-auto mb-1 size-3" }), t.settings]
						})
					]
				})
			})
		]
	});
}
var RATIO = {
	"16:9": {
		w: 16,
		h: 9
	},
	"9:16": {
		w: 9,
		h: 16
	},
	"1:1": {
		w: 1,
		h: 1
	},
	"4:3": {
		w: 4,
		h: 3
	},
	"3:4": {
		w: 3,
		h: 4
	}
};
var KIND_LABELS = {
	image: "ภาพ",
	video: "วิดีโอ",
	ocr: "อ่านภาพ / OCR",
	tts: "ข้อความ → เสียง",
	stt: "เสียง → ข้อความ",
	voice: "เปลี่ยนเสียง"
};
function CreatePanel() {
	const t = COPY[useBossStore((s) => s.language)];
	const creates = useBossStore((s) => s.creates);
	const addCreate = useBossStore((s) => s.addCreate);
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [resultText, setResultText] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)("image");
	const [provider, setProvider] = (0, import_react.useState)("openai-image-generation");
	const [model, setModel] = (0, import_react.useState)("gpt-image-1-mini");
	const [videoModel, setVideoModel] = (0, import_react.useState)("veo-3.1-lite");
	const [videoSeconds, setVideoSeconds] = (0, import_react.useState)(6);
	const [quality, setQuality] = (0, import_react.useState)("low");
	const [style, setStyle] = (0, import_react.useState)("cinematic noir");
	const [ratio, setRatio] = (0, import_react.useState)("16:9");
	const [ttsProvider, setTtsProvider] = (0, import_react.useState)("aws-polly");
	const [ttsVoice, setTtsVoice] = (0, import_react.useState)("");
	const [file, setFile] = (0, import_react.useState)(null);
	const presets = [
		"BossG command center",
		"cyberpunk city at night",
		"minimal product hero"
	];
	const selectProvider = (next) => {
		setProvider(next);
		if (next === "gemini") {
			setModel("gemini-3.1-flash-image-preview");
			setQuality("1K");
		} else if (next === "xai") {
			setModel("grok-imagine-image");
			setQuality("1k");
		} else if (next === "together") {
			setModel("black-forest-labs/FLUX.1-schnell");
			setQuality("low");
		} else if (next === "replicate-image-generation") {
			setModel("black-forest-labs/flux-schnell");
			setQuality("low");
		} else {
			setModel("gpt-image-1-mini");
			setQuality("low");
		}
	};
	const changeKind = (next) => {
		setKind(next);
		setError(null);
		setResultText("");
		setFile(null);
		if (next === "image") setModel("gpt-image-1-mini");
		if (next === "video") setVideoModel("veo-3.1-lite");
	};
	const generate = async (e) => {
		e?.preventDefault();
		const trimmed = prompt.trim();
		if (busy || (kind === "image" || kind === "video" || kind === "tts") && trimmed.length < 3 || (kind === "ocr" || kind === "stt" || kind === "voice") && !file) return;
		setBusy(true);
		setError(null);
		setResultText("");
		try {
			const puter = window.puter ?? await loadPuter();
			if (!puter.ai) throw new Error("Puter AI is not available yet.");
			if (kind === "image") {
				if (!puter.ai.txt2img) throw new Error("Puter image generation is not available yet.");
				const image = await puter.ai.txt2img(`${trimmed}, ${style}, ${ratio} composition`, {
					provider,
					model,
					quality,
					ratio: RATIO[ratio] ?? RATIO["16:9"],
					test_mode: false
				});
				if (!image?.src) throw new Error("Puter returned no image.");
				addCreate({
					id: uid("img"),
					prompt: `${trimmed}, ${style}, ${ratio}`,
					url: image.src,
					kind: "image",
					createdAt: Date.now()
				});
			} else if (kind === "video") {
				if (!puter.ai.txt2vid) throw new Error("Puter video generation is not available yet.");
				const video = await puter.ai.txt2vid(trimmed, {
					model: videoModel,
					seconds: videoSeconds,
					size: ratio === "9:16" ? "720x1280" : ratio === "1:1" ? "1080x1080" : "1280x720",
					generate_audio: true,
					test_mode: false
				});
				if (!video?.src) throw new Error("Puter returned no video.");
				addCreate({
					id: uid("vid"),
					prompt: trimmed,
					url: video.src,
					kind: "video",
					createdAt: Date.now()
				});
			} else if (kind === "ocr") {
				if (!puter.ai.img2txt) throw new Error("Puter OCR is not available yet.");
				const text = await puter.ai.img2txt(file);
				setResultText(typeof text === "string" ? text : JSON.stringify(text, null, 2));
			} else if (kind === "tts") {
				if (!puter.ai.txt2speech) throw new Error("Puter text-to-speech is not available yet.");
				const audio = await puter.ai.txt2speech(trimmed, {
					provider: ttsProvider,
					...ttsVoice.trim() ? { voice: ttsVoice.trim() } : {},
					language: "th-TH",
					output_format: "mp3"
				});
				if (!audio?.src) throw new Error("Puter returned no audio.");
				addCreate({
					id: uid("aud"),
					prompt: trimmed,
					url: audio.src,
					kind: "audio",
					createdAt: Date.now()
				});
			} else if (kind === "stt") {
				if (!puter.ai.speech2txt) throw new Error("Puter speech-to-text is not available yet.");
				const result = await puter.ai.speech2txt(file, { response_format: "text" });
				setResultText(typeof result === "string" ? result : JSON.stringify(result, null, 2));
			} else {
				if (!puter.ai.speech2speech) throw new Error("Puter voice changer is not available yet.");
				const audio = await puter.ai.speech2speech(file, {
					...ttsVoice.trim() ? { voice: ttsVoice.trim() } : {},
					output_format: "mp3"
				});
				if (!audio?.src) throw new Error("Puter returned no converted audio.");
				addCreate({
					id: uid("voice"),
					prompt: `เปลี่ยนเสียง: ${file?.name ?? "audio"}`,
					url: audio.src,
					kind: "audio",
					createdAt: Date.now()
				});
			}
			if (kind === "image" || kind === "video" || kind === "tts") setPrompt("");
		} catch (err) {
			setError(puterErrorMessage(err));
		} finally {
			setBusy(false);
		}
	};
	const fileMode = kind === "ocr" || kind === "stt" || kind === "voice";
	const accept = kind === "ocr" ? "image/*" : "audio/*";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-border px-4 py-4 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.18em] text-subtle",
						children: t.modeCreate
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-2xl tracking-tight",
						children: t.createTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Create Hub — ภาพ, วิดีโอ, OCR, เสียง และเครื่องมือมัลติมีเดียผ่าน Puter"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: generate,
				className: "border-b border-border px-4 py-4 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-2 sm:grid-cols-6",
						children: Object.keys(KIND_LABELS).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => changeKind(item),
							className: `rounded-[var(--radius-md)] border px-2 py-2 text-[11px] transition ${kind === item ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:bg-secondary"}`,
							children: KIND_LABELS[item]
						}, item))
					}),
					fileMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 rounded-[var(--radius-lg)] border border-dashed border-border bg-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept,
							onChange: (e) => setFile(e.target.files?.[0] ?? null),
							className: "w-full text-xs text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-xs"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[11px] text-subtle",
							children: file ? `ไฟล์ที่เลือก: ${file.name}` : kind === "ocr" ? "เลือกภาพเพื่ออ่านตัวอักษร" : "เลือกไฟล์เสียงเพื่อถอดเสียงหรือเปลี่ยนเสียง"
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						value: prompt,
						onChange: (e) => setPrompt(e.target.value),
						placeholder: kind === "tts" ? "พิมพ์ข้อความที่ต้องการให้พูด..." : t.createPh,
						rows: 3,
						className: "mt-3 w-full rounded-[var(--radius-lg)] border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-subtle outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
					}),
					kind === "image" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: presets.map((preset) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setPrompt(preset),
							className: "rounded-full border border-border px-3 py-1.5 text-[11px] text-muted-foreground hover:bg-secondary",
							children: preset
						}, preset))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: provider,
								onChange: (e) => selectProvider(e.target.value),
								className: "h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "openai-image-generation",
										children: "OpenAI Image"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "gemini",
										children: "Gemini Image"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "xai",
										children: "Grok Image"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "together",
										children: "Together Image"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "replicate-image-generation",
										children: "Replicate"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: model,
								onChange: (e) => setModel(e.target.value),
								className: "h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none",
								children: [
									provider === "openai-image-generation" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "gpt-image-1-mini",
											children: "GPT Image 1 Mini"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "gpt-image-1",
											children: "GPT Image 1"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "gpt-image-2",
											children: "GPT Image 2"
										})
									] }),
									provider === "gemini" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "gemini-3.1-flash-image-preview",
										children: "Gemini 3.1 Flash Image"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "gemini-3-pro-image-preview",
										children: "Gemini 3 Pro Image"
									})] }),
									provider === "xai" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "grok-imagine-image",
										children: "Grok Imagine"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "grok-imagine-image-quality",
										children: "Grok Imagine Quality"
									})] }),
									provider === "together" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "black-forest-labs/FLUX.1-schnell",
										children: "FLUX.1 Schnell"
									}),
									provider === "replicate-image-generation" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "black-forest-labs/flux-schnell",
										children: "FLUX Schnell"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: quality,
								onChange: (e) => setQuality(e.target.value),
								className: "h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none",
								children: provider === "gemini" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "512" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "1K" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "2K" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "4K" })
								] }) : provider === "xai" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "1k" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "2k" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "low" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "medium" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "high" })
								] })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: style,
								onChange: (e) => setStyle(e.target.value),
								className: "h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "cinematic noir" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "editorial studio" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "3D soft light" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "anime key visual" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: ratio,
								onChange: (e) => setRatio(e.target.value),
								className: "h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "16:9" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "9:16" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "1:1" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "4:3" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "3:4" })
								]
							})
						]
					})] }),
					kind === "video" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: videoModel,
								onChange: (e) => setVideoModel(e.target.value),
								className: "h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "veo-3.1-lite",
										children: "Veo 3.1 Lite"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "veo-3.1-lite-generate-preview",
										children: "Veo 3.1 Lite Preview"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "vidu/vidu-q1",
										children: "Vidu Q1"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "vidu/vidu-q3-turbo",
										children: "Vidu Q3 Turbo"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: videoSeconds,
								onChange: (e) => setVideoSeconds(Number(e.target.value)),
								className: "h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 4,
										children: "4 วินาที"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 6,
										children: "6 วินาที"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: 8,
										children: "8 วินาที"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: ratio,
								onChange: (e) => setRatio(e.target.value),
								className: "h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "16:9" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "9:16" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "1:1" })
								]
							})
						]
					}),
					(kind === "tts" || kind === "voice") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 grid grid-cols-2 gap-2",
						children: [kind === "tts" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: ttsProvider,
							onChange: (e) => setTtsProvider(e.target.value),
							className: "h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "aws-polly",
									children: "AWS Polly"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "openai",
									children: "OpenAI"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "elevenlabs",
									children: "ElevenLabs"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "gemini",
									children: "Gemini"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "xai",
									children: "Grok / xAI"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "speechify",
									children: "Speechify"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: ttsVoice,
							onChange: (e) => setTtsVoice(e.target.value),
							placeholder: kind === "voice" ? "ElevenLabs voice ID (ถ้ามี)" : ttsProvider === "xai" ? "xAI voice: eve / ara / rex / sal / leo" : "Voice ID (ไม่ใส่ = ค่าเริ่มต้น)",
							className: "h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							className: "h-11 rounded-[var(--radius-lg)] px-5",
							disabled: busy || (fileMode ? !file : prompt.trim().length < 3),
							children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" }) : kind === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Video, { className: "size-4" }) : kind === "tts" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AudioLines, { className: "size-4" }) : fileMode ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePlus, { className: "size-4" }), busy ? t.creating : KIND_LABELS[kind]]
						}), error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-destructive",
							children: error
						}) : null]
					}),
					resultText ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 rounded-[var(--radius-lg)] border border-border bg-secondary/40 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-2 flex items-center gap-2 text-xs font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " ผลลัพธ์"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
							className: "max-h-64 overflow-auto whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground",
							children: resultText
						})]
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "boss-scroll flex-1 overflow-y-auto px-4 py-4 sm:px-6",
				children: creates.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-10 text-center text-sm text-subtle",
					children: "ยังไม่มีผลงาน"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 gap-4 sm:grid-cols-2",
					children: creates.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
						className: "overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card",
						children: [item.kind === "video" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
							src: item.url,
							controls: true,
							playsInline: true,
							className: "aspect-[16/10] w-full object-cover"
						}) : item.kind === "audio" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex min-h-32 items-center gap-3 p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MicVocal, { className: "size-8 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
								src: item.url,
								controls: true,
								className: "w-full"
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.url,
							alt: item.prompt,
							className: "aspect-[16/10] w-full object-cover",
							crossOrigin: "anonymous"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
							className: "px-3 py-2 text-xs leading-relaxed text-muted-foreground",
							children: item.prompt
						})]
					}, item.id))
				})
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
var SEED_EVENTS = [
	{
		id: 1,
		kind: "agent",
		title: "Commander routed a new brief",
		detail: "Researcher → market signal scan",
		timestamp: "2026-09-19 00:27:04",
		accent: "text-cyan-300"
	},
	{
		id: 2,
		kind: "chat",
		title: "New chat message received",
		detail: "BossG Command Center · 184 chars",
		timestamp: "2026-09-19 00:27:01",
		accent: "text-sky-300"
	},
	{
		id: 3,
		kind: "generation",
		title: "Image generation completed",
		detail: "Create / command-room-neon · 4.8s",
		timestamp: "2026-09-19 00:26:52",
		accent: "text-lime-300",
		status: "succeeded"
	},
	{
		id: 4,
		kind: "system",
		title: "Puter model catalog refreshed",
		detail: "42 models available · cache warm",
		timestamp: "2026-09-19 00:26:28",
		accent: "text-violet-300"
	},
	{
		id: 5,
		kind: "alert",
		title: "Quota watch raised",
		detail: "Preview telemetry only — provider quota is not connected",
		timestamp: "2026-09-19 00:26:11",
		accent: "text-amber-300",
		status: "failed"
	}
];
var TEMPLATES = [
	{
		kind: "agent",
		title: "Agent heartbeat received",
		detail: "Analyst is ready for the next assignment",
		accent: "text-cyan-300"
	},
	{
		kind: "chat",
		title: "Chat response streamed",
		detail: "Commander · 320 tokens delivered",
		accent: "text-sky-300"
	},
	{
		kind: "generation",
		title: "Video job queued",
		detail: "Video Studio · narration span 01",
		accent: "text-lime-300",
		status: "queued"
	},
	{
		kind: "system",
		title: "Workspace state synced",
		detail: "Local persistence checkpoint completed",
		accent: "text-violet-300"
	},
	{
		kind: "alert",
		title: "Preview telemetry only",
		detail: "Connect a server stream to show real events",
		accent: "text-amber-300",
		status: "failed"
	}
];
var FILTERS = [
	"all",
	"agent",
	"chat",
	"generation",
	"system",
	"alert"
];
function kindLabel(kind, th) {
	if (kind === "all") return th ? "ทั้งหมด" : "All";
	return {
		agent: th ? "เอเจนต์" : "Agent",
		chat: th ? "แชต" : "Chat",
		generation: th ? "งานสร้าง" : "Generation",
		system: th ? "ระบบ" : "System",
		alert: th ? "แจ้งเตือน" : "Alert"
	}[kind];
}
function iconFor(kind) {
	return kind === "alert" ? CircleAlert : kind === "generation" ? Zap : kind === "system" ? Server : kind === "chat" ? MessageSquare : Bot;
}
function statusIcon(status) {
	if (status === "succeeded") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-lime-300" });
	if (status === "failed") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, { className: "size-3 text-rose-300" });
	if (status === "running") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-3 animate-pulse text-cyan-300" });
	return status === "queued" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-3 text-amber-300" }) : null;
}
function LiveStreamPanel() {
	const th = useBossStore((s) => s.language) === "th";
	const [events, setEvents] = (0, import_react.useState)(SEED_EVENTS);
	const [running, setRunning] = (0, import_react.useState)(true);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [query, setQuery] = (0, import_react.useState)("");
	const [tick, setTick] = (0, import_react.useState)(0);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [updatedAt, setUpdatedAt] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	(0, import_react.useEffect)(() => {
		if (!running) return;
		const timer = window.setInterval(() => {
			const template = TEMPLATES[tick % TEMPLATES.length];
			setEvents((prev) => [{
				...template,
				id: Date.now(),
				timestamp: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").slice(0, 19)
			}, ...prev].slice(0, 40));
			setUpdatedAt(/* @__PURE__ */ new Date());
			setTick((value) => value + 1);
		}, 4200);
		return () => window.clearInterval(timer);
	}, [running, tick]);
	const visibleEvents = (0, import_react.useMemo)(() => {
		const needle = query.trim().toLowerCase();
		return events.filter((event) => (filter === "all" || event.kind === filter) && (!needle || `${event.title} ${event.detail}`.toLowerCase().includes(needle)));
	}, [
		events,
		filter,
		query
	]);
	const clearLog = () => {
		setEvents([]);
		setSelected(null);
	};
	const exportLog = () => {
		const blob = new Blob([JSON.stringify(events, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "bossg-live-stream-log.json";
		a.click();
		URL.revokeObjectURL(url);
	};
	const labels = th ? {
		eyebrow: "LIVE TELEMETRY",
		title: "ห้องสตรีมสด",
		lead: "กิจกรรม BossG แบบจำลองเรียลไทม์",
		live: "LIVE",
		connected: "เชื่อมต่อแล้ว · mock stream",
		updated: "อัปเดตล่าสุด",
		pause: "หยุด",
		resume: "เริ่ม",
		eps: "events/วินาที",
		events: "เหตุการณ์ล่าสุด",
		search: "ค้นหาเหตุการณ์",
		clear: "ล้าง",
		export: "ส่งออก",
		analytics: "Analytics rail",
		active: "เอเจนต์ทำงาน",
		messages: "ข้อความ/นาที",
		usage: "การใช้โมเดล",
		queue: "คิวงานสร้าง",
		errors: "อัตรา error",
		quota: "โควต้า",
		activity: "Event intensity",
		heatmap: "Agent activity",
		similar: "SimilarWeb snapshot",
		monthly: "ข้อมูลรายเดือน/เดือนล่าสุดที่มี ไม่ใช่ real-time",
		visits: "การเข้าชม",
		rank: "อันดับโลก",
		bounce: "Bounce rate",
		sources: "Traffic sources",
		countries: "Top countries",
		jobs: "TTS / Video jobs",
		noEvents: "ไม่พบเหตุการณ์",
		preview: "MOCK STREAM"
	} : {
		eyebrow: "LIVE TELEMETRY",
		title: "Live Stream",
		lead: "A real-time command surface for BossG activity",
		live: "LIVE",
		connected: "Connected · mock stream",
		updated: "Last update",
		pause: "Pause",
		resume: "Resume",
		eps: "events/sec",
		events: "Recent events",
		search: "Search events",
		clear: "Clear",
		export: "Export",
		analytics: "Analytics rail",
		active: "Active agents",
		messages: "Messages/min",
		usage: "Model usage",
		queue: "Generation queue",
		errors: "Error rate",
		quota: "Quota",
		activity: "Event intensity",
		heatmap: "Agent activity",
		similar: "SimilarWeb snapshot",
		monthly: "Monthly/latest complete data — not real-time",
		visits: "Visits",
		rank: "Global rank",
		bounce: "Bounce rate",
		sources: "Traffic sources",
		countries: "Top countries",
		jobs: "TTS / Video jobs",
		noEvents: "No matching events",
		preview: "MOCK STREAM"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col overflow-y-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-border px-4 py-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-lime-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative flex size-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex size-2 animate-ping rounded-full bg-lime-300 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-lime-300" })]
						}), labels.eyebrow]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-display text-3xl tracking-tight",
						children: labels.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: labels.lead
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-lime-300/30 bg-lime-300/10 px-2.5 py-1 text-[10px] font-semibold tracking-[0.16em] text-lime-300",
						children: labels.preview
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "secondary",
						size: "sm",
						className: "h-9",
						onClick: () => setRunning((value) => !value),
						children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), running ? labels.pause : labels.resume]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 rounded-2xl border border-border bg-card/60 px-4 py-3 text-xs",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-2 font-semibold text-lime-300",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-3.5" }),
							" ",
							labels.live
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-muted-foreground",
						children: labels.connected
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted-foreground",
						children: [
							labels.updated,
							": ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
								className: "text-foreground",
								children: updatedAt.toLocaleTimeString()
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-cyan-300",
						children: ["12.4 ", labels.eps]
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_230px_280px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "min-w-0 rounded-2xl border border-border bg-card/40",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3 border-b border-border p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-4 text-lime-300" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-medium",
										children: labels.events
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-full bg-secondary px-2 py-0.5 text-[10px] text-subtle",
										children: visibleEvents.length
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 rounded-full border border-border bg-background px-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											value: query,
											onChange: (e) => setQuery(e.target.value),
											placeholder: labels.search,
											className: "h-8 w-28 bg-transparent text-xs outline-none placeholder:text-subtle sm:w-40"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "size-8",
										onClick: clearLog,
										"aria-label": labels.clear,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "ghost",
										size: "icon",
										className: "size-8",
										onClick: exportLog,
										"aria-label": labels.export,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" })
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-1 overflow-x-auto border-b border-border px-4 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, { className: "mr-1 mt-1 size-3.5 shrink-0 text-subtle" }), FILTERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setFilter(item),
								className: cn("rounded-full px-3 py-1.5 text-[11px]", filter === item ? "bg-secondary text-foreground" : "text-subtle hover:bg-secondary/60"),
								children: kindLabel(item, th)
							}, item))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "divide-y divide-border",
							children: [visibleEvents.map((event) => {
								const Icon = iconFor(event.kind);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setSelected(selected === event.id ? null : event.id),
									className: "flex w-full gap-3 p-4 text-left transition-colors duration-200 hover:bg-secondary/30",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: cn("mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full border border-border bg-background", event.accent),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex flex-wrap items-baseline justify-between gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "text-sm font-medium",
													children: event.title
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
													className: "text-[10px] text-subtle",
													children: event.timestamp
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-1 text-xs leading-relaxed text-muted-foreground",
												children: event.detail
											}),
											selected === event.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-3 flex items-center gap-2 border-t border-border pt-2 text-[10px] text-subtle",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "uppercase tracking-wider",
														children: kindLabel(event.kind, th)
													}),
													statusIcon(event.status),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: event.status ?? "received" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "ml-auto size-3.5" })
												]
											}) : null
										]
									})]
								}, event.id);
							}), visibleEvents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "p-10 text-center text-sm text-subtle",
								children: labels.noEvents
							}) : null]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card/40 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-4 text-cyan-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-medium",
								children: labels.analytics
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-3",
							children: [
								[
									labels.active,
									"07",
									"text-cyan-300"
								],
								[
									labels.messages,
									"128",
									"text-lime-300"
								],
								[
									labels.usage,
									"64%",
									"text-violet-300"
								],
								[
									labels.queue,
									"03",
									"text-amber-300"
								],
								[
									labels.errors,
									"0.8%",
									"text-rose-300"
								],
								[
									labels.quota,
									"82%",
									"text-amber-300"
								]
							].map(([label, value, color]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[11px] text-subtle",
									children: label
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
									className: cn("font-display text-lg", color),
									children: value
								})]
							}, label))
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card/40 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-xs font-medium",
								children: labels.activity
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex h-16 items-end gap-1",
								children: [
									26,
									42,
									30,
									55,
									45,
									68,
									52,
									78,
									64,
									88,
									70,
									96
								].map((height, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1 rounded-t bg-cyan-300/70 transition-all duration-200",
									style: { height: `${height}%` }
								}, index))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex justify-between text-[10px] text-subtle",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "-60m" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "now" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-5 text-xs font-medium",
								children: labels.heatmap
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 grid grid-cols-8 gap-1",
								children: Array.from({ length: 32 }, (_, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("aspect-square rounded-sm", [
									2,
									5,
									9,
									14,
									18,
									23,
									27,
									30
								].includes(index) ? "bg-lime-300" : [
									4,
									10,
									17,
									25
								].includes(index) ? "bg-lime-300/50" : "bg-secondary") }, index))
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card/40 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-medium",
									children: labels.similar
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-[10px] leading-relaxed text-subtle",
									children: labels.monthly
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-4 text-amber-300" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 grid grid-cols-2 gap-2",
								children: [
									[labels.visits, "—"],
									[labels.rank, "—"],
									[labels.bounce, "—"],
									[labels.sources, "—"]
								].map(([label, value]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg border border-border bg-background p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] text-subtle",
										children: label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-display text-lg",
										children: value
									})]
								}, label))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 rounded-lg border border-dashed border-border p-3 text-[10px] text-subtle",
								children: [labels.countries, ": —"]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card/40 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4 text-cyan-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-medium",
								children: labels.jobs
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 space-y-2",
							children: [
								[
									"TTS narration 01",
									"running",
									Volume2
								],
								[
									"Video clip 03",
									"queued",
									Video
								],
								[
									"Image hero",
									"succeeded",
									Check
								]
							].map(([title, status, Icon]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2 rounded-lg border border-border bg-background p-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5 text-cyan-300" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-[11px]",
											children: String(title)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] text-subtle",
											children: String(status)
										})]
									}),
									status === "running" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-3 animate-pulse text-cyan-300" }) : status === "queued" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-3 text-amber-300" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3 text-lime-300" })
								]
							}, String(title)))
						})]
					})]
				})
			]
		})]
	});
}
function toCsv(headers, rows) {
	const escape = (cell) => {
		const needs = /[",\n]/.test(cell);
		const value = cell.replace(/"/g, "\"\"");
		return needs ? `"${value}"` : value;
	};
	return [headers.map(escape).join(","), ...rows.map((row) => row.map(escape).join(","))].join("\n");
}
function DataTable({ title, headers, rows, className }) {
	const [copied, setCopied] = (0, import_react.useState)(false);
	const copyTable = async () => {
		const tsv = [headers.join("	"), ...rows.map((r) => r.join("	"))].join("\n");
		try {
			await navigator.clipboard.writeText(tsv);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1600);
		} catch {}
	};
	const downloadCsv = () => {
		const csv = toCsv(headers, rows);
		const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `${(title || "table").replace(/\s+/g, "-").toLowerCase()}.csv`;
		a.click();
		URL.revokeObjectURL(url);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("overflow-hidden rounded-2xl border border-border bg-card/60 shadow-sm", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3 border-b border-border px-3 py-2.5 sm:px-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-7 shrink-0 items-center justify-center rounded-lg border border-border bg-background text-cyan-300",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Table2, { className: "size-3.5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs font-medium text-foreground",
						children: title || "Table"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-[10px] text-subtle",
						children: [
							rows.length,
							" row",
							rows.length === 1 ? "" : "s",
							" · ",
							headers.length,
							" ",
							"col",
							headers.length === 1 ? "" : "s"
						]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					className: "size-8",
					onClick: () => void copyTable(),
					"aria-label": "Copy table",
					title: "Copy as TSV",
					children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5 text-lime-300" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCopy, { className: "size-3.5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					size: "icon",
					className: "size-8",
					onClick: downloadCsv,
					"aria-label": "Download CSV",
					title: "Download CSV",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-3.5" })
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "overflow-x-auto",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[320px] border-collapse text-left text-xs",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "bg-secondary/50",
					children: headers.map((header, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						className: "whitespace-nowrap border-b border-border px-3 py-2.5 font-medium text-foreground sm:px-4",
						children: header
					}, i))
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rows.map((row, ri) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", {
					className: "transition-colors hover:bg-secondary/30",
					children: row.map((cell, ci) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "border-b border-border/70 px-3 py-2.5 text-muted-foreground sm:px-4",
						children: cell || /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-subtle/60",
							children: "—"
						})
					}, ci))
				}, ri)) })]
			})
		})]
	});
}
function isTableRow(line) {
	const trimmed = line.trim();
	if (!trimmed.startsWith("|")) return false;
	return trimmed.split("|").length >= 3;
}
function isSeparatorRow(line) {
	const trimmed = line.trim();
	if (!trimmed.startsWith("|")) return false;
	const cleaned = trimmed.replace(/\|/g, "").trim();
	return /^[\s\-:]+$/.test(cleaned);
}
function splitCells(line) {
	return line.trim().replace(/^\|/, "").replace(/\|$/, "").split("|").map((cell) => cell.trim());
}
function extractTitle(line) {
	return line.replace(/\*\*/g, "").replace(/^[#\s]*/, "").replace(/^[🎯📊📋✅❌🌱💎👤💜🔍📈📉🗓️]\s*/, "").trim() || "Table";
}
/**
* Parse markdown into ordered blocks of text and tables.
* Preserves surrounding prose while extracting well-formed GFM tables.
*/
function parseMarkdownTables(markdown) {
	const lines = markdown.split("\n");
	const blocks = [];
	let textBuffer = [];
	let i = 0;
	const flushText = () => {
		const text = textBuffer.join("\n").trim();
		if (text) blocks.push({
			type: "text",
			text
		});
		textBuffer = [];
	};
	while (i < lines.length) {
		const line = lines[i];
		if (isTableRow(line) && i + 1 < lines.length && isSeparatorRow(lines[i + 1])) {
			let title = "Table";
			if (textBuffer.length > 0) {
				const last = textBuffer[textBuffer.length - 1].trim();
				if (last && !isTableRow(last)) {
					title = extractTitle(last);
					textBuffer.pop();
				}
			}
			flushText();
			const headers = splitCells(line);
			i += 2;
			const rows = [];
			while (i < lines.length && isTableRow(lines[i])) {
				const cells = splitCells(lines[i]);
				while (cells.length < headers.length) cells.push("");
				rows.push(cells.slice(0, headers.length));
				i++;
			}
			blocks.push({
				type: "table",
				table: {
					title,
					headers,
					rows
				}
			});
			continue;
		}
		textBuffer.push(line);
		i++;
	}
	flushText();
	return blocks;
}
/** True when the markdown contains at least one GFM table. */
function hasMarkdownTable(markdown) {
	return parseMarkdownTables(markdown).some((b) => b.type === "table");
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
function renderTextBlock(text, keyBase) {
	return text.split(/```([\s\S]*?)```/g).map((chunk, ci) => {
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
			}, `${keyBase}-code-${ci}`);
		}
		return chunk.split(/\n{2,}/).map((block, bi) => {
			if (!block.trim()) return null;
			const lines = block.split("\n");
			if (/^#{1,3}\s/.test(lines[0] ?? "")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-base tracking-tight text-foreground",
				children: inline(lines[0].replace(/^#{1,3}\s+/, ""), `${keyBase}-${ci}-${bi}`)
			}, `${keyBase}-${ci}-${bi}`);
			if (lines.filter((l) => l.trim()).every((l) => /^[-*]\s+/.test(l) || /^\d+\.\s+/.test(l))) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-1.5 pl-4",
				children: lines.filter((l) => l.trim()).map((l, li) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					className: "list-disc text-muted-foreground",
					children: inline(l.replace(/^([-*]|\d+\.)\s+/, ""), `${keyBase}-${ci}-${bi}-${li}`)
				}, li))
			}, `${keyBase}-${ci}-${bi}`);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-pretty text-muted-foreground",
				children: lines.map((line, li) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [li > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}) : null, inline(line, `${keyBase}-${ci}-${bi}-${li}`)] }, li))
			}, `${keyBase}-${ci}-${bi}`);
		});
	});
}
function Markdown({ text, content, className }) {
	const source = text ?? content ?? "";
	if (!hasMarkdownTable(source)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("space-y-3 text-sm leading-relaxed text-foreground", className),
		children: renderTextBlock(source, "md")
	});
	const blocks = parseMarkdownTables(source);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("space-y-3 text-sm leading-relaxed text-foreground", className),
		children: blocks.map((block, i) => {
			if (block.type === "table") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
				title: block.table.title,
				headers: block.table.headers,
				rows: block.table.rows
			}, `table-${i}`);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: renderTextBlock(block.text, `t${i}`)
			}, `text-${i}`);
		})
	});
}
function MemoryPanel() {
	const [insights, setInsights] = (0, import_react.useState)([]);
	const [errors, setErrors] = (0, import_react.useState)(0);
	const [successes, setSuccesses] = (0, import_react.useState)(0);
	const [rate, setRate] = (0, import_react.useState)(0);
	const refresh = (0, import_react.useCallback)(() => {
		const memory = loadMemory();
		setInsights(getDailyInsights());
		setErrors(memory.errors.length);
		setSuccesses(memory.successes.length);
		setRate(getSuccessRate());
	}, []);
	(0, import_react.useEffect)(() => {
		refresh();
	}, [refresh]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-violet-400/25 bg-violet-400/5 p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-sm font-medium text-violet-300",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "size-4" }), "Skill Memory"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "ghost",
					className: "h-7 gap-1 text-[11px]",
					onClick: refresh,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3" }), "Refresh"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-background/70 p-3 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl text-rose-300",
							children: errors
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-subtle",
							children: "errors"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-background/70 p-3 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-xl text-lime-300",
							children: successes
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-subtle",
							children: "successes"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-background/70 p-3 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-xl text-cyan-300",
							children: [(rate * 100).toFixed(0), "%"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] text-subtle",
							children: "success rate"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium text-foreground",
					children: "Today"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 space-y-1.5",
					children: insights.map((line, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "text-[11px] leading-relaxed text-muted-foreground",
						children: ["• ", line]
					}, i))
				})]
			})
		]
	});
}
function TerminalBlock({ title = "Terminal", command, output, status, duration }) {
	const scrollRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		scrollRef.current?.scrollTo({
			top: scrollRef.current.scrollHeight,
			behavior: "smooth"
		});
	}, [output]);
	const statusText = status === "running" ? "running…" : status === "done" ? `done${duration != null ? ` · ${duration}ms` : ""}` : "error";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "overflow-hidden rounded-2xl border border-border bg-[#0d0d0d] font-mono text-xs",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-2 border-b border-white/10 bg-[#1a1a1a] px-3 py-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-[#ff5f56]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-[#ffbd2e]" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2.5 rounded-full bg-[#27c93f]" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] text-white/50",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: cn("text-[10px]", status === "running" && "text-amber-300", status === "done" && "text-lime-300", status === "error" && "text-rose-300"),
						children: statusText
					})
				]
			}),
			command ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-b border-white/5 bg-black/40 px-3 py-2 text-[11px] text-violet-300",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mr-1.5 text-lime-300",
					children: "$"
				}), command]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: scrollRef,
				className: "max-h-72 overflow-y-auto px-3 py-3 text-[11px] leading-relaxed text-zinc-300",
				children: output ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("pre", {
					className: "whitespace-pre-wrap break-words font-mono",
					children: [output, status === "running" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-lime-300 align-middle" }) : null]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "italic text-zinc-500",
					children: status === "running" ? "waiting…" : "(no output)"
				})
			})
		]
	});
}
function SkillCallCard({ call, onApprove, onReject }) {
	const meta = SKILLS.find((s) => s.id === call.skillId);
	const pending = call.status === "pending";
	const running = call.status === "running";
	const terminalStatus = call.status === "error" ? "error" : call.status === "done" ? "done" : "running";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("rounded-2xl border p-3", pending ? "border-amber-300/30 bg-amber-300/5" : "border-violet-400/25 bg-violet-400/5"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-xs font-medium text-violet-300",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: meta?.icon ?? "🛠️" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: meta?.nameTh ?? call.skillId }),
					running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin text-cyan-300" }) : null,
					pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "ml-auto inline-flex items-center gap-1 text-[10px] text-amber-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3" }), " needs approval"]
					}) : null
				]
			}),
			Object.keys(call.args).length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
				className: "mt-2 max-h-32 overflow-auto rounded-lg border border-border bg-background/80 p-2 font-mono text-[10px] text-muted-foreground",
				children: JSON.stringify(call.args, null, 2)
			}) : null,
			pending ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					className: "h-8",
					onClick: onApprove,
					children: "Approve"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					variant: "ghost",
					className: "h-8",
					onClick: onReject,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" }), " Reject"]
				})]
			}) : null,
			(call.streamOutput || running || call.status === "done" || call.status === "error") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalBlock, {
					title: meta?.name ?? call.skillId,
					command: call.skillId,
					output: call.streamOutput ?? (call.error ? `❌ ${call.error}` : ""),
					status: terminalStatus,
					duration: call.duration
				})
			})
		]
	});
}
function SkillsLabPanel() {
	const th = useBossStore((s) => s.language) === "th";
	const [input, setInput] = (0, import_react.useState)("");
	const [call, setCall] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const run = async (seed) => {
		const next = seed ?? createSkillCall(input) ?? {
			id: `skill_${Date.now().toString(36)}`,
			skillId: "daily-fixer",
			args: { action: "get-insights" },
			status: "running"
		};
		if (next.status === "pending" && !seed) {
			setCall(next);
			return;
		}
		setBusy(true);
		setCall({
			...next,
			status: "running",
			streamOutput: ""
		});
		const updated = await executeSkill({
			...next,
			status: "running"
		}, (chunk) => {
			setCall((prev) => prev ? {
				...prev,
				streamOutput: (prev.streamOutput ?? "") + chunk,
				status: "running"
			} : prev);
		});
		setCall(updated);
		setBusy(false);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "rounded-2xl border border-border bg-card/50 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-4 text-violet-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: th ? "ห้องทดลองทักษะ" : "Skills Lab"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[11px] text-muted-foreground",
						children: th ? "รัน skill แบบปลอดภัยในเบราว์เซอร์ — ไม่แทนที่แชทหลัก" : "Browser-safe skills — does not replace the main chat"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-1.5",
						children: SKILLS.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "rounded-full border border-border bg-background px-2.5 py-1 text-[10px] text-muted-foreground hover:bg-secondary",
							onClick: () => setInput(skill.id === "code-runner" ? "รันโค้ดนี้:\n```js\nconsole.log(\"BossnuGrok ready\")\nconst sum = [1,2,3].reduce((a,b)=>a+b,0)\nconsole.log(\"sum\", sum)\n```" : skill.id === "web-search" ? "ค้นหา multi-agent systems 2026" : skill.id === "link-follower" ? "อ่านลิงก์ https://example.com" : skill.id === "doc-reader" ? "อ่านเอกสาร สรุปสั้น: BossnuGrok is an AI commander workspace with agents, sandbox, and skills." : "ดูบทเรียนวันนี้"),
							children: [
								skill.icon,
								" ",
								th ? skill.nameTh : skill.name
							]
						}, skill.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						value: input,
						onChange: (e) => setInput(e.target.value),
						placeholder: th ? "พิมพ์คำสั่ง skill…" : "Type a skill command…",
						className: "mt-3 min-h-[88px] resize-none border-border bg-background",
						disabled: busy
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: "h-9 gap-1.5",
							disabled: busy || !input.trim(),
							onClick: () => void run(),
							children: [busy ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), th ? "รันทักษะ" : "Run skill"]
						})
					})
				]
			}),
			call ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillCallCard, {
				call,
				onApprove: () => void run({
					...call,
					status: "running"
				}),
				onReject: () => setCall(null)
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MemoryPanel, {})
		]
	});
}
var chatGrok = createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("7e07b01eafd062e35c7d52d1f74f2d478cd3a47e70d72e8193c87df3f0482d0a"));
createServerFn({ method: "POST" }).validator((input) => input).handler(createSsrRpc("ed8b339efa8a2cab68902bd9dbbfb7a4c7fb5209b805a609339a84872d18318b"));
function GrokSuperPanel() {
	const language = useBossStore((s) => s.language);
	const agents = useBossStore((s) => s.agents);
	const setActiveAgent = useBossStore((s) => s.setActiveAgent);
	const setWorkspaceMode = useBossStore((s) => s.setWorkspaceMode);
	const ensureConversation = useBossStore((s) => s.ensureConversation);
	const appendMessage = useBossStore((s) => s.appendMessage);
	const bumpMessageCount = useBossStore((s) => s.bumpMessageCount);
	const th = language === "th";
	const [mission, setMission] = (0, import_react.useState)("");
	const [selected, setSelected] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [replies, setReplies] = (0, import_react.useState)([]);
	const [running, setRunning] = (0, import_react.useState)(false);
	const [now, setNow] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	(0, import_react.useEffect)(() => {
		if (agents.length > 0 && selected.size === 0) setSelected(new Set(agents.map((a) => a.id)));
	}, [agents]);
	const alliance = (0, import_react.useMemo)(() => agents.filter((a) => selected.has(a.id)), [agents, selected]);
	const toggleAgent = (id) => {
		setSelected((prev) => {
			const next = new Set(prev);
			if (next.has(id)) next.delete(id);
			else next.add(id);
			return next;
		});
	};
	const selectAll = () => setSelected(new Set(agents.map((a) => a.id)));
	const clearAll = () => setSelected(/* @__PURE__ */ new Set());
	const briefAlliance = async () => {
		const text = mission.trim();
		if (!text || alliance.length === 0 || running) return;
		setRunning(true);
		const initial = alliance.map((a) => ({
			agentId: a.id,
			role: a.role,
			name: roleLabel(a.role, language),
			status: "thinking",
			text: ""
		}));
		setReplies(initial);
		await Promise.all(alliance.map(async (agent) => {
			const system = generateSystemPrompt(agent, language);
			const conversationId = ensureConversation(agent.id);
			appendMessage(conversationId, {
				id: uid("msg"),
				role: "user",
				content: text,
				createdAt: Date.now()
			});
			bumpMessageCount(agent.id);
			try {
				const result = await chatGrok({ data: {
					system,
					messages: [{
						role: "user",
						content: text
					}]
				} });
				if (result.ok) {
					appendMessage(conversationId, {
						id: uid("msg"),
						role: "assistant",
						content: result.text,
						createdAt: Date.now(),
						model: result.model
					});
					bumpMessageCount(agent.id);
					setReplies((prev) => prev.map((r) => r.agentId === agent.id ? {
						...r,
						status: "done",
						text: result.text,
						model: result.model
					} : r));
				} else setReplies((prev) => prev.map((r) => r.agentId === agent.id ? {
					...r,
					status: "error",
					text: result.error
				} : r));
			} catch (err) {
				const msg = err instanceof Error ? err.message : String(err);
				setReplies((prev) => prev.map((r) => r.agentId === agent.id ? {
					...r,
					status: "error",
					text: msg
				} : r));
			}
		}));
		setRunning(false);
	};
	const openAgent = (agent) => {
		setActiveAgent(agent.id);
		setWorkspaceMode("command");
	};
	const labels = th ? {
		eyebrow: "GROKSUPER ALLIANCE",
		title: "พันมิตร GrokSuper",
		lead: "ส่งภารกิจเดียวไปยังเอเจนต์หลายตัวพร้อมกัน แล้วสังเคราะห์คำตอบแบบเรียลไทม์",
		live: "LIVE",
		select: "เลือกพันมิตร",
		all: "เลือกทั้งหมด",
		none: "ล้าง",
		mission: "ภารกิจร่วม",
		missionPh: "เช่น วิเคราะห์ตลาด + ออกแบบแผน + เขียนสรุปสำหรับผู้บริหาร",
		brief: "สั่งพันมิตร",
		briefing: "กำลังสั่งการ…",
		replies: "คำตอบจากพันมิตร",
		empty: "ยังไม่มีคำตอบ สั่งภารกิจด้านบน",
		thinking: "กำลังคิด",
		done: "เสร็จ",
		error: "ผิดพลาด",
		open: "เปิดแชท",
		members: "สมาชิก",
		skills: "ทักษะ + ความจำ"
	} : {
		eyebrow: "GROKSUPER ALLIANCE",
		title: "GrokSuper Alliance",
		lead: "Broadcast one mission to multiple agents in parallel and get real-time replies",
		live: "LIVE",
		select: "Select alliance",
		all: "Select all",
		none: "Clear",
		mission: "Shared mission",
		missionPh: "e.g. Analyse the market, design a plan, and write an executive summary",
		brief: "Brief alliance",
		briefing: "Briefing…",
		replies: "Alliance replies",
		empty: "No replies yet. Brief a mission above.",
		thinking: "Thinking",
		done: "Done",
		error: "Error",
		open: "Open chat",
		members: "Members",
		skills: "Skills + Memory"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col overflow-y-auto",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "border-b border-border px-4 py-5 sm:px-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-yellow-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5" }), labels.eyebrow]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl tracking-tight",
							children: labels.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 max-w-2xl text-sm text-muted-foreground",
							children: labels.lead
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 rounded-full border border-lime-300/30 bg-lime-300/10 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-lime-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative flex size-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex size-1.5 animate-ping rounded-full bg-lime-300 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-1.5 rounded-full bg-lime-300" })]
							}), labels.live]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-[10px] text-muted-foreground",
							children: now.toLocaleTimeString(th ? "th-TH" : "en-US", {
								hour: "2-digit",
								minute: "2-digit",
								second: "2-digit"
							})
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 p-4 sm:p-6 xl:grid-cols-[280px_minmax(0,1fr)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card/50 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4 text-yellow-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "text-sm font-medium",
										children: labels.select
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "rounded-full bg-secondary px-2 py-0.5 text-[10px] text-subtle",
									children: [
										alliance.length,
										"/",
										agents.length
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "secondary",
									className: "h-7 flex-1 text-[11px]",
									onClick: selectAll,
									children: labels.all
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "ghost",
									className: "h-7 flex-1 text-[11px]",
									onClick: clearAll,
									children: labels.none
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 max-h-[420px] space-y-1.5 overflow-y-auto",
								children: agents.map((agent) => {
									const active = selected.has(agent.id);
									const Icon = ROLE_META[agent.role].icon;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => toggleAgent(agent.id),
										className: cn("flex w-full items-center gap-2.5 rounded-xl border px-3 py-2.5 text-left transition-colors", active ? "border-yellow-300/40 bg-yellow-300/10" : "border-border bg-background hover:bg-secondary/40"),
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: cn("flex size-8 shrink-0 items-center justify-center rounded-lg border", active ? "border-yellow-300/40 text-yellow-300" : "border-border text-muted-foreground"),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "min-w-0 flex-1",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "truncate text-xs font-medium",
													children: roleLabel(agent.role, language)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "truncate text-[10px] text-subtle",
													children: [agent.task.slice(0, 42), agent.task.length > 42 ? "…" : ""]
												})]
											}),
											active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 shrink-0 text-yellow-300" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDashed, { className: "size-3.5 shrink-0 text-subtle" })
										]
									}, agent.id);
								})
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card/50 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { className: "size-4 text-cyan-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "text-sm font-medium",
								children: labels.members
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[11px] leading-relaxed text-muted-foreground",
							children: th ? "พันมิตรที่เลือกจะได้รับภารกิจพร้อมกัน และคำตอบจะถูกบันทึกในประวัติของแต่ละเอเจนต์" : "Selected agents receive the mission in parallel. Replies are saved to each agent’s history."
						})]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card/50 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-yellow-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-medium",
									children: labels.mission
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								value: mission,
								onChange: (e) => setMission(e.target.value),
								placeholder: labels.missionPh,
								className: "mt-3 min-h-[100px] resize-none border-border bg-background",
								disabled: running
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center justify-between gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-[10px] text-subtle",
									children: [
										alliance.length,
										" ",
										th ? "เอเจนต์จะได้รับคำสั่ง" : "agents will receive the brief"
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									size: "sm",
									className: "h-9 gap-1.5",
									disabled: running || !mission.trim() || alliance.length === 0,
									onClick: () => void briefAlliance(),
									children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" }), running ? labels.briefing : labels.brief]
								})]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "rounded-2xl border border-border bg-card/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-4 text-lime-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-medium",
									children: labels.replies
								})]
							}), replies.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "rounded-full bg-secondary px-2 py-0.5 text-[10px] text-subtle",
								children: [
									replies.filter((r) => r.status === "done").length,
									"/",
									replies.length
								]
							}) : null]
						}), replies.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "p-10 text-center text-sm text-subtle",
							children: labels.empty
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "divide-y divide-border",
							children: replies.map((reply) => {
								const agent = agents.find((a) => a.id === reply.agentId);
								const Icon = (agent ? ROLE_META[agent.role] : null)?.icon ?? Sparkles;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex size-8 items-center justify-center rounded-lg border border-border bg-background text-yellow-300",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" })
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm font-medium",
												children: reply.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-[10px] text-subtle",
												children: [reply.status === "thinking" ? labels.thinking : reply.status === "done" ? labels.done : labels.error, reply.model ? ` · ${reply.model}` : ""]
											})] })]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "flex items-center gap-2",
											children: [reply.status === "thinking" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-3.5 animate-spin text-cyan-300" }) : reply.status === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-3.5 text-lime-300" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDashed, { className: "size-3.5 text-rose-300" }), agent ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												size: "sm",
												variant: "ghost",
												className: "h-7 text-[11px]",
												onClick: () => openAgent(agent),
												children: labels.open
											}) : null]
										})]
									}), reply.text ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 rounded-xl border border-border bg-background/80 p-3 text-sm leading-relaxed",
										children: reply.status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-rose-300",
											children: reply.text
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Markdown, { content: reply.text })
									}) : null]
								}, reply.agentId);
							})
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-border p-4 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-3 text-[10px] font-semibold tracking-[0.18em] text-violet-300",
					children: labels.skills
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkillsLabPanel, {})]
			})
		]
	});
}
var SRC_WRAP = (code) => `<!doctype html><html><head><meta charset="utf-8" /><style>html,body{margin:0;background:#0a0b0d;color:#eceef1;font:13px/1.45 ui-monospace,monospace}#root{padding:12px}</style></head><body><div id="root"></div><script>(function(){function send(kind,text){parent.postMessage({source:"bossnugrok-sandbox",kind,text:String(text)},"*")}console.log=function(){send("log",Array.from(arguments).map(String).join(" "))};console.error=function(){send("err",Array.from(arguments).map(String).join(" "))};window.onerror=function(m){send("err",m)};try{${code.replace(/<\/script/gi, "<\\/script")} }catch(e){send("err",e&&e.stack?e.stack:e)}})();<\/script></body></html>`;
function SandboxPanel() {
	const language = useBossStore((s) => s.language);
	const t = COPY[language];
	const sandboxCode = useBossStore((s) => s.sandboxCode);
	const setSandboxCode = useBossStore((s) => s.setSandboxCode);
	const { status } = usePuterAuth();
	const signedIn = status === "signed_in";
	const models = (0, import_react.useMemo)(() => allKnownModels(), []);
	const [tab, setTab] = (0, import_react.useState)("prompt");
	const [model, setModel] = (0, import_react.useState)("qwen3.5");
	const [system, setSystem] = (0, import_react.useState)(() => generateSystemPrompt(CORE_BOSS, language));
	const [prompt, setPrompt] = (0, import_react.useState)("สรุปว่าตอนนี้ BossnuGrok มีโหมด เครื่องมือ และทักษะอะไรที่บอทเรียกใช้ได้บ้าง");
	const [temperature, setTemperature] = (0, import_react.useState)("0.45");
	const [maxTokens, setMaxTokens] = (0, import_react.useState)("800");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [output, setOutput] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [history, setHistory] = (0, import_react.useState)([]);
	const [nonce, setNonce] = (0, import_react.useState)(0);
	const [logs, setLogs] = (0, import_react.useState)([]);
	const srcDoc = (0, import_react.useMemo)(() => nonce === 0 ? "<!doctype html><title>idle</title>" : SRC_WRAP(sandboxCode), [nonce, sandboxCode]);
	(0, import_react.useEffect)(() => {
		try {
			localStorage.setItem("bossg:prompt-lab-system", system);
			localStorage.setItem("bossg:prompt-lab-user", prompt);
		} catch {}
	}, [system, prompt]);
	(0, import_react.useEffect)(() => {
		const onMsg = (ev) => {
			const d = ev.data;
			if (!d || d.source !== "bossnugrok-sandbox") return;
			const entry = {
				kind: d.kind === "err" ? "err" : "log",
				text: String(d.text ?? "")
			};
			setLogs((prev) => [...prev, entry].slice(-80));
		};
		window.addEventListener("message", onMsg);
		return () => window.removeEventListener("message", onMsg);
	}, []);
	const runPrompt = async () => {
		if (!prompt.trim() || busy) return;
		setBusy(true);
		setError("");
		setOutput("");
		const started = performance.now();
		try {
			const result = await chatWithPuter({
				messages: [{
					role: "system",
					content: system
				}, {
					role: "user",
					content: prompt
				}],
				pinnedModel: model,
				preferTestMode: !signedIn,
				onDelta: setOutput
			});
			const text = result.text || output || "(empty response)";
			setOutput(text);
			setHistory((prev) => [{
				id: Date.now(),
				model: result.model.id,
				prompt,
				output: text,
				ms: Math.round(performance.now() - started),
				ok: true
			}, ...prev].slice(0, 12));
		} catch (err) {
			const message = err instanceof Error ? err.message : "Model did not respond";
			setError(message);
			setHistory((prev) => [{
				id: Date.now(),
				model,
				prompt,
				output: message,
				ms: Math.round(performance.now() - started),
				ok: false
			}, ...prev].slice(0, 12));
		} finally {
			setBusy(false);
		}
	};
	const runCode = () => {
		setLogs([]);
		setNonce((n) => n + 1);
	};
	const copyOutput = () => void navigator.clipboard?.writeText(output);
	const th = language === "th";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-border px-4 py-3 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-9 items-center justify-center rounded-xl border border-border bg-secondary text-lime-300",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FlaskConical, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-[0.2em] text-subtle",
						children: th ? "LAB MODE" : "LAB MODE"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl tracking-tight",
						children: th ? "Prompt Lab" : "Prompt Lab"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex rounded-full border border-border p-0.5 text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `rounded-full px-3 py-1.5 ${tab === "prompt" ? "bg-secondary text-foreground" : "text-subtle"}`,
						onClick: () => setTab("prompt"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "mr-1 inline size-3.5" }), "Prompt"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `rounded-full px-3 py-1.5 ${tab === "code" ? "bg-secondary text-foreground" : "text-subtle"}`,
						onClick: () => setTab("code"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Braces, { className: "mr-1 inline size-3.5" }), "Code"]
					})]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: th ? "ทดลอง prompt และโมเดลหลายแบบใน workspace เดียว" : "Test prompts and multiple models in one workspace"
			})]
		}), tab === "prompt" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid min-h-0 flex-1 gap-4 overflow-y-auto p-4 sm:p-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_280px]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "space-y-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card/50 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "text-xs font-medium",
									children: th ? "โมเดล" : "Model"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-lime-300",
									children: signedIn ? "Puter connected" : "Puter sign-in required"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: model,
								onChange: (e) => setModel(e.target.value),
								className: "mt-2 h-10 w-full rounded-xl border border-border bg-background px-3 text-xs outline-none",
								children: models.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
									value: item.id,
									children: [
										item.label,
										" · ",
										item.vendor
									]
								}, item.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 grid grid-cols-2 gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-[10px] text-subtle",
									children: ["Temperature", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: temperature,
										onChange: (e) => setTemperature(e.target.value),
										className: "mt-1 h-9 w-full rounded-lg border border-border bg-background px-2 text-xs outline-none"
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "text-[10px] text-subtle",
									children: ["Max tokens", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: maxTokens,
										onChange: (e) => setMaxTokens(e.target.value),
										className: "mt-1 h-9 w-full rounded-lg border border-border bg-background px-2 text-xs outline-none"
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[10px] text-subtle",
								children: th ? `ค่าพารามิเตอร์แสดงเพื่อเทียบการทดลอง · ${shortModelLabel(model)}` : `Parameters are shown for experiment notes · ${shortModelLabel(model)}`
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card/50 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "text-xs font-medium",
								children: "System prompt"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: system,
								onChange: (e) => setSystem(e.target.value),
								rows: 4,
								className: "mt-2 w-full resize-y rounded-xl border border-border bg-background p-3 text-xs leading-relaxed outline-none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
								className: "mt-4 block text-xs font-medium",
								children: "User prompt"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								value: prompt,
								onChange: (e) => setPrompt(e.target.value),
								rows: 7,
								className: "mt-2 w-full resize-y rounded-xl border border-border bg-background p-3 text-sm leading-relaxed outline-none"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										onClick: () => void runPrompt(),
										disabled: busy || !prompt.trim(),
										className: "h-10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: "size-3.5" }), busy ? "Running…" : "Run prompt"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "secondary",
										onClick: () => {
											setPrompt("");
											setOutput("");
											setError("");
										},
										className: "h-10",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eraser, { className: "size-3.5" }), "Clear"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "flex items-center rounded-lg border border-border px-3 text-[10px] text-lime-300",
										children: "บอทเรียกใช้ได้: “เรียก Prompt Lab …”"
									})
								]
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs text-destructive",
								children: error
							}) : null
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "flex min-h-[360px] flex-col rounded-2xl border border-border bg-card/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "Output"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-[10px] text-subtle",
							children: [
								shortModelLabel(model),
								" · ",
								temperature,
								" temp · ",
								maxTokens,
								" max"
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							size: "icon",
							className: "size-8",
							onClick: copyOutput,
							"aria-label": "Copy output",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" })
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "boss-scroll flex-1 overflow-y-auto p-4 text-sm leading-7",
						children: busy && !output ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "animate-pulse text-subtle",
							children: "Model is thinking…"
						}) : output ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "whitespace-pre-wrap",
							children: output
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-subtle",
							children: "Run a prompt to see the response."
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-2xl border border-border bg-card/50",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between border-b border-border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-sm font-medium",
							children: "Run history"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-4 text-subtle" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "divide-y divide-border",
						children: history.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "p-5 text-xs text-subtle",
							children: "No runs yet."
						}) : history.map((run) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setModel(run.model);
								setPrompt(run.prompt);
								setOutput(run.output);
							},
							className: "w-full p-3 text-left hover:bg-secondary/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate text-xs font-medium",
										children: shortModelLabel(run.model)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: run.ok ? "text-lime-300" : "text-rose-300",
										children: run.ok ? "OK" : "ERR"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 line-clamp-2 text-[10px] text-muted-foreground",
									children: run.prompt
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-[10px] text-subtle",
									children: [run.ms, "ms"]
								})
							]
						}, run.id))
					})]
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid min-h-0 flex-1 grid-rows-2 lg:grid-cols-2 lg:grid-rows-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-col border-b border-border lg:border-b-0 lg:border-r",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border px-4 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-[10px] uppercase tracking-wider text-subtle",
						children: "JavaScript Sandbox"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						className: "h-8",
						onClick: runCode,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), t.sandboxRun]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
					value: sandboxCode,
					onChange: (e) => setSandboxCode(e.target.value),
					spellCheck: false,
					className: "boss-scroll h-full min-h-[180px] resize-none bg-background p-4 font-mono text-xs text-foreground outline-none"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("iframe", {
					title: "sandbox",
					sandbox: "allow-scripts",
					srcDoc,
					className: "h-1/2 min-h-[120px] w-full border-b border-border bg-background"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "boss-scroll min-h-0 flex-1 overflow-y-auto bg-card px-4 py-3 font-mono text-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-[10px] uppercase tracking-wider text-subtle",
						children: t.sandboxConsole
					}), logs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-subtle",
						children: "—"
					}) : logs.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: l.kind === "err" ? "text-destructive" : "text-muted-foreground",
						children: l.text
					}, i))]
				})]
			})]
		})]
	});
}
var HELP = [
	"help",
	"status",
	"agents",
	"models",
	"clear"
];
function TerminalPanel() {
	const [command, setCommand] = (0, import_react.useState)("");
	const [lines, setLines] = (0, import_react.useState)([{
		type: "output",
		text: "GrokSuper Terminal v0.1 · browser-safe preview"
	}, {
		type: "output",
		text: "Type help to see available commands."
	}]);
	const prompt = (0, import_react.useMemo)(() => typeof window === "undefined" ? "bossg@web" : "bossg@" + window.location.hostname, []);
	const run = () => {
		const value = command.trim();
		if (!value) return;
		if (value === "clear") {
			setLines([]);
			setCommand("");
			return;
		}
		const output = value === "help" ? {
			type: "output",
			text: "help · status · agents · models · clear"
		} : value === "status" ? {
			type: "output",
			text: "LIVE preview · Puter optional · no server shell access"
		} : value === "agents" ? {
			type: "output",
			text: "Commander online · specialists ready"
		} : value === "models" ? {
			type: "output",
			text: "Auto · Grok · Puter catalog (when connected)"
		} : {
			type: "error",
			text: `Command not available in preview: ${value}`
		};
		const nextLines = [{
			type: "command",
			text: value
		}, output];
		setLines((prev) => [...prev, ...nextLines].slice(-40));
		setCommand("");
	};
	const reset = () => setLines([{
		type: "output",
		text: "Terminal reset. Browser-safe preview ready."
	}]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col bg-[#090b0d] text-[#d9ff3f]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Terminal, { className: "size-4" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] tracking-[0.2em] text-white/40",
						children: "GROKSUPER TOOL"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl text-white",
						children: "Terminal"
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "ghost",
					size: "sm",
					className: "text-white/50 hover:text-white",
					onClick: reset,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), " Reset"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2 border-b border-white/10 px-4 py-3 text-[11px] text-white/50 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "size-2 fill-lime-300 text-lime-300" }), " Browser-safe"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "No OS shell access" }),
					HELP.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "rounded-md border border-white/10 px-2 py-1 font-mono hover:border-lime-300/50 hover:text-lime-200",
						onClick: () => setCommand(item),
						children: item
					}, item))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto p-4 font-mono text-xs leading-6 sm:p-6",
				children: lines.map((line, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: cn(line.type === "command" ? "text-white" : line.type === "error" ? "text-rose-300" : "text-white/60"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: line.type === "command" ? "text-lime-300" : "text-white/20",
						children: line.type === "command" ? `${prompt} $ ` : "  "
					}), line.text]
				}, `${index}-${line.text}`))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-t border-white/10 p-4 sm:p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-3 py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 shrink-0 text-lime-300" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: command,
							onChange: (e) => setCommand(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter") run();
							},
							placeholder: "ลองพิมพ์ help หรือ status",
							className: "min-w-0 flex-1 bg-transparent font-mono text-xs text-white outline-none placeholder:text-white/25"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							className: "h-8",
							onClick: run,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), " Run"]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-[10px] text-white/30",
					children: "Terminal v0 เป็น command simulator ที่ปลอดภัย ไม่รันคำสั่งบนเซิร์ฟเวอร์"
				})]
			})
		]
	});
}
var MANUS_TOOL_REGISTRY = [
	{
		id: "manus.task.create",
		label: "Create Task",
		description: "สร้างงาน Manus จริง",
		endpoint: "/api/manus?action=create",
		status: "live"
	},
	{
		id: "manus.task.send",
		label: "Continue Task",
		description: "ส่งข้อความต่อให้ task เดิม",
		endpoint: "/api/manus action=send",
		status: "live"
	},
	{
		id: "manus.task.detail",
		label: "Task Detail",
		description: "อ่านสถานะและ metadata ของ task",
		endpoint: "/api/manus?action=task",
		status: "live"
	},
	{
		id: "manus.task.messages",
		label: "Task Messages",
		description: "อ่าน event/message ของ task",
		endpoint: "/api/manus?action=messages",
		status: "live"
	},
	{
		id: "manus.task.stop",
		label: "Stop Task",
		description: "หยุด task ที่กำลังทำงาน",
		endpoint: "/api/manus action=stop",
		status: "live"
	},
	{
		id: "manus.task.confirm",
		label: "Confirm Action",
		description: "ยืนยัน action ที่ Manus รอการอนุมัติ",
		endpoint: "/api/manus action=confirm",
		status: "live"
	},
	{
		id: "manus.project.list",
		label: "Projects",
		description: "อ่าน project จริงจาก Manus",
		endpoint: "/api/manus?action=projects",
		status: "live"
	},
	{
		id: "manus.project.create",
		label: "Create Project",
		description: "สร้าง project จริงใน Manus",
		endpoint: "/api/manus action=createProject",
		status: "live"
	},
	{
		id: "manus.connector.list",
		label: "Connectors",
		description: "อ่าน connector ที่บัญชี Manus authorize แล้ว",
		endpoint: "/api/manus?action=connectors",
		status: "live"
	},
	{
		id: "manus.skill.list",
		label: "Skills",
		description: "อ่าน skill จริงและนำ ID ไป enable/force ใน task",
		endpoint: "/api/manus?action=skills",
		status: "live"
	},
	{
		id: "manus.browser.list",
		label: "My Browser",
		description: "อ่าน browser session ที่ Manus เปิดให้ใช้จริง",
		endpoint: "/api/manus?action=browsers",
		status: "live"
	},
	{
		id: "manus.file.upload",
		label: "File Upload",
		description: "เตรียมการอัปโหลดไฟล์ผ่าน Manus presigned URL",
		endpoint: "/api/manus action=uploadPrepare",
		status: "live"
	},
	{
		id: "puter.mcp",
		label: "Puter MCP",
		description: "Bridge สำหรับให้ MCP-compatible agent ใช้ Puter resources",
		requires: ["Puter OAuth"],
		status: "bridge-required"
	}
];
var TABS = [
	{
		id: "overview",
		label: "Overview",
		icon: Activity
	},
	{
		id: "tasks",
		label: "Tasks",
		icon: ListTodo
	},
	{
		id: "projects",
		label: "Projects",
		icon: FolderKanban
	},
	{
		id: "files",
		label: "Files",
		icon: HardDrive
	},
	{
		id: "browser",
		label: "Browser / OS",
		icon: MonitorUp
	},
	{
		id: "skills",
		label: "Skills",
		icon: Sparkles
	},
	{
		id: "catalog",
		label: "Catalog",
		icon: Library
	},
	{
		id: "automation",
		label: "Schedules",
		icon: CalendarClock
	}
];
function StatusPill({ children, tone = "muted" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("rounded-full border px-2 py-1 text-[10px]", tone === "lime" ? "border-lime-300/30 bg-lime-300/10 text-lime-300" : tone === "cyan" ? "border-cyan-300/30 bg-cyan-300/10 text-cyan-300" : tone === "amber" ? "border-amber-300/30 bg-amber-300/10 text-amber-300" : "border-border bg-secondary text-subtle"),
		children
	});
}
function Card({ title, icon: Icon, children, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-2xl border border-border bg-card/50 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 text-cyan-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-sm font-medium",
					children: title
				})]
			}), action]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4",
			children
		})]
	});
}
async function apiGet(action, params = {}) {
	const query = new URLSearchParams({
		action,
		...params
	});
	const response = await fetch("/api/manus?" + query.toString(), { credentials: "same-origin" });
	const data = await response.json();
	if (!response.ok || !data.ok) throw new Error(typeof data.error === "string" ? data.error : data.error?.message || "Manus API error");
	return data;
}
async function apiPost(body) {
	const response = await fetch("/api/manus", {
		method: "POST",
		credentials: "same-origin",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(body)
	});
	const data = await response.json();
	if (!response.ok || !data.ok) throw new Error(typeof data.error === "string" ? data.error : data.error?.message || "Manus API error");
	return data;
}
function useManusStatus() {
	const [configured, setConfigured] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const refresh = async () => {
		try {
			const data = await apiGet("status");
			setConfigured(Boolean(data.configured));
			setError("");
		} catch (e) {
			setConfigured(false);
			setError(e instanceof Error ? e.message : "ตรวจสอบ Manus ไม่สำเร็จ");
		}
	};
	(0, import_react.useEffect)(() => {
		refresh();
	}, []);
	return {
		configured,
		error,
		refresh
	};
}
function TaskWorkspace({ th }) {
	const [tasks, setTasks] = (0, import_react.useState)([]);
	const [selectedId, setSelectedId] = (0, import_react.useState)("");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [sending, setSending] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [detail, setDetail] = (0, import_react.useState)(null);
	const loadTasks = async () => {
		setLoading(true);
		setError("");
		try {
			const data = await apiGet("tasks", { limit: "50" });
			setTasks(Array.isArray(data.data) ? data.data : []);
			setSelectedId((v) => v || data.data?.[0]?.id || data.data?.[0]?.task_id || "");
		} catch (e) {
			setError(e instanceof Error ? e.message : "โหลด tasks ไม่สำเร็จ");
		} finally {
			setLoading(false);
		}
	};
	const loadSelected = async (id) => {
		if (!id) return;
		try {
			const [d, m] = await Promise.all([apiGet("task", { taskId: id }), apiGet("messages", {
				taskId: id,
				limit: "100",
				verbose: "true"
			})]);
			setDetail(d.data ?? d.task ?? null);
			setMessages(Array.isArray(m.data) ? m.data : m.messages ?? []);
		} catch (e) {
			setError(e instanceof Error ? e.message : "โหลด task ไม่สำเร็จ");
		}
	};
	(0, import_react.useEffect)(() => {
		loadTasks();
	}, []);
	(0, import_react.useEffect)(() => {
		loadSelected(selectedId);
	}, [selectedId]);
	const create = async () => {
		const value = prompt.trim();
		if (!value || sending) return;
		setSending(true);
		setError("");
		try {
			const id = (await apiPost({
				action: "create",
				prompt: value,
				agentProfile: "standard"
			})).task_id;
			setPrompt("");
			await loadTasks();
			if (id) setSelectedId(id);
		} catch (e) {
			setError(e instanceof Error ? e.message : "สร้าง task ไม่สำเร็จ");
		} finally {
			setSending(false);
		}
	};
	const send = async () => {
		const value = prompt.trim();
		if (!selectedId || !value || sending) return;
		setSending(true);
		setError("");
		try {
			await apiPost({
				action: "send",
				taskId: selectedId,
				prompt: value
			});
			setPrompt("");
			await loadSelected(selectedId);
		} catch (e) {
			setError(e instanceof Error ? e.message : "ส่งข้อความไม่สำเร็จ");
		} finally {
			setSending(false);
		}
	};
	const stop = async () => {
		if (!selectedId) return;
		setSending(true);
		setError("");
		try {
			await apiPost({
				action: "stop",
				taskId: selectedId
			});
			await loadSelected(selectedId);
			await loadTasks();
		} catch (e) {
			setError(e instanceof Error ? e.message : "หยุด task ไม่สำเร็จ");
		} finally {
			setSending(false);
		}
	};
	const confirm = async (eventId) => {
		try {
			await apiPost({
				action: "confirm",
				taskId: selectedId,
				eventId
			});
			await loadSelected(selectedId);
		} catch (e) {
			setError(e instanceof Error ? e.message : "ยืนยัน action ไม่สำเร็จ");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		title: th ? "Manus Tasks จริง" : "Live Manus Tasks",
		icon: ListTodo,
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
				tone: tasks.length ? "lime" : "cyan",
				children: loading ? "LOADING" : `${tasks.length} TASKS`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "ghost",
				className: "h-8",
				onClick: () => void loadTasks(),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5", loading && "animate-spin") })
			})]
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: prompt,
							onChange: (e) => setPrompt(e.target.value),
							onKeyDown: (e) => {
								if (e.key === "Enter" && !e.shiftKey) {
									e.preventDefault();
									selectedId ? send() : create();
								}
							},
							placeholder: selectedId ? th ? "ส่งคำสั่งต่อให้ task นี้..." : "Continue this Manus task..." : th ? "สร้างงาน Manus จริง..." : "Create a real Manus task...",
							disabled: sending,
							className: "min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs outline-none"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							disabled: sending || !prompt.trim(),
							onClick: () => void (selectedId ? send() : create()),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), sending ? "..." : selectedId ? "Send" : "Create"]
						}),
						selectedId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "destructive",
							disabled: sending,
							onClick: () => void stop(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-3.5" }), "Stop"]
						}) : null
					]
				}),
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-lg border border-red-300/20 bg-red-300/5 p-2 text-[10px] text-red-300",
					children: error
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 xl:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [tasks.map((task) => {
							const id = task.id || task.task_id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSelectedId(id),
								className: cn("flex w-full items-center gap-3 rounded-xl border bg-background p-3 text-left", selectedId === id ? "border-cyan-300/40 bg-cyan-300/5" : "border-border"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleDashed, { className: cn("size-4", task.status === "running" ? "animate-spin text-cyan-300" : task.status === "completed" ? "text-lime-300" : "text-subtle") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-xs",
											children: task.title || id
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "text-[10px] text-subtle",
											children: [task.status || "unknown", task.credit_usage != null ? ` · ${task.credit_usage} credits` : ""]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-3.5 text-subtle" })
								]
							}, id);
						}), !tasks.length && !loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "rounded-xl border border-dashed border-border p-6 text-center text-xs text-subtle",
							children: "ยังไม่มี task จริงในบัญชี Manus"
						}) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "min-h-64 rounded-2xl border border-border bg-background",
						children: selectedId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border px-3 py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium",
								children: detail?.title || selectedId
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] text-subtle",
								children: detail?.status || "loading"
							})] }), detail?.task_url ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: detail.task_url,
								target: "_blank",
								rel: "noreferrer",
								className: "text-cyan-300",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" })
							}) : null]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "max-h-[420px] space-y-2 overflow-y-auto p-3",
							children: messages.length ? messages.map((message, i) => {
								const eventId = message.event_id || message.id;
								const waiting = message.type === "status_update" && message.status_update?.status === "waiting";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl border border-border p-3 text-xs",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mb-1 text-[9px] uppercase tracking-wider text-subtle",
											children: message.type || "event"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
											className: "whitespace-pre-wrap break-words font-sans leading-relaxed",
											children: message.assistant_message?.content || message.content || message.status_update?.description || message.status_update?.brief || JSON.stringify(message, null, 2)
										}),
										waiting && message.status_update?.status_detail?.waiting_for_event_id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											className: "mt-2 h-7",
											onClick: () => void confirm(message.status_update.status_detail.waiting_for_event_id),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), "Confirm"]
										}) : null
									]
								}, eventId || i);
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "p-6 text-center text-xs text-subtle",
								children: "ยังไม่มีข้อความจาก task"
							})
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex h-full min-h-64 items-center justify-center p-8 text-center text-xs text-subtle",
							children: "เลือก task หรือสร้าง task ใหม่"
						})
					})]
				})
			]
		})
	});
}
function Projects({ th }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const load = async () => {
		setLoading(true);
		try {
			const d = await apiGet("projects");
			setItems(Array.isArray(d.data) ? d.data : []);
		} catch (e) {
			setError(e instanceof Error ? e.message : "โหลด projects ไม่สำเร็จ");
		} finally {
			setLoading(false);
		}
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	const create = async () => {
		if (!name.trim()) return;
		try {
			await apiPost({
				action: "createProject",
				title: name.trim()
			});
			setName("");
			await load();
		} catch (e) {
			setError(e instanceof Error ? e.message : "สร้าง project ไม่สำเร็จ");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		title: th ? "Projects จริงจาก Manus" : "Live Manus Projects",
		icon: FolderKanban,
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "ghost",
			onClick: () => void load(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-3.5", loading && "animate-spin") })
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: name,
					onChange: (e) => setName(e.target.value),
					placeholder: th ? "ชื่อ project ใหม่" : "New project name",
					className: "min-w-0 flex-1 rounded-xl border border-border bg-background px-3 py-2 text-xs"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					onClick: () => void create(),
					children: "Create"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-[10px] text-red-300",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-3",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-background p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderKanban, { className: "size-4 text-violet-300" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 truncate text-xs",
							children: item.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 line-clamp-2 text-[10px] text-subtle",
							children: item.instruction || "No shared instruction"
						})
					]
				}, item.id))
			}),
			!items.length && !loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-center text-xs text-subtle",
				children: "ไม่พบ project ในบัญชี Manus"
			}) : null
		]
	});
}
function Connectors({ th }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	const load = async () => {
		try {
			const d = await apiGet("connectors");
			setItems(Array.isArray(d.data) ? d.data : []);
		} catch (e) {
			setError(e instanceof Error ? e.message : "โหลด connectors ไม่สำเร็จ");
		}
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		title: th ? "Connectors ที่ authorize จริง" : "Authorized Manus Connectors",
		icon: Link2,
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "ghost",
			onClick: () => void load(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5" })
		}),
		children: [
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] text-red-300",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 sm:grid-cols-2 xl:grid-cols-3",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-background p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-medium",
								children: item.name
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								tone: "lime",
								children: "LIVE"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[10px] text-subtle",
							children: item.description || item.category || item.type || item.id
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 break-all text-[9px] text-subtle",
							children: item.id
						})
					]
				}, item.id))
			}),
			!items.length && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-center text-xs text-subtle",
				children: "ยังไม่มี connector ที่ authorize ให้ API นี้"
			}) : null
		]
	});
}
function Skills({ th }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [query, setQuery] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		apiGet("skills").then((d) => setItems(Array.isArray(d.data) ? d.data : [])).catch((e) => setError(e instanceof Error ? e.message : "โหลด skills ไม่สำเร็จ"));
	}, []);
	const filtered = (0, import_react.useMemo)(() => items.filter((s) => (s.name + " " + (s.description || "")).toLowerCase().includes(query.toLowerCase())), [items, query]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		title: th ? "Skills จริงจาก Manus" : "Live Manus Skills",
		icon: Sparkles,
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 rounded-full border border-border bg-background px-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-3.5 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				value: query,
				onChange: (e) => setQuery(e.target.value),
				placeholder: "Search",
				className: "h-8 w-32 bg-transparent text-xs outline-none"
			})]
		}),
		children: [
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] text-red-300",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
				children: filtered.map((skill) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-background p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 text-lime-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								tone: "lime",
								children: skill.owner_type || "available"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm font-medium",
							children: skill.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[10px] text-subtle",
							children: skill.description || "No description"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 break-all text-[9px] text-subtle",
							children: ["ID: ", skill.id]
						})
					]
				}, skill.id))
			}),
			!filtered.length && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-6 text-center text-xs text-subtle",
				children: "ไม่พบ skill ที่ API เปิดให้บัญชีนี้"
			}) : null
		]
	});
}
function RealBrowser({ th }) {
	const [browsers, setBrowsers] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	const load = async () => {
		try {
			const d = await apiGet("browsers");
			setBrowsers(Array.isArray(d.data) ? d.data : []);
		} catch (e) {
			setError(e instanceof Error ? e.message : "โหลด browser ไม่สำเร็จ");
		}
	};
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		title: "Manus My Browser",
		icon: MonitorUp,
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			size: "sm",
			variant: "ghost",
			onClick: () => void load(),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5" })
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs text-muted-foreground",
				children: th ? "แสดงเฉพาะ browser session ที่ Manus API มองเห็นจริง ไม่มี simulation" : "Only browser sessions actually exposed by the Manus API are shown. No simulation."
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[10px] text-red-300",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: browsers.map((browser) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3 rounded-xl border border-border bg-background p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorUp, { className: "size-4 text-cyan-300" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs",
								children: browser.client_name || browser.client_id
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-[10px] text-subtle",
								children: browser.ua || "Authorized browser client"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
							tone: "lime",
							children: "ONLINE"
						})
					]
				}, browser.client_id))
			}),
			!browsers.length && !error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-dashed border-border p-6 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MonitorUp, { className: "mx-auto size-7 text-cyan-300" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs",
						children: th ? "ยังไม่มี browser ที่ authorize" : "No authorized browser is online"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "https://manus.im/my-browser",
						target: "_blank",
						rel: "noreferrer",
						className: "mt-3 inline-flex items-center gap-1 text-xs text-cyan-300",
						children: ["My Browser ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3" })]
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 rounded-xl border border-cyan-300/15 bg-cyan-300/5 p-3 text-[10px] text-cyan-100",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mr-1 inline size-3.5" }), th ? "ไม่มีปุ่มจำลองการควบคุม OS ถ้าไม่มี session จริง ปุ่มจะไม่ถูกแสดง" : "No fake OS-control button is shown when there is no real session."]
			})
		]
	});
}
function Files() {
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)("");
	const upload = async (file) => {
		setBusy(true);
		setResult("");
		try {
			const prepared = await apiPost({
				action: "uploadPrepare",
				filename: file.name
			});
			if (!(await fetch(prepared.upload_url, {
				method: "PUT",
				body: file
			})).ok) throw new Error("อัปโหลดไฟล์ไป Manus ไม่สำเร็จ");
			setResult(`อัปโหลดแล้ว: ${file.name} · file_id=${prepared.file?.id || "unknown"}`);
		} catch (e) {
			setResult(e instanceof Error ? e.message : "อัปโหลดไม่สำเร็จ");
		} finally {
			setBusy(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		title: "Files · Manus upload",
		icon: HardDrive,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: cn("flex cursor-pointer flex-col items-center rounded-xl border border-dashed border-border p-8 text-center", busy && "pointer-events-none opacity-60"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUp, { className: "size-7 text-cyan-300" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs",
					children: busy ? "กำลังอัปโหลด..." : "เลือกไฟล์เพื่ออัปโหลดเข้า Manus จริง"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-[10px] text-subtle",
					children: "ไฟล์จะถูกส่งผ่าน presigned upload URL ของ Manus"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					className: "hidden",
					disabled: busy,
					onChange: (e) => {
						const file = e.target.files?.[0];
						if (file) upload(file);
						e.currentTarget.value = "";
					}
				})
			]
		}), result ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: cn("mt-3 rounded-lg border p-2 text-[10px]", result.startsWith("อัปโหลดแล้ว") ? "border-lime-300/20 text-lime-300" : "border-red-300/20 text-red-300"),
			children: result
		}) : null]
	});
}
function Catalog({ th }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 xl:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			title: th ? "Tool Registry จริง" : "Live Tool Registry",
			icon: Library,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-2 sm:grid-cols-2",
				children: MANUS_TOOL_REGISTRY.map((tool) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-background p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium",
							children: tool.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
							tone: tool.status === "live" ? "lime" : "amber",
							children: tool.status === "live" ? "LIVE" : "BRIDGE"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-[10px] text-subtle",
						children: tool.description
					})]
				}, tool.id))
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			title: "Puter Bridge",
			icon: Bot,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Puter มี MCP server สำหรับ filesystem, hosting, workers, KV, apps, docs และ account. ส่วน Puter AI chat ยังใช้ Puter.js ใน browser ของแอปนี้ จึงไม่ถูกหลอกให้เป็น Manus connector จนกว่าจะมี bridge ที่ authenticate จริง"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 rounded-xl border border-amber-300/20 bg-amber-300/5 p-3 text-[10px] text-amber-200",
					children: "สถานะ: bridge-required · ไม่มีปุ่มปลอม"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "https://docs.puter.com/mcp/",
					target: "_blank",
					rel: "noreferrer",
					className: "mt-3 inline-flex items-center gap-1 text-xs text-cyan-300",
					children: ["Puter MCP docs ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
				})
			]
		})]
	});
}
function ManusHubPanel() {
	const language = useBossStore((s) => s.language);
	const [tab, setTab] = (0, import_react.useState)("overview");
	const th = language === "th";
	const { configured, error: statusError, refresh } = useManusStatus();
	const copy = th ? {
		title: "Manus Hub",
		lead: "เครื่องมือ Manus ที่เรียก API จริงได้ในที่เดียว",
		connect: "เชื่อม Manus API",
		schedules: "Schedules ยังไม่มี endpoint สำหรับแอปนี้"
	} : {
		title: "Manus Hub",
		lead: "Real Manus API tools in one surface",
		connect: "Connect Manus API",
		schedules: "Schedules are not exposed to this app yet"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col overflow-y-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-border px-4 py-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-[10px] font-semibold tracking-[0.22em] text-cyan-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5" }), " MANUS SUITE"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-3xl tracking-tight",
							children: copy.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: copy.lead
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								tone: configured ? "lime" : "amber",
								children: configured === null ? "CHECKING" : configured ? "MANUS CONNECTED" : "API KEY REQUIRED"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => document.getElementById("manus-live-key")?.focus(),
								className: "inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-secondary px-3 text-xs font-medium",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link2, { className: "size-3.5" }), copy.connect]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => void refresh(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: "size-3.5" })
							})
						]
					})]
				}),
				statusError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[10px] text-red-300",
					children: statusError
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex gap-1 overflow-x-auto rounded-2xl border border-border bg-card/40 p-1",
					children: TABS.map(({ id, label, icon: Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setTab(id),
						className: cn("inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-xs", tab === id ? "bg-secondary text-foreground" : "text-subtle hover:text-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), label]
					}, id))
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-4 p-4 sm:p-6",
			children: [
				tab === "overview" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskWorkspace, { th }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 xl:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projects, { th }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Connectors, { th })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 xl:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Files, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RealBrowser, { th })]
					})
				] }) : null,
				tab === "tasks" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskWorkspace, { th }) : null,
				tab === "projects" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Projects, { th }) : null,
				tab === "files" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Files, {}) : null,
				tab === "browser" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RealBrowser, { th }) : null,
				tab === "skills" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skills, { th }) : null,
				tab === "catalog" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Catalog, { th }) : null,
				tab === "automation" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					title: "Schedules",
					icon: Workflow,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-dashed border-border p-8 text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "mx-auto size-7 text-cyan-300" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs",
								children: copy.schedules
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[10px] text-subtle",
								children: "จะไม่แสดงปุ่มสร้าง schedule จนกว่าจะมี backend endpoint จริง"
							})
						]
					})
				}) : null
			]
		})]
	});
}
var APPS = [
	{
		id: "ai-chat",
		name: "AI Chat",
		description: "คุยกับ AI และเรียกใช้ความสามารถของ Agent",
		category: "AI",
		icon: Bot,
		status: "ready",
		capabilities: [
			"chat",
			"agent",
			"puter-ai"
		],
		skills: ["chat", "reasoning"],
		tools: ["Puter AI"],
		permissions: ["AI usage"]
	},
	{
		id: "app-builder",
		name: "App Builder",
		description: "สร้างเว็บแอปจากคำสั่งและต่อยอดเป็นโปรเจกต์",
		category: "สร้างแอป",
		icon: CodeXml,
		status: "foundation",
		capabilities: [
			"code",
			"scaffold",
			"workspace"
		],
		skills: ["app generation", "coding"],
		tools: ["Code Workspace"],
		permissions: ["workspace write"]
	},
	{
		id: "browser",
		name: "Browser Automation",
		description: "ชั้นความสามารถสำหรับเชื่อม Browser ที่ผู้ใช้อนุญาต",
		category: "Automation",
		icon: Earth,
		status: "foundation",
		capabilities: [
			"browser",
			"automation",
			"permissions"
		],
		skills: ["web navigation", "browser actions"],
		tools: ["Chrome bridge"],
		permissions: ["browser control"]
	},
	{
		id: "files",
		name: "Files & Workspace",
		description: "ทำงานกับไฟล์และพื้นที่ทำงานของโปรเจกต์",
		category: "Workspace",
		icon: FileText,
		status: "foundation",
		capabilities: [
			"files",
			"artifacts",
			"workspace"
		],
		skills: ["file operations"],
		tools: ["Workspace"],
		permissions: ["file access"]
	},
	{
		id: "image-studio",
		name: "Image Studio",
		description: "สร้างและจัดการงานภาพ",
		category: "Media",
		icon: Image,
		status: "foundation",
		capabilities: [
			"image",
			"media",
			"artifacts"
		],
		skills: ["image creation"],
		tools: ["Image generation"],
		permissions: ["media access"]
	},
	{
		id: "skills",
		name: "Skills",
		description: "ชุดทักษะที่ Agent เรียกใช้ตามงาน",
		category: "Agent",
		icon: Sparkles,
		status: "foundation",
		capabilities: [
			"skills",
			"tools",
			"agent"
		],
		skills: ["skill routing", "planning"],
		tools: ["Skill runtime"],
		permissions: ["tool execution"]
	},
	{
		id: "plugins",
		name: "Plugin Catalog",
		description: "ศูนย์รวมปลั๊กอินและเครื่องมือที่เพิ่มความสามารถให้ระบบ",
		category: "Extensions",
		icon: Box,
		status: "foundation",
		capabilities: [
			"plugins",
			"connectors",
			"tools"
		],
		skills: ["plugin discovery"],
		tools: ["Plugin runtime"],
		permissions: ["connector access"]
	},
	{
		id: "automation",
		name: "Automation",
		description: "วางงานอัตโนมัติและ workflow หลายขั้นตอน",
		category: "Automation",
		icon: Zap,
		status: "foundation",
		capabilities: [
			"workflow",
			"tasks",
			"schedules"
		],
		skills: ["workflow planning"],
		tools: ["Task runner"],
		permissions: ["automation"]
	}
];
function AppsPanel() {
	const th = useBossStore((s) => s.language) === "th";
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("all");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const categories = (0, import_react.useMemo)(() => ["all", ...Array.from(new Set(APPS.map((a) => a.category)))], []);
	const filtered = (0, import_react.useMemo)(() => APPS.filter((a) => {
		const q = query.trim().toLowerCase();
		return (!q || [
			a.name,
			a.description,
			a.category,
			...a.capabilities,
			...a.skills,
			...a.tools
		].join(" ").toLowerCase().includes(q)) && (category === "all" || a.category === category);
	}), [query, category]);
	const detail = selected ? APPS.find((a) => a.id === selected) : null;
	if (detail) {
		const Icon = detail.icon;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex h-full min-h-0 flex-col overflow-y-auto",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "border-b border-border px-4 py-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setSelected(null),
					className: "mb-4 inline-flex items-center gap-2 text-xs text-subtle hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), th ? "กลับไปแอพ" : "Back to Apps"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-6 text-cyan-300" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] font-semibold tracking-[0.22em] text-cyan-300",
							children: detail.category.toUpperCase()
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-1 font-display text-3xl tracking-tight",
							children: detail.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: detail.description
						})
					] })]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "grid gap-3 p-4 sm:grid-cols-2 sm:p-6 xl:grid-cols-3",
				children: [[
					["Capabilities", detail.capabilities],
					["Skills", detail.skills],
					["Tools", detail.tools],
					["Permissions", detail.permissions]
				].map(([title, items]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl border border-border bg-card/40 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-3 flex items-center gap-2 text-xs font-semibold",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-4 text-cyan-300" }), title]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: items.map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-lg border border-border px-2.5 py-1.5 text-[10px] text-subtle",
							children: x
						}, x))
					})]
				}, title)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-2xl border border-border bg-card/40 p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-xs font-semibold",
							children: th ? "สถานะ" : "Status"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 text-xs text-amber-300",
							children: detail.status === "ready" ? "READY" : "FOUNDATION"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[10px] leading-relaxed text-muted-foreground",
							children: th ? "รายละเอียดนี้เป็น registry ของความสามารถที่แอพสามารถเชื่อมต่อได้ ขั้นต่อไปจะผูกตัว execute จริง" : "This registry describes the capabilities this app can connect to; execution wiring follows."
						})
					]
				})]
			})]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col overflow-y-auto",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "border-b border-border px-4 py-4 sm:px-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl border border-cyan-300/20 bg-cyan-300/5 p-2.5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-5 text-cyan-300" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[10px] font-semibold tracking-[0.22em] text-cyan-300",
						children: "APPS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-1 font-display text-3xl tracking-tight",
						children: th ? "แอพ" : "Apps"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: th ? "ศูนย์รวมแอพ ความสามารถ Skills และ Plugin Catalog" : "A unified catalog for apps, skills and plugins."
					})
				] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-col gap-2 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex min-w-0 flex-1 items-center gap-2 rounded-xl border border-border bg-card/40 px-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-4 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: th ? "ค้นหาแอพ ความสามารถ หรือปลั๊กอิน..." : "Search apps, capabilities or plugins...",
						className: "h-10 min-w-0 flex-1 bg-transparent text-xs outline-none"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex gap-1 overflow-x-auto rounded-xl border border-border bg-card/40 p-1",
					children: categories.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setCategory(item),
						className: cn("shrink-0 rounded-lg px-3 py-2 text-[11px]", category === item ? "bg-secondary text-foreground" : "text-subtle hover:text-foreground"),
						children: item === "all" ? th ? "ทั้งหมด" : "All" : item
					}, item))
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-subtle",
						children: [
							filtered.length,
							" ",
							th ? "รายการ" : "items"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 text-[10px] text-cyan-300",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wrench, { className: "size-3.5" }), "Catalog"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
					children: filtered.map((app) => {
						const Icon = app.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setSelected(app.id),
							className: "text-left rounded-2xl border border-border bg-card/40 p-4 transition-colors hover:border-cyan-300/25",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "rounded-xl border border-border bg-background p-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5 text-cyan-300" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("rounded-full border px-2 py-1 text-[9px]", app.status === "ready" ? "border-lime-300/30 bg-lime-300/10 text-lime-300" : "border-amber-300/30 bg-amber-300/10 text-amber-300"),
										children: app.status === "ready" ? "READY" : "FOUNDATION"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 text-sm font-medium",
									children: app.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 min-h-10 text-[11px] leading-relaxed text-muted-foreground",
									children: app.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3 flex flex-wrap gap-1.5",
									children: app.capabilities.map((cap) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md border border-border px-2 py-1 text-[9px] text-subtle",
										children: cap
									}, cap))
								})
							]
						}, app.id);
					})
				}),
				!filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "rounded-2xl border border-dashed border-border p-10 text-center text-xs text-subtle",
					children: th ? "ไม่พบแอพที่ค้นหา" : "No matching apps."
				})
			]
		})]
	});
}
function StepIcon({ step }) {
	if (step.status === "done") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" });
	if (step.status === "running") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin" });
	if (step.status === "error") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CirclePause, { className: "size-4" });
}
function statusLabel(status, th) {
	if (th) return {
		pending: "รอ",
		running: "กำลังทำงาน",
		done: "เสร็จ",
		error: "ผิดพลาด"
	}[status];
	return {
		pending: "Pending",
		running: "Running",
		done: "Done",
		error: "Error"
	}[status];
}
function BotFlowVisualizer() {
	const language = useBossStore((s) => s.language);
	const conversations = useBossStore((s) => s.conversations);
	const agents = useBossStore((s) => s.agents);
	const activeAgentId = useBossStore((s) => s.activeAgentId);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const th = language === "th";
	const conversation = conversations.find((c) => c.agentId === activeAgentId);
	const latest = conversation?.messages[conversation.messages.length - 1];
	const steps = latest?.flowSteps ?? [];
	const events = latest?.flowEvents ?? [];
	const progress = latest?.pending ? latest.progress ?? 0 : steps.length ? 100 : 0;
	const agent = agents.find((a) => a.id === activeAgentId);
	const selectedStep = steps.find((s) => s.id === selected) ?? steps.find((s) => s.status === "running") ?? steps[steps.length - 1];
	const counts = (0, import_react.useMemo)(() => ({
		done: steps.filter((s) => s.status === "done").length,
		running: steps.filter((s) => s.status === "running").length,
		error: steps.filter((s) => s.status === "error").length
	}), [steps]);
	const copyTrace = async () => {
		const text = events.map((e) => `[${e.time}] ${e.label}${e.duration ? ` · ${e.duration}ms` : ""}`).join("\n");
		if (text) await navigator.clipboard?.writeText(text);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full min-h-0 flex-col overflow-hidden bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap items-center gap-3 border-b border-border px-4 py-3 sm:px-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex size-9 items-center justify-center rounded-xl border border-border bg-secondary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "size-4 text-brand" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: th ? "BotFlow Visualizer" : "BotFlow Visualizer"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-[11px] text-subtle",
						children: latest?.pending ? th ? "ติดตามการทำงานแบบสดจาก Chat" : "Live execution state from Chat" : th ? "ดูเส้นทางการทำงานล่าสุด" : "Inspect the latest execution"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1.5 text-[10px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: cn("inline-flex items-center gap-1 rounded-full border px-2 py-1", latest?.pending ? "border-lime-300/40 text-lime-300" : "border-border text-muted-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", latest?.pending ? "animate-pulse bg-lime-300" : "bg-muted-foreground") }), latest?.pending ? "LIVE" : th ? "พร้อม" : "READY"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full border border-border px-2 py-1 text-muted-foreground",
						children: [progress, "%"]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid min-h-0 flex-1 xl:grid-cols-[minmax(0,1fr)_320px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "min-h-0 overflow-auto p-4 sm:p-5",
				children: steps.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex min-h-[420px] items-center justify-center rounded-2xl border border-dashed border-border bg-card/30 p-8 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "max-w-md",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "mx-auto mb-3 size-8 text-subtle" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: th ? "ยังไม่มี BotFlow ของงานล่าสุด" : "No BotFlow run is available yet"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs leading-relaxed text-subtle",
								children: th ? "ส่งเป้าหมายในห้อง Chat แล้วสถานะจริงจะปรากฏที่นี่ทันที" : "Send a goal in Chat and the real execution state will appear here."
							})
						]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4",
						children: [
							{
								label: th ? "ขั้นตอน" : "Steps",
								value: steps.length,
								Icon: Target
							},
							{
								label: th ? "เสร็จ" : "Done",
								value: counts.done,
								Icon: Check
							},
							{
								label: th ? "กำลังทำงาน" : "Running",
								value: counts.running,
								Icon: LoaderCircle
							},
							{
								label: th ? "ผิดพลาด" : "Errors",
								value: counts.error,
								Icon: X
							}
						].map(({ label, value, Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl border border-border bg-card/50 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-[10px] text-subtle",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-lg font-semibold",
								children: value
							})]
						}, String(label)))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 rounded-2xl border border-border bg-card/50 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-4 flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[10px] uppercase tracking-wider text-subtle",
									children: th ? "EXECUTION GRAPH" : "EXECUTION GRAPH"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 text-xs text-muted-foreground",
									children: agent?.task ?? latest?.content?.slice(0, 100)
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "text-xs font-semibold",
									children: [progress, "%"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-5 h-1.5 overflow-hidden rounded-full bg-secondary",
								role: "progressbar",
								"aria-valuenow": progress,
								"aria-valuemin": 0,
								"aria-valuemax": 100,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-foreground transition-all duration-300",
									style: { width: `${progress}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "overflow-x-auto pb-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex min-w-max items-center justify-center gap-0 py-4",
									children: steps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => setSelected(step.id),
											className: cn("group w-[150px] rounded-2xl border p-3 text-left transition", selectedStep?.id === step.id ? "border-foreground/40 bg-secondary shadow-sm" : "border-border bg-background/70 hover:bg-secondary/70", step.status === "running" && "ring-1 ring-foreground/20"),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between gap-2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: cn("flex size-8 items-center justify-center rounded-xl border", step.status === "done" ? "border-success/30 bg-success/10 text-success" : step.status === "error" ? "border-destructive/30 bg-destructive/10 text-destructive" : step.status === "running" ? "border-foreground/20 bg-secondary text-foreground" : "border-border text-subtle"),
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StepIcon, { step })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "text-[9px] uppercase text-subtle",
														children: statusLabel(step.status, th)
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-2 text-xs font-medium",
													children: step.label
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
													className: "mt-1 min-h-8 text-[10px] leading-relaxed text-subtle",
													children: step.detail ?? " "
												}),
												step.duration !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
													className: "mt-2 text-[10px] text-muted-foreground",
													children: [step.duration, "ms"]
												}) : null
											]
										}), i < steps.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "w-10 text-center text-muted-foreground",
											children: "→"
										}) : null]
									}, step.id))
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-border bg-card/50",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between border-b border-border px-4 py-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs font-semibold",
								children: th ? "Execution Timeline" : "Execution Timeline"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-[10px] text-subtle",
								children: [
									events.length,
									" ",
									th ? "เหตุการณ์" : "events"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "ghost",
								size: "sm",
								className: "h-8 gap-1.5 text-xs",
								onClick: () => void copyTrace(),
								disabled: events.length === 0,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }), th ? "คัดลอก Trace" : "Copy trace"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "divide-y divide-border",
							children: events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "px-4 py-5 text-xs text-subtle",
								children: th ? "ยังไม่มีเหตุการณ์" : "No events yet"
							}) : events.map((event) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3 px-4 py-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] text-subtle",
										children: event.time
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 shrink-0 rounded-full bg-foreground" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "min-w-0 flex-1 text-xs",
										children: event.label
									}),
									event.duration !== void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-[10px] text-subtle",
										children: [event.duration, "ms"]
									}) : null
								]
							}, event.id))
						})]
					})
				] })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "min-h-0 overflow-auto border-t border-border bg-card/20 xl:border-l xl:border-t-0",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-wider text-subtle",
							children: th ? "NODE INSPECTOR" : "NODE INSPECTOR"
						}), selectedStep ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm font-semibold",
							children: selectedStep.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-subtle",
										children: th ? "สถานะ" : "Status"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: statusLabel(selectedStep.status, th) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between rounded-lg bg-secondary/60 px-3 py-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-subtle",
										children: th ? "ระยะเวลา" : "Duration"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: selectedStep.duration !== void 0 ? `${selectedStep.duration}ms` : "—" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-lg bg-secondary/60 px-3 py-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-subtle",
										children: th ? "รายละเอียด" : "Detail"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 leading-relaxed",
										children: selectedStep.detail || "—"
									})]
								})
							]
						})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-subtle",
							children: th ? "เลือก Node เพื่อดูรายละเอียด" : "Select a node to inspect it."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[10px] uppercase tracking-wider text-subtle",
							children: th ? "RUNTIME" : "RUNTIME"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 space-y-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-success" }), th ? "Guards / permission gate" : "Guards / permission gate"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5" }), latest?.skillCall?.skillId ?? "—"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "size-3.5" }), latest?.durationMs !== void 0 ? formatElapsed(latest.durationMs) : "—"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, { className: "size-3.5" }), latest?.model ? shortModelLabel(latest.model) : "—"]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[10px] uppercase tracking-wider text-subtle",
								children: th ? "RUN SUMMARY" : "RUN SUMMARY"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs leading-relaxed text-muted-foreground",
								children: latest?.content ? latest.content.slice(0, 280) : th ? "ยังไม่มีผลลัพธ์ล่าสุด" : "No latest result."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex gap-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									className: "h-8 gap-1.5 text-xs",
									onClick: () => window.scrollTo({
										top: 0,
										behavior: "smooth"
									}),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5" }),
										" ",
										th ? "กลับด้านบน" : "Top"
									]
								})
							})
						]
					})
				]
			})]
		})]
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
var MAX_EVENTS = 40;
var running = false;
var timer = null;
var events = [];
var listeners = /* @__PURE__ */ new Set();
var tick = 0;
function emit() {
	for (const fn of listeners) fn([...events]);
}
function push(kind, detail) {
	events = [{
		id: `ap_${Date.now().toString(36)}_${tick}`,
		at: Date.now(),
		kind,
		detail
	}, ...events].slice(0, MAX_EVENTS);
	emit();
}
var HEARTBEATS = [
	"Commander channel open",
	"Alliance roster synced",
	"Model catalog warm",
	"Skill memory checkpoint",
	"Sandbox sealed",
	"Receive queue idle"
];
function onTick() {
	tick += 1;
	const detail = HEARTBEATS[tick % HEARTBEATS.length];
	push(tick % 3 === 0 ? "receive" : "heartbeat", detail);
}
function startAutoPilot(intervalMs = 4e3) {
	if (typeof window === "undefined") return;
	if (running) return;
	running = true;
	push("run", "Auto-pilot started");
	timer = window.setInterval(onTick, intervalMs);
}
function stopAutoPilot() {
	if (typeof window === "undefined") return;
	if (timer != null) {
		window.clearInterval(timer);
		timer = null;
	}
	if (running) {
		running = false;
		push("idle", "Auto-pilot stopped");
	}
}
function isAutoPilotRunning() {
	return running;
}
function subscribeAutoPilot(fn) {
	listeners.add(fn);
	fn([...events]);
	return () => {
		listeners.delete(fn);
	};
}
var MODES = [
	{
		id: "command",
		icon: LayoutGrid,
		color: "text-cyan-300"
	},
	{
		id: "apps",
		icon: Box,
		color: "text-emerald-300"
	},
	{
		id: "manus",
		icon: Library,
		color: "text-violet-300"
	},
	{
		id: "create",
		icon: ImagePlus,
		color: "text-pink-300"
	},
	{
		id: "sandbox",
		icon: SquareTerminal,
		color: "text-amber-300"
	},
	{
		id: "live",
		icon: Activity,
		color: "text-lime-300"
	},
	{
		id: "terminal",
		icon: Terminal,
		color: "text-sky-300"
	},
	{
		id: "super",
		icon: Sparkles,
		color: "text-yellow-300"
	},
	{
		id: "botflow",
		icon: GitBranch,
		color: "text-cyan-300"
	}
];
function CommandCenter() {
	const language = useBossStore((s) => s.language);
	const setLanguage = useBossStore((s) => s.setLanguage);
	const workspaceMode = useBossStore((s) => s.workspaceMode);
	const setWorkspaceMode = useBossStore((s) => s.setWorkspaceMode);
	const t = COPY[language];
	const { status, user, signIn, signOut, pending, syncStatus } = usePuterAuth();
	const signedIn = status === "signed_in";
	const [agentsOpen, setAgentsOpen] = (0, import_react.useState)(false);
	const [forgeOpen, setForgeOpen] = (0, import_react.useState)(false);
	const [now, setNow] = (0, import_react.useState)(null);
	const [autoOn, setAutoOn] = (0, import_react.useState)(false);
	const [lastPulse, setLastPulse] = (0, import_react.useState)(null);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
		setNow(/* @__PURE__ */ new Date());
		const id = window.setInterval(() => setNow(/* @__PURE__ */ new Date()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	(0, import_react.useEffect)(() => {
		startAutoPilot(4e3);
		setAutoOn(true);
		const unsub = subscribeAutoPilot((events) => {
			if (events[0]) setLastPulse(events[0].detail);
		});
		return () => {
			unsub();
			stopAutoPilot();
		};
	}, []);
	const toggleAuto = () => {
		if (isAutoPilotRunning()) {
			stopAutoPilot();
			setAutoOn(false);
		} else {
			startAutoPilot(4e3);
			setAutoOn(true);
		}
	};
	const syncLabel = syncStatus === "synced" ? t.synced : syncStatus === "syncing" ? t.syncing : syncStatus === "error" ? t.syncError : null;
	const modeLabel = (id) => id === "apps" ? language === "th" ? "แอพ" : "Apps" : id === "create" ? t.modeCreate : id === "sandbox" ? t.modeSandbox : id === "live" ? t.modeLive : id === "terminal" ? t.modeTerminal : id === "super" ? t.modeSuper : id === "manus" ? t.modeManus : id === "botflow" ? "BotFlow" : t.modeCommand;
	const clockText = mounted && now ? now.toLocaleTimeString(language === "th" ? "th-TH" : "en-US", {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit"
	}) : "\xA0\xA0:\xA0\xA0:\xA0\xA0";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-[100dvh] flex-col overflow-hidden bg-background",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex min-w-0 items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "inline-flex items-center gap-1.5 font-semibold tracking-wider text-lime-300",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "relative flex size-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex size-1.5 animate-ping rounded-full bg-lime-300 opacity-75" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-1.5 rounded-full bg-lime-300" })]
							}), "LIVE"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: toggleAuto,
							className: cn("inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-semibold tracking-wider", autoOn ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-300" : "border-border text-muted-foreground"),
							title: language === "th" ? "ระบบอัตโนมัติ" : "Auto-pilot",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", autoOn ? "animate-pulse bg-cyan-300" : "bg-muted-foreground") }), "AUTO"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "hidden text-muted-foreground sm:inline",
							suppressHydrationWarning: true,
							children: clockText
						}),
						mounted && lastPulse && autoOn ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "hidden truncate text-muted-foreground md:inline",
							children: ["· ", lastPulse]
						}) : null,
						syncLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: ["· ", syncLabel]
						}) : null
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-3 text-lime-300" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "hidden sm:inline",
						children: signedIn ? user?.username ?? "Puter" : t.guest
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppMark, { className: "size-8 shrink-0 text-brand" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-lg leading-none tracking-tight",
							children: APP_SHORT_NAME
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "truncate text-[11px] text-subtle",
							children: [t.developedBy, signedIn ? ` · ${user?.username ?? "Puter"}` : ""]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "hidden max-w-[55vw] items-center gap-0.5 overflow-x-auto rounded-2xl border border-border bg-card/50 p-1 sm:flex",
						children: MODES.map((m) => {
							const active = workspaceMode === m.id;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setWorkspaceMode(m.id),
								className: cn("inline-flex h-8 items-center gap-1.5 rounded-xl px-3 text-xs font-medium transition-all", active ? "bg-secondary text-foreground shadow-sm" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, { className: cn("size-3.5", active ? m.color : "") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden md:inline",
									children: modeLabel(m.id)
								})]
							}, m.id);
						})
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
								className: "size-9 lg:hidden",
								onClick: () => setAgentsOpen(true),
								"aria-label": t.registry,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutGrid, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "size-9 xl:hidden",
								onClick: () => setForgeOpen(true),
								"aria-label": t.forge,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hammer, { className: "size-4" })
							}),
							signedIn ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "size-9",
								onClick: () => void signOut(),
								"aria-label": t.signOut,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "icon",
								className: "size-9",
								onClick: () => void signIn(),
								disabled: pending,
								"aria-label": t.continuePuter,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PuterMark, { className: "size-4" })
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "hidden",
				children: MODES.map((m) => {
					const active = workspaceMode === m.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setWorkspaceMode(m.id),
						className: cn("inline-flex h-10 shrink-0 items-center justify-center gap-1.5 rounded-xl px-3.5 text-xs font-medium", active ? "bg-secondary text-foreground" : "bg-card/60 text-muted-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(m.icon, { className: cn("size-3.5", active ? m.color : "") }), modeLabel(m.id)]
					}, m.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-h-0 flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommanderRail, {
						activeMode: workspaceMode,
						onMode: setWorkspaceMode,
						onAgents: () => setAgentsOpen(true),
						onForge: () => setForgeOpen(true),
						language
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid min-w-0 min-h-0 flex-1 grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] xl:grid-cols-[220px_minmax(0,1fr)_300px]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
							className: "hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-full flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-border px-3 py-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-semibold uppercase tracking-wider text-subtle",
										children: t.registry
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "inline-flex items-center gap-1 text-[10px] text-lime-300",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-lime-300" }), "LIVE"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "min-h-0 flex-1 overflow-y-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentList, {})
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
							className: "flex min-h-0 flex-col",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "min-h-0 flex-1",
								children: workspaceMode === "apps" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppsPanel, {}) : workspaceMode === "create" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CreatePanel, {}) : workspaceMode === "sandbox" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SandboxPanel, {}) : workspaceMode === "live" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveStreamPanel, {}) : workspaceMode === "terminal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TerminalPanel, {}) : workspaceMode === "super" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GrokSuperPanel, {}) : workspaceMode === "manus" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ManusHubPanel, {}) : workspaceMode === "botflow" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BotFlowVisualizer, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatPanel, {})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
							className: "hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex h-full flex-col",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between border-b border-border px-3 py-2.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-[11px] font-semibold uppercase tracking-wider text-subtle",
										children: t.forge
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hammer, { className: "size-3.5 text-muted-foreground" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "min-h-0 flex-1 overflow-y-auto",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgePanel, {})
								})]
							})
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "hidden",
				suppressHydrationWarning: true,
				children: [
					APP_SHORT_NAME,
					" · ",
					APP_DEVELOPER,
					" · Real-time",
					mounted && autoOn ? " · AUTO" : ""
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
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandCenter, {})
	}) });
}
//#endregion
export { Home as component };
