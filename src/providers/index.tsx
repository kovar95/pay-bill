"use client";

import { ReactNode } from "react";
import BillsContextProvider from "./BillsProvider";

export default function Providers({ children }: { children: ReactNode }) {
  return <BillsContextProvider>{children}</BillsContextProvider>;
}
