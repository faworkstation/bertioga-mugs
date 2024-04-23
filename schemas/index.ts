import * as z from "zod";
import { UserRole } from "@prisma/client";

export const UserRegisterSchema = z.object({
      firstName: z.string().min(1, { message: "Este Campo é obrigatório" }),
      lastName: z.string().min(1, { message: "Este Campo é obrigatório" }),
      email: z.string().email({ message: "Este Campo é obrigatório" }),
      phone: z.string().optional(),
      password: z.string().min(6, { message: "Este Campo é obrigatório" }),
});

export const LoginSchema = z.object({
      email: z.string().email({ message: "Este Campo é obrigatório" }),
      password: z.string().min(1, { message: "Este Campo é obrigatório" }),
      code: z.optional(z.string()),
});

export const NewPasswordSchema = z.object({
      password: z.string().min(6, { message: "Este Campo é obrigatório" }),
});

export const ResetSchema = z.object({
      email: z.string().email({ message: "Este Campo é obrigatório" }),
});

export const SettingsSchema = z.object({
      name: z.optional(z.string()),
      isTwoFactorEnabled: z.optional(z.boolean()),
      role: z.enum([UserRole.ADMIN, UserRole.USER]),
      email: z.optional(z.string().email()),
      password: z.optional(z.string().min(6)),
      newPassword: z.optional(z.string().min(6)),
})
      .refine((data) => {
            if (data.password && !data.newPassword) {
                  return false;
            }

            return true;
      }, {
            message: "Este Campo é obrigatório",
            path: ["newPassword"]
      })
      .refine((data) => {
            if (data.newPassword && !data.password) {
                  return false;
            }

            return true;
      }, {
            message: "Este Campo é obrigatório",
            path: ["password"]
      })

export const ProductSchema = z.object({
      name: z.string().min(1, { message: "Este campo é obrigatório" }),
      price: z.string().min(1, { message: "Este campo é obrigatório" }),
      images: z.array(z.string()).optional(),
      description: z.string().min(1, { message: "Este campo é obrigatório" }),
});
export const CategorySchema = z.object({
      name: z.string().min(1, { message: "Este campo é obrigatório" }),
      parent: z.string().optional(),
});