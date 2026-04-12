import type { ChatMessage } from "@/types/admin";

interface ChatHistoryFeedProps {
  messages: ChatMessage[];
}

export function ChatHistoryFeed({ messages }: ChatHistoryFeedProps) {
  // Filter out system prompts — too noisy for the founder view
  const visible = messages.filter((m) => m.role !== "system" && m.content);

  if (visible.length === 0) {
    return (
      <p className="text-sm text-white/30 italic">No conversation history yet.</p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {visible.map((msg, i) => {
        const isUser = msg.role === "user";
        return (
          <div
            key={i}
            className={`flex ${isUser ? "justify-end" : "justify-start"}`}
          >
            {!isUser && (
              <div className="mr-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-fuchsia-500/20 text-[10px] font-bold text-fuchsia-400">
                G
              </div>
            )}
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                isUser
                  ? "rounded-tr-sm bg-white/10 text-white"
                  : "rounded-tl-sm border border-fuchsia-500/20 bg-fuchsia-950/30 text-white/90"
              }`}
            >
              {msg.content}
            </div>
            {isUser && (
              <div className="ml-2 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-[10px] font-bold text-white/60">
                U
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
