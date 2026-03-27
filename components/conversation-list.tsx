"use client";

import { MessageSquarePlus, Pin, X } from "lucide-react";
import { formatSidebarTime } from "@/lib/chat-format";
import { cn } from "@/lib/cn";
import type { Conversation } from "@/types/chat";

interface ConversationListProps {
  conversations: Conversation[];
  selectedConversationId: string | null;
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
  onSelectConversation: (conversationId: string) => void;
}

export function ConversationList({
  conversations,
  selectedConversationId,
  isOpen,
  isMobile,
  onClose,
  onSelectConversation,
}: ConversationListProps) {
  const pinned = conversations.filter((conversation) => conversation.isPinned);
  const others = conversations.filter((conversation) => !conversation.isPinned);

  return (
    <>
      {isMobile && isOpen ? (
        <button
          aria-label="Close sidebar overlay"
          className="absolute inset-0 z-20 bg-slate-950/45 lg:hidden"
          onClick={onClose}
          type="button"
        />
      ) : null}

      <aside
        className={cn(
          "absolute inset-y-0 left-0 z-30 flex w-[320px] shrink-0 flex-col border-r border-border bg-surface transition-transform duration-300 lg:static lg:translate-x-0",
          isMobile && !isOpen && "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-5">
          <div>
            <p className="text-[0.72rem] uppercase tracking-[0.22em] text-muted">
              Workspace
            </p>
            <h2 className="mt-1 text-xl font-semibold tracking-tight">Messages</h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-panel transition hover:bg-panelAlt"
              type="button"
            >
              <MessageSquarePlus className="h-4 w-4" />
            </button>
            {isMobile ? (
              <button
                aria-label="Close conversations"
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-panel transition hover:bg-panelAlt lg:hidden"
                onClick={onClose}
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-4">
          <ConversationSection
            items={pinned}
            label="Pinned"
            onSelectConversation={onSelectConversation}
            selectedConversationId={selectedConversationId}
          />
          <ConversationSection
            items={others}
            label="All Messages"
            onSelectConversation={onSelectConversation}
            selectedConversationId={selectedConversationId}
          />
        </div>
      </aside>
    </>
  );
}

function ConversationSection({
  items,
  label,
  selectedConversationId,
  onSelectConversation,
}: {
  items: Conversation[];
  label: string;
  selectedConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section className="mb-5">
      <div className="px-3 pb-2 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted">
        {label}
      </div>
      <div className="space-y-1.5">
        {items.map((conversation) => {
          const isSelected = conversation.id === selectedConversationId;

          return (
            <button
              className={cn(
                "flex w-full items-center gap-3 rounded-[22px] px-3 py-3 text-left transition",
                isSelected
                  ? "bg-accentSoft shadow-[inset_0_0_0_1px_rgba(96,165,250,0.25)]"
                  : "hover:bg-panel",
              )}
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              type="button"
            >
              <div className="relative shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  alt={conversation.name}
                  className="h-12 w-12 rounded-[18px] object-cover"
                  src={conversation.avatar}
                />
                {conversation.isOnline ? (
                  <span className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface bg-success" />
                ) : null}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <p
                      className={cn(
                        "truncate text-sm",
                        conversation.unreadCount > 0 ? "font-semibold" : "font-medium",
                      )}
                    >
                      {conversation.name}
                    </p>
                    {conversation.isPinned ? (
                      <Pin className="h-3 w-3 shrink-0 text-muted" />
                    ) : null}
                  </div>
                  <span className="shrink-0 text-xs text-muted">
                    {formatSidebarTime(conversation.lastMessage?.timestamp)}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between gap-3">
                  <p
                    className={cn(
                      "truncate text-sm",
                      conversation.unreadCount > 0 ? "text-text" : "text-muted",
                    )}
                  >
                    {conversation.isTyping ? (
                      <span className="italic text-accent">typing...</span>
                    ) : (
                      conversation.lastMessage?.content ?? "No messages yet"
                    )}
                  </p>
                  {conversation.unreadCount > 0 ? (
                    <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-accent px-1.5 py-0.5 text-[0.68rem] font-semibold text-white">
                      {conversation.unreadCount}
                    </span>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
