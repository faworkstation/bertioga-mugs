import { BsFileMinus, BsFilePlus } from "react-icons/bs";
import { Product } from "@prisma/client";

import {
      Button,
      Card,
      Divider,
      Flex,
      Table,
      TableBody,
      TableCell,
      TableHead,
      TableHeaderCell,
      TableRow,
      Title
} from "@tremor/react";

interface CartTableProps {
      products: Product[];
      cartProducts: string[];
      addProduct: (productId: string) => void;
      removeProduct: (productId: string) => void;
};

export const CartTable = ({
      products,
      cartProducts,
      addProduct,
      removeProduct
}: CartTableProps) => {

      const moreThisProduct = (id: string) => addProduct(id);

      const lessThisProduct = (id: string) => removeProduct(id);

      const formatPrice = (priceStr: string) => parseFloat(priceStr.replace(/[^0-9,.]/g, "").replace(",", "."));

      const cartProductList = products.filter((product) =>
            cartProducts.includes(product.id)
      );

      let total = 0;

      cartProductList.forEach((product) => {
            const price = formatPrice(product.price);
            const quantity = cartProducts.filter((id) => id === product.id).length;
            total += price * quantity;
      });

      return (
            <Card>
                  <Title>Carrinho</Title>
                  <Divider />
                  {cartProductList?.length > 0 && (
                        <>
                              <Flex
                                    className={"flex-col overflow-auto pb-2 space-y-4 items-start"}
                                    style={{
                                          height: "auto",
                                          maxHeight: "388px",
                                          paddingInline: "5px"
                                    }}
                              >
                                    <Table className="w-full">
                                          <TableHead>
                                                <TableRow className="bg-gray-50">
                                                      <TableHeaderCell>Produto</TableHeaderCell>
                                                      <TableHeaderCell>Quantidade</TableHeaderCell>
                                                      <TableHeaderCell>Preço</TableHeaderCell>
                                                </TableRow>
                                          </TableHead>
                                          <TableBody>
                                                {cartProductList.map(product => (
                                                      <TableRow key={product.id} className=" text-slate-800">
                                                            <TableCell>
                                                                  <Flex className="justify-start space-x-4">
                                                                        <div style={{ width: "60px" }}>
                                                                              <img
                                                                                    src={product.images[0]}
                                                                                    alt={`Imagem ${product.name}`}
                                                                                    className="border-2 border-slate-200 hover:border-blue-500 transition-all duration-300 rounded-tremor-default"
                                                                                    style={{ objectFit: "cover" }}
                                                                              />
                                                                        </div>
                                                                        <p className="font-medium">
                                                                              {product.name}
                                                                        </p>
                                                                  </Flex>
                                                            </TableCell>
                                                            <TableCell>
                                                                  <Flex className="justify-start space-x-1">
                                                                        <Button
                                                                              icon={BsFileMinus}
                                                                              type="button"
                                                                              variant="light"
                                                                              onClick={() => lessThisProduct(product.id)}
                                                                        />
                                                                        <p className="font-bold">
                                                                              {cartProducts.filter((id: string) => id === product.id).length}
                                                                        </p>
                                                                        <Button
                                                                              icon={BsFilePlus}
                                                                              type="button"
                                                                              variant="light"
                                                                              onClick={() => moreThisProduct(product.id)}
                                                                        />
                                                                  </Flex>
                                                            </TableCell>
                                                            <TableCell>
                                                                  <p className="font-medium text-tremor-title">
                                                                        R$ {cartProducts.filter((id: string) => id === product.id).length * formatPrice(product.price)}
                                                                  </p>
                                                            </TableCell>
                                                      </TableRow>
                                                ))}
                                          </TableBody>
                                    </Table>
                              </Flex>
                              <Divider />
                              <Flex className="justify-start">
                                    <TableCell>
                                          <Title className="font-bold"> Total </Title>
                                    </TableCell>
                                    <TableCell>
                                          <Title className="font-bold"> R$ {total} </Title>
                                    </TableCell>
                              </Flex>
                        </>
                  )}
            </Card>
      );
};