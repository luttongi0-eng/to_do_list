'use client';

import React, { useState } from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import { MemoColor } from '@/types/memo';

interface MemoFormProps {
  onAddMemo: (memo: {
    category: '할 일' | '아이디어' | '기타';
    content: string;
    color: MemoColor;
    dDay?: string;
  }) => void;
  memoCount: number;
}

export const MemoForm: React.FC<MemoFormProps> = ({ onAddMemo, memoCount }) => {
  const [category, setCategory] = useState<'할 일' | '아이디어' | '기타'>('할 일');
  const [content, setContent] = useState('');
  const [dDay, setDDay] = useState('');

  // 1: 노랑, 2: 분홍, 3: 초록, 4: 파랑 랜덤 선택
  const getRandomColor = (): MemoColor => {
    return (Math.floor(Math.random() * 4) + 1) as MemoColor;
  };

  const handleQuickDDay = (days: number) => {
    const target = new Date();
    target.setDate(target.getDate() + days);
    const yyyy = target.getFullYear();
    const mm = String(target.getMonth() + 1).padStart(2, '0');
    const dd = String(target.getDate()).padStart(2, '0');
    setDDay(`${yyyy}-${mm}-${dd}`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    onAddMemo({
      category,
      content: content.trim(),
      color: getRandomColor(),
      dDay: category === '할 일' && dDay ? dDay : undefined,
    });

    setContent('');
    setDDay('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto my-6 relative">
      {/* 스케치북 상단 와이어 스프링 바인더 바 */}
      <div className="absolute -top-3.5 left-6 right-6 flex justify-between px-3 pointer-events-none z-20">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* 스프링 링 코일 */}
            <div className="w-2.5 h-5 rounded-full bg-gradient-to-r from-stone-400 via-stone-100 to-stone-400 dark:from-stone-600 dark:via-stone-200 dark:to-stone-600 border border-stone-500/80 shadow-xs" />
            {/* 타공 홀 */}
            <div className="w-1.5 h-1.5 -mt-1 rounded-full bg-stone-700/80 dark:bg-black/90" />
          </div>
        ))}
      </div>

      <div className="bg-white/95 dark:bg-stone-900/90 border-2 border-stone-800 dark:border-stone-500 rounded-2xl pt-6 p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,0.85)] dark:shadow-[5px_5px_0px_0px_rgba(255,255,255,0.2)]">
        {/* 상단: 카테고리 선택 헤더 */}
      <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-700">
        <div className="flex items-center gap-2">
          <span className="text-amber-600 dark:text-amber-400 font-bold text-lg">📌 카테고리 선택</span>
        </div>
        <span className="text-xs text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded border border-stone-300 dark:border-stone-600">
          총 {memoCount}개
        </span>
      </div>

      {/* 카테고리 칩 버튼 */}
      <div className="flex gap-2.5 my-3">
        {(['할 일', '아이디어', '기타'] as const).map((cat) => {
          const isSelected = category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-normal border-2 transition-all ${
                isSelected
                  ? 'border-stone-900 dark:border-stone-100 bg-amber-100 dark:bg-amber-950 text-stone-900 dark:text-amber-200 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.8)]'
                  : 'border-stone-300 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  cat === '할 일'
                    ? 'bg-emerald-500'
                    : cat === '아이디어'
                    ? 'bg-sky-500'
                    : 'bg-rose-500'
                }`}
              />
              {cat}
            </button>
          );
        })}
      </div>

      {/* 할 일 카테고리일 때만 노출되는 D-Day 마감일 설정 상자 */}
      {category === '할 일' && (
        <div className="my-3 p-3 bg-emerald-50/70 dark:bg-emerald-950/30 border-2 border-dashed border-emerald-400 dark:border-emerald-600 rounded-xl flex flex-wrap items-center justify-between gap-2 animate-fadeIn">
          <div className="flex items-center gap-1.5 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
            <Calendar className="w-4 h-4" />
            <span>D-Day 마감일 설정 (선택사항)</span>
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              type="button"
              onClick={() => handleQuickDDay(0)}
              className={`text-xs px-2 py-1 rounded border ${
                dDay ? 'border-emerald-300 dark:border-emerald-700 bg-white dark:bg-stone-800' : 'bg-emerald-200 dark:bg-emerald-800'
              } text-emerald-900 dark:text-emerald-100 hover:bg-emerald-200`}
            >
              오늘까지 (D-Day)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDDay(1)}
              className="text-xs px-2 py-1 rounded border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-stone-800 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-200"
            >
              내일까지 (D-1)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDDay(3)}
              className="text-xs px-2 py-1 rounded border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-stone-800 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-200"
            >
              D-3
            </button>
            <button
              type="button"
              onClick={() => handleQuickDDay(7)}
              className="text-xs px-2 py-1 rounded border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-stone-800 text-emerald-900 dark:text-emerald-100 hover:bg-emerald-200"
            >
              D-7
            </button>
            <input
              type="date"
              value={dDay}
              onChange={(e) => setDDay(e.target.value)}
              className="text-xs px-2 py-1 rounded border border-emerald-400 dark:border-emerald-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* 텍스트 입력창 */}
      <div className="relative mt-2">
        <textarea
          rows={4}
          value={content}
          maxLength={300}
          onChange={(e) => setContent(e.target.value)}
          placeholder="소소한 생각이나 기억하고 싶은 순간을 자유롭게 적어보세요... (기록 시 감성 도화지 색상이 랜덤으로 칠해집니다 ✏️)"
          className="w-full p-4 text-base md:text-lg bg-stone-50 dark:bg-stone-800/80 border-2 border-stone-300 dark:border-stone-600 rounded-xl text-stone-800 dark:text-stone-100 placeholder-stone-400 focus:outline-none focus:border-stone-800 dark:focus:border-stone-300 resize-none handwriting"
        />
        <div className="text-right text-xs text-stone-400 mt-1">
          {content.length} / 300자
        </div>
      </div>

        <button
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="w-full mt-3 py-3 px-4 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 rounded-xl font-bold text-lg md:text-xl flex items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.7)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.4)] hover:translate-x-0.5 hover:translate-y-0.5 active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed handwriting tracking-wider"
        >
          <Sparkles className="w-5 h-5 text-amber-400 dark:text-amber-600" />
          스케치북에 기록하기
        </button>
      </div>
    </div>
  );
};
