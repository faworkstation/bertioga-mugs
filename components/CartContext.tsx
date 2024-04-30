"use client";

import React, { createContext, useEffect, useState } from "react";

// Definição do tipo para o contexto do carrinho
interface CartContextProps {
      cartProducts: string[];
      addProduct: (productId: string) => void;
      removeProduct: (productId: string) => void;
      clearCart: () => void;
}

export const CartContext = createContext<CartContextProps | null>(null);

interface CartContextProviderProps {
      children: React.ReactNode;
}

export function CartContextProvider({ children }: CartContextProviderProps) {
      const [cartProducts, setCartProducts] = useState<string[]>([]);

      // Carregar do localStorage quando o componente é montado
      useEffect(() => {
            const storedCart = localStorage.getItem("cart");
            if (storedCart) {
                  setCartProducts(JSON.parse(storedCart));
            }
      }, []);

      function addProduct(productId: string) {
            setCartProducts((prev) => {
                  const updatedCartProducts = [...prev, productId];
                  localStorage.setItem("cart", JSON.stringify(updatedCartProducts)); // Salvar no localStorage
                  return updatedCartProducts;
            });
      }

      function removeProduct(productId: string) {
            setCartProducts((prev) => {
                  // Encontra o índice do primeiro produto a ser removido
                  const index = prev.findIndex((item) => item === productId);

                  if (index === -1) {
                        // Se o produto não for encontrado, apenas retorne o array atual
                        return prev;
                  }

                  // Cria uma cópia do array atual
                  const updatedCartProducts = [...prev];

                  // Remove o produto do índice encontrado
                  updatedCartProducts.splice(index, 1);

                  // Atualiza o localStorage
                  localStorage.setItem("cart", JSON.stringify(updatedCartProducts));

                  // Retorna os produtos atualizados
                  return updatedCartProducts;
            });
      }


      function clearCart() {
            setCartProducts([]);
            localStorage.removeItem("cart"); // Remover do localStorage
      }

      const contextValue = {
            cartProducts,
            addProduct,
            removeProduct,
            clearCart,
      };

      return (
            <CartContext.Provider value={contextValue}>
                  {children}
            </CartContext.Provider>
      );
}
