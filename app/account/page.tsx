"use client";

import { CategoryEditForm } from "@/components/forms/CategoryEditform";
import { CategoryRegisterForm } from "@/components/forms/CategoryRegisterform";
import { ProductEditForm } from "@/components/forms/ProductEditForm";
import { ProductRegisterForm } from "@/components/forms/ProductRegisterForm";
import { SearchWithSelect } from "@/components/searches/SearchWithSelect";
import { useCategoryData } from "@/hooks/use-category-data";
import { useProductData } from "@/hooks/use-product-data";
import { Button, Card, Flex, SelectItem, Subtitle, Tab, TabGroup, TabList, TabPanel, TabPanels, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import { useState } from "react";
import { BsFillBoxSeamFill, BsFillClipboardCheckFill, BsFillLayersFill, BsFillPlusCircleFill, BsListUl, BsPencilSquare, BsTrashFill } from "react-icons/bs";


export default function AccountPage() {
      const [isRegisterProductFormModalOpen, setIsRegisterProductFormModalOpen] = useState<boolean>(false);
      const [isEditProductFormModalOpen, setIsEditProductFormModalOpen] = useState<boolean>(false);
      const [selectedProductId, setSelectedProductId] = useState<string>("");

      const [isRegisterCategoryFormModalOpen, setIsRegisterCategoryFormModalOpen] = useState<boolean>(false);
      const [isEditCategoryFormModalOpen, setIsEditCategoryFormModalOpen] = useState<boolean>(false);
      const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

      const { products } = useProductData();

      const productDetails = products.find(product => product.id === selectedProductId);

      const handleOpenproductDetailsModal = async (id: string) => {
            setSelectedProductId(id);
            setIsEditProductFormModalOpen(true);
      }

      const { categories } = useCategoryData();

      const categoryDetails = categories.find(category => category.id === selectedCategoryId);

      const handleOpenCategoryDetailsModal = async (id: string) => {
            setSelectedCategoryId(id);
            setIsEditCategoryFormModalOpen(true);
      }

      return (
            <Flex className="p-4 relative">
                  <TabGroup>
                        <TabList className="font-medium bg-gray-100 rounded-tremor-small text-slate-700 overflow-x-auto" >
                              <Tab>
                                    <div className="flex justify-start space-x-2 items-center">
                                          <BsFillBoxSeamFill size={20} />
                                          <span className="text-tremor-default">Estoque</span>
                                    </div>
                              </Tab>
                              <Tab>
                                    <div className="flex justify-start space-x-2 items-center">
                                          <BsFillClipboardCheckFill size={20} />
                                          <span className="text-tremor-default">Pedidos</span>
                                    </div>
                              </Tab>
                              <Tab>
                                    <div className="flex justify-start space-x-2 items-center">
                                          <BsFillLayersFill size={20} />
                                          <span className="text-tremor-default">Categorias</span>
                                    </div>
                              </Tab>
                        </TabList>

                        <TabPanels>
                              <TabPanel className="flex-col space-y-4   ">
                                    <div className="mt-4">
                                          <SearchWithSelect
                                                inputLabel="Pesquisar por nome"
                                                selectLabel="Selecionar por categoria"
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
                                    <Flex className="flex-col items-start">
                                          <Subtitle className="p-2 w-full bg-gray-100 text-tremor-default border-2 border-slate-2
                                          300">
                                                Lista de Produtos
                                          </Subtitle>
                                          <Card className="mx-auto max-w-2xl" style={{ borderRadius: '0px', padding: '5px' }}>
                                                <Table>
                                                      <TableHead>
                                                            <TableRow>
                                                                  <TableHeaderCell>Nome do Produto</TableHeaderCell>
                                                                  <TableHeaderCell>Valor de Venda</TableHeaderCell>
                                                                  <TableHeaderCell></TableHeaderCell>
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
                                                                                          <Flex className="justify-start space-x-2">
                                                                                                <Button
                                                                                                      icon={BsPencilSquare}
                                                                                                      size={"md"}
                                                                                                      className="transition-all duration-300"
                                                                                                      onClick={() => handleOpenproductDetailsModal(product.id)}
                                                                                                >
                                                                                                      Editar
                                                                                                </Button>
                                                                                                <Button icon={BsTrashFill} size={"md"} className="text-white bg-rose-400 hover:bg-rose-500 border-rose-500 transition-all duration-300">
                                                                                                      Remover
                                                                                                </Button>
                                                                                          </Flex>
                                                                                    </TableCell>
                                                                              </TableRow>
                                                                        )
                                                                  })
                                                            )}
                                                      </TableBody>
                                                </Table>
                                          </Card>
                                    </Flex>

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

                              <TabPanel className="flex-col space-y-4   ">
                                    <div className="mt-4">
                                          <SearchWithSelect
                                                inputLabel="Pesquise por nome"
                                                selectLabel="Selecione por categoria"
                                                onSearch={() => { }}
                                          >
                                                <SelectItem value="">Todas</SelectItem>
                                                {categories.length > 0
                                                      && categories.map(category => (
                                                            <SelectItem
                                                                  key={category.id}
                                                                  value={category.name}
                                                            >
                                                                  {category.name}
                                                            </SelectItem>
                                                      ))}
                                          </SearchWithSelect>
                                    </div>
                                    <Flex className="flex-col items-start">
                                          <Subtitle className="p-2 w-full bg-gray-100 text-tremor-default border-2 border-slate-2
                                          300">
                                                Lista de Categorias
                                          </Subtitle>
                                          <Card className="mx-auto max-w-2xl" style={{ borderRadius: '0px', padding: '5px' }}>
                                                <Table>
                                                      <TableHead>
                                                            <TableRow>
                                                                  <TableHeaderCell>Nome da Categoria</TableHeaderCell>
                                                                  <TableHeaderCell>SubCategoria</TableHeaderCell>
                                                                  <TableHeaderCell></TableHeaderCell>
                                                            </TableRow>
                                                      </TableHead>

                                                      <TableBody>
                                                            {categories.length > 0 && (
                                                                  categories.map(category => {
                                                                        return (
                                                                              <TableRow key={category.id}>
                                                                                    <TableCell>{category.name}</TableCell>
                                                                                    <TableCell>{category.parent}</TableCell>
                                                                                    <TableCell>
                                                                                          <Flex className="justify-start space-x-2">
                                                                                                <Button
                                                                                                      icon={BsPencilSquare}
                                                                                                      size={"md"}
                                                                                                      className="transition-all duration-300"
                                                                                                      onClick={() => handleOpenCategoryDetailsModal(category.id)}
                                                                                                >
                                                                                                      Editar
                                                                                                </Button>
                                                                                                <Button icon={BsTrashFill} size={"md"} className="text-white bg-rose-400 hover:bg-rose-500 border-rose-500 transition-all duration-300">
                                                                                                      Remover
                                                                                                </Button>
                                                                                          </Flex>
                                                                                    </TableCell>
                                                                              </TableRow>
                                                                        )
                                                                  })
                                                            )}
                                                      </TableBody>
                                                </Table>
                                          </Card>
                                    </Flex>

                                    <Button onClick={() => setIsRegisterCategoryFormModalOpen(true)}>
                                          <div className="flex items-center space-x-2">
                                                <BsFillPlusCircleFill size={20} />
                                                <span>Registrar Categoria</span>
                                          </div>
                                    </Button>
                              </TabPanel>
                        </TabPanels>
                  </TabGroup>

                  {isRegisterProductFormModalOpen && (
                        <ProductRegisterForm
                              isOpen={isRegisterProductFormModalOpen}
                              onClose={() => setIsRegisterProductFormModalOpen(false)}
                        />
                  )}

                  {isRegisterCategoryFormModalOpen && (
                        <CategoryRegisterForm
                              isOpen={isRegisterCategoryFormModalOpen}
                              onClose={() => setIsRegisterCategoryFormModalOpen(false)}
                        />
                  )}

                  {isEditCategoryFormModalOpen && categoryDetails && (
                        <CategoryEditForm
                              category={categoryDetails}
                              isOpen={isEditCategoryFormModalOpen}
                              onClose={() => setIsEditCategoryFormModalOpen(false)}
                        />
                  )}

                  {isEditProductFormModalOpen && productDetails && (
                        <ProductEditForm
                              product={productDetails}
                              isOpen={isEditProductFormModalOpen}
                              onClose={() => setIsEditProductFormModalOpen(false)}
                        />
                  )}
            </Flex>
      );
};