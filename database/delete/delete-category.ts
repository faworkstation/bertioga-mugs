"use server";

import { db } from "@/libs/db";

export const deleteCategory = async (categoryId: string): Promise<{
      success: string,
      error: string
}> => {
      try { 
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
            console.error("Ops! ocorreu um erro ao excluir a Categoria:", error);

            return {
                  success: "",
                  error: "Ops! ocorreu um erro ao excluir a Categoria"
            };
      };
};