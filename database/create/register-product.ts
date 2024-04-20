"use server"

import * as z from "zod";
import { db } from "@/libs/db";
import { UserRole } from "@prisma/client";
import { ProductSchema } from "@/schemas";

import { currentUser } from "@/hooks/use-server-side-user";

export const registerProduct = async (values: z.infer<typeof ProductSchema>) => {
      const validatedFields = ProductSchema.safeParse(values);

      if (!validatedFields.success) return { error: "Campos inválidos ou inexsitentes. Por favor, insira campos válidos." };

      const { date, description, price, name } = validatedFields.data;

      const user = await currentUser();

      if (user && user.role === UserRole.ADMIN) {
            await db.product.create({
                  data: {
                        price,
                        date,
                        name,
                        description,
                        userId: user.id,
                  },
            });

            return { success: `Produto Registrado com Sucesso.`, };
      } else {
            return { error: `Você não tem permissão para executar esta ação!` };
      };
};