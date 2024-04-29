"use client";

import Link from "next/link";
import Image from "next/image";
import { BsCart, BsPerson, BsSearch, } from "react-icons/bs";
import { Flex } from "@tremor/react";
import { LoginButton } from "@/components/buttons/LoginButton";
import { MenuButton } from "./buttons/MenuButton";
import { useContext } from "react";
import { CartContext } from "./CartContext";

export const Header = () => {
      const cartContext = useContext(CartContext);

      if (!cartContext) {
            throw new Error("CartContext not found");
      }

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
                        <span className="textResponsive">
                              <h2 className="text-slate-800 hover:text-slate-900 font-bold tracking-wider">
                                    CANECAS BERTIOGA
                              </h2>
                        </span>
                  </Link>

                  <nav className="w-full flex justify-end">
                        <ul className="flex space-x-4">
                              <span className="textResponsive">
                                    <Link href={"/search"} className="flex items-center space-x-2">
                                          <BsSearch size={16} />
                                          <span> Pesquisar </span>
                                    </Link>
                              </span>
                              <Link href={"/cart"} className="flex items-center space-x-2">
                                    <BsCart size={16} />
                                    <span className="textResponsive">Carrinho</span> ({cartProducts.length})
                              </Link>
                              <span className="textResponsive">
                                    <LoginButton>
                                          <div className="flex items-center space-x-2">
                                                <BsPerson size={20} />
                                                Conta
                                          </div>
                                    </LoginButton>
                              </span>
                        </ul>
                  </nav >
            </Flex >
      );
};