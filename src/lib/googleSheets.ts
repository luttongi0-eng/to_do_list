import { google } from 'googleapis';
import { Memo } from '@/types/memo';

const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const CLIENT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const APPS_SCRIPT_URL = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL || process.env.GOOGLE_APPS_SCRIPT_URL;
const PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n') : undefined;

function getAuth() {
  if (!SPREADSHEET_ID || !CLIENT_EMAIL || !PRIVATE_KEY) {
    return null;
  }
  return new google.auth.JWT({
    email: CLIENT_EMAIL,
    key: PRIVATE_KEY,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

export async function getMemosFromSheet(): Promise<Memo[]> {
  if (APPS_SCRIPT_URL) {
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'GET',
        cache: 'no-store',
        redirect: 'follow',
      });
      const json = await res.json();
      if (json.status === 'success' && Array.isArray(json.data)) {
        return json.data.map((row: any, idx: number) => ({
          id: row.timestamp ? String(row.timestamp) + '_' + idx : 'memo_' + idx + '_' + Date.now(),
          timestamp: String(row.timestamp || ''),
          datetime: String(row.datetime || ''),
          category: (row.category || '기타') as Memo['category'],
          content: String(row.content || ''),
          color: (Number(row.color) || 1) as Memo['color'],
          state: (row.state === '완료' || row.state === '체크' ? '완료' : '') as Memo['state'],
          order: Number(row.order) !== undefined && !isNaN(Number(row.order)) ? Number(row.order) : idx,
        }));
      }
    } catch (err) {
      console.error('GAS getMemos error:', err);
    }
  }

  const auth = getAuth();
  if (!auth || !SPREADSHEET_ID) {
    return [];
  }

  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Sheet1!A2:G',
  });

  const rows = response.data.values || [];
  return rows.map((row, idx) => {
    return {
      id: row[0] ? String(row[0]) + '_' + idx : 'memo_' + idx + '_' + Date.now(),
      timestamp: row[0] || '',
      datetime: row[1] || '',
      category: (row[2] || '기타') as Memo['category'],
      content: row[3] || '',
      color: (Number(row[4]) || 1) as Memo['color'],
      state: (row[5] === '완료' || row[5] === '체크' ? '완료' : '') as Memo['state'],
      order: Number(row[6]) || idx,
    };
  });
}

export async function appendMemoToSheet(memo: Omit<Memo, 'id'>) {
  if (APPS_SCRIPT_URL) {
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'create', data: memo }),
        redirect: 'follow',
      });
      const json = await res.json();
      if (json.status === 'success') return true;
    } catch (err) {
      console.error('GAS append error:', err);
    }
  }

  const auth = getAuth();
  if (!auth || !SPREADSHEET_ID) return false;

  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Sheet1!A2:G',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [
        [
          memo.timestamp,
          memo.datetime,
          memo.category,
          memo.content,
          memo.color,
          memo.state,
          memo.order,
        ],
      ],
    },
  });
  return true;
}

export async function updateAllMemosToSheet(memos: Memo[]) {
  if (APPS_SCRIPT_URL) {
    try {
      const res = await fetch(APPS_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'syncAll', memos }),
        redirect: 'follow',
      });
      const json = await res.json();
      if (json.status === 'success') return true;
    } catch (err) {
      console.error('GAS updateAll error:', err);
    }
  }

  const auth = getAuth();
  if (!auth || !SPREADSHEET_ID) return false;

  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.clear({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Sheet1!A2:G',
  });

  if (memos.length === 0) return true;

  const values = memos.map((m) => [
    m.timestamp,
    m.datetime,
    m.category,
    m.content,
    m.color,
    m.state,
    m.order,
  ]);

  await sheets.spreadsheets.values.update({
    spreadsheetId: SPREADSHEET_ID,
    range: 'Sheet1!A2:G',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values },
  });

  return true;
}
