# Realtime Chat

A high-fidelity chat workspace built from the provided Figma design. This version is intentionally local-first: the UI is production-buildable, but all chat behavior runs on mock data in the client.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Lucide React
- Motion

## Features

- Responsive chat shell with mobile drawer behavior
- Conversation list with pinned threads, unread badges, and typing state
- Message area with text, image, and file rows
- Quick replies, simulated outgoing/incoming messages, and read indicators
- Light and dark theme toggle

## Run

```bash
npm install
npm run dev
```

## Verify

```bash
npm run typecheck
npm run lint
npm run build
```
