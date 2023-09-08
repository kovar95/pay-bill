import { FC } from "react";
import { Divider } from "@mui/material";
import Item from "./Item";
import { useBills } from "@/providers/BillsProvider";

const Items: FC = () => {
  const { items } = useBills();

  if (!items.length) {
    return null;
  }

  return (
    <>
      {items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
      <Divider />
    </>
  );
};

export default Items;
