"use client";

import { useContext, useEffect, useState } from "react";
import { Callout, Flex } from "@tremor/react";
import { AnimBottomToTop } from "@/components/animations/AnimBottomToTop";
import { BeatLoading } from "@/components/loadings/BeatLoading";
import { CartContext } from "@/components/CartContext";
import { CartTable } from "@/components/tables/CartTable";
import { OrderForm } from "@/components/forms/OrderForm";
import { useProductData } from "@/hooks/use-product-data";

export const CartSection = () => {
      const [isLoading, setIsLoading] = useState(true);

      useEffect(() => {
            setTimeout(() => {
                  setIsLoading(false);
            }, 1500);
      }, []);

      const cartContext = useContext(CartContext);

      if (!cartContext) {
            throw new Error("CartContext not found");
      }

      const { cartProducts, addProduct, removeProduct, clearCart } = cartContext;

      const { products } = useProductData();

      if (isLoading) {
            return (
                  <AnimBottomToTop delay={0.1}>
                        <Flex className="flex-col items-center justify-start space-y-1 p-4">
                              <h3 className="text-slate-800 font-medium text-tremor-title">Carregando Página</h3>
                              <BeatLoading />
                        </Flex>
                  </AnimBottomToTop>
            );
      };

      return (
            cartProducts && cartProducts?.length > 0 ? (
                  <Flex className="p-2 justify-start items-start flex-col sm:flex-row" style={{ gap: "10px" }}>
                        <CartTable
                              products={products}
                              cartProducts={cartProducts}
                              addProduct={addProduct}
                              removeProduct={removeProduct}
                        />
                        <OrderForm
                              cartProducts={cartProducts}
                              clearCart={clearCart}
                        />
                  </Flex>
            ) : (
                  <Flex className="w-full p-4">
                        <AnimBottomToTop>
                              <Callout
                                    className="w-full p-2"
                                    title="Seu carrinho esta vazio."
                              />
                        </AnimBottomToTop>
                  </Flex>
            )
      );
};