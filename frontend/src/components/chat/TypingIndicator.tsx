import { Sparkles } from "lucide-react";

export function TypingIndicator() {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-accent text-foreground">
        <Sparkles className="h-4 w-4" />
      </div>
      <div className="bg-accent rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1.5">
        <div className="typing-dot w-2 h-2 rounded-full bg-muted-foreground" />
        <div className="typing-dot w-2 h-2 rounded-full bg-muted-foreground" />
        <div className="typing-dot w-2 h-2 rounded-full bg-muted-foreground" />
      </div>
    </div>
  );
}
