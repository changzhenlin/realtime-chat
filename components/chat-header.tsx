"use client";

import {
  Bell,
  Menu,
  MessageCircleMore,
  MoonStar,
  Search,
  SunMedium,
} from "lucide-react";
import { currentUser } from "@/data/mock-data";

interface ChatHeaderProps {
  theme: "light" | "dark";
  isMobile: boolean;
  onThemeToggle: () => void;
  onMenuToggle: () => void;
}

export function ChatHeader({
  theme,
  isMobile,
  onMenuToggle,
  onThemeToggle,
}: ChatHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-border bg-surface backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between gap-4 px-3 sm:px-4">
        <div className="flex items-center gap-3">
          {isMobile ? (
            <button
              aria-label="Open conversations"
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-panel text-text transition hover:bg-panelAlt"
              onClick={onMenuToggle}
              type="button"
            >
              <Menu className="h-5 w-5" />
            </button>
          ) : null}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent text-white shadow-[0_16px_36px_rgba(59,130,246,0.38)]">
              <MessageCircleMore className="h-5 w-5" />
            </div>
            <div>
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-muted">
                Realtime
              </p>
              <h1 className="text-lg font-semibold tracking-tight">Chat Platform</h1>
            </div>
          </div>
        </div>

        <div className="hidden min-w-0 flex-1 justify-center lg:flex">
          <label className="flex h-11 w-full max-w-xl items-center gap-3 rounded-2xl border border-border bg-panel px-4 text-sm text-muted">
            <Search className="h-4 w-4 shrink-0" />
            <input
              className="w-full bg-transparent text-sm text-text outline-none placeholder:text-muted"
              placeholder="Search contacts or messages..."
              type="text"
            />
          </label>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Notifications"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-panel text-text transition hover:bg-panelAlt"
            type="button"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[var(--danger)] px-1 text-[0.65rem] font-semibold text-white">
              3
            </span>
          </button>
          <button
            aria-label="Toggle theme"
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-panel text-text transition hover:bg-panelAlt"
            onClick={onThemeToggle}
            type="button"
          >
            {theme === "light" ? (
              <MoonStar className="h-5 w-5" />
            ) : (
              <SunMedium className="h-5 w-5" />
            )}
          </button>
          <button
            className="inline-flex items-center gap-3 rounded-2xl border border-border bg-panel px-2.5 py-1.5 text-left transition hover:bg-panelAlt"
            type="button"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt={currentUser.name}
              className="h-9 w-9 rounded-2xl object-cover ring-2 ring-accentSoft"
              src={currentUser.avatar}
            />
            <div className="hidden pr-1 sm:block">
              <p className="text-sm font-semibold leading-none">{currentUser.name}</p>
              <p className="mt-1 text-xs text-muted">{currentUser.title}</p>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
