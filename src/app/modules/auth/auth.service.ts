import bcrypt from "bcrypt";
import { Prisma, User } from "@prisma/client";
import { getUserByUsername, isShopNamesUnique } from "./auth.utils";
import ApiError from "../../../errors/ApiErrors";
import { StatusCodes } from "http-status-codes";
import config from "../../../config";
import prisma from "../../../shared/prisma";
import { generateToken } from "../../../helpars/jwtHelpers";

const registerUser = async (payload: Prisma.UserCreateInput) => {
  const isUnique = await isShopNamesUnique(payload.shopNames as string[]);

  if (!isUnique) {
    throw new ApiError(StatusCodes.CONFLICT, "Shop names already taken");
  }

  const hashed = await bcrypt.hash(
    payload.password,
    Number(config.bcrypt_salt_rounds),
  );

  const user = await prisma.user.create({
    data: {
      ...payload,
      password: hashed,
    },
  });

  const { password, ...restUserData } = user;

  return restUserData;
};

const loginUser = async (payload: {
  username: string;
  password: string;
  remember: boolean;
}) => {
  const user = await getUserByUsername(payload.username);

  if (!user) return new ApiError(StatusCodes.BAD_REQUEST, "user not found");

  const match = await bcrypt.compare(payload.password, user.password);

  if (!match)
    return new ApiError(StatusCodes.BAD_REQUEST, "Wrong Credientials");

  const token = generateToken(user.id, payload.remember);

  return token;
};

const getProfile = async (id: string) => {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) return new ApiError(StatusCodes.BAD_REQUEST, "user not found");

  const { password, ...restUserData } = user;

  return restUserData;
};

export const authService = {
  registerUser,
  loginUser,
  getProfile,
};
