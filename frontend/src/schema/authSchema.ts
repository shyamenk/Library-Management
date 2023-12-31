import { z } from "zod";

export const SignInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const SignUpSchema = z.object({
  name: z.string().min(1, "Name required"),
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address").min(1, "Email required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  contactNumber: z.string().min(10, "Invalid contact number").max(12, "Invalid contact number"),
});
