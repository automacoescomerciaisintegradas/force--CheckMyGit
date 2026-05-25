export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}
export type MessageRole = 'system' | 'user' | 'assistant';
export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}
export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
  userId: string;
}
export interface User {
  id: string;
  name: string;
  avatar?: string;
}