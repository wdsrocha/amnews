import { signIn } from "@/auth";
import { Button } from "./ui/button";

export function SignIn() {
  return (
    <form
      className="w-full"
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/painel" });
      }}
    >
      <Button type="submit" className="w-full">
        Entrar com Google
      </Button>
    </form>
  );
}
