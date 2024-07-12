"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "./ui/button";

export const FloatingActionButton = () => {
  return (
    <Button
      className="fixed z-10 bottom-3 right-3 h-14 w-14 rounded-full shadow-2xl"
      onClick={() => console.log("click")}
    >
      <PlusIcon className="h-5 w-5" />
    </Button>
  );
};
