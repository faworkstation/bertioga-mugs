"use client";

import { Flex, Title } from "@tremor/react";
import { SearchWithDate } from "../searches/SearchWithDate";
import { OrderTable } from "../tables/OrderTable";
import { useOrderData } from "@/hooks/use-order-data";

export const OrderSection = () => {
      const { orders } = useOrderData();

      return (
            <Flex className="flex-col space-y-4 items-start p-4">
                  <div  className="w-full p-4 bg-gray-100 rounded-tremor-default font-medium">
                        <Title>
                              Pedidos
                        </Title>
                  </div>
                  <SearchWithDate
                        placeholderText="Pesquisar..."
                        onSearch={() => { }}
                  />
                  <OrderTable orders={orders} />
            </Flex>
      );
};