'use client';

import React, { useState } from 'react';
import { Memo } from '@/types/memo';
import { Calendar, X } from 'lucide-react';

interface EditMemoModalProps {
  memo: Memo | null;
  onClose: () => void;
  onSave: (updated: { id: string; content: string; dDay?: string }) => void;
}

export const EditMemoModal: React.FC<EditMemoModalProps> = ({ memo, onClose, onSave }) => {
  if (!memo) return null;

  const [content, setContent] = useState(memo.content);
  const [dDay, setDDay] = useState(memo.dDay || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSave({
      id: memo.id,
      content: content.trim(),
      dDay: memo.category === '할 일' ? dDay : undefined,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white dark:bg-stone-900 border-2 border-stone-800 dark:border-stone-500 rounded-2xl p-6 shadow-2xl animate-stick">
        <div className="flex items-center justify-between pb-3 border-b border-stone-200 dark:border-stone-700">
          <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100 handwriting">
            📝 메모 수정하기
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {memo.category === '할 일' && (
            <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-300">
              <Calendar className="w-4 h-4 text-emerald-500" />
              <span>D-Day 마감일:</span>
              <input
                type="date"
                value={dDay}
                onChange={(e) => setDDay(e.target.value)}
                className="px-2 py-1 border rounded text-xs bg-stone-50 dark:bg-stone-800 border-stone-300 dark:border-stone-600"
              />
            </div>
          )}

          <div>
            <textarea
              rows={5}
              value={content}
              maxLength={300}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 text-lg bg-stone-50 dark:bg-stone-800 border-2 border-stone-300 dark:border-stone-600 rounded-xl text-stone-800 dark:text-stone-100 focus:outline-none handwriting"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-xl text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 rounded-xl font-bold handwriting"
            >
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
