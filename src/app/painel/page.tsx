import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  return (
    <main className="flex w-full flex-col min-h-screen px-4 md:px-6">
      Bem-vindo, {session?.user?.name ?? "visitante"}.
    </main>
  );
}
