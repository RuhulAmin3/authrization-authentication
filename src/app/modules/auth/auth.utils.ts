import prisma from "../../../shared/prisma";

export const isShopNamesUnique = async (shopNames: string[]) => {
  const existing = await prisma.user.findMany({
    where: {
      shopNames: {
        hasSome: shopNames,
      },
    },
  });
  return existing.length === 0;
};

export const getUserByUsername = async (username: string) => {
  return prisma.user.findUnique({ where: { username } });
};
