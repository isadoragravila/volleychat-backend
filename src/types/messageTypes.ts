import { Messages } from "@prisma/client";

export type IMessageSchema = {
    content: string
}

export type IMessageData = Omit<Messages, "id" | "createdAt">