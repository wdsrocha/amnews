import { auth, EnrichedSession } from "@/auth";
import { google } from "googleapis";

export async function POST(request: Request) {
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

  const edition = await request.json();

  const alreadyExists = spreadsheets.data.values?.find((row) => {
    row[0] === edition.date && row[1] === edition.organization;
  });

  if (alreadyExists) {
    throw new Response("Essa edição já foi criada", { status: 400 });
  }

  sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "Edições!A1:Z10000",
    valueInputOption: "RAW",
    requestBody: {
      values: [[edition.date, edition.organization]],
    },
  });

  return new Response("Edição criada com sucesso", { status: 201 });
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
