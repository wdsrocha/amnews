"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";

export const FloatingActionButton = () => {
  return (
    <Button
      size="icon"
      className="fixed z-10 bottom-4 right-4 h-14 w-14 rounded-full shadow-2xl"
      onClick={() => console.log("click")}
    >
      <PlusIcon className="h-5 w-5" />
    </Button>
  );
};
