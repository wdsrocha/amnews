"use server";
import { Edition, getSheets } from "@/lib/api";

export async function createEdition(
  edition: Partial<Edition>
): Promise<boolean> {
  const sheets = await getSheets();

  if (!sheets) {
    return false;
  }

  sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "Edições!A1:Z9999",
    valueInputOption: "RAW",
    requestBody: {
      values: [[edition.date, edition.organization]],
    },
  });

  return true;
}
