"use client";

import { useState } from "react";

type Match = {
  [key: string]: string;
};

export const Sheet = () => {
  const [matches, setMatches] = useState<Match[] | null>(null);
  const fetchMatchSheet = async () => {
    const response = await fetch("/api/fetch-sheet");
    const data = await response.json();
    console.log("Matches: ", data);
    setMatches(data);
  };

  return (
    <>
      <button onClick={fetchMatchSheet}>Fetch Match Sheet</button>
      {matches && (
        <ul className="space-y-4">
          {matches.map((match, index) => (
            <li key={index}>{JSON.stringify(match, null, 2)}</li>
          ))}
        </ul>
      )}
    </>
  );
};
