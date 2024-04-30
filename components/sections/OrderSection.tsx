"use client";

import { Callout, Card, Divider, Flex, Title } from "@tremor/react";
import { AnimBottomToTop } from '@/components/animations/AnimBottomToTop';
import { SearchWithDate } from "@/components/searches/SearchWithDate";
import { OrderTable } from "@/components/tables/OrderTable";
import { useOrderData } from "@/hooks/use-order-data";
import { BsClipboardData } from "react-icons/bs";

export const OrderSection = () => {
      const { orders } = useOrderData();

      return (
            <Flex className="mainContainer">
                  <Title className='flex space-x-2 items-center'>
                        <BsClipboardData />
                        <span> Pedidos </span>
                  </Title>
                  <Divider />
                  {orders.length > 0 ? (
                        <>
                              <SearchWithDate placeholderText="Pesquisar..." onSearch={() => { }} />
                              <OrderTable orders={orders} />
                        </>
                  ) : (
                        <AnimBottomToTop>
                              <Card className="p-2">
                                    <Callout title="Não existem pedidos no momento." className="w-full" />
                              </Card>
                        </AnimBottomToTop>
                  )}
            </Flex>
      );
};