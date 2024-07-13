"use server";
import { Edition, getEdition, getEditions, getSheets } from "@/lib/api";
import { slugify } from "@/lib/utils";

export async function updateEdition(edition: Edition): Promise<boolean> {
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

  if (rowIndex === -1) {
    return false;
  }

  // The first row is the header so we add +1
  // The rowIndex is 0-based so we add +1
  const range = `Edições!A${rowIndex + 2}:Z${rowIndex + 2}`;

  // console.log("rowIndex", rowIndex);
  // console.log("orgSlug", organizationSlug);
  // console.log("data", date);

  sheets.spreadsheets.values.update({
    spreadsheetId: process.env.SHEET_ID,
    range,
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

  // sheets.spreadsheets.values.append({
  //   spreadsheetId: process.env.SHEET_ID,
  //   range: "Edições!A1:Z9999",
  //   valueInputOption: "RAW",
  //   requestBody: {
  //     values: [[edition.date, edition.organization]],
  //   },
  // });

  return true;
}
