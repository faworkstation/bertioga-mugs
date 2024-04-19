"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/libs/db";
import { NewPasswordSchema } from "@/schemas";
import { getPasswordResetTokenByToken } from "@/database/read/get-tokens";
import { getUserByEmail } from "@/database/read/get-users";

export const handleResetPassword = async (values: z.infer<typeof NewPasswordSchema>, token?: string | null,) => {
      if (!token) return { error: "Token inexistente" };

      const validatedFields = NewPasswordSchema.safeParse(values);

      if (!validatedFields.success) return { error: "Campos inválidos ou inexistentes. Por favor, insira campos válidos." };

      const { password } = validatedFields.data;

      const existingToken = await getPasswordResetTokenByToken(token);

      if (!existingToken) return { error: "Token inválido. Por favor, insira um token válido" };

      const hasExpired = new Date(existingToken.expires) < new Date();

      if (hasExpired) return { error: "Token Expirado. Por favor, insira um token novo e atualizado." }

      const existingUser = await getUserByEmail(existingToken.email);

      const hashedPassword = await bcrypt.hash(password, 10);

      if (existingUser) {
            await db.user.update({
                  where: { id: existingUser.id },
                  data: { password: hashedPassword },
            });

            await db.passwordResetToken.delete({
                  where: { id: existingToken.id }
            });

            return { success: "Senha atualizada com sucesso!" };

      } else if (!existingUser) {
            return { error: "Usuário inexistente. Por favor, insira um email válido." };
      } else {
            return { error: `Erro ao  redefinir de senha.` };
      };
};