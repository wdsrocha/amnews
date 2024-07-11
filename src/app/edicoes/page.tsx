import { ListFilter, MoreHorizontal, PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Header } from "@/components/header";
import { Edition } from "../api/fetch-editions/route";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatDate } from "@/lib/utils";

const editions: Partial<Edition>[] = [
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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Header />
      <div className="flex flex-col sm:gap-4 sm:py-4">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button size="sm" className="h-7 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Cadastrar Edição
                </span>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 gap-1">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Filtrar
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>
                    Active
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <div className="flex flex-col gap-y-4">
            {editions.map((edition, index) => {
              return (
                <Card key={index} className="overflow-x-auto">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-y-1">
                        <CardTitle>{edition.organization}</CardTitle>
                        <CardDescription>
                          {formatDate(new Date(edition.date!))}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 gap-1"
                          >
                            <MoreHorizontal className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                              Mais
                            </span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="hidden" align="end">
                          <DropdownMenuItem>Editar</DropdownMenuItem>
                          <DropdownMenuItem>Apagar</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardFooter>
                    <a
                      href={edition.instagramFlyerPost}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm text-muted-foreground"
                    >
                      Ver postagem no Instagram
                    </a>
                  </CardFooter>
                </Card>
                // <div key={index} className="overflow-x-auto">
                //   <p className="text-sm text-muted-foreground">
                //     {formatDate(new Date(edition.date!))}
                //   </p>
                //   <p className="text-normal font-semibold">
                //     {edition.organization}
                //   </p>
                // </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
