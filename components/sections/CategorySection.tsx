"use client";

import { Button, Flex, SelectItem, } from '@tremor/react'
import { useState } from 'react'
import { SearchWithSelect } from '../searches/SearchWithSelect'
import { BsFillPlusCircleFill } from 'react-icons/bs'
import { useCategoryData } from '@/hooks/use-category-data';
import { CategoryEditForm } from '../forms/CategoryEditform';
import { DeleteModal } from '../modals/DeleteModal';
import { CategoryRegisterForm } from '../forms/CategoryRegisterform';
import { deleteCategory } from '@/database/delete/delete-category';
import { CategoryTable } from '../tables/CategoryTable';

export const CategorySection = () => {
      const [isRegisterCategoryFormModalOpen, setIsRegisterCategoryFormModalOpen] = useState<boolean>(false);
      const [isEditCategoryFormModalOpen, setIsEditCategoryFormModalOpen] = useState<boolean>(false);
      const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState<boolean>(false);
      const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

      const { categories } = useCategoryData();

      const categoryDetails = categories.find(category => category.id === selectedCategoryId);

      const handleOpenCategoryDetailsModal = async (id: string) => {
            setSelectedCategoryId(id);
            setIsEditCategoryFormModalOpen(true);
      }

      const handleOpenCategoryDeleteModal = async (id: string) => {
            setSelectedCategoryId(id);
            setIsDeleteCategoryModalOpen(true);
      }

      return (
            <Flex className="flex-col space-y-4 items-start mt-4">
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

                  <CategoryTable
                        categories={categories}
                        handleOpenDetailsModal={handleOpenCategoryDetailsModal}
                        handleOpenDeleteModal={handleOpenCategoryDeleteModal}
                  />

                  <Button onClick={() => setIsRegisterCategoryFormModalOpen(true)}>
                        <div className="flex items-center space-x-2">
                              <BsFillPlusCircleFill size={20} />
                              <span>Registrar Categoria</span>
                        </div>
                  </Button>

                  {isEditCategoryFormModalOpen && categoryDetails && (
                        <CategoryEditForm
                              category={categoryDetails}
                              isOpen={isEditCategoryFormModalOpen}
                              onClose={() => setIsEditCategoryFormModalOpen(false)}
                        />
                  )}

                  {isDeleteCategoryModalOpen && categoryDetails && (
                        <DeleteModal
                              idToDeleteData={categoryDetails.id}
                              deleteFunction={deleteCategory}
                              isOpen={isDeleteCategoryModalOpen}
                              onClose={() => setIsDeleteCategoryModalOpen(false)}
                        />
                  )}

                  {isRegisterCategoryFormModalOpen && (
                        <CategoryRegisterForm
                              isOpen={isRegisterCategoryFormModalOpen}
                              onClose={() => setIsRegisterCategoryFormModalOpen(false)}
                        />
                  )}
            </Flex>
      );
};