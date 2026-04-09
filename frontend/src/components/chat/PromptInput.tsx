import { useState } from "react";
import { Send } from "lucide-react";
import { ImageStyle } from "@/types/chat";
import { StyleSelector } from "./StyleSelector";

interface PromptInputProps {
  onSend: (prompt: string, style: ImageStyle) => void;
  disabled?: boolean;
}

export function PromptInput({ onSend, disabled }: PromptInputProps) {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState<ImageStyle>("realistic");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || disabled) return;
    onSend(prompt.trim(), style);
    setPrompt("");
  };

  return (
    <div className="border-t border-border bg-background/80 backdrop-blur-sm p-4 space-y-3">
      <StyleSelector selected={style} onSelect={setStyle} />
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the image you want to generate..."
          disabled={disabled}
          className="flex-1 bg-accent border-none rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <button
          type="submit"
          disabled={disabled || !prompt.trim()}
          className="bg-primary text-primary-foreground rounded-xl px-4 py-3 hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
