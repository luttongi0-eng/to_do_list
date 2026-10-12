'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { MemoForm } from '@/components/MemoForm';
import { MemoGallery } from '@/components/MemoGallery';
import { EditMemoModal } from '@/components/EditMemoModal';
import { Memo } from '@/types/memo';
import { getCurrentDateTimeFormatted } from '@/lib/dateUtils';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'crayon_memos_data';

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [memos, setMemos] = useState<Memo[]>([]);
  const [editingMemo, setEditingMemo] = useState<Memo | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  // 로컬스토리지 및 초기 데이터 로드
  useEffect(() => {
    const savedDark = localStorage.getItem('crayon_theme_dark');
    if (savedDark === 'true') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    // 서버/구글 시트로부터 데이터 로드 시도
    fetchMemos();
  }, []);

  const toggleDark = () => {
    setIsDark((prev) => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('crayon_theme_dark', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('crayon_theme_dark', 'false');
      }
      return next;
    });
  };

  const fetchMemos = async () => {
    // 로컬스토리지에 저장된 기존 메모 캐시 (dDay 보존용)
    const local = localStorage.getItem(STORAGE_KEY);
    let localMemosMap = new Map<string, string>();
    if (local) {
      try {
        const parsed: Memo[] = JSON.parse(local);
        parsed.forEach((m) => {
          if (m.dDay) {
            localMemosMap.set(m.datetime || m.timestamp || m.content, m.dDay);
          }
        });
      } catch {}
    }

    try {
      const res = await fetch('/api/memos');
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        // 시트 데이터에 dDay가 누락되었을 경우 로컬 캐시에서 복원
        const merged: Memo[] = json.data.map((m: Memo) => {
          if (!m.dDay) {
            const key = m.datetime || m.timestamp || m.content;
            const savedDDay = localMemosMap.get(key);
            if (savedDDay) {
              return { ...m, dDay: savedDDay };
            }
          }
          return m;
        });

        setMemos(merged);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
        return;
      }
    } catch (e) {
      console.warn('Google Sheets API unavailable, loading from LocalStorage');
    }

    // fallback to LocalStorage
    if (local) {
      try {
        setMemos(JSON.parse(local));
      } catch {}
    } else {
      // 초기 기본 예시 메모
      const initialMemos: Memo[] = [
        {
          id: 'sample_1',
          timestamp: getCurrentDateTimeFormatted(),
          datetime: getCurrentDateTimeFormatted(),
          category: '할 일',
          content: '1. 산책 30분 다녀오기 🐕\n2. 읽다 안 책 30페이지 읽기\n3. 작은 화분에 물 주기 🌱',
          color: 3, // 초록
          state: '',
          order: 0,
          dDay: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        },
        {
          id: 'sample_2',
          timestamp: getCurrentDateTimeFormatted(),
          datetime: getCurrentDateTimeFormatted(),
          category: '아이디어',
          content: '화려한 것보다 단순한 하루가 주는 따스함이 참 소중하다. 손글씨 엽서 세트 만들어보기! 💌',
          color: 4, // 파랑
          state: '',
          order: 1,
        },
        {
          id: 'sample_3',
          timestamp: getCurrentDateTimeFormatted(),
          datetime: getCurrentDateTimeFormatted(),
          category: '기타',
          content: '길을 걷다가 길냥이를 마주쳤다. 눈인사를 건넸더니 야옹 하고 화답해주었다. 별것 아닌 순간이 하루를 환하게 채웠다. 🐾',
          color: 2, // 분홍
          state: '',
          order: 2,
        },
      ];
      setMemos(initialMemos);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialMemos));
    }
  };

  // 메모 상태 로컬 저장 및 백그라운드 구글 시트 동기화
  const syncMemos = async (newMemos: Memo[]) => {
    setMemos(newMemos);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newMemos));

    setIsSyncing(true);
    try {
      await fetch('/api/memos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ memos: newMemos }),
      });
    } catch (e) {
      console.error('Sheet sync failed:', e);
    } finally {
      setIsSyncing(false);
    }
  };

  // 새 메모 추가
  const handleAddMemo = async (memoData: {
    category: '할 일' | '아이디어' | '기타';
    content: string;
    color: Memo['color'];
    dDay?: string;
  }) => {
    const now = getCurrentDateTimeFormatted();
    const newMemo: Memo = {
      id: "memo_" + Date.now(),
      timestamp: now,
      datetime: now,
      category: memoData.category,
      content: memoData.content,
      color: memoData.color,
      state: '',
      order: memos.length,
      dDay: memoData.dDay,
    };

    const updatedList = [newMemo, ...memos].map((m, idx) => ({ ...m, order: idx }));
    await syncMemos(updatedList);
  };

  // 메모 삭제 (즉시 제거)
  const handleDeleteMemo = async (id: string) => {
    const updatedList = memos.filter((m) => m.id !== id).map((m, idx) => ({ ...m, order: idx }));
    await syncMemos(updatedList);
  };

  // 완료 체크 토글
  const handleToggleComplete = async (id: string) => {
    const target = memos.find((m) => m.id === id);
    if (!target) return;

    const willBeCompleted = target.state !== '완료';

    if (willBeCompleted) {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
    }

    const updatedList = memos.map((m) =>
      m.id === id ? { ...m, state: (willBeCompleted ? '완료' : '') as Memo['state'] } : m
    );
    await syncMemos(updatedList);
  };

  // 메모 내용 수정 저장
  const handleSaveEdit = async (updated: { id: string; content: string; dDay?: string }) => {
    const updatedList = memos.map((m) =>
      m.id === updated.id
        ? {
            ...m,
            content: updated.content,
            dDay: updated.dDay,
          }
        : m
    );
    await syncMemos(updatedList);
  };

  return (
    <main className="min-h-screen px-4 py-8 md:px-8 max-w-7xl mx-auto flex flex-col justify-between">
      <div>
        <Header isDark={isDark} toggleDark={toggleDark} />

        {/* 구글 시트 동기화 인디케이터 */}
        {isSyncing && (
          <div className="fixed bottom-4 right-4 z-40 bg-stone-900/80 text-white text-xs px-3 py-1.5 rounded-full shadow-lg backdrop-blur flex items-center gap-1.5 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            구글 시트 동기화 중...
          </div>
        )}

        <MemoForm onAddMemo={handleAddMemo} memoCount={memos.length} />

        <MemoGallery
          memos={memos}
          onDelete={handleDeleteMemo}
          onEdit={(m) => setEditingMemo(m)}
          onToggleComplete={handleToggleComplete}
          onReorder={syncMemos}
        />

        <EditMemoModal
          memo={editingMemo}
          onClose={() => setEditingMemo(null)}
          onSave={handleSaveEdit}
        />
      </div>

      {/* 세련된 스케치북 감성 Footer */}
      <footer className="mt-16 pt-8 pb-4 border-t-2 border-dashed border-stone-300 dark:border-stone-700/80 flex items-center justify-center">
        <div className="text-xs sm:text-sm font-medium text-stone-600 dark:text-stone-300 tracking-wider">
          Copyright <span className="font-bold text-stone-800 dark:text-stone-100">INU To Do list</span> by <span className="font-semibold text-amber-600 dark:text-amber-400">huijin An</span>
        </div>
      </footer>
    </main>
  );
}
