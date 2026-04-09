import { useState, useRef, useEffect, useCallback } from "react";
import { ChatMessage, ImageStyle, PromptHistoryItem } from "@/types/chat";
import { ChatMessageBubble } from "./ChatMessage";
import { PromptInput } from "./PromptInput";
import { TypingIndicator } from "./TypingIndicator";
import { HistorySidebar } from "./HistorySidebar";
import { supabase } from "@/integrations/supabase/client";
import { Menu, ArrowUpRight } from "lucide-react";
import { toast } from "sonner";

export function ChatContainer() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hey! 👋 I'm your **AI Image Generator**. Describe any image and pick a style — I'll create it for you!\n\nTry something like: *\"A dragon flying over a neon city at night\"*",
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<PromptHistoryItem[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSend = useCallback(async (prompt: string, style: ImageStyle) => {
    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: prompt,
      style,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("generate-image", {
        body: { prompt, style },
      });

      if (error) throw error;

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.message || "Here's your generated image! ✨",
        imageUrl: data.imageUrl,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);

      setHistory((prev) => [
        {
          id: crypto.randomUUID(),
          prompt,
          style,
          timestamp: new Date(),
          imageUrl: data.imageUrl,
        },
        ...prev,
      ]);
    } catch (err: any) {
      console.error("Generation error:", err);
      const errorMsg = err?.message || "Something went wrong";
      toast.error(errorMsg);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Sorry, I couldn't generate that image. ${errorMsg}`,
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleHistorySelect = (item: PromptHistoryItem) => {
    if (item.imageUrl) {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Here's a previous generation for: *"${item.prompt}"* (${item.style} style)`,
          imageUrl: item.imageUrl,
          timestamp: new Date(),
        },
      ]);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <HistorySidebar
        history={history}
        onSelect={handleHistorySelect}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="border-b border-border bg-background/80 backdrop-blur-sm px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <ArrowUpRight className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-primary-foreground">AI Image Generator</h1>
              <p className="text-[10px] text-muted-foreground">Text to Image</p>
            </div>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {messages.map((msg) => (
            <ChatMessageBubble key={msg.id} message={msg} />
          ))}
          {isLoading && <TypingIndicator />}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <PromptInput onSend={handleSend} disabled={isLoading} />
      </div>
    </div>
  );
}
