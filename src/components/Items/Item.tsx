import { FC } from "react";
import { Item } from "@/types/Item";
import {
  FormControl,
  FormLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { useBills } from "@/providers/BillsProvider";

type Props = {
  item: Item;
};

const Item: FC<Props> = ({ item }) => {
  const { persons, setItems } = useBills();
  const personsList = persons.map((person) => person?.name);

  const handleSelectPersons = (e: SelectChangeEvent<string[]>) => {
    const person = e.target.value;
    const newPersons = typeof person === "string" ? person.split(",") : person;

    setItems((prevItems) =>
      prevItems.map((itm) => ({
        ...itm,
        persons: itm.id === item.id ? newPersons : itm.persons,
      }))
    );
  };

  return (
    <Stack direction="row" alignItems="center" key={item.id}>
      <FormControl sx={{ width: "35%" }}>
        <FormLabel>Price</FormLabel>
        <TextField value={item.price} disabled />
      </FormControl>
      <FormControl sx={{ m: 1, width: 300 }}>
        <FormLabel>People</FormLabel>
        <Select
          multiple
          value={item.persons}
          onChange={handleSelectPersons}
          input={<OutlinedInput />}
          renderValue={(selected) => selected.join(", ")}
        >
          {personsList.map((person) => (
            <MenuItem
              key={person}
              value={person}
              sx={{ fontWeight: item.persons.includes(person) ? 700 : 400 }}
            >
              <Checkbox checked={item.persons.includes(person)} />
              <ListItemText primary={person} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  );
};

export default Item;
