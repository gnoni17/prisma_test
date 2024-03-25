import { GraphQLResolveInfo } from "graphql";
import { createChat, getChats, getChat } from "../services/chats.service";

export const chatResolver = {
  Query: {
    async chats(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
      return await getChats({ info });
    },
    async chat(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
        return await getChat({ info, chatId: args.chatId });
    },
  },
  Mutation: {
    async createChat(_: any, args: Record<string, any>) {
      const { users } = args.input;
      return await createChat({ users });
    },
    async updateChat() {},
    async deleteChat() {},
  },
};
