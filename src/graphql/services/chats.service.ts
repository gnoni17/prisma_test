import prisma from "@db/index";
import { GraphQLResolveInfo } from "graphql";

interface GetChatsArgs {
  info: GraphQLResolveInfo;
}

interface GetChatArgs extends GetChatsArgs {
  chatId: number;
}

interface ChatInput {
  users: number[];
}

export const getChats = async (arg: GetChatsArgs) => {
  return prisma.chat.findMany({
    include: {
      messages: {
        take: -1,
      },
      users: true,
    },
  });
};

export const getChat = async ({ chatId }: GetChatArgs) => {
  return prisma.chat.findMany({
    where: {
      id: chatId,
    },
    include: {
      messages: true,
      users: true,
    },
  });
};

export const createChat = async ({ users }: ChatInput) => {

  const createdChat = await prisma.chat.create({
    data: {
      users: {
        connect: [
          { id: 1 },
          ...users.map(id => ({
            id,
          })),
        ],
      },
    },

    include: {
      users: true,
    },
  });

  return createdChat;
};
