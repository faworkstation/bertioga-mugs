"use client";

import React, { ChangeEvent, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import { Flex, TextInput, DatePicker } from '@tremor/react';
import { ptBR } from 'date-fns/locale';

export const SearchWithDate = React.memo(function SearchWithDate({
      disabled,
      onSearch,
      placeholderText,
}: {
      disabled?: boolean;
      placeholderText: string;
      onSearch: (term: string, date: string | null) => void;
}) {
      const [searchTerm, setSearchTerm] = useState<string>('');
      const [selectedDate, setSelectedDate] = useState<Date | null>(null);

      const handleInputChange = (term: string) => {
            setSearchTerm(term);
            onSearch(term, selectedDate ? selectedDate.toISOString().split('T')[0] : null);
      };

      const handleDatePickerChange = (date: Date | null) => {
            setSelectedDate(date);
            onSearch(searchTerm, date ? date.toISOString().split('T')[0] : null);
      };

      return (
            <Flex
                  className='flex-col sm:flex-row'
                  style={{ gap: "10px", width: "100%", maxWidth: "800px" }}
            >
                  <TextInput
                        icon={BsSearch}
                        type="text"
                        name="search"
                        placeholder={placeholderText}
                        spellCheck={false}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                              handleInputChange(e.target.value)
                        }
                        disabled={disabled}
                  />

                  <DatePicker
                        placeholder={"Selecione por Data"}
                        onValueChange={(value: any | null) => handleDatePickerChange(value)}
                        displayFormat="dd/MM/yyyy"
                        locale={ptBR}
                  />
            </Flex>
      );
});