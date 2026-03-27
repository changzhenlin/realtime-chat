export function formatSidebarTime(value?: string) {
  if (!value) {
    return "";
  }

  const date = new Date(value);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 1) {
    return "just now";
  }

  if (diffHours < 24) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  if (diffHours < 48) {
    return "yesterday";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatMessageTime(value: string) {
  const date = new Date(value);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = diffMs / (1000 * 60);

  if (diffMinutes < 1) {
    return "just now";
  }

  if (diffMinutes < 60) {
    return `${Math.floor(diffMinutes)} min ago`;
  }

  if (diffMinutes < 24 * 60) {
    return date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatFileSize(size?: number) {
  if (!size) {
    return "";
  }

  const kb = size / 1024;
  if (kb < 1024) {
    return `${kb.toFixed(1)} KB`;
  }

  return `${(kb / 1024).toFixed(1)} MB`;
}
