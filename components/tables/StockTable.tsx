import { BsPencilSquare, BsTrashFill } from "react-icons/bs";
import { Product } from "@prisma/client";

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

type StockTableProps = {
      products: Product[];
      handleOpenDetailsModal: (id: string) => void;
      handleOpenDeleteModal: (id: string) => void;
};

export const StockTable = ({
      products,
      handleOpenDeleteModal,
      handleOpenDetailsModal
}: StockTableProps) => {
      return (
            <Flex
                  className="flex-col items-start">
                  <h2 className="sr-only">
                        Lista de Produtos
                  </h2>
                  <Card className="mx-auto max-w-2xl p-2">
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
                                                                              onClick={() => handleOpenDetailsModal(product.id)}
                                                                        >
                                                                              Editar
                                                                        </Button>
                                                                        <Button
                                                                              icon={BsTrashFill}
                                                                              size={"md"}
                                                                              className="text-white bg-rose-400 hover:bg-rose-500 border-rose-500 transition-all duration-300  hover:border-rose-500"
                                                                              onClick={() => handleOpenDeleteModal(product.id)}
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