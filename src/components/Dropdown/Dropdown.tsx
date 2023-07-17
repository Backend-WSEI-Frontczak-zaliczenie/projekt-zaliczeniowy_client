import { InputLabel, Select, MenuItem } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import getOptionsTypes from "../../utils/api/getOptionsTypes";
import getOptionsRegions from "../../utils/api/getOptionsRegions";
import { Dispatch, SetStateAction } from "react";

const Dropdown = ({
  property,
  onChange,
  label,
  defaultValue,
  placeholder,
}: {
  property: string;
  onChange: Dispatch<SetStateAction<string>>;
  label: string;
  defaultValue?: string;
  placeholder?: string;
}) => {
  const { data: typeOptions } = useQuery(["types"], getOptionsTypes);
  const { data: regionOptions } = useQuery(["regions"], getOptionsRegions);

  if (!typeOptions || !regionOptions) return null;

  return (
    <>
      <InputLabel id="demo-simple-select-label">{label}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={label}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        defaultValue={defaultValue}
      >
        {(property === "types" ? typeOptions : regionOptions).map((option) => (
          <MenuItem value={option.name} key={option.id}>
            {option.name}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default Dropdown;
