import { ChangeEvent, FC, KeyboardEvent, useState } from "react";
import {
  Alert,
  Button,
  CircularProgress,
  FormControl,
  FormLabel,
  Stack,
  TextField,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { useBills } from "@/providers/BillsProvider";
import axios, { AxiosError, AxiosResponse } from "axios";
import { Person } from "@/types/Person";
import { useFormik } from "formik";

type FormikValues = {
  name: string;
};

const AddPerson: FC = () => {
  const { setPersons, persons } = useBills();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const {
    values: { name },
    handleChange,
    handleSubmit,
    setFieldError,
    errors,
  } = useFormik<FormikValues>({
    initialValues: {
      name: "",
    },
    onSubmit: async (val, { resetForm }) => {
      try {
        setIsLoading(true);
        const user: AxiosResponse<{ person: Person }> = await axios.post(
          "/api/person",
          {
            name: val.name,
          }
        );
        setPersons((prev) => [...prev, user.data.person]);
        resetForm();
      } catch (error) {
        setError((error as AxiosError).message);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !errors.name) {
      handleSubmit();
    }

    if (persons.some((person) => person.name === name)) {
      setFieldError("name", "Person with this name already exists!");
    }
  };

  return (
    <>
      <Stack direction="row" gap={1} alignItems="flex-start">
        <FormControl fullWidth>
          <FormLabel>Add person</FormLabel>
          <TextField
            value={name}
            name="name"
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            placeholder="Enter person name"
            inputProps={{ maxLength: 30 }}
            helperText={errors.name}
            error={!!errors.name}
          />
        </FormControl>
        <Button
          variant="contained"
          sx={{ height: "55px", width: "100px", marginTop: "1.5rem" }}
          disabled={!name || isLoading || !!errors.name}
          onClick={() => handleSubmit()}
          endIcon={
            isLoading ? (
              <CircularProgress
                sx={{ width: "20px !important", height: "20px !important" }}
              />
            ) : (
              <PersonAddIcon />
            )
          }
        >
          Add
        </Button>
      </Stack>
      {error && <Alert severity="error">{error}</Alert>}
    </>
  );
};

export default AddPerson;
