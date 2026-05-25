import { User, ChatMessage } from './types';
export const MOCK_USERS: User[] = [
  { 
    id: 'user_1', 
    name: 'Forge User', 
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user' 
  },
  { 
    id: 'assistant', 
    name: 'Forge AI', 
    avatar: 'https://api.dicebear.com/7.x/bottts/svg?seed=forge' 
  }
];
export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg_1',
    role: 'assistant',
    content: "Hello! I'm Forge AI, your minimalist assistant. How can I help you build today?",
    timestamp: Date.now()
  }
];
export const SUGGESTED_PROMPTS = [
  "Explain Cloudflare Durable Objects",
  "How do I optimize React performance?",
  "Write a minimalist CSS reset",
  "Tell me a joke about developers"
];
export const MOCK_CHATS = [];
export const MOCK_CHAT_MESSAGES = [];