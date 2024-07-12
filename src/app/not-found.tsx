import { FrownIcon } from "lucide-react";

export default function Page() {
  return (
    <main className="px-4 md:px-6 flex flex-col gap-y-2">
      <h1 className="text-center text-muted-foreground">
        Página não encontrada.
      </h1>
      <FrownIcon className="w-6 h-6 mx-auto text-muted-foreground" />
    </main>
  );
}
