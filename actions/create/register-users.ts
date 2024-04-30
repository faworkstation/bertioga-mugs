"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/libs/db";
import { sendVerificationEmail } from "@/libs/mail";
import { UserRegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/actions/read/get-users";
import { generateVerificationToken } from "@/actions/create/generate-tokens";

export const registerUser = async (values: z.infer<typeof UserRegisterSchema>) => {
      const validatedFields = UserRegisterSchema.safeParse(values);

      if (!validatedFields.success) return { error: "Campos inválidos ou inexistentes. Por favor, insira campos válidos" };

      const {
            email,
            password,
            firstName,
            lastName
      } = validatedFields.data;

      const hashedPassword = await bcrypt.hash(password, 10);

      const existingUser = await getUserByEmail(email);

      if (existingUser) return { error: "Este email já esta em uso. Por favor, tente um email diferente." };

      await db.user.create({
            data: {
                  firstName,
                  lastName,
                  email,
                  password: hashedPassword
            },
      });

      const verificationToken = await generateVerificationToken(email);

      await sendVerificationEmail(verificationToken.email, verificationToken.token,);

      return { success: "Um email de confirmação de conta foi enviado. Por favor, verifique sua caixa de entrada para concluir seu cadastro." };
};