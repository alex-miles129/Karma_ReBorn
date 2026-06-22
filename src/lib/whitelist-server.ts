import { google } from 'googleapis';
import {
  GOOGLE_WHITELIST_SHEET_ID,
  GOOGLE_PRIVATE_KEY,
  GOOGLE_SERVICE_ACCOUNT_EMAIL
} from "@/config/googleConfig";

export async function getWhitelistCooldown(discordId: string): Promise<number> {
  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_WHITELIST_SHEET_ID,
      range: 'Sheet1!A:T',
    });

    const rows = response.data.values || [];
    if (rows.length <= 1) return 0;

    // Filter rows by discordId (column C is index 2)
    const userRows = rows.slice(1).filter(row => row[2] === discordId);
    if (userRows.length === 0) return 0;

    // Get the latest attempt
    const latestRow = userRows[userRows.length - 1];
    const timestamp = latestRow[0];
    const status = latestRow[17] || 'pending'; // column R is index 17

    if (status === 'failed') {
      const attemptTime = new Date(timestamp).getTime();
      const now = Date.now();
      const cooldownMs = 1.5 * 60 * 60 * 1000; // 1.5 hours
      const elapsed = now - attemptTime;
      if (elapsed < cooldownMs) {
        return cooldownMs - elapsed; // returns remaining milliseconds
      }
    }
  } catch (error) {
    console.error('Error checking whitelist cooldown:', error);
  }
  return 0;
}
