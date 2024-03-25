import { GraphQLResolveInfo } from "graphql";
import { createMessage, getMessagesChat } from "../services/messages.service";

export const messageResolver = {
  Query: {
    async messages(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
      return await getMessagesChat({ info, chatId: args.chatId });
    }
  },
  Mutation: {
    async createMessage(_: any, args: Record<string, any>) {
      const { message, userId, chatId } = args.input;
      return await createMessage({ message, userId, chatId });
    },
    async updateMessage() {},
    async deleteMessage() {},
  },
};
