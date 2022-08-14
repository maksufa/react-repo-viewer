import React from "react";
import { Input } from "antd";
import debounce from "lodash/debounce";
import { DEBOUNCE_THRESHOLD } from "../utils/constants";

String!;

interface IFilteredDropdown {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

// make better search UX with debounce
function FilterDropdown({ setSearchQuery }: IFilteredDropdown) {
  const debouncedSearch = debounce((value: string) => {
    setSearchQuery(value);
  }, DEBOUNCE_THRESHOLD);

  return (
    <Input
      allowClear
      onChange={(e: React.FormEvent<HTMLInputElement>) =>
        debouncedSearch(e.currentTarget.value)
      }
    />
  );
}

export default FilterDropdown;
