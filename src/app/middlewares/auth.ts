import { NextFunction, Request, Response } from "express";

import config from "../../config";
import { JwtPayload, Secret } from "jsonwebtoken";

import httpStatus from "http-status";
import ApiError from "../../errors/ApiErrors";
import { jwtHelpers } from "../../helpars/jwtHelpers";
import prisma from "../../shared/prisma";
import { handleErrorLogs } from "../../utils/handleErrorLogs";
import { generateErrSource } from "../../utils";
import { updateGlobalData } from "../../utils/asyncLocalStorage";

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

      const verifiedUser = jwtHelpers.verifyToken(
        token,
        config.jwt.jwt_secret as Secret,
      );

      const { id } = verifiedUser;

      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });

      if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found!");
      }

      req.user = verifiedUser as JwtPayload;

      if (roles.length && !roles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, "Forbidden!");
      }

      updateGlobalData({
        u_id: verifiedUser.id,
        user_email: verifiedUser.email,
      });

      next();
    } catch (err) {
      handleErrorLogs({
        error: err,
        errorSource: generateErrSource(__dirname, auth.name),
      });
      next(err);
    }
  };
};

export default auth;
