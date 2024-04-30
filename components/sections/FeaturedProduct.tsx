"use client";

import React, { useContext } from 'react'
import { Button, Card, Divider, Flex, Grid, Subtitle, Text, Title } from '@tremor/react'
import { CartContext } from '../context/CartContext';
import { useProductData } from '@/hooks/use-product-data';

export const FeaturedProduct = () => {
      const cartContext = useContext(CartContext);

      if (!cartContext) {
            throw new Error("CartContext not found");
      }

      const { addProduct } = cartContext;

      const { products } = useProductData();

      return (
            <Flex className="mainContainer">
                  <Title className='flex space-x-2 items-center'>
                        Produtos Novos
                  </Title>
                  <Divider />
                  <Grid numItems={4} style={{ gap: '20px' }}>
                        {products?.length > 0 && products.map(product => (
                              <Card key={product.id} className='max-w-sm flex flex-col items-start justify-start p-2' >
                                    <Button variant='light' className='hover:bg-slate-800/50'>
                                          <img
                                                src={product.images[3]}
                                                alt={`Imagem ${product.name}`}
                                                className='border-2 border-slate-200 hover:border-blue-500 transition-all duration-300 rounded-tremor-default'
                                                style={{ objectFit: "cover" }}
                                          />
                                    </Button>
                                    <Flex flexDirection='col'>
                                          <div className='flex-col space-y-1 mt-4' style={{ height: '100px' }}>
                                                <Subtitle className='px-2 font-bold'>{product.name}</Subtitle>
                                                <Text className='px-2 text-slate-800'>{product.description}</Text>
                                          </div>
                                          <Flex className='p-2 mt-4'>
                                                <span className='text-tremor-subtitle font-bold tracking-wider'>
                                                      {product.price}
                                                </span>
                                                <Button onClick={() => addProduct(product.id)}>
                                                      Adicionar ao Carrinho
                                                </Button>
                                          </Flex>
                                    </Flex>
                              </Card>
                        ))}
                  </Grid>
            </Flex>
      );
};