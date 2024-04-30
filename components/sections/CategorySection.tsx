"use client";

import { useState } from "react";
import { BsFillPlusCircleFill, BsLayers } from "react-icons/bs";
import { Button, Callout, Card, Divider, Flex, SelectItem, Title, } from "@tremor/react";
import { AnimBottomToTop } from '@/components/animations/AnimBottomToTop';
import { SearchWithSelect } from "@/components/searches/SearchWithSelect";
import { CategoryEditForm } from "@/components/forms/CategoryEditform";
import { DeleteModal } from "@/components/modals/DeleteModal";
import { CategoryRegisterForm } from "@/components/forms/CategoryRegisterform";
import { CategoryTable } from "@/components/tables/CategoryTable";
import { useCategoryData } from "@/hooks/use-category-data";
import { deleteCategory } from "@/actions/delete/delete-category";

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
      };

      const handleOpenCategoryDeleteModal = async (id: string) => {
            setSelectedCategoryId(id);
            setIsDeleteCategoryModalOpen(true);
      };

      return (
            <Flex className="mainContainer">
                  <Title className='flex space-x-2 items-center'>
                        <BsLayers />
                        <span>Categorias</span>
                  </Title>
                  <Divider />
                  {categories.length > 0 ? (
                        <>
                              <SearchWithSelect
                                    inputLabel="Pesquise por nome"
                                    selectLabel="Selecione por categoria"
                                    onSearch={() => { }}
                              >
                                    <SelectItem value="">Todas</SelectItem>
                                    {categories.map(category => (
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
                        </>
                  ) : (
                        <AnimBottomToTop>
                              <Card className="p-2">
                                    <Callout title="Não existem categorias no momento." className="w-full" />
                              </Card>
                        </AnimBottomToTop>
                  )}

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