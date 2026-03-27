"use client";

import { ArrowLeft, Info, MoreVertical, Phone, Video } from "lucide-react";
import type { Conversation } from "@/types/chat";

interface ChatAreaHeaderProps {
  conversation: Conversation;
  isMobile: boolean;
  onClose: () => void;
}

export function ChatAreaHeader({
  conversation,
  isMobile,
  onClose,
}: ChatAreaHeaderProps) {
  const statusText = conversation.isTyping
    ? "typing..."
    : conversation.type === "group"
      ? `${conversation.participants.length} members`
      : conversation.isOnline
        ? "online"
        : "offline";

  return (
    <header className="flex h-20 items-center justify-between border-b border-border bg-surface px-4 backdrop-blur sm:px-5">
      <div className="flex min-w-0 items-center gap-3">
        {isMobile ? (
          <button
            aria-label="Back to conversation list"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-panel transition hover:bg-panelAlt lg:hidden"
            onClick={onClose}
            type="button"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        ) : null}
        <div className="relative shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            alt={conversation.name}
            className="h-12 w-12 rounded-[18px] object-cover"
            src={conversation.avatar}
          />
          {conversation.isOnline && conversation.type === "direct" ? (
            <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-success" />
          ) : null}
        </div>
        <div className="min-w-0">
          <h2 className="truncate text-base font-semibold">{conversation.name}</h2>
          <p
            className={
              conversation.isTyping ? "text-sm italic text-accent" : "text-sm text-muted"
            }
          >
            {statusText}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {[Phone, Video, Info, MoreVertical].map((Icon, index) => (
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-panel transition hover:bg-panelAlt"
            key={index}
            type="button"
          >
            <Icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </header>
  );
}
