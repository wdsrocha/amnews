import { auth, EnrichedSession } from "@/auth";
import { google } from "googleapis";

async function getSheets() {
  const session = (await auth()) as EnrichedSession;

  if (!session) {
    throw new Error("Unauthorized");
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.AUTH_GOOGLE_ID,
    process.env.AUTH_GOOGLE_SECRET
  );

  oauth2Client.setCredentials({
    access_token: session.accessToken,
    refresh_token: session.refreshToken,
  });

  return google.sheets({ version: "v4", auth: oauth2Client });
}

function toStage(rawStage: string): Stage {
  rawStage = rawStage.toLocaleLowerCase();
  if (rawStage === "primeira fase" || rawStage === "oitavas de final") {
    return Stage.EightFinals;
  } else if (rawStage === "segunda fase" || rawStage === "quartas de final") {
    return Stage.QuarterFinals;
  } else if (
    rawStage === "semifinal" ||
    rawStage === "semi final" ||
    rawStage === "semifinais"
  ) {
    return Stage.SemiFinals;
  } else if (rawStage === "final") {
    return Stage.Finals;
  } else {
    return Stage.Unknown;
  }
}

export enum Stage {
  Unknown = "Desconhecido",
  EightFinals = "Oitavas de Final",
  QuarterFinals = "Quartas de Final",
  SemiFinals = "Semifinal",
  Finals = "Final",
}

export type Match = {
  date: string; // yyyy-mm-dd
  organization: string;
  stage: Stage;
  raw: string;
};

export async function getMatches(): Promise<Match[]> {
  const sheets = await getSheets();

  const spreadsheets = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    // Let's see how it performs without pagination
    range: "Batalhas!A2:D9999",
  });

  if (!spreadsheets.data.values) {
    return [];
  }

  const matches = spreadsheets.data.values.map((row: string[]): Match => {
    return {
      date: row[0],
      organization: row[1],
      stage: toStage(row[2]),
      raw: row[3],
    };
  });

  return matches;
}

export type Edition = {
  date: string; // yyyy-mm-dd
  organization: string;
  champion: string;
  runnerUp: string;
  editionNumber: string;
  title: string;
  mode: string;
  judges: string;
  instagramPost: string;
};

export async function getEditions(): Promise<Edition[]> {
  const sheets = await getSheets();

  const spreadsheets = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: "Edições!A2:Z9999",
  });

  if (!spreadsheets.data.values) {
    return [];
  }

  const editions = spreadsheets.data.values.map((row: string[]): Edition => {
    return {
      date: row[0],
      organization: row[1],
      champion: row[2],
      runnerUp: row[3],
      editionNumber: row[4],
      title: row[5],
      mode: row[6],
      judges: row[7],
      instagramPost: row[8],
    };
  });

  return editions;
}
