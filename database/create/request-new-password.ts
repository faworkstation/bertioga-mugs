"use server"

import * as z from "zod";
import { ResetSchema } from "@/schemas";
import { sendPasswordResetEmail } from "@/libs/mail";
import { generatePasswordResetToken } from "@/database/create/generate-tokens";
import { getUserByEmail } from "@/database/read/get-users";

type RequestPasswordResponse = {
      success?: string;
      error?: string;
}

export const handleRequestNewPassword = async (values: z.infer<typeof ResetSchema>): Promise<RequestPasswordResponse> => {
      const validatedFields = ResetSchema.safeParse(values);

      if (!validatedFields.success) return { error: "Campos inválidos ou inexistentes. Por favor, insira campos válidos" };

      const { email } = validatedFields.data;

      const existingUser = await getUserByEmail(email);

      if (existingUser) {
            const response = sendResetPasswordoken(email);
            return response;

      } else if (!existingUser) {
            return { error: "Usuário inexistente. Por favor, insira um email válido." };
      } else {
            return { error: "Ocorreu um erro ao enviar solicitação de redefinição de senha." };
      }
}

export const sendResetPasswordoken = async (email: string) => {
      const passwordResetToken = await generatePasswordResetToken(email)

      await sendPasswordResetEmail(
            passwordResetToken.email,
            passwordResetToken.token,
      )

      return { success: "Email para redefinição de senha enviado. Por favor, verifique sua caixa de entrada e siga as instruções para redifinir sua senha." }
}