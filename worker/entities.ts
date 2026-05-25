import { IndexedEntity } from "./core-utils";
import type { User, ChatSession, ChatMessage } from "@shared/types";
import { MOCK_USERS } from "@shared/mock-data";
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "" };
  static seedData = MOCK_USERS;
}
export class ChatSessionEntity extends IndexedEntity<ChatSession> {
  static readonly entityName = "chat_session";
  static readonly indexName = "chat_sessions";
  static readonly initialState: ChatSession = {
    id: "",
    title: "New Chat",
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    userId: "user_1"
  };
  static seedData = [];
  async addMessage(message: ChatMessage): Promise<ChatSession> {
    return this.mutate(state => {
      const nextMessages = [...state.messages, message];
      let nextTitle = state.title;
      // Auto-generate title from first user message
      if (state.title === "New Chat" && message.role === 'user') {
        nextTitle = message.content.slice(0, 40) + (message.content.length > 40 ? "..." : "");
      }
      return {
        ...state,
        title: nextTitle,
        messages: nextMessages,
        updatedAt: Date.now()
      };
    });
  }
}