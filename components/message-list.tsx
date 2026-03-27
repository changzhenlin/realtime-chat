"use client";

import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { currentUser } from "@/data/mock-data";
import type { Message, User } from "@/types/chat";
import { MessageBubble } from "@/components/message-bubble";

interface MessageListProps {
  messages: Message[];
  isTyping?: boolean;
  participants: User[];
}

export function MessageList({
  isTyping,
  messages,
  participants,
}: MessageListProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto px-3 py-4 sm:px-6">
      <div className="mx-auto flex max-w-4xl flex-col gap-4">
        {messages.map((message, index) => {
          const isOwn = message.senderId === currentUser.id;
          const participant = participants.find(
            (candidate) => candidate.id === message.senderId,
          );
          const next = messages[index + 1];
          const showAvatar = next?.senderId !== message.senderId;

          return (
            <MessageBubble
              isOwn={isOwn}
              key={message.id}
              message={message}
              senderAvatar={participant?.avatar}
              senderName={participant?.name}
              showAvatar={showAvatar}
            />
          );
        })}
        {isTyping ? (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end gap-2"
            initial={{ opacity: 0, y: 8 }}
          >
            <div className="h-8 w-8 rounded-2xl bg-panel" />
            <div className="flex items-center gap-1 rounded-[20px] rounded-bl-md border border-border bg-panel px-4 py-3 shadow-bubble">
              {[0, 1, 2].map((index) => (
                <motion.span
                  animate={{ opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
                  className="h-2 w-2 rounded-full bg-muted"
                  key={index}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 0.9,
                    delay: index * 0.15,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : null}
        <div ref={endRef} />
      </div>
    </div>
  );
}
