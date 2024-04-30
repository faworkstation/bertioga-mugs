"use client";

import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { BsCart, BsPerson, BsSearch, } from "react-icons/bs";
import { cn } from "@/libs/tw-merge";
import { Flex } from "@tremor/react";
import { LoginButton } from "@/components/buttons/LoginButton";
import { CartContext } from "@/components/context/CartContext";
import { MenuButton } from "@/components/buttons/MenuButton";

export const Header = () => {
      const cartContext = useContext(CartContext);

      if (!cartContext) {
            throw new Error("CartContext not found");
      };

      const { cartProducts } = cartContext;

      return (
            <Flex className="shadow-tremor-card p-4 text-sm">
                  <MenuButton />
                  <Link href={"/"} className="flex items-center justify-center space-x-2 w-full">
                        <Image
                              alt="Logotipo Canecas Bertioga"
                              src={"/logo.png"}
                              width={40}
                              height={40}
                        />
                        <h2 className={cn("text-slate-800 hover:text-slate-900 font-bold tracking-wider", "textResponsive")}>
                              CANECAS BERTIOGA
                        </h2>
                  </Link>
                  <nav className="w-full flex justify-end">
                        <ul className="flex space-x-4">
                              <Link href={"/search"} className={cn("flex items-center space-x-2", "textResponsive")}>
                                    <BsSearch size={16} />
                                    <span> Pesquisar </span>
                              </Link>
                              <Link href={"/cart"} className="flex items-center space-x-2">
                                    <BsCart size={16} />
                                    <span className="textResponsive">
                                          Carrinho
                                    </span>
                                    ({cartProducts.length})
                              </Link>
                              <LoginButton>
                                    <div className="flex items-center space-x-2">
                                          <BsPerson size={20} />
                                          <span className="textResponsive">
                                                Conta
                                          </span>
                                    </div>
                              </LoginButton>
                        </ul>
                  </nav >
            </Flex >
      );
};