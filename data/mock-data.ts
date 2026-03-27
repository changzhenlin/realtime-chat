import type { Conversation, Message, QuickReply, User } from "@/types/chat";

export const currentUser: User = {
  id: "self",
  name: "Tyler Lin",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  status: "online",
  title: "Product Lead",
};

export const users: User[] = [
  {
    id: "u-sarah",
    name: "Sarah Johnson",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    status: "online",
    title: "Creative Director",
  },
  {
    id: "u-michael",
    name: "Michael Chen",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80",
    status: "online",
    title: "Design Systems",
  },
  {
    id: "u-emma",
    name: "Emma Williams",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=80",
    status: "away",
    title: "UX Researcher",
  },
  {
    id: "u-olivia",
    name: "Olivia Taylor",
    avatar:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
    status: "online",
    title: "Motion Designer",
  },
  {
    id: "u-james",
    name: "James Rodriguez",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    status: "offline",
    title: "Engineering Manager",
    lastSeenLabel: "Last seen 1h ago",
  },
  {
    id: "u-design",
    name: "Design Team",
    avatar:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=200&q=80",
    status: "online",
    title: "4 members online",
  },
];

const [sarah, michael, emma, olivia, james, designTeam] = users;

const minutesAgo = (count: number) =>
  new Date(Date.now() - count * 60_000).toISOString();

const hoursAgo = (count: number) =>
  new Date(Date.now() - count * 60 * 60_000).toISOString();

const daysAgo = (count: number) =>
  new Date(Date.now() - count * 24 * 60 * 60_000).toISOString();

export const messagesByConversation: Record<string, Message[]> = {
  sarah: [
    {
      id: "m-1",
      senderId: currentUser.id,
      content: "Hey Sarah, are we still aligned on the 3pm review?",
      timestamp: hoursAgo(1),
      type: "text",
      readBy: [sarah.id],
    },
    {
      id: "m-2",
      senderId: sarah.id,
      content: "Yes. I just uploaded the refined palette exploration.",
      timestamp: minutesAgo(52),
      type: "text",
      reactions: [{ emoji: "👍", userId: currentUser.id }],
    },
    {
      id: "m-3",
      senderId: sarah.id,
      content:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
      timestamp: minutesAgo(48),
      type: "image",
      fileUrl:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    },
    {
      id: "m-4",
      senderId: currentUser.id,
      content: "This direction is much calmer. The blue feels right now.",
      timestamp: minutesAgo(41),
      type: "text",
      readBy: [sarah.id],
    },
    {
      id: "m-5",
      senderId: sarah.id,
      content: "Realtime-Chat-v4.fig",
      timestamp: minutesAgo(9),
      type: "file",
      fileName: "Realtime-Chat-v4.fig",
      fileSize: 3_145_728,
    },
    {
      id: "m-6",
      senderId: sarah.id,
      content: "Sounds great. See you at 3pm.",
      timestamp: minutesAgo(5),
      type: "text",
    },
  ],
  michael: [
    {
      id: "m-7",
      senderId: michael.id,
      content: "I pushed the updated sidebar spacing to the branch.",
      timestamp: hoursAgo(2),
      type: "text",
    },
    {
      id: "m-8",
      senderId: currentUser.id,
      content: "Nice. I’ll compare it against the original mock after lunch.",
      timestamp: hoursAgo(2),
      type: "text",
      readBy: [michael.id],
    },
  ],
  design: [
    {
      id: "m-9",
      senderId: emma.id,
      content: "Morning team. Need final pass on the chat empty state.",
      timestamp: hoursAgo(6),
      type: "text",
    },
    {
      id: "m-10",
      senderId: olivia.id,
      content: "I can tighten the motion and icon balance.",
      timestamp: hoursAgo(5),
      type: "text",
    },
    {
      id: "m-11",
      senderId: currentUser.id,
      content: "Please keep the workspace clean. No card-heavy treatment.",
      timestamp: hoursAgo(4),
      type: "text",
      readBy: [emma.id, olivia.id],
    },
    {
      id: "m-12",
      senderId: emma.id,
      content: "Let’s schedule a design review.",
      timestamp: hoursAgo(2),
      type: "text",
    },
  ],
  emma: [
    {
      id: "m-13",
      senderId: currentUser.id,
      content: "Thanks for the interview notes. Super useful.",
      timestamp: daysAgo(1),
      type: "text",
      readBy: [emma.id],
    },
  ],
  james: [
    {
      id: "m-14",
      senderId: james.id,
      content: "Perfect, I’ll get started on that.",
      timestamp: daysAgo(3),
      type: "text",
    },
  ],
};

export const conversations: Conversation[] = [
  {
    id: "sarah",
    type: "direct",
    name: sarah.name,
    avatar: sarah.avatar,
    participants: [currentUser, sarah],
    lastMessage: messagesByConversation.sarah.at(-1),
    unreadCount: 2,
    isPinned: true,
    isOnline: true,
  },
  {
    id: "michael",
    type: "direct",
    name: michael.name,
    avatar: michael.avatar,
    participants: [currentUser, michael],
    lastMessage: messagesByConversation.michael.at(-1),
    unreadCount: 0,
    isPinned: true,
    isOnline: true,
  },
  {
    id: "design",
    type: "group",
    name: designTeam.name,
    avatar: designTeam.avatar,
    participants: [currentUser, sarah, emma, olivia],
    lastMessage: messagesByConversation.design.at(-1),
    unreadCount: 5,
    isPinned: false,
    isOnline: true,
  },
  {
    id: "emma",
    type: "direct",
    name: emma.name,
    avatar: emma.avatar,
    participants: [currentUser, emma],
    lastMessage: messagesByConversation.emma.at(-1),
    unreadCount: 0,
    isPinned: false,
    isOnline: false,
  },
  {
    id: "james",
    type: "direct",
    name: james.name,
    avatar: james.avatar,
    participants: [currentUser, james],
    lastMessage: messagesByConversation.james.at(-1),
    unreadCount: 0,
    isPinned: false,
    isOnline: false,
  },
];

export const quickReplies: QuickReply[] = [
  { id: "q-1", text: "Looks good" },
  { id: "q-2", text: "I’ll review it" },
  { id: "q-3", text: "Let me check" },
  { id: "q-4", text: "Thanks!" },
];

export const simulatedReplies = [
  "Thanks. That works for me.",
  "I just synced the latest version.",
  "Let’s keep the current direction and refine details.",
  "Looks strong. I’ll confirm after a quick check.",
];
