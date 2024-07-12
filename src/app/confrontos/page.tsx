import { getMatches } from "@/lib/api";
import { DataTable } from "../../components/data-table";
import { columns } from "./columns";

export default async function Page() {
  const matches = await getMatches();
  return (
    <main className="px-4 md:px-6">
      <DataTable columns={columns} data={matches} />
    </main>
  );
}
