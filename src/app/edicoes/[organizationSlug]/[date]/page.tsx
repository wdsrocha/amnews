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

export default async function Page({
  params,
}: {
  params: { organizationSlug: string; date: string };
}) {
  const edition = await getEdition(params.organizationSlug, params.date);

  if (!edition) {
    return <div>Edição não encontrada</div>;
  }

  return (
    <main className="px-4 md:px-6 flex flex-col gap-y-8">
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
      <div className="flex flex-col gap-y-1">
        <p className="text-sm text-muted-foreground">
          {formatDate(new Date(edition.date))}
        </p>
        <h1 className="text-lg font-semibold">{edition.organization}</h1>
      </div>
    </main>
  );
}
