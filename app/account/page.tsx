"use client";

import { ProductRegisterForm } from "@/components/forms/ProductRegisterForm";
import { SearchWithSelect } from "@/components/searches/SearchWithSelect";
import { useProductData } from "@/hooks/use-product-data";
import { Button, Card, Flex, SelectItem, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

export default function AccountPage() {
      const [isRegisterProductFormModalOpen, setIsRegisterProductFormModalOpen] = useState<boolean>(false);

      const { products } = useProductData();

      return (
            <Flex className="p-4 relative">
                  <TabGroup>
                        <TabList className="font-medium bg-gray-50 rounded-tremor-small" >
                              <Tab>Estoque</Tab>
                              <Tab>Pedidos</Tab>
                              <Tab>Configurações</Tab>
                        </TabList>

                        <TabPanels>
                              <TabPanel className="flex-col space-y-4   ">
                                    <div className="mt-4">
                                          <SearchWithSelect
                                                inputLabel="Pesquisar..."
                                                selectLabel="Selecionar por praia"
                                                onSearch={() => { }}
                                          >
                                                <SelectItem value="">Todos</SelectItem>
                                                <SelectItem value="1">Praia da Enseada</SelectItem>
                                                <SelectItem value="2">Cantão do Indaia</SelectItem>
                                                <SelectItem value="3">Praia da Selada</SelectItem>
                                                <SelectItem value="4">Praia de São Lourenço</SelectItem>
                                                <SelectItem value="5">Praia de Itaguaré</SelectItem>
                                          </SearchWithSelect>
                                    </div>
                                    <Card className="mx-auto max-w-2xl p-2">
                                          <Table>
                                                <TableHead>
                                                      <TableRow>
                                                            <TableHeaderCell>Produto</TableHeaderCell>
                                                            <TableHeaderCell>Preço</TableHeaderCell>
                                                            <TableHeaderCell>Detalhes do Produto</TableHeaderCell>
                                                      </TableRow>
                                                </TableHead>

                                                <TableBody>
                                                      {products.length > 0 && (
                                                            products.map(product => {
                                                                  return (
                                                                        <TableRow key={product.id}>
                                                                              <TableCell>{product.name}</TableCell>
                                                                              <TableCell>{product.price}</TableCell>
                                                                              <TableCell>
                                                                                    <Button variant="secondary">
                                                                                          Ver Detalhes
                                                                                    </Button>
                                                                              </TableCell>
                                                                        </TableRow>
                                                                  )
                                                            })
                                                      )}
                                                </TableBody>
                                          </Table>
                                    </Card>

                                    <Button onClick={() => setIsRegisterProductFormModalOpen(true)}>
                                          <div className="flex items-center space-x-2">
                                                <BsFillPlusCircleFill size={20} />
                                                <span>Cadastrar Produto</span>
                                          </div>
                                    </Button>
                              </TabPanel>
                              <TabPanel>
                                    <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                                          Diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                    </p>
                              </TabPanel>
                              <TabPanel>
                                    <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                                          Diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                    </p>
                              </TabPanel>
                              <TabPanel>
                                    <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                                          Diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                    </p>
                              </TabPanel>
                              <TabPanel>
                                    <p className="mt-4 leading-6 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
                                          Diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat. Lorem ipsum dolor sit amet, consetetur sadipscing elitr.
                                    </p>
                              </TabPanel>
                        </TabPanels>
                  </TabGroup>
                  {isRegisterProductFormModalOpen && (
                        <ProductRegisterForm
                              isOpen={isRegisterProductFormModalOpen}
                              onClose={() => setIsRegisterProductFormModalOpen(false)}
                        />
                  )}
            </Flex>
      )
}