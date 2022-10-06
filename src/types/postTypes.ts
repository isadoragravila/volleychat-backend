import  { Posts } from "@prisma/client";

export type IPostData = Omit<Posts, "id" | "createdAt">;