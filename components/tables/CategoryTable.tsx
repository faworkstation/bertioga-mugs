import { BsPencilSquare, BsTrashFill } from "react-icons/bs";
import { Category } from "@prisma/client";

import {
      Button,
      Card,
      Flex,
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeaderCell,
      TableRow
} from "@tremor/react";

type CategoryTableProps = {
      categories: Category[];
      handleOpenDetailsModal: (id: string) => void;
      handleOpenDeleteModal: (id: string) => void;
};

export const CategoryTable = ({ categories, handleOpenDetailsModal, handleOpenDeleteModal }: CategoryTableProps) => {
      return (
            <Flex className="flex-col items-start">
                  <h2 className="sr-only">
                        Tabela de Categorias
                  </h2>
                  <Card className="mx-auto max-w-2xl p-2">
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
                                                                              onClick={() => handleOpenDetailsModal(category.id)}
                                                                        >
                                                                              Editar
                                                                        </Button>
                                                                        <Button
                                                                              icon={BsTrashFill}
                                                                              size={"md"}
                                                                              className="text-white bg-rose-400 hover:bg-rose-500 border-rose-500 transition-all duration-300 hover:border-rose-500"
                                                                              onClick={() => handleOpenDeleteModal(category.id)}
                                                                        >
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
      );
};