export type ImageStyle = "anime" | "realistic" | "sketch";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  imageUrl?: string;
  style?: ImageStyle;
  timestamp: Date;
}

export interface PromptHistoryItem {
  id: string;
  prompt: string;
  style: ImageStyle;
  timestamp: Date;
  imageUrl?: string;
}
