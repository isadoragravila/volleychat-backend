import  { Chatrooms } from "@prisma/client";

export type IChatData = Omit<Chatrooms, "id" | "createdAt" | "private">;

export type IChatSchema = Omit<IChatData, "categoryId" | "creatorId">;