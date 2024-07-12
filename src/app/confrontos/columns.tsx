"use client";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Match } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const toLabel = (key: string) => {
  const labelByKey: { [key: string]: string } = {
    date: "Data",
    organization: "Organização",
    stage: "Fase",
    raw: "Confronto",
  };

  return labelByKey[key] || key;
};

export const columns: ColumnDef<Match>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={toLabel("date")} />
    ),
    cell: ({ row }) => {
      return formatDate(new Date(row.getValue("date")));
    },
  },
  {
    accessorKey: "organization",
    header: toLabel("organization"),
  },
  {
    accessorKey: "stage",
    header: toLabel("stage"),
  },
  {
    accessorKey: "raw",
    header: toLabel("raw"),
  },
];
