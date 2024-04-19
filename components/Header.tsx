"use client";

import Link from "next/link";
import Image from "next/image";
import { BsCart, BsPerson, } from "react-icons/bs";
import { CiMug1 } from "react-icons/ci";
import { Flex } from "@tremor/react";
import { LoginButton } from "@/components/buttons/LoginButton";

export const Header = () => {
      return (
            <Flex className="shadow-tremor-card p-4">
                  <Link href={"/"} className="flex items-center justify-center space-x-4">
                        <Image
                              alt="Logotipo Canecas Bertioga"
                              src={"/logo.png"}
                              width={40}
                              height={40}
                        />
                        <h2 className="text-slate-800 hover:text-slate-900 font-bold tracking-wider">
                              CANECAS BERTIOGA
                        </h2>
                  </Link>
                  <nav>
                        <ul className="flex space-x-4">
                              <div className="flex items-center space-x-2">
                                    <CiMug1 size={20} />
                                    <Link href={"/products/"}>Produtos</Link>
                              </div>
                              <div className="flex items-center space-x-2">
                                    <BsCart />
                                    <Link href={"/cart"}>Carrinho(0)</Link>
                              </div>
                              <LoginButton>
                                    <div className="flex items-center space-x-2">
                                          <BsPerson size={20} />
                                          Conta
                                    </div>
                              </LoginButton>
                        </ul>
                  </nav>
            </Flex>
      );
};