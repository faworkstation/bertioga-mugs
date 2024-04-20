"use client";

import { useEffect, useState } from "react";
import { Product } from "@prisma/client";
import { getAllProducts } from "@/database/read/get-products";

export const useProductData = () => {
      const [products, setProducts] = useState<Product[] | []>([]);

      const fetchAllProducts = async () => {
            try {
                  const allProducts = await getAllProducts();

                  if (allProducts) {
                        setProducts(allProducts);
                  };
            } catch (error) {
                  console.error("Ops! Ocorreu um erro ao buscar os produtos:", error);
            };
      };

      useEffect(() => {
            fetchAllProducts();
      }, []);

      return { products };
};