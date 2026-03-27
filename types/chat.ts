export type Presence = "online" | "offline" | "away";

export interface User {
  id: string;
  name: string;
  avatar: string;
  status: Presence;
  title?: string;
  lastSeenLabel?: string;
}

export type MessageType = "text" | "image" | "file";

export interface Reaction {
  emoji: string;
  userId: string;
}

export interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  type: MessageType;
  fileName?: string;
  fileSize?: number;
  fileUrl?: string;
  reactions?: Reaction[];
  readBy?: string[];
  edited?: boolean;
}

export type ConversationType = "direct" | "group";

export interface Conversation {
  id: string;
  type: ConversationType;
  name: string;
  avatar: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  isPinned: boolean;
  isOnline?: boolean;
  isTyping?: boolean;
}

export interface QuickReply {
  id: string;
  text: string;
}

