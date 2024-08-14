import { Edition, getEditions } from "@/lib/api";
import { DataTable } from "../../components/data-table";
import { columns } from "./columns";

export default async function Page() {
  const editions = (await getEditions()).sort((a: Edition, b: Edition) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <DataTable
      title="Edições"
      description="Todas as edições do ano."
      columns={columns}
      data={editions}
    />
  );
}
