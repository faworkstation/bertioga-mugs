"use client";

import React, { Fragment, useState } from "react";
import { BsList } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";

export const MenuButton = () => {
      const [isOpen, setIsOpen] = useState(false);

      const closeMenu = () => {
            setIsOpen(false);
      };

      return (
            <Menu as="div" className="relative inline-block text-right w-full">
                  <div style={{ width: "50px" }} className="flex items-start justify-start">
                        <Menu.Button onClick={() => setIsOpen(!isOpen)}>
                              <div className="flex items-center space-x-2">
                                    <BsList size={20} />
                                    <span className="textResponsive">Menu</span>
                              </div>
                        </Menu.Button>
                  </div>
                  <Transition
                        show={isOpen}
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                  >
                        <Menu.Items
                              style={{ width: "200px" }}
                              className="absolute -left-1 mt-4 origin-top-left divide-y divide-gray-100 rounded-tremor-default shadow-lg border-2 focus:outline-none flex flex-col bg-slate-50 z-20"
                        >
                              <Link href={"/"} className="p-4 flex items-center space-x-2" onClick={closeMenu}>
                                    <Menu.Item>
                                          <span>Início</span>
                                    </Menu.Item>
                              </Link>
                              <Link href={"/search"} className="p-4 flex items-center space-x-2" onClick={closeMenu}>
                                    <Menu.Item>
                                          <span>Pesquisar</span>
                                    </Menu.Item>
                              </Link>
                              <Link href={"/products"} className="p-4 flex items-center space-x-2" onClick={closeMenu}>
                                    <Menu.Item>
                                          <span>Produtos</span>
                                    </Menu.Item>
                              </Link>
                              <Link href={"/orders"} className="p-4 flex items-center space-x-2" onClick={closeMenu}>
                                    <Menu.Item>
                                          <span>Pedidos</span>
                                    </Menu.Item>
                              </Link>
                              <Link href={"/account"} className="p-4 flex items-center space-x-2" onClick={closeMenu}>
                                    <Menu.Item>
                                          <span>Conta</span>
                                    </Menu.Item>
                              </Link>
                              <Link href={"/cart"} className="p-4 flex items-center space-x-2" onClick={closeMenu}>
                                    <Menu.Item>
                                          <span>Carrinho</span>
                                    </Menu.Item>
                              </Link>
                              <LogoutButton>
                                    <button className="p-4 flex items-center space-x-2" onClick={closeMenu}>
                                          <Menu.Item>
                                                <span>Sair</span>
                                          </Menu.Item>
                                    </button>
                              </LogoutButton>
                        </Menu.Items>
                  </Transition>
            </Menu>
      );
};
