"use client";

import { useContext } from "react";
import { Callout, Card, Divider, Flex, Title } from "@tremor/react";
import { AnimBottomToTop } from "@/components/animations/AnimBottomToTop";
import { CartContext } from "@/components/context/CartContext";
import { CartTable } from "@/components/tables/CartTable";
import { OrderForm } from "@/components/forms/OrderForm";
import { useProductData } from "@/hooks/use-product-data";
import { BsCart } from "react-icons/bs";

export const CartSection = () => {
      const cartContext = useContext(CartContext);

      if (!cartContext) {
            throw new Error("CartContext not found");
      };

      const { cartProducts, addProduct, removeProduct, clearCart } = cartContext;

      const { products } = useProductData();

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
                  <Flex className="mainContainer">
                        <Title className='flex space-x-2 items-center'>
                              <BsCart />
                              <span>Carrinho</span>
                        </Title>
                        <Divider />
                        <AnimBottomToTop>
                              <Card className="p-2">
                                    <Callout
                                          className="w-full p-2"
                                          title="Seu carrinho esta vazio."
                                    />
                              </Card>
                        </AnimBottomToTop>
                  </Flex>
            )
      );
};