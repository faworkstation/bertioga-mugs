"use client";

import React, { ChangeEvent, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Flex, TextInput, Select } from "@tremor/react";

export const SearchWithSelect = React.memo(function SearchWithSelect({
      inputLabel,
      selectLabel,
      onSearch,
      children,
}: {
      inputLabel: string;
      selectLabel: string;
      onSearch: (term: string, status: string) => void;
      children: React.ReactNode;
}) {
      const [searchTerm, setSearchTerm] = useState<string>("");
      const [selectedStatus, setSelectedStatus] = useState<string>("");

      const handleInputChange = (term: string) => {
            setSearchTerm(term);
            onSearch(term, selectedStatus);
      };

      const handleStatusChange = (value: string) => {
            setSelectedStatus(value);
            onSearch(searchTerm, value);
      };

      return (
            <Flex
                  className={"flex-col sm:flex-row"}
                  style={{ gap: "20px", width: "100%", maxWidth: "800px" }}
            >
                  <Flex className="flex-col justify-start items-start">
                        <h3 className={"sr-only"}> {inputLabel} </h3>
                        <TextInput
                              className="border-slate-300"
                              type="text"
                              name="search"
                              icon={BsSearch}
                              placeholder={"Pesquisar..."}
                              spellCheck={false}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleInputChange(e.target.value)
                              }
                        />
                  </Flex>

                  <Flex className="flex-col justify-start items-start">
                        <h3 className={"sr-only"}> {selectLabel} </h3>
                        <Select
                              className="border border-slate-300 rounded-tremor-default"
                              name={"select"}
                              onValueChange={handleStatusChange}
                              value={selectedStatus}
                              placeholder="Selecionar"
                        >
                              {children}
                        </Select>
                  </Flex>
            </Flex>
      );
});