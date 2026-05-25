import { IndexedEntity } from "./core-utils";
import type { User, Repo, Issue, Chat, ChatMessage } from "@shared/types";
import { MOCK_REPOS, MOCK_ISSUES, MOCK_USERS } from "@shared/mock-data";
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", name: "" };
  static seedData = MOCK_USERS;
}
export class RepositoryEntity extends IndexedEntity<Repo> {
  static readonly entityName = "repo";
  static readonly indexName = "repos";
  static readonly initialState: Repo = {
    id: "",
    name: "",
    owner: "",
    description: "",
    stars: 0,
    forks: 0,
    visibility: "public",
    updatedAt: new Date().toISOString(),
    language: "TypeScript",
    topics: []
  };
  static seedData = MOCK_REPOS;
}
export class IssueEntity extends IndexedEntity<Issue> {
  static readonly entityName = "issue";
  static readonly indexName = "issues";
  static readonly initialState: Issue = {
    id: "",
    repoId: "",
    title: "",
    authorId: "",
    status: "open",
    createdAt: new Date().toISOString(),
    commentsCount: 0,
    labels: []
  };
  static seedData = MOCK_ISSUES;
}
export type ChatBoardState = Chat & { messages: ChatMessage[] };
export class ChatBoardEntity extends IndexedEntity<ChatBoardState> {
  static readonly entityName = "chat";
  static readonly indexName = "chats";
  static readonly initialState: ChatBoardState = { id: "", title: "", messages: [] };
  static seedData = [];
  async listMessages(): Promise<ChatMessage[]> {
    const { messages } = await this.getState();
    return messages;
  }
  async sendMessage(userId: string, text: string): Promise<ChatMessage> {
    const msg: ChatMessage = { id: crypto.randomUUID(), chatId: this.id, userId, text, ts: Date.now() };
    await this.mutate(s => ({ ...s, messages: [...s.messages, msg] }));
    return msg;
  }
}