"use server"

import * as z from "zod";
import { db } from "@/libs/db";
import { UserRole } from "@prisma/client";
import { CategorySchema } from "@/schemas";

import { currentUser } from "@/hooks/use-server-side-user";
import { getCategoryByName } from "../read/get-categories";

export const registerCategory = async (values: z.infer<typeof CategorySchema>) => {
      const validatedFields = CategorySchema.safeParse(values);

      if (!validatedFields.success) {
            return { error: "Campos inválidos ou inexistentes. Por favor, insira campos válidos." };
      }

      const { name, parent, properties = [] } = validatedFields.data;

      // Converter o nome da categoria para minúsculas
      const categoryNameLowerCase = name.toLowerCase();

      // Verificar se a categoria já existe (ignorando maiúsculas e minúsculas)
      const existingCategory = await getCategoryByName(categoryNameLowerCase);

      if (existingCategory) {
            return { error: `Já existe uma categoria registrada com este nome. Por favor, tente um nome diferente.` };
      }

      const user = await currentUser();

      if (user && user.role === UserRole.ADMIN) {
            const propertyUpdates: any[] = [];

            if (properties.length > 0) {
                  for (const property of properties) {
                        // Converter o nome da propriedade para minúsculas
                        const propertyNameLowerCase = property.name.toLowerCase();

                        const existingProperty = await db.property.findFirst({
                              where: { name: propertyNameLowerCase },
                        });

                        if (existingProperty) {
                              // Verifique se o novo valor já existe na lista de valores da propriedade
                              const existingValues = existingProperty.values.split(',').map(value => value.trim());
                              const newValues = property.values.split(',').map(value => value.trim());
                              const mergedValues = Array.from(new Set([...existingValues, ...newValues])).join(', ');

                              // Atualize os valores da propriedade existente
                              await db.property.update({
                                    where: { id: existingProperty.id },
                                    data: { values: mergedValues },
                              });

                              // Associe a propriedade existente à categoria
                              propertyUpdates.push({
                                    propertyId: existingProperty.id,
                              });
                        } else {
                              // Se não existir, criar uma nova propriedade
                              propertyUpdates.push({
                                    property: {
                                          create: {
                                                name: property.name,
                                                values: property.values,
                                          },
                                    },
                              });
                        }
                  }
            }

            // Criar a categoria e associar propriedades
            await db.category.create({
                  data: {
                        name: categoryNameLowerCase,
                        parent,
                        userId: user.id,
                        CategoryProperty: {
                              create: propertyUpdates,
                        },
                  },
            });

            return { success: `Categoria Registrada com Sucesso.` };
      } else {
            return { error: `Você não tem permissão para executar esta ação!` };
      }
};
