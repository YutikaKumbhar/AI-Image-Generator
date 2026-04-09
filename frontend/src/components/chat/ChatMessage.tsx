import { ChatMessage as ChatMessageType } from "@/types/chat";
import { Download, User, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessageBubble({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  const handleDownload = () => {
    if (!message.imageUrl) return;
    const link = document.createElement("a");
    link.href = message.imageUrl;
    link.download = `generated-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? "bg-primary/20 text-primary" : "bg-accent text-foreground"
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
      </div>

      <div className={`max-w-[75%] space-y-2 ${isUser ? "items-end" : ""}`}>
        <div
          className={`rounded-2xl px-4 py-2.5 text-sm ${
            isUser
              ? "bg-primary text-primary-foreground rounded-br-md"
              : "bg-accent text-foreground rounded-bl-md"
          }`}
        >
          <div className="prose prose-sm prose-invert max-w-none">
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        </div>

        {message.imageUrl && (
          <div className="relative group rounded-xl overflow-hidden border border-border">
            <img
              src={message.imageUrl}
              alt="Generated image"
              className="w-full max-w-md rounded-xl"
            />
            <button
              onClick={handleDownload}
              className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-background"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        )}

        <p className={`text-[10px] text-muted-foreground ${isUser ? "text-right" : ""}`}>
          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </p>
      </div>
    </div>
  );
}
