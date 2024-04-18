import { Flex } from "@tremor/react";
import Link from "next/link";

export const Header = () => {
      return (
            <Flex className="shadow-tremor-card p-4">
                  <Link href={"/"}>
                        <h2 className="text-slate-800 hover:text-slate-900 font-bold tracking-wider">CANECAS BERTIOGA</h2>
                  </Link>
                  <nav>
                        <ul className="flex space-x-4">
                              <Link href={"/search"}>Pesquisar</Link>
                              <Link href={"/account"}>Conta</Link>
                              <Link href={"/cart"}>Carrinho (0)</Link>
                        </ul>
                  </nav>
            </Flex>
      );
};