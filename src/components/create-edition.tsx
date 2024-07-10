"use client";

import { Edition } from "@/app/api/fetch-editions/route";
import { useState } from "react";

export const CreateEdition = () => {
  const createEdition = async () => {
    const response = await fetch("/api/create-edition", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: "02/12 (seg.)",
        organization: "Batalha da Malta",
      }),
    });
  };

  return (
    <>
      <button onClick={createEdition}>Adicionar Edição</button>
    </>
  );
};
