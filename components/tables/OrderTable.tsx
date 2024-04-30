import { Order } from "@prisma/client";
import { Card, Flex, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";

type OrderTableProps = {
      orders: Order[];
};

export const OrderTable = ({ orders }: OrderTableProps) => {
      return (
            <Flex className="flex-col items-start">
                  <Card
                        className={"mx-auto flex-col overflow-auto pb-2 space-y-4 items-start"}
                        style={{
                              height: "auto",
                              maxHeight: "420px",
                              paddingInline: "5px"
                        }}
                  >
                        <Table>
                              <TableHead>
                                    <TableRow>
                                          <TableHeaderCell>Data</TableHeaderCell>
                                          <TableHeaderCell>Remetente</TableHeaderCell>
                                          <TableHeaderCell>Produto</TableHeaderCell>
                                    </TableRow>
                              </TableHead>
                              <TableBody>
                                    {orders.length > 0 &&
                                          orders.map((order) => (
                                                <TableRow key={order.id}>
                                                      <TableCell>
                                                            {new Date(order.createdAt).toLocaleString()}
                                                      </TableCell>
                                                      <TableCell>
                                                            {order.name} {order.email}
                                                            <br />
                                                            {order.street} {order.cep}
                                                            <br />
                                                            {order.city}
                                                            <br />
                                                            {order.phone}
                                                      </TableCell>
                                                      <TableCell>
                                                            {Array.isArray(order.line_items) ? (
                                                                  order.line_items.map((lineItem: any, index: number) => {
                                                                        const productName = lineItem?.price_data?.product_data?.name ?? 'Desconhecido';
                                                                        const quantity = lineItem?.quantity ?? 0;

                                                                        return (
                                                                              <div key={index}>
                                                                                    {productName}
                                                                                    <br />
                                                                                    Quantidade: {quantity}
                                                                                    <br />
                                                                              </div>
                                                                        );
                                                                  })
                                                            ) : (
                                                                  <div>Sem itens</div>
                                                            )}
                                                      </TableCell>
                                                </TableRow>
                                          ))}
                              </TableBody>
                        </Table>
                  </Card>
            </Flex>
      );
};