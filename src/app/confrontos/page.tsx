import { getMatches } from "@/lib/api";
import { DataTable } from "../../components/data-table";
import { columns } from "./columns";

export default async function Page() {
  const matches = await getMatches();
  return (
    <DataTable
      title="Confrontos"
      description="Todas batalhas de cada edição."
      columns={columns}
      data={matches}
    />
  );
}
