"use client";

import { useEffect, useMemo, useState } from "react";
import {
  conversations as seedConversations,
  currentUser,
  messagesByConversation as seedMessages,
  quickReplies,
  simulatedReplies,
} from "@/data/mock-data";
import type { Conversation, Message } from "@/types/chat";
import { ChatArea } from "@/components/chat-area";
import { ChatHeader } from "@/components/chat-header";
import { ConversationList } from "@/components/conversation-list";
import { EmptyState } from "@/components/empty-state";

export function ChatWorkspace() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [conversations, setConversations] =
    useState<Conversation[]>(seedConversations);
  const [messagesByConversation, setMessagesByConversation] =
    useState<Record<string, Message[]>>(seedMessages);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1023px)");

    const syncLayout = () => {
      const nextIsMobile = media.matches;
      setIsMobile(nextIsMobile);
      setIsSidebarOpen(!nextIsMobile);
    };

    syncLayout();
    media.addEventListener("change", syncLayout);
    return () => media.removeEventListener("change", syncLayout);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    return () => {
      window.clearTimeout((window as Window & { __replyTimer?: number }).__replyTimer);
      window.clearTimeout((window as Window & { __typingTimer?: number }).__typingTimer);
    };
  }, []);

  const selectedConversation = useMemo(
    () =>
      conversations.find((conversation) => conversation.id === selectedConversationId) ??
      null,
    [conversations, selectedConversationId],
  );

  const currentMessages = selectedConversationId
    ? messagesByConversation[selectedConversationId] ?? []
    : [];

  const updateConversation = (
    conversationId: string,
    updater: (conversation: Conversation) => Conversation,
  ) => {
    setConversations((current) =>
      current.map((conversation) =>
        conversation.id === conversationId ? updater(conversation) : conversation,
      ),
    );
  };

  const selectConversation = (conversationId: string) => {
    setSelectedConversationId(conversationId);
    updateConversation(conversationId, (conversation) => ({
      ...conversation,
      unreadCount: 0,
    }));

    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const sendMessage = (content: string, type: "text" | "file" | "image") => {
    if (!selectedConversationId) {
      return;
    }

    const nextMessage: Message = {
      id: `self-${Date.now()}`,
      senderId: currentUser.id,
      content,
      timestamp: new Date().toISOString(),
      type,
      readBy: [],
      ...(type === "file"
        ? {
            fileName: content.replace(/^📎\s*/, ""),
            fileSize: 1_820_000,
          }
        : {}),
      ...(type === "image"
        ? {
            fileUrl:
              "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
          }
        : {}),
    };

    setMessagesByConversation((current) => ({
      ...current,
      [selectedConversationId]: [...(current[selectedConversationId] ?? []), nextMessage],
    }));

    updateConversation(selectedConversationId, (conversation) => ({
      ...conversation,
      lastMessage: nextMessage,
      isTyping: false,
    }));

    window.clearTimeout((window as Window & { __replyTimer?: number }).__replyTimer);
    window.clearTimeout((window as Window & { __typingTimer?: number }).__typingTimer);

    (window as Window & { __typingTimer?: number }).__typingTimer = window.setTimeout(
      () => {
        updateConversation(selectedConversationId, (conversation) => ({
          ...conversation,
          isTyping: true,
        }));
      },
      1000,
    );

    (window as Window & { __replyTimer?: number }).__replyTimer = window.setTimeout(
      () => {
        const conversation = conversations.find(
          (entry) => entry.id === selectedConversationId,
        );
        const responder = conversation?.participants.find(
          (participant) => participant.id !== currentUser.id,
        );

        if (!responder) {
          return;
        }

        const responseMessage: Message = {
          id: `reply-${Date.now()}`,
          senderId: responder.id,
          content:
            simulatedReplies[Math.floor(Math.random() * simulatedReplies.length)] ??
            "Received.",
          timestamp: new Date().toISOString(),
          type: "text",
        };

        setMessagesByConversation((current) => ({
          ...current,
          [selectedConversationId]: [
            ...(current[selectedConversationId] ?? []),
            responseMessage,
          ],
        }));

        updateConversation(selectedConversationId, (entry) => ({
          ...entry,
          lastMessage: responseMessage,
          isTyping: false,
          unreadCount: 0,
        }));
      },
      3200,
    );
  };

  return (
    <main className="h-screen overflow-hidden bg-canvas text-text">
      <div className="shell-gradient pointer-events-none" />
      <ChatHeader
        theme={theme}
        isMobile={isMobile}
        onMenuToggle={() => setIsSidebarOpen((open) => !open)}
        onThemeToggle={() =>
          setTheme((current) => (current === "light" ? "dark" : "light"))
        }
      />
      <div className="pt-16 h-full">
        <section className="mx-auto flex h-[calc(100vh-4rem)] max-w-[1600px] overflow-hidden px-3 pb-3 sm:px-4 sm:pb-4">
          <div className="chat-shell flex h-full w-full overflow-hidden rounded-[28px] border border-border bg-surface shadow-shell backdrop-blur">
            <ConversationList
              conversations={conversations}
              isMobile={isMobile}
              isOpen={isSidebarOpen}
              selectedConversationId={selectedConversationId}
              onClose={() => setIsSidebarOpen(false)}
              onSelectConversation={selectConversation}
            />
            {selectedConversation ? (
              <ChatArea
                conversation={selectedConversation}
                isMobile={isMobile}
                messages={currentMessages}
                onClose={() => {
                  setSelectedConversationId(null);
                  setIsSidebarOpen(true);
                }}
                onSendMessage={sendMessage}
                quickReplies={quickReplies}
                theme={theme}
              />
            ) : (
              <EmptyState />
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
