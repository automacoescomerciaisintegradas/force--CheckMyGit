import { IndexedEntity } from "./core-utils";
import type { User, Repository, Issue } from "@shared/types";
import { MOCK_USERS, MOCK_REPOSITORIES, MOCK_ISSUES } from "@shared/mock-data";
export class UserEntity extends IndexedEntity<User> {
  static readonly entityName = "user";
  static readonly indexName = "users";
  static readonly initialState: User = { id: "", username: "", name: "", avatar: "", followers: 0, following: 0, joinedAt: "" };
  static seedData = MOCK_USERS;
}
export class RepositoryEntity extends IndexedEntity<Repository> {
  static readonly entityName = "repository";
  static readonly indexName = "repositories";
  static readonly initialState: Repository = {
    id: "",
    ownerId: "",
    ownerUsername: "",
    name: "",
    description: "",
    stars: 0,
    forks: 0,
    language: "TypeScript",
    visibility: "public",
    updatedAt: new Date().toISOString(),
    topics: []
  };
  static seedData = MOCK_REPOSITORIES;
}
export class IssueEntity extends IndexedEntity<Issue> {
  static readonly entityName = "issue";
  static readonly indexName = "issues";
  static readonly initialState: Issue = {
    id: "",
    repoId: "",
    number: 0,
    title: "",
    authorId: "",
    status: "open",
    labels: [],
    createdAt: new Date().toISOString(),
    commentsCount: 0
  };
  static seedData = MOCK_ISSUES;
}