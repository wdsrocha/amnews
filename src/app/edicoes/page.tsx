import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Header } from "@/components/header";
import { Edition } from "../api/fetch-editions/route";
import { DataTable } from "./data-table";
import { columns } from "./columns";

const editions: Edition[] = [
  {
    date: "2024-01-02",
    organization: "Batalha da Malta",
    champion: "Sharp",
    runnerUp: "Killer",
    editionNumber: 1,
    title: "A primeira do ano",
    instagramFlyerPost: "https://www.instagram.com/p/C1lFUXLOA6S/",
    judges: "Medusa e Cacique",
    mode: "45s",
  },
  {
    date: "2024-01-03",
    organization: "Batalha do Leme",
    champion: "Sharp",
    runnerUp: "Killer",
    editionNumber: 1,
    title: "A primeira do ano",
    instagramFlyerPost: "https://www.instagram.com/p/C1lFUXLOA6S/",
    judges: "Medusa e Cacique",
    mode: "45s",
  },
];

export default function Page() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 gap-y-4">
      <Header />
      <main className="px-4 md:px-6 flex flex-col gap-y-4">
        <Button size="sm" className="h-7 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sm:not-sr-only sm:whitespace-nowrap">
            Cadastrar Edição
          </span>
        </Button>
        <DataTable columns={columns} data={editions} />
      </main>
    </div>
  );
}
