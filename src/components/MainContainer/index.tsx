"use client";

import { FC } from "react";
import { Divider, Stack } from "@mui/material";
import AddPerson from "../AddPerson";
import AddItem from "../AddItem";
import DataTable from "../DataTable";
import Items from "../Items";

const MainContainer: FC = () => {
  return (
    <Stack width="100%" alignItems="center" gap={5}>
      <Stack width="30%" gap={2} padding={3} borderRadius={5} bgcolor="#fff">
        <AddPerson />
        <Divider />
        <Stack gap={2}>
          <Items />
          <AddItem />
        </Stack>
      </Stack>
      <DataTable />
    </Stack>
  );
};

export default MainContainer;
