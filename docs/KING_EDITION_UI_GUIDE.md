# King Edition — UI Design Guide
## BossnuGrok × Manus Hub

> **สถานะ:** Design Reference (ไม่ใช่โค้ดรันได้)
> **ใช้ทำอะไร:** แนวทางเวลาจะปรับ UI
> **ห้าม:** ทับ `src/components/chat-panel.tsx` หรือลบ Tailwind / Radix / Grok / Puter / Zustand

---

## ปรัชญาการออกแบบ

| หลักการ | ค่า |
|---|---|
| เรียบ แต่มีชั้น | Minimal + Hierarchy ชัด |
| หายใจได้ | Whitespace เยอ |
| ลื่นไหล | Animation 150–200ms |
| มือถือคือหลัก | Touch target ≥ 40–44px |
| สีน้อย | 2–3 สี |
| จริงใจ | ไม่หวือหวา ไม่กระพริบ |

---

## Design Tokens

### Colors

**Background:** `--bg-primary` `#0a0a0a` · `--bg-secondary` `#131313` · `--bg-card` `#1a1a1a` · `--bg-elevated` `#222222` · `--bg-hover` `rgba(255,255,255,0.04)`

**Text:** `--text-primary` `#f5f5f5` · `--text-secondary` `#a3a3a3` · `--text-tertiary` `#737373` · `--text-muted` `#525252`

**Accent:** `--accent` `#8b5cf6` · `--accent-hover` `#7c3aed` · `--accent-soft` `rgba(139,92,246,0.1)` · `--accent-border` `rgba(139,92,246,0.3)`

**Status:** `--success` `#34d399` · `--warning` `#fbbf24` · `--danger` `#f87171` · `--info` `#60a5fa`

**Borders:** `--border-subtle` `rgba(255,255,255,0.05)` · `--border-default` `rgba(255,255,255,0.08)` · `--border-strong` `rgba(255,255,255,0.12)`

### Spacing / Radius / Motion

- Space: 4 / 8 / 12 / 16 / 20 / 24 / 32
- Radius: 6 / 10 / 14 / 20 / full
- Duration: 150ms / 200ms / 300ms · ease `cubic-bezier(0.4, 0, 0.2, 1)`
- Type: 12 / 13 / 15 / 17 / 20 / 24 · line-height 1.6–1.8
- Font: system + Noto Sans Thai · mono SF Mono / Fira Code

---

## Component specs (reference)

- **Chat:** header 14×18, messages gap 20, input radius 20, send 40×40
- **Terminal:** dark card radius 14, command in mono, icons thinking/command/tool/push/success/error
- **Skill card:** accent-soft, approve/reject min-height 40
- **Approval:** red deploy/system · orange git/file · yellow package/network
- **DataTable:** card + hover row + copy/download
- **Limitations:** warning-soft — ใช้อธิบายเท่านั้น; ระบบจริงดึง live-data ผ่าน server แล้ว
- **Memory:** 2 stat columns + daily insights

## Mobile

- Height `100dvh` · `env(safe-area-inset-bottom)`
- Touch ≥ 40px · font ≥ 15px · `overscroll-behavior: contain`

## ห้าม

- ทับ ChatPanel / component ที่มี
- ลบ Tailwind + Radix
- แตะ logic Grok / Puter / Zustand
- อนิเมชัน > 300ms หรือกระพริบ

## ถ้าจะใช้จริง

เสริม token ใน Tailwind `theme.extend` แล้วใส่ class บน component เดิม — ไม่สร้าง CSS stack ขณาน

---

พัฒนาโดย ภาณุพันธ์ และ สลี่ ออลา  
เอกสารนี้เป็นแนวทาง ไม่ใช่โค้ดรันได้
