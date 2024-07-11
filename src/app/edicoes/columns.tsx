"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Edition = {
  date: string;
  organization: string;
  champion: string;
  runnerUp: string;
  editionNumber: number;
  title: string;
  mode: string;
  judges: string;
  instagramFlyerPost: string;
};

export const columns: ColumnDef<Edition>[] = [
  {
    accessorKey: "date",
    header: "Data",
  },
  {
    accessorKey: "organization",
    header: "Organização",
  },
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "champion",
    header: "Campeão",
  },
  {
    accessorKey: "runnerUp",
    header: "Vice",
  },
  {
    accessorKey: "mode",
    header: "Modo",
  },
  {
    accessorKey: "judges",
    header: "Jurados",
  },
  {
    accessorKey: "instagramFlyerPost",
    header: "Post do Flyer",
  },
];
