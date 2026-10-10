'use client';

import React from 'react';
import { Sun, Moon } from 'lucide-react';

interface HeaderProps {
  isDark: boolean;
  toggleDark: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isDark, toggleDark }) => {
  return (
    <header className="relative flex items-center justify-center my-6 px-4">
      {/* 타이틀 테이프 장식 */}
      <div className="relative border-2 border-stone-800 dark:border-stone-500 bg-white/80 dark:bg-stone-800/80 px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,0.8)] dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]">
        <div className="absolute -top-3 sm:-top-3.5 left-1/2 -translate-x-1/2 w-16 sm:w-20 h-4 sm:h-5 bg-amber-200/70 dark:bg-amber-400/40 border-dashed border-x border-stone-400/50"></div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-stone-800 dark:text-stone-100 handwriting">
          나의 크레파스 메모장
        </h1>
      </div>

      {/* 다크/라이트 모드 스위치 */}
      <button
        onClick={toggleDark}
        className="absolute right-0 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 rounded-full border border-stone-700 dark:border-stone-400 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-200 shadow-sm hover:scale-105 transition-transform"
        title={isDark ? "라이트 모드로 전환" : "다크 모드로 전환"}
        aria-label="테마 전환"
      >
        {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-stone-700" />}
      </button>
    </header>
  );
};
