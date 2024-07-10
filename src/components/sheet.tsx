"use client";

import { Edition } from "@/app/api/fetch-editions/route";
import { useState } from "react";

export const Sheet = () => {
  const [editions, setEditions] = useState<Edition[] | null>(null);
  const fetchMatchSheet = async () => {
    const response = await fetch("/api/fetch-editions");
    const data = await response.json();
    console.log("Matches: ", data);
    setEditions(data.editions);
  };

  return (
    <>
      <button onClick={fetchMatchSheet}>Mostrar edições</button>
      {editions && (
        <ul className="space-y-4">
          {editions.map((match, index) => (
            <li key={index}>{JSON.stringify(match, null, 2)}</li>
          ))}
        </ul>
      )}
    </>
  );
};
