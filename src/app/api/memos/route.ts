import { NextResponse } from 'next/server';
import { getMemosFromSheet, appendMemoToSheet, updateAllMemosToSheet } from '@/lib/googleSheets';
import { Memo } from '@/types/memo';
import { getCurrentDateTimeFormatted } from '@/lib/dateUtils';

// GET: 메모 목록 조회
export async function GET() {
  try {
    const memos = await getMemosFromSheet();
    return NextResponse.json({ success: true, data: memos });
  } catch (error: any) {
    console.error('Failed to get memos:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// POST: 신규 메모 생성
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const now = getCurrentDateTimeFormatted();

    const newMemoData = {
      timestamp: now,
      datetime: body.datetime || now,
      category: body.category || '기타',
      content: body.content || '',
      color: body.color || 1,
      state: body.state || '',
      order: body.order ?? 0,
      dDay: body.dDay,
    };

    const isConnected = await appendMemoToSheet(newMemoData);
    return NextResponse.json({
      success: true,
      connectedToSheet: isConnected,
      data: {
        id: `memo_${Date.now()}`,
        ...newMemoData,
      },
    });
  } catch (error: any) {
    console.error('Failed to create memo:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// PUT: 전체 동기화 / 순서변경 / 편집
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { memos } = body;

    if (!Array.isArray(memos)) {
      return NextResponse.json({ success: false, error: 'memos must be an array' }, { status: 400 });
    }

    const isConnected = await updateAllMemosToSheet(memos);
    return NextResponse.json({
      success: true,
      connectedToSheet: isConnected,
      data: memos,
    });
  } catch (error: any) {
    console.error('Failed to sync memos:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
