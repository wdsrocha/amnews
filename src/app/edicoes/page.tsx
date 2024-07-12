import { getMatches } from "@/lib/api";
import { DataTable } from "../../components/data-table";
import { columns } from "./columns";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function Page() {
  const matches = await getMatches();
  return (
    <main className="px-4 md:px-6 flex flex-col gap-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Edições</CardTitle>
          <CardDescription>
            Aqui você encontra todos as edições do ano.
          </CardDescription>
        </CardHeader>
      </Card>
      <DataTable columns={columns} data={matches} />
    </main>
  );
}
