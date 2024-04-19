"use server";

import { db } from "@/libs/db";
import { getVerificationTokenByToken } from "@/database/read/get-tokens";
import { getUserByEmail } from "@/database/read/get-users";

export const newVerification = async (token: string) => {
      const existingToken = await getVerificationTokenByToken(token);

      if (!existingToken) {
            return { error: "Token inexistente" };
      }

      const hasExpired = new Date(existingToken.expires) < new Date();

      if (hasExpired) {
            return { error: "Token Expirado" };
      }

      const existingUser = await getUserByEmail(existingToken.email);

      if (!existingUser) {
            return { error: "Email inexistente" };
      }

      await db.user.update({
            where: { id: existingUser.id },
            data: {
                  emailVerified: new Date(),
                  email: existingToken.email,
            }
      });

      await db.verificationToken.delete({
            where: { id: existingToken.id }
      });

      return { success: "Email verificado com sucesso" };
};