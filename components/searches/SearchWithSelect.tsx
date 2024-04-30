"use client";

import React, { ChangeEvent, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { Flex, TextInput, Select } from "@tremor/react";

interface SearchWithSelectProps {
      inputLabel: string;
      selectLabel: string;
      onSearch: (term: string, status: string) => void;
      children: React.ReactNode;
}

export const SearchWithSelect = React.memo(function SearchWithSelect({ inputLabel, selectLabel, onSearch, children }: SearchWithSelectProps) {
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
                  <Flex className="flex-col justify-start items-start space-y-1">
                        <h3 className="ml-1 text-tremor-default font-medium"> {inputLabel} </h3>
                        <TextInput
                              className="border-slate-300"
                              type="text"
                              name="search"
                              icon={BsSearch}
                              placeholder={"Insira o nome para pesquisar..."}
                              spellCheck={false}
                              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                    handleInputChange(e.target.value)
                              }
                        />
                  </Flex>
                  <Flex className="flex-col justify-start items-start space-y-1">
                        <h3 className="ml-1 text-tremor-default font-medium"> {selectLabel} </h3>
                        <Select
                              className="border border-slate-300 rounded-tremor-default"
                              name={"select"}
                              onValueChange={handleStatusChange}
                              value={selectedStatus}
                              placeholder="Clique para selecionar"
                        >
                              {children}
                        </Select>
                  </Flex>
            </Flex>
      );
});