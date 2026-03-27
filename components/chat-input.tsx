"use client";

import { useEffect, useRef, useState } from "react";
import {
  ImagePlus,
  Mic,
  Paperclip,
  SendHorizontal,
  SmilePlus,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import type { QuickReply } from "@/types/chat";

interface ChatInputProps {
  theme: "light" | "dark";
  quickReplies: QuickReply[];
  onSendMessage: (content: string, type: "text" | "file" | "image") => void;
}

export function ChatInput({
  theme,
  quickReplies,
  onSendMessage,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const [showQuickReplies, setShowQuickReplies] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!textareaRef.current) {
      return;
    }

    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 140)}px`;
  }, [value]);

  const handleSend = () => {
    const next = value.trim();

    if (!next) {
      return;
    }

    onSendMessage(next, "text");
    setValue("");
    setShowQuickReplies(false);
  };

  return (
    <div className="border-t border-border bg-surface px-3 py-3 backdrop-blur sm:px-5">
      {showQuickReplies ? (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          {quickReplies.map((reply) => (
            <button
              className="rounded-full border border-border bg-panel px-3 py-1.5 text-xs font-medium text-muted transition hover:border-accent hover:bg-accentSoft hover:text-text"
              key={reply.id}
              onClick={() => {
                onSendMessage(reply.text, "text");
                setShowQuickReplies(false);
              }}
              type="button"
            >
              {reply.text}
            </button>
          ))}
          <button
            aria-label="Hide quick replies"
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-panel text-muted transition hover:bg-panelAlt"
            onClick={() => setShowQuickReplies(false)}
            type="button"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      ) : null}

      <div className="flex items-end gap-3">
        <div className="hidden items-center gap-2 pb-2 sm:flex">
          {[
            { icon: SmilePlus, label: "Emoji" },
            { icon: Paperclip, label: "Attach file", action: () => onSendMessage("📎 document.pdf", "file") },
            { icon: ImagePlus, label: "Attach image", action: () => onSendMessage("Shared image", "image") },
          ].map(({ icon: Icon, label, action }) => (
            <button
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-panel text-muted transition hover:bg-panelAlt hover:text-text"
              key={label}
              onClick={action}
              type="button"
            >
              <Icon className="h-4 w-4" />
            </button>
          ))}
          <button
            aria-label="Record message"
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-panel text-muted transition hover:bg-panelAlt hover:text-text"
            onClick={() => setIsRecording((current) => !current)}
            type="button"
          >
            <Mic className="h-4 w-4" />
          </button>
        </div>

        <div className="relative flex-1">
          <textarea
            className="min-h-[52px] w-full resize-none rounded-[24px] border border-border bg-panel px-5 py-3.5 pr-16 text-sm leading-6 text-text outline-none transition placeholder:text-muted focus:border-accent"
            onChange={(event) => setValue(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSend();
              }
            }}
            placeholder="Type a message..."
            ref={textareaRef}
            rows={1}
            value={value}
          />
          <button
            aria-label="Send message"
            className="absolute bottom-2 right-2 inline-flex h-12 w-12 items-center justify-center rounded-[18px] bg-accent text-white transition hover:bg-[#2f6ee6] disabled:cursor-not-allowed disabled:bg-panelAlt disabled:text-muted"
            disabled={!value.trim()}
            onClick={handleSend}
            type="button"
          >
            <SendHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between px-1 text-xs text-muted">
        <span>Press Enter to send, Shift+Enter for a new line</span>
        <span className="hidden items-center gap-1 sm:inline-flex">
          <span
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: theme === "light" ? "#60a5fa" : "#93c5fd" }}
          />
          End-to-end encrypted
        </span>
      </div>

      {isRecording ? (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 inline-flex items-center gap-2 rounded-full bg-[rgba(239,68,68,0.08)] px-3 py-1.5 text-xs font-medium text-[var(--danger)]"
          initial={{ opacity: 0, y: -6 }}
        >
          <span className="inline-block h-2 w-2 rounded-full bg-[var(--danger)]" />
          Recording...
        </motion.div>
      ) : null}
    </div>
  );
}
