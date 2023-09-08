import { FC, useCallback, useMemo } from "react";
import { useBills } from "@/providers/BillsProvider";
import { PersonalBill } from "@/types/Person";
import { Stack } from "@mui/material";
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid";

const DataTable: FC = () => {
  const { persons, items } = useBills();

  const colData = useMemo(
    () => [
      {
        field: "name",
        headerName: "Name",
        width: 200,
        sortable: false,
        renderHeader: () => <strong>Name</strong>,
      },
      {
        field: "pay",
        headerName: "Name",
        width: 200,
        sortable: false,
        renderHeader: () => <strong>Pay</strong>,
        valueGetter: ({ row: { pay } }: GridValueGetterParams<PersonalBill>) =>
          `$ ${pay.toFixed(2)}`,
      },
      {
        field: "iban",
        headerName: "iban",
        width: 300,
        sortable: false,
        renderHeader: () => <strong>IBAN</strong>,
      },
    ],
    []
  );

  const calculatePersonBilling = useCallback(
    (name: string) => {
      const personsItems = items.filter((item) => item.persons.includes(name));
      let price = 0;
      personsItems.forEach((item) => {
        price += item.price / item.persons.length;
      });
      return price;
    },
    [items]
  );

  const billsData: PersonalBill[] = useMemo(
    () =>
      persons.map(({ id, iban, name }) => ({
        id,
        name,
        pay: calculatePersonBilling(name),
        iban,
      })),
    [calculatePersonBilling, persons]
  );

  if (!persons.length) {
    return null;
  }

  return (
    <Stack width="700px" bgcolor="#fff">
      <DataGrid
        rows={billsData}
        columns={colData}
        rowCount={persons.length}
        disableColumnMenu
        hideFooter
      />
    </Stack>
  );
};

export default DataTable;
