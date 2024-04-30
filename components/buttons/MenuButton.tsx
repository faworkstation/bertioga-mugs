"use client";

import React, { Fragment, useState } from "react";
import { useRouter } from "next/navigation";
import { BsCart, BsBoxSeam, BsClipboardData, BsLayers, BsList, BsPerson, BsSearch, BsShop, BsArrowLeftSquare } from "react-icons/bs";
import { Menu, Transition } from "@headlessui/react";
import { Button, Text } from "@tremor/react";
import { LogoutButton } from "@/components/buttons/LogoutButton";

export const MenuButton = () => {
      const [isOpen, setIsOpen] = useState<boolean>(false);

      const router = useRouter();

      const closeMenu = (pageUrl: string) => {
            setIsOpen(false);
            router.push(pageUrl);
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
                              style={{ width: "300px" }}
                              className="absolute -left-1 mt-4 origin-top-left divide-y divide-gray-100 rounded-tremor-default shadow-lg border-2 focus:outline-none flex flex-col items-start space-y-4 bg-slate-50 z-20"
                        >
                              <Button
                                    className="ml-1 p-4 w-full items-center justify-start"
                                    size={"lg"}
                                    icon={BsShop}
                                    type="button"
                                    variant="light"
                                    onClick={() => closeMenu("/")}
                              >
                                    <Menu.Item>
                                          <Text className="ml-2">Início</Text>
                                    </Menu.Item>
                              </Button>
                              <Button
                                    className="ml-1 p-4 w-full items-center justify-start"
                                    size={"lg"}
                                    icon={BsCart}
                                    type="button"
                                    variant="light"
                                    onClick={() => closeMenu("/cart")}
                              >
                                    <Menu.Item>
                                          <Text className="ml-2">Carrinho</Text>
                                    </Menu.Item>
                              </Button>
                              <Button
                                    className="ml-1 p-4 w-full items-center justify-start"
                                    size={"lg"}
                                    icon={BsSearch}
                                    type="button"
                                    variant="light"
                                    onClick={() => closeMenu("/")}
                              >
                                    <Menu.Item>
                                          <Text className="ml-2">Pesquisar</Text>
                                    </Menu.Item>
                              </Button>
                              <Button
                                    className="ml-1 p-4 w-full items-center justify-start"
                                    size={"lg"}
                                    icon={BsBoxSeam}
                                    type="button"
                                    variant="light"
                                    onClick={() => closeMenu("/products/stock")}
                              >
                                    <Menu.Item>
                                          <Text className="ml-2">Estoque</Text>
                                    </Menu.Item>
                              </Button>
                              <Button
                                    className="ml-1 p-4 w-full items-center justify-start"
                                    size={"lg"}
                                    icon={BsLayers}
                                    type="button"
                                    variant="light"
                                    onClick={() => closeMenu("/category")}
                              >
                                    <Menu.Item>
                                          <Text className="ml-2">Categorias</Text>
                                    </Menu.Item>
                              </Button>
                              <Button
                                    className="ml-1 p-4 w-full items-center justify-start"
                                    size={"lg"}
                                    icon={BsClipboardData}
                                    type="button"
                                    variant="light"
                                    onClick={() => closeMenu("/orders")}
                              >
                                    <Menu.Item>
                                          <Text className="ml-2">Pedidos</Text>
                                    </Menu.Item>
                              </Button>
                              <Button
                                    className="ml-1 p-4 w-full items-center justify-start"
                                    size={"lg"}
                                    icon={BsPerson}
                                    type="button"
                                    variant="light"
                                    onClick={() => closeMenu("/account")}
                              >
                                    <Menu.Item>
                                          <Text className="ml-2">Conta</Text>
                                    </Menu.Item>
                              </Button>
                              <LogoutButton>
                                    <Button
                                          className="ml-1 p-4 w-full items-center justify-start"
                                          size={"lg"}
                                          icon={BsArrowLeftSquare}
                                          type="button"
                                          variant="light"
                                          onClick={() => closeMenu("/")}
                                    >
                                          <Menu.Item>
                                                <Text className="ml-2">Sair</Text>
                                          </Menu.Item>
                                    </Button>
                              </LogoutButton>
                        </Menu.Items>
                  </Transition>
            </Menu >
      );
};