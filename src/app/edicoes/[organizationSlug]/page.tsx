import { getEditions } from "@/lib/api";
import { DataTable } from "../../../components/data-table";
import { columns } from "./../columns";
import { slugify } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

export default async function Page({
  params,
}: {
  params: { organizationSlug: string };
}) {
  const editions = (await getEditions()).filter(
    (edition) => slugify(edition.organization) === params.organizationSlug
  );

  if (!editions.length) {
    return (
      <div className="flex flex-col gap-y-2">
        <h1 className="font-semibold">Nenhuma edição encontrada</h1>
      </div>
    );
  }

  return (
    <DataTable
      title="Edições"
      description={editions[0].organization}
      columns={columns}
      data={editions}
    />
  );
}
