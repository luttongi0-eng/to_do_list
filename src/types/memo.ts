export type Category = '전체' | '할 일' | '아이디어' | '기타';

export type MemoColor = 1 | 2 | 3 | 4; // 1: 노랑, 2: 분홍, 3: 초록, 4: 파랑

export interface Memo {
  id: string; // 고유 ID
  timestamp: string; // A열: 시트기록날짜및시간 (YYYY-MM-DD HH:mm:ss)
  datetime: string; // B열: 메모생성날짜및시간 (YYYY-MM-DD HH:mm:ss)
  category: '할 일' | '아이디어' | '기타'; // C열: 메모범주
  content: string; // D열: 메모내용
  color: MemoColor; // E열: 메모색상 (1: 노랑, 2: 분홍, 3: 초록, 4: 파랑)
  state: '완료' | ''; // F열: 상태 (완료 또는 빈값)
  order: number; // G열: 순서
  dDay?: string; // H열: d-day 목표일 (YYYY-MM-DD)
}

export interface GoogleSheetRow {
  timestamp: string;
  datetime: string;
  category: string;
  content: string;
  color: number | string;
  state: string;
  order: number | string;
  'd-day'?: string;
}
