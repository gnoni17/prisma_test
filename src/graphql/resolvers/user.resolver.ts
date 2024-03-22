import { GraphQLResolveInfo } from "graphql";
import { createUser, getUser, getUsers } from "../services/users.service";

export const userResolver = {
  Query: {
    async users(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
      return await getUsers({ info });
    },
    async user(_: any, args: Record<string, any>, context: any, info: GraphQLResolveInfo) {
      return await getUser({ id: args.id, info });
    },
  },
  Mutation: {
    async createUser(_: any, args: Record<string, any>) {
      const { bio, image, password, username } = args.input;
      return await createUser({ bio, image, password, username });
    },
    async updateUser() {},
    async deleteUser() {},
  },
};
