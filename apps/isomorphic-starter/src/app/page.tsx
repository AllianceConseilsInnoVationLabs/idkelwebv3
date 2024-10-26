"use client";

import { useTitle } from "@/context/pageTitleContext";
import { Title } from "rizzui";

export default function Home() {
  const { setTitle, setBreadcrumb} = useTitle();
  setTitle('Tableau de bord Idkel');
  setBreadcrumb(undefined);

  return (
    <></>
  );
}
