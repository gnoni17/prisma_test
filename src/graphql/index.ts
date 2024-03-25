import { readFileSync } from "fs";
import path from "path";
import { userResolver } from "./resolvers/user.resolver";
import { messageResolver } from "./resolvers/message.resolver";
import { chatResolver } from "./resolvers/chat.resolver";

const userTypes = readFileSync(path.join(__dirname, "./typedefs/user.graphql"))
const messageTypes = readFileSync(path.join(__dirname, "./typedefs/message.graphql"))
const chatTypes = readFileSync(path.join(__dirname, "./typedefs/chat.graphql"))

export const typeDefs = `
    ${userTypes}
    ${messageTypes}
    ${chatTypes}
`;

export const resolvers = {
  Query: {
    ...messageResolver.Query,
    ...chatResolver.Query,
    ...userResolver.Query,
  },
  Mutation: {
    ...messageResolver.Mutation,
    ...userResolver.Mutation,
    ...chatResolver.Mutation,
  },
};
