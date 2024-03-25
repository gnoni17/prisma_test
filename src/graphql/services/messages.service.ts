import prisma from "@db/index";
import { GraphQLResolveInfo } from "graphql";

interface GetMessagesArgs {
  info: GraphQLResolveInfo;
  chatId: number;
}

interface MessageInput {
  message: string;
  userId: number;
  chatId: number;
}

export const getMessagesChat = async ({ chatId }: GetMessagesArgs) => {
  return await prisma.message.findMany({
    where: {
      chatId,
    },
  });
};

export const createMessage = async ({ message, chatId, userId }: MessageInput) => {
  const createdMessage = await prisma.message.create({
    data: {
      message,
      chatId,
      userId,
    },

    include: {
      chat: true,
      user: true,
    },
  });

  return createdMessage;
};
