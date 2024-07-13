"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { Edition, Match } from "@/lib/api";
import { cn, formatDate, slugify } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { EyeIcon } from "lucide-react";
import Link from "next/link";

const headers = {
  navigationAux: {
    id: "navigationAux",
    label: "",
  },
  date: {
    id: "date",
    label: "Data",
  },
  organization: {
    id: "organization",
    label: "Organização",
  },
  champion: {
    id: "champion",
    label: "Campeão",
  },
  runnerUp: {
    id: "runnerUp",
    label: "Vice",
  },
  editionNumber: {
    id: "editionNumber",
    label: "Edição",
  },
  title: {
    id: "title",
    label: "Título",
  },
  mode: {
    id: "mode",
    label: "Modo",
  },
  judges: {
    id: "judges",
    label: "Jurados",
  },
  instagramPost: {
    id: "instagramPost",
    label: "Post",
  },
};

export const columns: ColumnDef<Edition>[] = [
  {
    accessorKey: headers.navigationAux.id,
    header: "",
    cell: ({ row }) => {
      return (
        <Link
          href={`/edicoes/${slugify(row.original.organization)}/${
            row.original.date
          }`}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "flex gap-x-1"
          )}
        >
          <EyeIcon className="w-4 h-4 -mx-2 opacity-50" />
        </Link>
      );
    },
  },
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
    accessorKey: headers.champion.id,
    header: headers.champion.label,
  },
  {
    accessorKey: headers.runnerUp.id,
    header: headers.runnerUp.label,
  },
  {
    accessorKey: headers.editionNumber.id,
    header: headers.editionNumber.label,
  },
  {
    accessorKey: headers.title.id,
    header: headers.title.label,
  },
  {
    accessorKey: headers.mode.id,
    header: headers.mode.label,
  },
  {
    accessorKey: headers.judges.id,
    header: headers.judges.label,
  },
  {
    accessorKey: headers.instagramPost.id,
    header: headers.instagramPost.label,
    cell: ({ row }) => {
      return (
        <a
          href={row.getValue(headers.instagramPost.id)}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline"
        >
          Abrir
        </a>
      );
    },
  },
];
