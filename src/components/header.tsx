import { auth } from "@/auth";
import { ModeToggle } from "./mode-toggle";
import { Nav } from "./nav";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import { SignOut } from "./sign-out";

export const Header = async () => {
  const session = await auth();

  if (!session?.user) {
    return null;
  }

  return (
    <header className="sticky top-0 flex h-16 justify-between items-center gap-4 border-b bg-background px-4 md:px-6">
      <Nav />
      <div className="flex items-center gap-4 md:gap-2 lg:gap-4">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <Image
                src={session.user.image!}
                alt={session.user.name!}
                width={20}
                height={20}
                className="w-full h-full rounded-full"
              />
              <span className="sr-only">Abrir menu de usuário</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <SignOut />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
