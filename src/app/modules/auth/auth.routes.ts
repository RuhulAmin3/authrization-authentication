import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { authController } from "./auth.controller";
import { authValidation } from "./auth.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

// user signup route
router.post(
  "/signup",
  validateRequest(authValidation.userRegisterSchema),
  authController.registerUser,
);

// user login route
router.post(
  "/login",
  validateRequest(authValidation.userLoginSchema),
  authController.loginUser,
);

// user logout route
router.post("/logout", auth(), authController.logout);

// user profile route
router.get("/me", auth(), authController.getProfile);

export const authRoutes = router;
