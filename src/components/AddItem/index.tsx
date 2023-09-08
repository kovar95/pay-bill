import { ChangeEvent, FC } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  InputAdornment,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useBills } from "@/providers/BillsProvider";
import { v4 as uuid } from "uuid";
import { useFormik } from "formik";

type FormikValues = {
  currentPrice: number;
  currentItemPersons: string[];
};

const AddItem: FC = () => {
  const { persons, setItems } = useBills();
  const personsList = persons.map((person) => person?.name);

  const { values, setFieldValue, handleSubmit } = useFormik<FormikValues>({
    initialValues: {
      currentPrice: 0,
      currentItemPersons: [],
    },
    onSubmit: (val, { resetForm }) => {
      setItems((prev) => [
        ...prev,
        {
          id: uuid(),
          price: val.currentPrice,
          persons: val.currentItemPersons,
        },
      ]);
      resetForm();
    },
  });

  const { currentPrice, currentItemPersons } = values;

  const handleCurrentItemPrice = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isNaN(+e.target.value)) {
      setFieldValue("currentPrice", +e.target.value);
    }
  };

  const handleSelectCurrentItemPersons = (e: SelectChangeEvent<string[]>) => {
    const person = e.target.value;

    setFieldValue(
      "currentItemPersons",
      typeof person === "string" ? person.split(",") : person
    );
  };

  return (
    <>
      <Stack direction="row" alignItems="center">
        <FormControl sx={{ width: "35%" }}>
          <FormLabel>Price</FormLabel>
          <TextField
            value={currentPrice}
            onChange={handleCurrentItemPrice}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: 300 }}>
          <FormLabel>People</FormLabel>
          <Select
            multiple
            value={currentItemPersons}
            onChange={handleSelectCurrentItemPersons}
            input={<OutlinedInput />}
            renderValue={(selected) => selected.join(", ")}
            disabled={!persons.length}
          >
            {personsList.map((person) => (
              <MenuItem key={person} value={person}>
                <Checkbox checked={currentItemPersons.includes(person)} />
                <ListItemText primary={person} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Stack>
      <Button
        variant="contained"
        sx={{ height: "55px", width: "130px" }}
        disabled={!currentPrice || !currentItemPersons.length}
        onClick={() => handleSubmit()}
        endIcon={<LibraryAddIcon />}
      >
        Add item
      </Button>
    </>
  );
};

export default AddItem;
