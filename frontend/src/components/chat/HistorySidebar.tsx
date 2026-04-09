import { PromptHistoryItem, ImageStyle } from "@/types/chat";
import { Clock, Paintbrush, Camera, PenTool, Zap, ImageIcon, X } from "lucide-react";

const styleIcons: Record<ImageStyle, React.ReactNode> = {
  anime: <Paintbrush className="h-3 w-3" />,
  realistic: <Camera className="h-3 w-3" />,
  sketch: <PenTool className="h-3 w-3" />,
  cyberpunk: <Zap className="h-3 w-3" />,
};

interface HistorySidebarProps {
  history: PromptHistoryItem[];
  onSelect: (item: PromptHistoryItem) => void;
  open: boolean;
  onClose: () => void;
}

export function HistorySidebar({ history, onSelect, open, onClose }: HistorySidebarProps) {
  return (
    <div
      className={`${
        open ? "w-72" : "w-0"
      } transition-all duration-300 overflow-hidden border-r border-border bg-card flex flex-col`}
    >
      <div className="p-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <h2 className="text-sm font-semibold">Prompt History</h2>
        </div>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {history.length === 0 && (
          <p className="text-xs text-muted-foreground text-center py-8">
            No history yet. Start generating!
          </p>
        )}
        {history.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className="w-full text-left p-3 rounded-lg hover:bg-accent transition-colors group"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-muted-foreground">{styleIcons[item.style]}</span>
              <span className="text-[10px] text-muted-foreground capitalize">{item.style}</span>
              {item.imageUrl && <ImageIcon className="h-3 w-3 text-primary ml-auto" />}
            </div>
            <p className="text-xs text-foreground truncate">{item.prompt}</p>
            <p className="text-[10px] text-muted-foreground mt-1">
              {item.timestamp.toLocaleString()}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
