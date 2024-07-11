import { auth } from "@/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignIn } from "@/components/sign-in";

export default async function Home() {
  const session = await auth();
  if (session) {
    redirect("/painel");
  }

  return (
    <main className="min-h-screen flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Entrar</CardTitle>
          <CardDescription>
            Somente colaboradores do AM News podem acessar o painel.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <SignIn />
        </CardFooter>
      </Card>
    </main>
  );
}
