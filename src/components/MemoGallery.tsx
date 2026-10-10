'use client';

import React, { useState, useEffect } from 'react';
import { Memo, Category } from '@/types/memo';
import { MemoCard } from './MemoCard';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Filter } from 'lucide-react';

interface MemoGalleryProps {
  memos: Memo[];
  onDelete: (id: string) => void;
  onEdit: (memo: Memo) => void;
  onToggleComplete: (id: string) => void;
  onReorder: (memos: Memo[]) => void;
}

export const MemoGallery: React.FC<MemoGalleryProps> = ({
  memos,
  onDelete,
  onEdit,
  onToggleComplete,
  onReorder,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('전체');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // 카테고리 필터링
  const filteredMemos = memos.filter((m) => {
    if (selectedCategory === '전체') return true;
    return m.category === selectedCategory;
  });

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.index === destination.index) return;

    // 전체 리스트 기준으로 순서 재정렬
    const items = Array.from(memos);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    // order 필드 업데이트
    const updated = items.map((item, idx) => ({
      ...item,
      order: idx,
    }));

    onReorder(updated);
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-8">
      {/* 갤러리 헤더: 포스트잇 갤러리 제목 및 필터 옵션 */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b-2 border-stone-300 dark:border-stone-700">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-stone-800 dark:text-stone-100 flex items-center gap-2 handwriting">
            <span>🖼️ 포스트잇 갤러리</span>
          </h2>
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            도화지 위에 자유자재로 모인 크레파스 메모들 (드래그하여 순서를 바꿀 수 있습니다)
          </p>
        </div>

        {/* 필터 탭 & 드롭다운 */}
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <div className="flex items-center gap-1 bg-white dark:bg-stone-800 p-1 rounded-xl border border-stone-300 dark:border-stone-600 shadow-sm">
            <Filter className="w-3.5 h-3.5 text-stone-400 ml-1.5" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as Category)}
              className="bg-transparent text-sm font-medium text-stone-700 dark:text-stone-200 focus:outline-none pr-2 py-1 cursor-pointer"
            >
              <option value="전체">전체 보기</option>
              <option value="할 일">할 일</option>
              <option value="아이디어">아이디어</option>
              <option value="기타">기타</option>
            </select>
          </div>

          {/* 카테고리 칩 탭 바로가기 */}
          <div className="hidden md:flex gap-1">
            {(['전체', '할 일', '아이디어', '기타'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900 border-stone-900 dark:border-stone-100'
                    : 'bg-white/60 dark:bg-stone-800/60 text-stone-600 dark:text-stone-300 border-stone-300 dark:border-stone-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 포스트잇 4열 그리드 (모바일 1열, 태블릿 2열, 데스크톱 4열) */}
      {!isMounted ? null : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="memos-grid" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-6"
              >
                {filteredMemos.length === 0 ? (
                  <div className="col-span-full py-16 text-center text-stone-400 dark:text-stone-500 handwriting text-2xl">
                    아직 기록된 메모가 없습니다. 위 입력창에서 첫 번째 생각을 붙여보세요! ✨
                  </div>
                ) : (
                  filteredMemos.map((memo, index) => (
                    <Draggable key={memo.id} draggableId={memo.id} index={index}>
                      {(dragProvided) => (
                        <div
                          ref={dragProvided.innerRef}
                          {...dragProvided.draggableProps}
                          className="w-full"
                        >
                          <MemoCard
                            memo={memo}
                            onDelete={onDelete}
                            onEdit={onEdit}
                            onToggleComplete={onToggleComplete}
                            dragHandleProps={dragProvided.dragHandleProps}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}
    </div>
  );
};
