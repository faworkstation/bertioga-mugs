"use server"

import * as z from "zod";
import { db } from "@/libs/db";
import { UserRole } from "@prisma/client";
import { ProductSchema } from "@/schemas";

import { currentUser } from "@/hooks/use-server-side-user";
import { getProductByName } from "../read/get-products";

export const updateProduct = async (values: z.infer<typeof ProductSchema>, productId: string) => {
      const validatedFields = ProductSchema.safeParse(values);

      if (!validatedFields.success) return { error: "Campos inválidos ou inexsitentes. Por favor, insira campos válidos." };

      const { description, price, name, images, categoryId, categoryName, properties = [] } = validatedFields.data;

      const existingProductName = await getProductByName(name);

      if (existingProductName && existingProductName.id !== productId) {
            return { error: `Já existe um produto cadastrado com este nome. Por favor, tente um nome diferente.` };
      }

      const user = await currentUser();

      if (user && user.role === UserRole.ADMIN) {
            await db.product.update({
                  where: { id: productId },
                  data: {
                        price,
                        images: images,
                        name,
                        description,
                        userId: user.id,
                        categoryId: categoryId,
                        categoryName: categoryName,
                        properties: properties,
                  },
            });

            return { success: `Produto Atualizado com Sucesso.`, };
      } else {
            return { error: `Você não tem permissão para executar esta ação!` };
      };
};