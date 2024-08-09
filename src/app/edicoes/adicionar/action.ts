"use server";
import { Edition, getEditions, getSheets } from "@/lib/api";
import { slugify } from "@/lib/utils";

export async function createEdition(edition: Edition): Promise<boolean> {
  const sheets = await getSheets();

  if (!sheets) {
    return false;
  }

  const editions = await getEditions();

  const organizationSlug = slugify(edition.organization);
  const date = edition.date;
  const rowIndex = editions.findIndex((x) => {
    return slugify(x.organization) === organizationSlug && x.date === date;
  });

  // if the edition already exists, return false
  if (rowIndex !== -1) {
    console.log(
      `Edition at ${edition.organization} on ${edition.date} already exists on row ${rowIndex}`
    );
    return false;
  }

  console.log("Creating edition");
  console.log({ edition });

  sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "Edições!A1:Z9999",
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          edition.date,
          edition.organization,
          edition.champion,
          edition.runnerUp,
          edition.editionNumber,
          edition.title,
          edition.mode,
          edition.judges,
          edition.instagramPost,
        ],
      ],
    },
  });

  console.log("Edition created");

  return true;
}
