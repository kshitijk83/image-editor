import { z } from "zod";

export const UserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, {
    message: "password length should be greater than 4",
  }),
});
