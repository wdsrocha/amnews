"use client";
import { cn } from "@/lib/utils";
import { BarChart3, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Button } from "./ui/button";

const navItems = [
  { href: "/painel", label: "Painel" },
  { href: "/confrontos", label: "Confrontos" },
  { href: "/edicoes", label: "Edições" },
  // { href: "/organizacoes", label: "Organizações" },
  // { href: "/mcs", label: "MCs" },
];

export const Nav = () => {
  const pathname = usePathname();

  return (
    <>
      <nav className="hidden text-nowrap flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <BarChart3 size={24} className="text-foreground" />
        </Link>
        {navItems.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={cn(
              "transition-colors hover:text-foreground",
              pathname.startsWith(item.href)
                ? "text-foreground"
                : "text-muted-foreground"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">
            Main navigation
          </SheetDescription>
          <nav className="grid gap-6 text-lg font-medium">
            <SheetClose asChild>
              <Link
                href="/"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <BarChart3 className="h-6 w-6" />
              </Link>
            </SheetClose>

            {navItems.map((item, index) => (
              <SheetClose asChild key={index}>
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "hover:text-foreground",
                    pathname.startsWith(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {item.label}
                </Link>
              </SheetClose>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
};
