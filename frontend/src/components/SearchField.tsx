import { TextField } from "@mui/material";
import React, { ChangeEvent, useState } from "react";

type SearchFieldProps = {
  onSearch: (param: string) => void;
};
export const SearchField = ({ onSearch }: SearchFieldProps) => {
  const [searchParam, setSearchParam] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchParam(e.target.value);
  };
  return (
    <TextField
      fullWidth
      variant="standard"
      color="success"
      placeholder="Buscar por nombre o categoria..."
      name="searchParam"
      value={searchParam}
      onChange={handleChange}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          onSearch(searchParam);
        }
      }}
    />
  );
};
