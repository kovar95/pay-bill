"useClient";

import {
  useState,
  createContext,
  useContext,
  useMemo,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import { Item } from "@/types/Item";
import { Person } from "@/types/Person";

type BillsContextType = {
  persons: Person[];
  setPersons: Dispatch<SetStateAction<Person[]>>;
  items: Item[];
  setItems: Dispatch<SetStateAction<Item[]>>;
};

export const BillsContext = createContext<BillsContextType>(
  {} as BillsContextType
);

type Props = {
  children: ReactNode;
};

export default function BillsContextProvider({ children }: Props) {
  const [persons, setPersons] = useState<Person[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const contextValues = useMemo(
    () => ({ persons, items, setItems, setPersons }),
    [items, persons]
  );

  return (
    <BillsContext.Provider value={contextValues}>
      {children}
    </BillsContext.Provider>
  );
}

export const useBills = () => useContext(BillsContext);
