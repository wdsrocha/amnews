import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Edition, getOrganizations } from "@/lib/api";
import { EditEditionForm } from "../../../components/form";
import { Separator } from "@/components/ui/separator";

export default async function Page() {
  const organizations = await getOrganizations();

  return (
    <main className="px-4 md:px-6 flex flex-col gap-y-4 pb-4 md:pb-6">
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
    </main>
  );
}
