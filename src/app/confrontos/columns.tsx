"use client";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Match } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const headers = {
  date: {
    id: "date",
    label: "Data",
  },
  organization: {
    id: "organization",
    label: "Organização",
  },
  stage: {
    id: "stage",
    label: "Fase",
  },
  raw: {
    id: "raw",
    label: "Confronto",
  },
};

export const columns: ColumnDef<Match>[] = [
  {
    accessorKey: headers.date.id,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={headers.date.label} />
    ),
    cell: ({ row }) => {
      return formatDate(new Date(row.getValue(headers.date.id)));
    },
  },
  {
    accessorKey: headers.organization.id,
    header: headers.organization.label,
  },
  {
    accessorKey: headers.stage.id,
    header: headers.stage.label,
  },
  {
    accessorKey: headers.raw.id,
    header: headers.raw.label,
  },
];
