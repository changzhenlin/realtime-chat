"use client";

import { Check, CheckCheck, Download, MoreHorizontal, Paperclip } from "lucide-react";
import { motion } from "motion/react";
import { formatFileSize, formatMessageTime } from "@/lib/chat-format";
import { cn } from "@/lib/cn";
import type { Message } from "@/types/chat";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
  senderAvatar?: string;
  senderName?: string;
  showAvatar: boolean;
}

const reactions = ["❤️", "👍", "😂", "🔥"];

export function MessageBubble({
  message,
  isOwn,
  senderAvatar,
  senderName,
  showAvatar,
}: MessageBubbleProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className={cn("group flex gap-3", isOwn ? "justify-end" : "justify-start")}
      initial={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.22 }}
    >
      {!isOwn ? (
        showAvatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            alt={senderName ?? "Sender"}
            className="mt-1 h-9 w-9 self-start rounded-2xl object-cover"
            src={senderAvatar}
          />
        ) : (
          <div className="w-9 shrink-0" />
        )
      ) : null}

      <div className={cn("max-w-[min(82vw,32rem)]", isOwn ? "items-end" : "items-start")}>
        {!isOwn && senderName ? (
          <p className="mb-1 ml-3 text-xs text-muted">{senderName}</p>
        ) : null}

        <div className={cn("flex items-start gap-2", isOwn && "flex-row-reverse")}>
          <div
            className={cn(
              "rounded-[22px] px-4 py-3 shadow-bubble transition",
              isOwn
                ? "rounded-tr-md bg-accent text-white"
                : "rounded-tl-md border border-border bg-panel text-text",
            )}
          >
            {message.type === "image" && message.fileUrl ? (
              <div className="overflow-hidden rounded-[18px]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt="Shared media"
                  className="max-h-[24rem] w-full object-cover"
                  src={message.fileUrl}
                />
              </div>
            ) : null}

            {message.type === "file" ? (
              <div className="flex min-w-[17rem] items-center gap-3">
                <div
                  className={cn(
                    "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                    isOwn ? "bg-white/16" : "bg-surface",
                  )}
                >
                  <Paperclip className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">
                    {message.fileName ?? message.content}
                  </p>
                  <p className={cn("mt-1 text-xs", isOwn ? "text-white/70" : "text-muted")}>
                    {formatFileSize(message.fileSize)}
                  </p>
                </div>
                <button
                  className={cn(
                    "inline-flex h-9 w-9 items-center justify-center rounded-2xl transition",
                    isOwn ? "bg-white/12 hover:bg-white/20" : "bg-surface hover:bg-panelAlt",
                  )}
                  type="button"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            ) : null}

            {message.type === "text" ? (
              <p className="whitespace-pre-wrap text-sm leading-6">{message.content}</p>
            ) : null}
          </div>

          <div className="hidden items-center gap-1 rounded-full border border-border bg-surface p-1 shadow-bubble transition group-hover:flex">
            {reactions.map((emoji) => (
              <button
                className="inline-flex h-7 w-7 items-center justify-center rounded-full text-sm transition hover:bg-panel"
                key={emoji}
                type="button"
              >
                {emoji}
              </button>
            ))}
            <button
              className="inline-flex h-7 w-7 items-center justify-center rounded-full transition hover:bg-panel"
              type="button"
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
        </div>

        {message.reactions?.length ? (
          <div className={cn("mt-2 flex gap-2", isOwn && "justify-end")}>
            {Array.from(new Set(message.reactions.map((reaction) => reaction.emoji))).map(
              (emoji) => {
                const count = message.reactions?.filter(
                  (reaction) => reaction.emoji === emoji,
                ).length;

                return (
                  <span
                    className="inline-flex items-center gap-1 rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted"
                    key={emoji}
                  >
                    <span>{emoji}</span>
                    {count && count > 1 ? <span>{count}</span> : null}
                  </span>
                );
              },
            )}
          </div>
        ) : null}

        <div className={cn("mt-2 flex items-center gap-1 px-3 text-xs text-muted", isOwn && "justify-end")}>
          <span>{formatMessageTime(message.timestamp)}</span>
          {isOwn ? (
            message.readBy?.length ? (
              <CheckCheck className="h-3.5 w-3.5 text-accent" />
            ) : (
              <Check className="h-3.5 w-3.5" />
            )
          ) : null}
        </div>
      </div>
    </motion.div>
  );
}
