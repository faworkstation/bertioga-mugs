"use client";

import { Button, Flex, SelectItem } from '@tremor/react'
import React, { useState } from 'react'
import { SearchWithSelect } from '../searches/SearchWithSelect'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { ProductEditForm } from '../forms/ProductEditForm'
import { DeleteModal } from '../modals/DeleteModal'
import { ProductRegisterForm } from '../forms/ProductRegisterForm'
import { useProductData } from '@/hooks/use-product-data'
import { deleteProduct } from '@/database/delete/delete-products';
import { useCategoryData } from '@/hooks/use-category-data';
import { StockTable } from '../tables/StockTable';

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
      }

      const handleOpenProductDeleteModal = async (id: string) => {
            setSelectedProductId(id);
            setIsDeleteProductModalOpen(true);
      }

      return (
            <Flex className="flex-col space-y-4 items-start mt-4">
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