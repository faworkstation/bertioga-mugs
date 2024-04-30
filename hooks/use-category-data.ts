"use client";

import { useEffect, useState } from "react";
import { getAllCategories } from "@/actions/read/get-categories";

interface CategoryProps {
      id: string,
      name: string,
      parent: string | null
};

export const useCategoryData = () => {
      const [categories, setCategories] = useState<CategoryProps[]>([]);

      useEffect(() => {
            const fetchCategories = async () => {
                  const allCategories = await getAllCategories();

                  if (allCategories) {
                        setCategories(allCategories);
                  };
            };

            fetchCategories();

      }, [categories]);

      return { categories };
};