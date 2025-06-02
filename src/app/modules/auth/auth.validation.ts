import { z } from "zod";

const userRegisterSchema = z.object({
  username: z.string({ required_error: "user name is required" }),
  password: z
    .string({ required_error: "password is required" })
    .min(8, { message: "password must be at least 8 characters long" })
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, {
      message:
        "password must contain at least one special character and one number",
    }),
  shopNames: z
    .array(
      z.string({
        required_error: "shop name must be string",
      }),
    )
    .min(3, { message: "at least 3 shop names are required" }),
});

const userLoginSchema = z.object({
  username: z.string({ required_error: "user name is required" }),
  password: z
    .string({ required_error: "password is required" })
    .min(8, { message: "password must be at least 8 characters long" })
    .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).*$/, {
      message:
        "password must contain at least one special character and one number",
    }),
  remember: z.boolean().default(false),
});

export const authValidation = {
  userRegisterSchema,
  userLoginSchema,
};
