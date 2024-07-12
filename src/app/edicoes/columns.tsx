"use client";

import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Match } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { matchesTableHeaders as headers } from "@/lib/utils";

export const columns: ColumnDef<Match>[] = [
  {
    id: headers.date.id,
    accessorKey: headers.date.id,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={headers.date.label} />
    ),
    cell: ({ row }) => {
      return formatDate(new Date(row.getValue(headers.date.id)));
    },
  },
  {
    id: headers.organization.id,
    accessorKey: headers.organization.id,
    header: headers.organization.label,
  },
  {
    id: headers.stage.id,
    accessorKey: headers.stage.id,
    header: headers.stage.label,
  },
  {
    id: headers.raw.id,
    accessorKey: headers.raw.id,
    header: headers.raw.label,
  },
];
