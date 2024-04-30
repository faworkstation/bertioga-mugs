"use server";

import * as z from "zod";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { db } from "@/libs/db";
import { sendTwoFactorTokenEmail, sendVerificationEmail } from "@/libs/mail";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/actions/read/get-users";
import { generateTwoFactorToken, generateVerificationToken } from "@/actions/create/generate-tokens";
import { getTwoFactorTokenByEmail } from "@/actions/read/get-tokens";
import { getTwoFactorConfirmationByUserId } from "@/actions/read/get-two-factor";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export const loginSession = async (values: z.infer<typeof LoginSchema>, callbackUrl?: string | null,) => {
      const validatedFields = LoginSchema.safeParse(values);

      if (!validatedFields.success) return { error: "Campos inválidos ou inexistentes. Por favor, insira campos válidos." };

      const { email, password, code, } = validatedFields.data;

      const existingUser = await getUserByEmail(email);

      if (!existingUser || !existingUser.email || !existingUser.password) return { error: "Dados inválidos ou inexistentes. Por favor, insira dados válidos." };

      if (!existingUser.emailVerified) {
            const verificationToken = await generateVerificationToken(existingUser.email)

            await sendVerificationEmail(verificationToken.email, verificationToken.token);

            return { success: "Um Email de verificação de conta foi enviado. Por favor, verifique sua caixa de entrada para concluir seu cadastro." }
      };

      if (existingUser.isTwoFactorEnabled && existingUser.email) {
            if (code) {
                  const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);

                  if (!twoFactorToken) return { error: "Código inexistente" };

                  if (twoFactorToken.token !== code) return { error: "Código Invalido" };

                  const hasExpired = new Date(twoFactorToken.expires) < new Date();

                  if (hasExpired) return { error: "Código Expirado" };

                  await db.twoFactorToken.delete({
                        where: { id: twoFactorToken.id }
                  });

                  const existingConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

                  if (existingConfirmation) {
                        await db.twoFactorConfirmation.delete({
                              where: { id: existingConfirmation.id }
                        });
                  };

                  await db.twoFactorConfirmation.create({
                        data: { userId: existingUser.id }
                  });

            } else {
                  const twoFactorToken = await generateTwoFactorToken(existingUser.email)
                  await sendTwoFactorTokenEmail(twoFactorToken.email, twoFactorToken.token,);
                  return { twoFactor: true };
            };
      };

      try {
            await signIn("credentials", {
                  email,
                  password,
                  redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
            });
      } catch (error) {
            if (error instanceof AuthError) {
                  switch (error.type) {
                        case "CredentialsSignin":
                              return { error: "Credenciais inválidas.Por favor, insira credenciais válidas." };
                        default:
                              return { error: "Ops! Ocorreu um erro interno do servidor. Por favor, verifique a situação e tente novamente" };
                  };
            };
            throw error
      };
};