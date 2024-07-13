import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { getEdition } from "@/lib/api";
import { format } from "date-fns";
import { redirect } from "next/navigation";
import { EditEditionForm } from "./form";
import { Separator } from "@/components/ui/separator";
import { stringToDate } from "@/lib/utils";

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
            <BreadcrumbLink href={`/edicoes/${edition.organization}/`}>
              {edition.organization}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/edicoes/${edition.organization}/${edition.date}/`}
            >
              {format(stringToDate(edition.date), "dd/MM/yyyy")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Editar</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-y-2">
        <h1 className="font-semibold">Editar Edição</h1>
        <Separator />
      </div>
      <EditEditionForm edition={edition} />
    </main>
  );
}
