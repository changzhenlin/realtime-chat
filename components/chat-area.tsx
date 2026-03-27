"use client";

import type { Conversation, Message, QuickReply } from "@/types/chat";
import { ChatAreaHeader } from "@/components/chat-area-header";
import { ChatInput } from "@/components/chat-input";
import { MessageList } from "@/components/message-list";

interface ChatAreaProps {
  conversation: Conversation;
  messages: Message[];
  quickReplies: QuickReply[];
  theme: "light" | "dark";
  isMobile: boolean;
  onClose: () => void;
  onSendMessage: (content: string, type: "text" | "file" | "image") => void;
}

export function ChatArea({
  conversation,
  isMobile,
  messages,
  onClose,
  onSendMessage,
  quickReplies,
  theme,
}: ChatAreaProps) {
  return (
    <section className="flex min-w-0 flex-1 flex-col bg-[linear-gradient(180deg,rgba(255,255,255,0.32),rgba(255,255,255,0))] dark:bg-none">
      <ChatAreaHeader
        conversation={conversation}
        isMobile={isMobile}
        onClose={onClose}
      />
      <MessageList
        isTyping={conversation.isTyping}
        messages={messages}
        participants={conversation.participants}
      />
      <ChatInput
        onSendMessage={onSendMessage}
        quickReplies={quickReplies}
        theme={theme}
      />
    </section>
  );
}

