"use client";

import { Button } from "@/components/ui/button";
import { Match } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const columns: ColumnDef<Match>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <>
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="flex items-center gap-1 text-xs"
          >
            <span>Data</span>
            <ArrowUpDown className="h-3 w-3" />
          </Button>
        </>
      );
    },
    cell: ({ row }) => {
      return formatDate(new Date(row.getValue("date")));
    },
  },
  {
    accessorKey: "organization",
    header: "Organização",
  },
  {
    accessorKey: "stage",
    header: "Fase",
  },
  {
    accessorKey: "raw",
    header: "Confronto",
  },
];
