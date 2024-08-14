import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Edition, getOrganizations } from "@/lib/api";

import { Separator } from "@/components/ui/separator";
import { EditEditionForm } from "./form";

export default async function Page() {
  const organizations = await getOrganizations();

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/edicoes">Edições</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Cadastrar</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col gap-y-2">
        <h1 className="font-semibold">Cadastrar Edição</h1>
        <Separator />
      </div>
      <EditEditionForm edition={{} as Edition} organizations={organizations} />
    </>
  );
}
