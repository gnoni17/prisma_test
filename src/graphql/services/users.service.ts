import prisma from "@db/index";
import { extractSelections } from "../utils/extractSelections";
import { GraphQLResolveInfo } from "graphql";

interface GetUsersArgs {
  info: GraphQLResolveInfo;
}

interface GetUserArgs extends GetUsersArgs {
  id: number;
}

interface UserInput {
  username: string;
  password: string;
  bio: string | null;
  image: string | null;
}

export const getUsers = async ({ info }: GetUsersArgs) => {
  const extractedSelections = extractSelections(info);

  return await prisma.user.findMany({
    orderBy: {
      username: "desc",
    },
  });
};

export const getUser = async ({ id, info }: GetUserArgs) => {
  const extractedSelections = extractSelections(info);

  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const createUser = async ({ bio, image, password, username }: UserInput) => {
  const createdUser = await prisma.user.create({
    data: {
      password,
      username,
      bio,
      image,
    },
  });

  return createdUser;
};
