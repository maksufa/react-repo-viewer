import React from "react";
import { Input } from "antd";

interface IFilteredDropdown {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

// TODO: make better search UX with debounce
function FilterDropdown({ setSearchQuery }: IFilteredDropdown) {
  return (
    <Input
      allowClear
      onChange={(e: React.FormEvent<HTMLInputElement>) =>
        setSearchQuery(e.currentTarget.value)
      }
    />
  );
}

export default FilterDropdown;
