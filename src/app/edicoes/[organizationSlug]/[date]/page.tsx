import { formatDate } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getEdition } from "@/lib/api";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { EditIcon, ExternalLinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function Page({
  params,
}: {
  params: { organizationSlug: string; date: string };
}) {
  const edition = await getEdition(params.organizationSlug, params.date);

  if (!edition) {
    return redirect("/404");
  }

  return (
    <main className="px-4 md:px-6 flex flex-col gap-y-4 pb-4 md:pb-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/edicoes">Edições</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Detalhes</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col md:grid md:grid-flow-row md:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="bg-muted/50">
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-y-2">
                <CardTitle>{edition.organization}</CardTitle>
                <CardDescription>
                  {formatDate(new Date(edition.date))}
                </CardDescription>
              </div>
              <Button size="sm" variant="ghost" className="flex gap-x-1">
                <span className="hidden md:flex">Editar</span>
                <EditIcon className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="text-sm p-6">
            <div className="grid gap-3">
              <div className="font-semibold">Dados da Edição</div>
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Campeão</span>
                  <span>{edition.champion}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Vice-campeão</span>
                  <span>{edition.runnerUp}</span>
                </li>
              </ul>
              <Separator className="my-2" />
              <ul className="grid gap-3">
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Título</span>
                  <span>{edition.title}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Modo</span>
                  <span>{edition.mode}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">
                    Número da Edição
                  </span>
                  <span>{edition.editionNumber}</span>
                </li>
                <li className="flex items-center justify-between">
                  <span className="text-muted-foreground">Jurados</span>
                  <span>{edition.judges}</span>
                </li>
                <li className="flex items-center justify-between">
                  <a
                    href={edition.instagramPost}
                    className="text-blue-600 flex items-center gap-x-1 ml-auto"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Post do Campeão</span>
                    <ExternalLinkIcon className="w-4 h-4" />
                  </a>
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Confrontos</CardTitle>
              <Button size="sm" variant="ghost" className="flex gap-x-1">
                <span className="hidden md:flex">Editar</span>
                <EditIcon className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="text-sm">
            <ul className="grid gap-2">
              {edition.matches?.map((match, index, array) => {
                if (index === 0) {
                  return (
                    <>
                      <li key={`${index}-stage`} className="font-semibold">
                        {match.stage}
                      </li>
                      <li key={index}>{match.raw}</li>
                    </>
                  );
                } else if (
                  index > 0 &&
                  array[index - 1]?.stage !== match.stage
                ) {
                  return (
                    <>
                      <Separator className="my-2" />
                      <li key={`${index}-stage`} className="font-semibold">
                        {match.stage}
                      </li>
                      <li key={index}>{match.raw}</li>
                    </>
                  );
                } else return <li key={index}>{match.raw}</li>;
              })}
            </ul>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
