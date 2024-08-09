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
      <main className="px-4 md:px-6 flex flex-col gap-y-4 pb-4 md:pb-6">
        <div className="flex flex-col gap-y-2">
          <h1 className="font-semibold">Nenhuma edição encontrada</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="px-4 md:px-6 flex flex-col gap-y-4">
      <DataTable
        title="Edições"
        description={editions[0].organization}
        columns={columns}
        data={editions}
      />
    </main>
  );
}
