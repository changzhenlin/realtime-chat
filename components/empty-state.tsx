import { MessageSquareText, Sparkles } from "lucide-react";

export function EmptyState() {
  return (
    <section className="flex flex-1 items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-[30px] bg-[linear-gradient(135deg,#3b82f6,#60a5fa)] text-white shadow-[0_24px_60px_rgba(59,130,246,0.32)]">
          <MessageSquareText className="h-11 w-11" />
        </div>
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-panel px-4 py-2 text-xs uppercase tracking-[0.24em] text-muted">
          <Sparkles className="h-3.5 w-3.5" />
          Realtime Workspace
        </div>
        <h2 className="mt-6 text-balance text-3xl font-semibold tracking-tight text-text sm:text-4xl">
          Select a conversation to start messaging
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-pretty text-sm leading-7 text-muted sm:text-base">
          Open one of the active threads on the left to preview the production
          layout, message states, quick replies, and responsive transitions from
          the design file.
        </p>
      </div>
    </section>
  );
}
