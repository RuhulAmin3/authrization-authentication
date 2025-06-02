import { NextFunction, Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

import httpStatus from "http-status";
import prisma from "../../shared/prisma";
import ApiError from "../../errors/ApiErrors";
import { generateErrSource } from "../../utils";
import { jwtHelpers } from "../../helpars/jwtHelpers";

const auth = (...roles: string[]) => {
  return async (
    req: Request & { user?: any },
    _res: Response,
    next: NextFunction,
  ) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "You are not authorized!");
      }

      const verifiedUser = jwtHelpers.verifyToken(token);

      const { userId } = verifiedUser;

      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
      }

      req.user = verifiedUser as JwtPayload;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!");
      }

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
