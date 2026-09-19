import { useState, type FormEvent } from "react";
import { AudioLines, FileText, ImagePlus, LoaderCircle, Mic2, Sparkles, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COPY } from "@/lib/copy";
import { loadPuter, puterErrorMessage } from "@/lib/puter";
import { useBossStore } from "@/lib/store";
import { uid } from "@/lib/utils";

const RATIO: Record<string, { w: number; h: number }> = {
  "16:9": { w: 16, h: 9 },
  "9:16": { w: 9, h: 16 },
  "1:1": { w: 1, h: 1 },
  "4:3": { w: 4, h: 3 },
  "3:4": { w: 3, h: 4 },
};

type CreateKind = "image" | "video" | "ocr" | "tts" | "stt" | "voice";

const KIND_LABELS: Record<CreateKind, string> = {
  image: "ภาพ",
  video: "วิดีโอ",
  ocr: "อ่านภาพ / OCR",
  tts: "ข้อความ → เสียง",
  stt: "เสียง → ข้อความ",
  voice: "เปลี่ยนเสียง",
};

export function CreatePanel() {
  const language = useBossStore((s) => s.language);
  const t = COPY[language];
  const creates = useBossStore((s) => s.creates);
  const addCreate = useBossStore((s) => s.addCreate);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultText, setResultText] = useState("");
  const [kind, setKind] = useState<CreateKind>("image");
  const [provider, setProvider] = useState("openai-image-generation");
  const [model, setModel] = useState("gpt-image-1-mini");
  const [videoModel, setVideoModel] = useState("veo-3.1-lite");
  const [videoSeconds, setVideoSeconds] = useState(6);
  const [quality, setQuality] = useState("low");
  const [style, setStyle] = useState("cinematic noir");
  const [ratio, setRatio] = useState("16:9");
  const [ttsProvider, setTtsProvider] = useState("aws-polly");
  const [ttsVoice, setTtsVoice] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const presets = ["BossG command center", "cyberpunk city at night", "minimal product hero"];

  const selectProvider = (next: string) => {
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

  const changeKind = (next: CreateKind) => {
    setKind(next);
    setError(null);
    setResultText("");
    setFile(null);
    if (next === "image") setModel("gpt-image-1-mini");
    if (next === "video") setVideoModel("veo-3.1-lite");
  };

  const generate = async (e?: FormEvent) => {
    e?.preventDefault();
    const trimmed = prompt.trim();
    const needsPrompt = kind === "image" || kind === "video" || kind === "tts";
    if (busy || (needsPrompt && trimmed.length < 3) || ((kind === "ocr" || kind === "stt" || kind === "voice") && !file)) return;

    setBusy(true);
    setError(null);
    setResultText("");

    try {
      const puter = window.puter ?? (await loadPuter());
      if (!puter.ai) throw new Error("Puter AI is not available yet.");

      if (kind === "image") {
        if (!puter.ai.txt2img) throw new Error("Puter image generation is not available yet.");
        const image = await puter.ai.txt2img(
          `${trimmed}, ${style}, ${ratio} composition`,
          { provider, model, quality, ratio: RATIO[ratio] ?? RATIO["16:9"], test_mode: false },
        );
        if (!image?.src) throw new Error("Puter returned no image.");
        addCreate({
          id: uid("img"),
          prompt: `${trimmed}, ${style}, ${ratio}`,
          url: image.src,
          kind: "image",
          createdAt: Date.now(),
        });
      } else if (kind === "video") {
        if (!puter.ai.txt2vid) throw new Error("Puter video generation is not available yet.");
        const video = await puter.ai.txt2vid(trimmed, {
          model: videoModel,
          seconds: videoSeconds,
          size: ratio === "9:16" ? "720x1280" : ratio === "1:1" ? "1080x1080" : "1280x720",
          generate_audio: true,
          test_mode: false,
        });
        if (!video?.src) throw new Error("Puter returned no video.");
        addCreate({ id: uid("vid"), prompt: trimmed, url: video.src, kind: "video", createdAt: Date.now() });
      } else if (kind === "ocr") {
        if (!puter.ai.img2txt) throw new Error("Puter OCR is not available yet.");
        const text = await puter.ai.img2txt(file as File);
        setResultText(typeof text === "string" ? text : JSON.stringify(text, null, 2));
      } else if (kind === "tts") {
        if (!puter.ai.txt2speech) throw new Error("Puter text-to-speech is not available yet.");
        const audio = await puter.ai.txt2speech(trimmed, {
          provider: ttsProvider,
          ...(ttsVoice.trim() ? { voice: ttsVoice.trim() } : {}),
          language: "th-TH",
          output_format: "mp3",
        });
        if (!audio?.src) throw new Error("Puter returned no audio.");
        addCreate({ id: uid("aud"), prompt: trimmed, url: audio.src, kind: "audio", createdAt: Date.now() });
      } else if (kind === "stt") {
        if (!puter.ai.speech2txt) throw new Error("Puter speech-to-text is not available yet.");
        const result = await puter.ai.speech2txt(file as File, { response_format: "text" });
        setResultText(typeof result === "string" ? result : JSON.stringify(result, null, 2));
      } else {
        if (!puter.ai.speech2speech) throw new Error("Puter voice changer is not available yet.");
        const audio = await puter.ai.speech2speech(file as File, {
          ...(ttsVoice.trim() ? { voice: ttsVoice.trim() } : {}),
          output_format: "mp3",
        });
        if (!audio?.src) throw new Error("Puter returned no converted audio.");
        addCreate({
          id: uid("voice"),
          prompt: `เปลี่ยนเสียง: ${file?.name ?? "audio"}`,
          url: audio.src,
          kind: "audio",
          createdAt: Date.now(),
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

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-border px-4 py-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-subtle">{t.modeCreate}</p>
        <h2 className="mt-1 font-display text-2xl tracking-tight">{t.createTitle}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Create Hub — ภาพ, วิดีโอ, OCR, เสียง และเครื่องมือมัลติมีเดียผ่าน Puter
        </p>
      </div>

      <form onSubmit={generate} className="border-b border-border px-4 py-4 sm:px-6">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {(Object.keys(KIND_LABELS) as CreateKind[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => changeKind(item)}
              className={`rounded-[var(--radius-md)] border px-2 py-2 text-[11px] transition ${kind === item ? "border-primary bg-primary/10 text-foreground" : "border-border text-muted-foreground hover:bg-secondary"}`}
            >
              {KIND_LABELS[item]}
            </button>
          ))}
        </div>

        {fileMode ? (
          <div className="mt-3 rounded-[var(--radius-lg)] border border-dashed border-border bg-card p-4">
            <input
              type="file"
              accept={accept}
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="w-full text-xs text-muted-foreground file:mr-3 file:rounded-md file:border-0 file:bg-secondary file:px-3 file:py-2 file:text-xs"
            />
            <p className="mt-2 text-[11px] text-subtle">
              {file ? `ไฟล์ที่เลือก: ${file.name}` : kind === "ocr" ? "เลือกภาพเพื่ออ่านตัวอักษร" : "เลือกไฟล์เสียงเพื่อถอดเสียงหรือเปลี่ยนเสียง"}
            </p>
          </div>
        ) : (
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={kind === "tts" ? "พิมพ์ข้อความที่ต้องการให้พูด..." : t.createPh}
            rows={3}
            className="mt-3 w-full rounded-[var(--radius-lg)] border border-border bg-card px-3 py-2.5 text-sm text-foreground placeholder:text-subtle outline-none focus-visible:ring-2 focus-visible:ring-ring/60"
          />
        )}

        {kind === "image" && (
          <>
            <div className="mt-3 flex flex-wrap gap-2">
              {presets.map((preset) => (
                <button key={preset} type="button" onClick={() => setPrompt(preset)} className="rounded-full border border-border px-3 py-1.5 text-[11px] text-muted-foreground hover:bg-secondary">
                  {preset}
                </button>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <select value={provider} onChange={(e) => selectProvider(e.target.value)} className="h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none">
                <option value="openai-image-generation">OpenAI Image</option>
                <option value="gemini">Gemini Image</option>
                <option value="xai">Grok Image</option>
                <option value="together">Together Image</option>
                <option value="replicate-image-generation">Replicate</option>
              </select>
              <select value={model} onChange={(e) => setModel(e.target.value)} className="h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none">
                {provider === "openai-image-generation" && <><option value="gpt-image-1-mini">GPT Image 1 Mini</option><option value="gpt-image-1">GPT Image 1</option><option value="gpt-image-2">GPT Image 2</option></>}
                {provider === "gemini" && <><option value="gemini-3.1-flash-image-preview">Gemini 3.1 Flash Image</option><option value="gemini-3-pro-image-preview">Gemini 3 Pro Image</option></>}
                {provider === "xai" && <><option value="grok-imagine-image">Grok Imagine</option><option value="grok-imagine-image-quality">Grok Imagine Quality</option></>}
                {provider === "together" && <option value="black-forest-labs/FLUX.1-schnell">FLUX.1 Schnell</option>}
                {provider === "replicate-image-generation" && <option value="black-forest-labs/flux-schnell">FLUX Schnell</option>}
              </select>
              <select value={quality} onChange={(e) => setQuality(e.target.value)} className="h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none">
                {provider === "gemini" ? <><option>512</option><option>1K</option><option>2K</option><option>4K</option></> : provider === "xai" ? <><option>1k</option><option>2k</option></> : <><option>low</option><option>medium</option><option>high</option></>}
              </select>
              <select value={style} onChange={(e) => setStyle(e.target.value)} className="h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none">
                <option>cinematic noir</option><option>editorial studio</option><option>3D soft light</option><option>anime key visual</option>
              </select>
              <select value={ratio} onChange={(e) => setRatio(e.target.value)} className="h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none">
                <option>16:9</option><option>9:16</option><option>1:1</option><option>4:3</option><option>3:4</option>
              </select>
            </div>
          </>
        )}

        {kind === "video" && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <select value={videoModel} onChange={(e) => setVideoModel(e.target.value)} className="h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none">
              <option value="veo-3.1-lite">Veo 3.1 Lite</option>
              <option value="veo-3.1-lite-generate-preview">Veo 3.1 Lite Preview</option>
              <option value="vidu/vidu-q1">Vidu Q1</option>
              <option value="vidu/vidu-q3-turbo">Vidu Q3 Turbo</option>
            </select>
            <select value={videoSeconds} onChange={(e) => setVideoSeconds(Number(e.target.value))} className="h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none">
              <option value={4}>4 วินาที</option><option value={6}>6 วินาที</option><option value={8}>8 วินาที</option>
            </select>
            <select value={ratio} onChange={(e) => setRatio(e.target.value)} className="h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none">
              <option>16:9</option><option>9:16</option><option>1:1</option>
            </select>
          </div>
        )}

        {(kind === "tts" || kind === "voice") && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            {kind === "tts" && (
              <select value={ttsProvider} onChange={(e) => setTtsProvider(e.target.value)} className="h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none">
                <option value="aws-polly">AWS Polly</option><option value="openai">OpenAI</option><option value="elevenlabs">ElevenLabs</option><option value="gemini">Gemini</option><option value="xai">Grok / xAI</option><option value="speechify">Speechify</option>
              </select>
            )}
            <input value={ttsVoice} onChange={(e) => setTtsVoice(e.target.value)} placeholder={kind === "voice" ? "ElevenLabs voice ID (ถ้ามี)" : ttsProvider === "xai" ? "xAI voice: eve / ara / rex / sal / leo" : "Voice ID (ไม่ใส่ = ค่าเริ่มต้น)"} className="h-10 rounded-[var(--radius-md)] border border-border bg-card px-3 text-xs outline-none" />
          </div>
        )}

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button type="submit" className="h-11 rounded-[var(--radius-lg)] px-5" disabled={busy || (fileMode ? !file : prompt.trim().length < 3)}>
            {busy ? <LoaderCircle className="size-4 animate-spin" /> : kind === "video" ? <Video className="size-4" /> : kind === "tts" ? <AudioLines className="size-4" /> : fileMode ? <FileText className="size-4" /> : <ImagePlus className="size-4" />}
            {busy ? t.creating : KIND_LABELS[kind]}
          </Button>
          {error ? <p className="text-xs text-destructive">{error}</p> : null}
        </div>

        {resultText ? (
          <div className="mt-3 rounded-[var(--radius-lg)] border border-border bg-secondary/40 p-3">
            <div className="mb-2 flex items-center gap-2 text-xs font-medium"><Sparkles className="size-3.5" /> ผลลัพธ์</div>
            <pre className="max-h-64 overflow-auto whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">{resultText}</pre>
          </div>
        ) : null}
      </form>

      <div className="boss-scroll flex-1 overflow-y-auto px-4 py-4 sm:px-6">
        {creates.length === 0 ? (
          <p className="py-10 text-center text-sm text-subtle">ยังไม่มีผลงาน</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {creates.map((item) => (
              <figure key={item.id} className="overflow-hidden rounded-[var(--radius-xl)] border border-border bg-card">
                {item.kind === "video" ? (
                  <video src={item.url} controls playsInline className="aspect-[16/10] w-full object-cover" />
                ) : item.kind === "audio" ? (
                  <div className="flex min-h-32 items-center gap-3 p-4"><Mic2 className="size-8 shrink-0" /><audio src={item.url} controls className="w-full" /></div>
                ) : (
                  <img src={item.url} alt={item.prompt} className="aspect-[16/10] w-full object-cover" crossOrigin="anonymous" />
                )}
                <figcaption className="px-3 py-2 text-xs leading-relaxed text-muted-foreground">{item.prompt}</figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
