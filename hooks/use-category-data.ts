"use client";

import { useEffect, useState } from "react";
import { getAllCategories } from "@/database/read/get-categories";

export const useCategoryData = () => {
      const [categories, setCategories] = useState<{
            id: string,
            name: string,
            parent: string | null
      }[]>([]);

      useEffect(() => {
            const fetchCategories = async () => {
                  const allCategories = await getAllCategories();

                  if (allCategories) {
                        setCategories(allCategories);
                  };
            };

            fetchCategories();
      }, []);

      return { categories };
};