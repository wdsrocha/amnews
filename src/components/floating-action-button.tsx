"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

export const FloatingActionButton = () => {
  return (
    <Button
      asChild
      className="fixed z-10 bottom-3 md:bottom-5 md:right-8 right-3 h-14 w-14 rounded-full shadow-2xl"
      onClick={() => console.log("click")}
    >
      <Link href="/edicoes/novo">
        <PlusIcon className="h-5 w-5" />
      </Link>
    </Button>
  );
};
