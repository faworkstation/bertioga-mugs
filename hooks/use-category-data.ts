"use client";

import { useEffect, useState } from "react";
import { Category } from "@prisma/client";
import { getAllCategories } from "@/database/read/get-categories";

export const useCategoryData = () => {
      const [categories, setCategories] = useState<Category[] | []>([]);

      const fetchAllCategories = async () => {
            try {
                  const allCategorys = await getAllCategories();

                  if (allCategorys) {
                        setCategories(allCategorys);
                  };
            } catch (error) {
                  console.error("Ops! Ocorreu um erro ao buscar os produtos:", error);
            };
      };

      useEffect(() => {
            fetchAllCategories();
      }, []);

      return { categories };
};