"use client";

import React, { useState } from 'react';
import { BsBoxSeam, BsFillPlusCircleFill } from 'react-icons/bs';
import { Button, Callout, Card, Divider, Flex, SelectItem, Title } from '@tremor/react';
import { AnimBottomToTop } from '@/components/animations/AnimBottomToTop';
import { SearchWithSelect } from '@/components/searches/SearchWithSelect';
import { ProductEditForm } from '@/components/forms/ProductEditForm';
import { DeleteModal } from '@/components/modals/DeleteModal';
import { ProductRegisterForm } from '@/components/forms/ProductRegisterForm';
import { StockTable } from '@/components/tables/StockTable';
import { useProductData } from '@/hooks/use-product-data';
import { useCategoryData } from '@/hooks/use-category-data';
import { deleteProduct } from '@/actions/delete/delete-products';

export const StockSection = () => {
      const [isRegisterProductFormModalOpen, setIsRegisterProductFormModalOpen] = useState<boolean>(false);
      const [isEditProductFormModalOpen, setIsEditProductFormModalOpen] = useState<boolean>(false);
      const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] = useState<boolean>(false);
      const [selectedProductId, setSelectedProductId] = useState<string>("");

      const { products } = useProductData();
      const { categories } = useCategoryData();

      const productDetails = products.find(product => product.id === selectedProductId);

      const handleOpenProductDetailsModal = async (id: string) => {
            setSelectedProductId(id);
            setIsEditProductFormModalOpen(true);
      };

      const handleOpenProductDeleteModal = async (id: string) => {
            setSelectedProductId(id);
            setIsDeleteProductModalOpen(true);
      };

      return (
            <Flex className="mainContainer">
                  <Title className='flex space-x-2 items-center'>
                        <BsBoxSeam />
                        <span> Estoque</span>
                  </Title>
                  <Divider />
                  {products.length > 0 ? (
                        <>
                              <SearchWithSelect
                                    inputLabel="Pesquisar por nome"
                                    selectLabel="Selecionar por categoria"
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

                              <StockTable
                                    products={products}
                                    handleOpenDeleteModal={handleOpenProductDeleteModal}
                                    handleOpenDetailsModal={handleOpenProductDetailsModal}
                              />
                        </>
                  ) : (
                        <AnimBottomToTop>
                              <Card className="p-2">
                                    <Callout title="Não existem produtos no momento." className="w-full" />
                              </Card>
                        </AnimBottomToTop>
                  )}

                  <Button onClick={() => setIsRegisterProductFormModalOpen(true)}>
                        <div className="flex items-center space-x-2">
                              <BsFillPlusCircleFill size={20} />
                              <span>Cadastrar Produto</span>
                        </div>
                  </Button>

                  {isRegisterProductFormModalOpen && (
                        <ProductRegisterForm
                              isOpen={isRegisterProductFormModalOpen}
                              onClose={() => setIsRegisterProductFormModalOpen(false)}
                        />
                  )}

                  {isEditProductFormModalOpen && productDetails && (
                        <ProductEditForm
                              product={productDetails}
                              isOpen={isEditProductFormModalOpen}
                              onClose={() => setIsEditProductFormModalOpen(false)}
                        />
                  )}

                  {isDeleteProductModalOpen && productDetails && (
                        <DeleteModal
                              idToDeleteData={productDetails.id}
                              deleteFunction={deleteProduct}
                              isOpen={isDeleteProductModalOpen}
                              onClose={() => setIsDeleteProductModalOpen(false)}
                        />
                  )}
            </Flex>
      );
};