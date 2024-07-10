import { auth, EnrichedSession } from "@/auth";
import { google } from "googleapis";

export async function GET(request: Request) {
  const session = (await auth()) as EnrichedSession;

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  const clientId = process.env.AUTH_GOOGLE_ID;
  const clientSecret = process.env.AUTH_GOOGLE_SECRET;
  const accessToken = session.accessToken;
  const refreshToken = session.refreshToken;

  const oauth2Client = new google.auth.OAuth2(clientId, clientSecret);

  oauth2Client.setCredentials({
    access_token: accessToken,
    refresh_token: refreshToken,
  });

  const sheets = google.sheets({ version: "v4", auth: oauth2Client });

  const spreadsheets = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.SHEET_ID,
    range: "Edições!A2:Z10000",
  });

  if (!spreadsheets.data.values) {
    return new Response("No data found.", { status: 404 });
  }

  const editions = spreadsheets.data.values.map((row: string[]): Edition => {
    return {
      date: row[0],
      organization: row[1],
      champion: row[2],
      runnerUp: row[3],
      editionNumber: Number(row[4]),
      title: row[5],
      mode: row[6],
      judges: row[7],
      instagramFlyerPost: row[8],
    };
  });

  return Response.json({ editions });
}

export type Edition = {
  date: string;
  organization: string;
  champion: string;
  runnerUp: string;
  editionNumber: number;
  title: string;
  mode: string;
  judges: string;
  instagramFlyerPost: string;
};
