"use server";

import { db } from "@/libs/db";

export const deleteProduct = async (productId: string): Promise<{
      success: string,
      error: string
}> => {
      try {
            const response = await db.product.delete({
                  where: { id: productId },
            });

            if (!response) {
                  return {
                        error: `Ops! Ocorreu um erro ao tentar excluir. O ID não existe.`,
                        success: ""
                  };
            };

            return {
                  success: `Produto Excluído com Sucesso!`,
                  error: ""
            };
      } catch (error) {
            console.error("Erro ao excluir a Produto:", error);

            return {
                  success: "",
                  error: "Erro ao excluir a Produto."
            };
      };
};