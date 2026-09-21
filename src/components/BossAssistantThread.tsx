import {
  AuiIf,
  AssistantRuntimeProvider,
  ComposerPrimitive,
  MessagePartPrimitive,
  MessagePrimitive,
  ThreadPrimitive,
  useExternalStoreRuntime,
  type AppendMessage,
  type ThreadMessageLike,
} from "@assistant-ui/react";
import { ArrowUp } from "lucide-react";

export type BossAssistantMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: number;
};

type BossAssistantThreadProps = {
  messages: BossAssistantMessage[];
  isRunning: boolean;
  onSend: (text: string) => Promise<void>;
};

function toThreadMessage(message: BossAssistantMessage): ThreadMessageLike {
  return {
    id: message.id,
    role: message.role,
    content: [{ type: "text", text: message.content }],
    createdAt: message.createdAt ? new Date(message.createdAt) : undefined,
  };
}

function UserMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-end px-1 py-1">
      <div className="max-w-[88%] rounded-2xl rounded-br-md bg-primary px-4 py-2.5 text-sm text-primary-foreground shadow-sm">
        <MessagePrimitive.Parts />
      </div>
    </MessagePrimitive.Root>
  );
}

function AssistantMessage() {
  return (
    <MessagePrimitive.Root className="flex justify-start gap-2 px-1 py-1">
      <div className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[10px] font-bold text-primary">
        B
      </div>
      <div className="max-w-[90%] rounded-2xl rounded-bl-md border bg-card/80 px-4 py-3 text-sm shadow-sm">
        <MessagePrimitive.Parts>
          {({ part }) =>
            part.type === "text" ? (
              <MessagePartPrimitive.Text className="whitespace-pre-wrap leading-6" />
            ) : (
              null
            )
          }
        </MessagePrimitive.Parts>
      </div>
    </MessagePrimitive.Root>
  );
}

function BossThread() {
  return (
    <ThreadPrimitive.Root className="flex h-full min-h-0 flex-col">
      <ThreadPrimitive.Viewport
        turnAnchor="top"
        className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-2 py-3"
      >
        <AuiIf condition={(s) => s.thread.isEmpty}>
          <div className="flex flex-1 items-center justify-center px-6 py-12 text-center">
            <div>
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-lg font-bold text-primary">
                B
              </div>
              <h3 className="text-base font-semibold">BossnuGrok</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                บอกเป้าหมายมาได้เลย บอสจะหาวิธีทำให้เอง
              </p>
            </div>
          </div>
        </AuiIf>

        <ThreadPrimitive.Messages>
          {({ message }) =>
            message.role === "user" ? <UserMessage /> : <AssistantMessage />
          }
        </ThreadPrimitive.Messages>

        <ThreadPrimitive.ViewportFooter className="sticky bottom-0 pt-2">
          <ComposerPrimitive.Root className="flex w-full items-end gap-2 rounded-3xl border bg-background/95 p-2 shadow-lg backdrop-blur">
            <ComposerPrimitive.Input
              rows={1}
              placeholder="บอกเป้าหมายให้บอส..."
              className="min-h-10 max-h-36 flex-1 resize-none bg-transparent px-3 py-2.5 text-sm outline-none"
            />
            <ComposerPrimitive.Send
              className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground disabled:opacity-40"
            >
              <ArrowUp className="size-4" />
            </ComposerPrimitive.Send>
          </ComposerPrimitive.Root>
        </ThreadPrimitive.ViewportFooter>
      </ThreadPrimitive.Viewport>
    </ThreadPrimitive.Root>
  );
}

export function BossAssistantThread({
  messages,
  isRunning,
  onSend,
}: BossAssistantThreadProps) {
  const runtime = useExternalStoreRuntime({
    messages,
    isRunning,
    convertMessage: toThreadMessage,
    onNew: async (message: AppendMessage) => {
      const text = message.content
        .map((part) => (part.type === "text" ? part.text : ""))
        .join("")
        .trim();
      if (text) await onSend(text);
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <BossThread />
      <AuiIf condition={(s) => s.thread.isRunning}>
        <div className="pointer-events-none absolute bottom-20 left-1/2 -translate-x-1/2 rounded-full border bg-background/90 px-3 py-1 text-[11px] text-muted-foreground shadow-sm">
          กำลังทำงาน…
        </div>
      </AuiIf>
    </AssistantRuntimeProvider>
  );
}
