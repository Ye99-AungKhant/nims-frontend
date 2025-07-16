import React, { useEffect, useState } from "react";
import { Autocomplete, CloseButton } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useGetClients } from "../../hooks/useGetClient";
import { useNavigate } from "react-router-dom";

// const libraries = ["React", "Angular", "Vue", "Svelte"];

export const GlobalSearch = () => {
  const [value, setValue] = useState("");
  const [clients, setClients] = useState([]);
  const [debounced] = useDebouncedValue(value, 500);
  const { mutate } = useGetClients();
  const navigate = useNavigate();

  useEffect(() => {
    handleSearch();
  }, [debounced]);

  const handleSearch = () => {
    if (!value) return;
    mutate(value, {
      onSuccess: (res) => {
        const clientData = res?.data.data.map((data: any) => ({
          value: String(data.id),
          label: data.name,
        }));
        setClients(clientData);
      },
    });
  };

  const handleItemSubmit = (value: string) => {
    setValue(value);
    navigate("client/detail", {
      state: {
        id: value,
      },
    });
  };

  return (
    <Autocomplete
      placeholder="Search client name or company..."
      data={clients}
      value={value}
      onChange={setValue}
      onOptionSubmit={handleItemSubmit}
      radius={"xl"}
      size="sm"
      w={250}
      miw={"auto"}
      clearable
    />
  );
};
