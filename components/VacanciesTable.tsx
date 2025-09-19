"use client";

import { DataTable } from "./DataTable";
import { useQuery } from "@tanstack/react-query";
import { vacanciesColumns } from "./VacanciesColumns";

export function VacanciesTable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["vacancies"],
    queryFn: async () => {
      const res = await fetch("http://localhost:4000/api/vacancies"); // endpoint Express kamu
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      return json.data || [];
    },
  });

  return (
    <DataTable
      columns={vacanciesColumns}
      data={data ?? []}
      //   isLoading={isLoading}
      //   // bisa tambah props search/filter/toolbar di sini
    />
  );
}
