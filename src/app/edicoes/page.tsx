import { getEditions } from "@/lib/api";
import { DataTable } from "../../components/data-table";
import { columns } from "./columns";

export default async function Page() {
  const editions = await getEditions();

  return (
    <DataTable
      title="Edições"
      description="Todas as edições do ano."
      columns={columns}
      data={editions}
    />
  );
}
