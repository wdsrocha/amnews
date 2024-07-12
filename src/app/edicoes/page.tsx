import { getEditions } from "@/lib/api";
import { DataTable } from "../../components/data-table";
import { columns } from "./columns";

export default async function Page() {
  const editions = await getEditions();

  return (
    <main className="px-4 md:px-6 flex flex-col gap-y-4">
      <DataTable
        title="Edições"
        description="Todas as edições do ano."
        columns={columns}
        data={editions}
      />
    </main>
  );
}
