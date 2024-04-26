"use server"

import * as z from "zod";
import { db } from "@/libs/db";
import { UserRole } from "@prisma/client";
import { ProductSchema } from "@/schemas";

import { currentUser } from "@/hooks/use-server-side-user";
import { getProductByName } from "../read/get-products";

export const registerProduct = async (values: z.infer<typeof ProductSchema>) => {
      const validatedFields = ProductSchema.safeParse(values);

      if (!validatedFields.success) return { error: "Campos inválidos ou inexsitentes. Por favor, insira campos válidos." };

      const { description, price, name, images, categoryId, categoryName, properties = [] } = validatedFields.data;

      const existingProductName = await getProductByName(name);

      if (existingProductName) {
            return { error: `Já existe um produto cadastrado com este nome. Por favor, tente um nome diferente.` };
      }

      const user = await currentUser();

      if (user && user.role === UserRole.ADMIN) {
            await db.product.create({
                  data: {
                        price,
                        images: images,
                        name,
                        description,
                        properties: properties,
                        userId: user.id,
                        categoryId: categoryId,
                        categoryName: categoryName,
                  },
            });

            return { success: `Produto Cadastrado com Sucesso.`, };
      } else {
            return { error: `Você não tem permissão para executar esta ação!` };
      };
};