import { auth } from "@/auth";

export default async function Page() {
  const session = await auth();

  return <p>Bem-vindo, {session?.user?.name ?? "visitante"}.</p>;
}
