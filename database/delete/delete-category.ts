"use server";

import { db } from "@/libs/db";

export const deleteCategory = async (categoryId: string): Promise<{
      success: string,
      error: string
}> => {
      try { 
            // Primeiro, remova as associações do CategoryProperty relacionadas à categoria
            await db.categoryProperty.deleteMany({
                where: { categoryId },
            });

            const response = await db.category.delete({
                  where: { id: categoryId },
            });

            if (!response) {
                  return {
                        error: `Ops! Ocorreu um erro ao tentar excluir. O ID não existe.`,
                        success: ""
                  };
            };

            return {
                  success: `Categoria Excluída com Sucesso!`,
                  error: ""
            };
      } catch (error) {
            console.error("Erro ao excluir a Categoria:", error);

            return {
                  success: "",
                  error: "Erro ao excluir a Categoria."
            };
      };
};