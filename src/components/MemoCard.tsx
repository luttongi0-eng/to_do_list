'use client';

import React, { useState } from 'react';
import { Memo, MemoColor } from '@/types/memo';
import { formatKoreanDate, calculateDDay } from '@/lib/dateUtils';
import { Trash2, Edit3, CheckCircle, Circle, GripVertical } from 'lucide-react';

interface MemoCardProps {
  memo: Memo;
  onDelete: (id: string) => void;
  onEdit: (memo: Memo) => void;
  onToggleComplete: (id: string) => void;
  dragHandleProps?: any;
}

// 1: 노랑, 2: 분홍, 3: 초록, 4: 파랑
const COLOR_STYLES: Record<MemoColor, { bg: string; border: string; darkBg: string }> = {
  1: {
    bg: 'bg-amber-100/90',
    border: 'border-amber-300',
    darkBg: 'dark:bg-amber-900/60 dark:border-amber-700',
  },
  2: {
    bg: 'bg-pink-100/90',
    border: 'border-pink-300',
    darkBg: 'dark:bg-pink-900/60 dark:border-pink-700',
  },
  3: {
    bg: 'bg-emerald-100/90',
    border: 'border-emerald-300',
    darkBg: 'dark:bg-emerald-900/60 dark:border-emerald-700',
  },
  4: {
    bg: 'bg-sky-100/90',
    border: 'border-sky-300',
    darkBg: 'dark:bg-sky-900/60 dark:border-sky-700',
  },
};

// 미세한 랜덤 회전 각도 부여
const ROTATIONS = ['-rotate-1', 'rotate-1', '-rotate-0.5', 'rotate-0.5', 'rotate-0'];

export const MemoCard: React.FC<MemoCardProps> = ({
  memo,
  onDelete,
  onEdit,
  onToggleComplete,
  dragHandleProps,
}) => {
  const [rotation] = useState(() => ROTATIONS[Math.floor(Math.random() * ROTATIONS.length)]);
  const colorStyle = COLOR_STYLES[memo.color] || COLOR_STYLES[1];
  const dDayInfo = memo.category === '할 일' ? calculateDDay(memo.dDay) : null;
  const isCompleted = memo.state === '완료';

  return (
    <div
      className={`relative group p-5 pt-7 rounded-xl border-2 ${colorStyle.bg} ${colorStyle.border} ${colorStyle.darkBg} ${rotation} shadow-[3px_5px_10px_rgba(0,0,0,0.08)] dark:shadow-[3px_5px_10px_rgba(0,0,0,0.5)] transition-transform duration-200 ease-out hover:scale-[1.04] hover:shadow-[8px_14px_24px_rgba(0,0,0,0.18)] hover:z-30 hover:rotate-0 flex flex-col justify-between min-h-[220px] select-none`}
    >
      {/* 스케치북 상단 와이어 링 스프링 디자인 */}
      <div className="absolute -top-3.5 left-0 right-0 flex justify-evenly px-4 pointer-events-none z-20">
        {Array.from({ length: 11 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* 스프링 코일 (은색 메탈 입체 광택) */}
            <div className="w-2.5 h-4.5 rounded-full bg-gradient-to-r from-stone-400 via-stone-100 to-stone-400 dark:from-stone-600 dark:via-stone-200 dark:to-stone-600 border border-stone-500/60 shadow-xs" />
            {/* 스케치북 종이 펀칭 구멍 */}
            <div className="w-1.5 h-1.5 -mt-1 rounded-full bg-stone-700/70 dark:bg-black/80" />
          </div>
        ))}
      </div>

      {/* 카드 상단: 드래그 핸들, 카테고리 태그, D-Day 배지, 작업 버튼들 */}
      <div>
        <div className="flex items-center justify-between gap-1 pb-2 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* 드래그 핸들 */}
            <div
              {...dragHandleProps}
              className="cursor-grab active:cursor-grabbing p-1 rounded-md bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 text-stone-600 hover:text-stone-900 dark:text-stone-300 transition-colors"
              title="잡아서 드래그하여 순서 변경"
            >
              <GripVertical className="w-4 h-4" />
            </div>

            {/* 카테고리 닷 & 이름 */}
            <div className="flex items-center gap-1 text-xs font-normal text-stone-700 dark:text-stone-200">
              <span
                className={`w-2 h-2 rounded-full ${
                  memo.category === '할 일'
                    ? 'bg-emerald-500'
                    : memo.category === '아이디어'
                    ? 'bg-sky-500'
                    : 'bg-rose-500'
                }`}
              />
              <span>{memo.category}</span>
            </div>

            {/* 할 일 카테고리 D-Day */}
            {dDayInfo && (
              <span
                className={`text-[11px] font-normal px-1.5 py-0.5 rounded-full border ${
                  dDayInfo.isPast
                    ? 'bg-rose-200 text-rose-800 border-rose-300'
                    : 'bg-amber-200 text-amber-900 border-amber-300'
                }`}
              >
                {dDayInfo.text}
              </span>
            )}
          </div>

          {/* 우측 상단: 체크 완료, 편집, 삭제 액션 버튼 */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onToggleComplete(memo.id)}
              className="p-1 text-stone-600 dark:text-stone-300 hover:text-emerald-600 transition-colors"
              title={isCompleted ? "미완료로 변경" : "완료 체크"}
            >
              {isCompleted ? (
                <CheckCircle className="w-4 h-4 text-emerald-600 fill-emerald-100 dark:fill-emerald-900" />
              ) : (
                <Circle className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => onEdit(memo)}
              className="p-1 text-stone-600 dark:text-stone-300 hover:text-blue-600 transition-colors"
              title="수정하기"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onDelete(memo.id)}
              className="p-1 text-stone-600 dark:text-stone-300 hover:text-rose-600 transition-colors"
              title="삭제하기"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 메모 내용 (일반 normal 굵기 & 완료선) */}
        <div
          className={`py-3 text-lg md:text-xl font-normal text-stone-800 dark:text-stone-100 whitespace-pre-wrap leading-relaxed ${
            isCompleted ? 'line-through opacity-60' : ''
          }`}
        >
          {memo.content}
        </div>
      </div>

      {/* 카드 왼쪽 하단: 연월일 시간 요일 흐릿하게 표시 */}
      <div className="pt-2 mt-auto border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs text-stone-400 dark:text-stone-500">
        <span>{formatKoreanDate(memo.datetime || memo.timestamp)}</span>
        {isCompleted && (
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">완료됨</span>
        )}
      </div>
    </div>
  );
};
