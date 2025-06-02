import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { authService } from "./auth.service";
import { Request, Response } from "express";
import config from "../../../config";

// Register user
const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.registerUser(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User Register successfully",
    data: result,
  });
});

// login user
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { remember } = req.body || {};
  const token = await authService.loginUser(req.body);
  res.cookie("token", token, {
    httpOnly: true,
    domain: config.client_domain,
    maxAge: remember ? 7 * 86400000 : 30 * 60 * 1000,
    sameSite: "lax",
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User logged in successfully",
    data: null,
  });
});

// logout user
const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("token", {
    domain: config.client_domain,
    sameSite: "lax",
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "User logged out",
    data: null,
  });
});

export const getProfile = catchAsync(async (req: Request, res: Response) => {
  const id = req?.user?.userId;
  console.warn("id", id);
  const result = await authService.getProfile(id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "user profile retrieved successfully",
    data: result,
  });
});

export const authController = {
  registerUser,
  loginUser,
  logout,
  getProfile,
};
