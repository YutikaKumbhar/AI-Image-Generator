import { ImageStyle } from "@/types/chat";
import { Paintbrush, Camera, PenTool, Zap } from "lucide-react";

const styles: { value: ImageStyle; label: string; icon: React.ReactNode }[] = [
  { value: "anime", label: "Anime", icon: <Paintbrush className="h-4 w-4" /> },
  { value: "realistic", label: "Realistic", icon: <Camera className="h-4 w-4" /> },
  { value: "sketch", label: "Sketch", icon: <PenTool className="h-4 w-4" /> },
  { value: "cyberpunk", label: "Cyberpunk", icon: <Zap className="h-4 w-4" /> },
];

interface StyleSelectorProps {
  selected: ImageStyle;
  onSelect: (style: ImageStyle) => void;
}

export function StyleSelector({ selected, onSelect }: StyleSelectorProps) {
  return (
    <div className="flex gap-2">
      {styles.map((style) => (
        <button
          key={style.value}
          onClick={() => onSelect(style.value)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            selected === style.value
              ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
              : "bg-accent text-muted-foreground hover:text-foreground hover:bg-accent/80"
          }`}
        >
          {style.icon}
          {style.label}
        </button>
      ))}
    </div>
  );
}
