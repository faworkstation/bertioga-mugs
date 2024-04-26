"use server"

import * as z from "zod";
import { db } from "@/libs/db";
import { UserRole } from "@prisma/client";
import { CategorySchema } from "@/schemas";

import { currentUser } from "@/hooks/use-server-side-user";

export const registerCategory = async (values: z.infer<typeof CategorySchema>) => {
      const validatedFields = CategorySchema.safeParse(values);

      if (!validatedFields.success) {
            return { error: "Campos inválidos ou inexistentes. Por favor, insira campos válidos." };
      }

      const { name, parent } = validatedFields.data;

      const user = await currentUser();

      if (user && user.role === UserRole.ADMIN) {
            await db.category.create({
                  data: {
                        name,
                        parent,
                        userId: user.id,
                  },
            });

            return { success: "Categoria registrada com sucesso." };
      } else {
            return { error: "Você não tem permissão para executar esta ação!" };
      }
};