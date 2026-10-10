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
      className={`relative group p-5 rounded-lg border-2 ${colorStyle.bg} ${colorStyle.border} ${colorStyle.darkBg} ${rotation} shadow-[3px_4px_6px_rgba(0,0,0,0.08)] dark:shadow-[3px_4px_6px_rgba(0,0,0,0.5)] transition-all hover:shadow-[5px_6px_10px_rgba(0,0,0,0.15)] hover:z-20 animate-stick flex flex-col justify-between min-h-[220px] select-none`}
    >
      {/* 상단 반투명 마스킹 테이프 장식 */}
      <div className="washi-tape" />

      {/* 카드 상단: 드래그 핸들, 카테고리 태그, D-Day 배지, 작업 버튼들 */}
      <div>
        <div className="flex items-center justify-between gap-1 pb-2 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* 드래그 핸들 */}
            <div
              {...dragHandleProps}
              className="cursor-grab active:cursor-grabbing p-0.5 text-stone-500 hover:text-stone-800 dark:text-stone-400"
              title="드래그하여 순서 변경"
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
