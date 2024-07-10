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
    range: "Edições!A1:D5",
  });

  console.log(spreadsheets.data.values);

  return spreadsheets.data.values;
}
