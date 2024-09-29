import { z } from "zod";

export const formSchema = z.object({
    email: z.string().email("Invalid email address."),
    password: z.string().min(2, {
      message: "Password must be at least 2 characters.",
    }),
  });