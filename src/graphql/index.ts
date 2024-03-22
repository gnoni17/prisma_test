import { readFileSync } from "fs";
import path from "path";
import { userResolver } from "./resolvers/user.resolver";

const userTypes = readFileSync(path.join(__dirname, "./typedefs/user.graphql"))

export const typeDefs = `
    ${userTypes}
`;

export const resolvers = {
  Query: {
    ...userResolver.Query
  },
  Mutation: {
    ...userResolver.Mutation
  },
};
