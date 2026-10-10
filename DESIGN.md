<!DOCTYPE html>

<html lang="ko"><head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>나의 크레파스 메모장</title>
<!-- Google Web Fonts: Gaegu (손글씨 느낌) & Noto Sans KR -->
<link href="https://fonts.googleapis.com" rel="preconnect"/>
<link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect"/>
<link href="https://fonts.googleapis.com/css2?family=Gaegu:wght@400;700&amp;family=Noto+Sans+KR:wght@400;500;700&amp;display=swap" rel="stylesheet"/>
<!-- Material Symbols Outlined -->
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" rel="stylesheet"/>
<!-- Tailwind CSS CDN -->
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<!-- Tailwind Configuration -->
<script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            hand: ['Gaegu', 'cursive'],
            sans: ['Noto Sans KR', 'sans-serif'],
          },
          colors: {
            crayon: {
              red: '#FF6B6B',
              coral: '#FFA07A',
              yellow: '#FFE066',
              green: '#A9DFBF',
              mint: '#74C0FC',
              purple: '#D0BFFF',
              charcoal: '#343A40'
            },
            paper: {
              canvas: '#FAF7F0',
              card: '#FCFAF5',
              border: '#E8E2D2'
            }
          },
          boxShadow: {
            'm3-1': '0px 1px 3px 1px rgba(0, 0, 0, 0.08), 0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
            'm3-2': '0px 2px 6px 2px rgba(0, 0, 0, 0.10), 0px 1px 2px 0px rgba(0, 0, 0, 0.12)',
            'm3-3': '0px 4px 8px 3px rgba(0, 0, 0, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.14)',
            'crayon': '3px 3px 0px #343A40',
            'crayon-sm': '2px 2px 0px #343A40',
            'postit': '2px 4px 10px rgba(80, 70, 50, 0.12)'
          }
        }
      }
    }
  </script>
<!-- BEGIN: Custom CSS -->
<style data-purpose="textures-and-effects">
    /* 도화지 미세 텍스처 효과 */
    body {
      background-color: #F8F5EE;
      background-image: radial-gradient(#E8E2D4 0.75px, transparent 0.75px), radial-gradient(#E8E2D4 0.75px, #F8F5EE 0.75px);
      background-size: 30px 30px;
      background-position: 0 0, 15px 15px;
    }

    /* 크레파스 불규칙 테두리 스타일 */
    .crayon-border {
      border: 2px solid #4A4A4A;
      border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
    }

    .crayon-border-lg {
      border: 2.5px solid #3E3835;
      border-radius: 24px 8px 26px 9px/9px 25px 8px 24px;
    }

    /* 마스킹 테이프 디테일 */
    .masking-tape {
      background-color: rgba(255, 235, 175, 0.75);
      box-shadow: 0 1px 3px rgba(0,0,0,0.06);
      clip-path: polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%);
      backdrop-filter: blur(1px);
    }

    /* 사용자 정의 스크롤바 */
    textarea::-webkit-scrollbar {
      width: 6px;
    }
    textarea::-webkit-scrollbar-thumb {
      background: #D9D2C5;
      border-radius: 10px;
    }

    /* 날짜 선택 인풋 기본 캘린더 아이콘 스타일링 */
    input[type="date"]::-webkit-calendar-picker-indicator {
      cursor: pointer;
      opacity: 0.6;
    }
    input[type="date"]::-webkit-calendar-picker-indicator:hover {
      opacity: 1;
    }
  </style>
<!-- END: Custom CSS -->
</head>
<body class="text-stone-800 font-sans min-h-screen py-8 px-4 sm:px-6 flex justify-center selection:bg-amber-200">
<!-- BEGIN: AppContainer -->
<!-- 전체 폭 및 모바일/태블릿 규격 반응형 래퍼 (시안 비율 720px 지향) -->
<main class="w-full max-w-[720px] flex flex-col gap-6" data-purpose="app-main-layout">
<!-- BEGIN: TitleHeader -->
<!-- 와이어프레임 첫 번째 블록: Title (상단 타이틀 영역: 오직 '나의 크레파스 메모장'만 표시) -->
<header class="bg-white/90 backdrop-blur-sm crayon-border-lg p-5 sm:p-6 shadow-m3-1 text-center relative overflow-hidden transition-all duration-300 hover:shadow-m3-2" data-purpose="header-section">
<!-- 장식용 미니 마스킹 테이프 -->
<div class="masking-tape w-24 h-5 absolute -top-1 left-1/2 -translate-x-1/2 rotate-1"></div>
<div class="flex items-center justify-center pt-1">
<h1 class="text-2xl sm:text-3xl font-bold font-hand text-stone-800 tracking-wide">
          나의 크레파스 메모장
        </h1>
</div>
</header>
<!-- END: TitleHeader -->
<!-- BEGIN: InputCardSection -->
<!-- 와이어프레임 두 번째 블록: 카테고리 선택, D-Day 설정 & 메모 내용 (도화지 색상은 랜덤 자동 지정) -->
<section class="bg-white/95 crayon-border-lg p-5 sm:p-7 shadow-m3-2 flex flex-col gap-4 relative transition-all" data-purpose="memo-editor-section">
<!-- 1. 카테고리 선택 영역 ('할 일', '아이디어', '기타') -->
<div class="space-y-2.5" data-purpose="category-picker">
<div class="flex items-center justify-between">
<label class="text-xs font-bold text-stone-600 tracking-wider uppercase flex items-center gap-1.5">
<span class="material-symbols-outlined text-base text-amber-700">label</span>
            카테고리 선택
          </label>
<span class="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600" id="selectedCategoryLabel">할 일</span>
</div>
<!-- 카테고리 선택 버튼 그룹 -->
<div class="flex flex-wrap gap-2.5" id="categoryPickerContainer">
<button class="cat-input-btn active flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 border-stone-800 bg-amber-50 text-stone-800 text-xs font-bold shadow-sm transition-all scale-105" data-category="할 일" type="button">
<span class="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-stone-700"></span>
<span>할 일</span>
</button>
<button class="cat-input-btn flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 border-transparent bg-stone-100 text-stone-600 hover:border-stone-400 text-xs font-medium transition-all" data-category="아이디어" type="button">
<span class="w-2.5 h-2.5 rounded-full bg-sky-400 border border-stone-500"></span>
<span>아이디어</span>
</button>
<button class="cat-input-btn flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border-2 border-transparent bg-stone-100 text-stone-600 hover:border-stone-400 text-xs font-medium transition-all" data-category="기타" type="button">
<span class="w-2.5 h-2.5 rounded-full bg-stone-400 border border-stone-500"></span>
<span>기타</span>
</button>
</div>
</div>
<!-- D-Day 설정 컴포넌트: '할 일' 선택 시에만 활성화 (손그림 스티커 / 미니 테이프 감성) -->
<div class="transition-all duration-300 ease-in-out border-2 border-dashed border-emerald-300 bg-[#F4FBF7] rounded-xl p-3.5 space-y-2.5" data-purpose="dday-picker-component" id="dDaySection">
<div class="flex flex-wrap items-center justify-between gap-2">
<div class="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
<span class="text-base leading-none">🗓️</span>
<span>D-Day 마감일 설정</span>
<span class="text-[10px] text-emerald-600 font-normal">(선택사항)</span>
</div>
<!-- D-Day 뱃지 미리보기 -->
<div class="flex items-center gap-1.5">
<span class="hidden font-hand text-sm font-bold px-2.5 py-0.5 rounded-full border border-stone-800 bg-amber-100 text-stone-800 shadow-sm" id="dDayBadgePreview">D-Day 설정됨</span>
<button class="hidden text-[11px] text-stone-400 hover:text-rose-500 underline" id="clearDDayBtn" type="button">해제</button>
</div>
</div>
<!-- 프리셋 칩 & 직접 날짜 입력 -->
<div class="flex flex-wrap items-center gap-1.5 pt-0.5">
<button class="dday-preset-btn px-2.5 py-1 rounded-lg border border-stone-400 bg-white hover:bg-emerald-50 text-[11px] font-medium text-stone-700 transition-all hover:border-emerald-600 active:scale-95" data-days="0" type="button">
오늘까지 (D-Day)
</button>
<button class="dday-preset-btn px-2.5 py-1 rounded-lg border border-stone-400 bg-white hover:bg-emerald-50 text-[11px] font-medium text-stone-700 transition-all hover:border-emerald-600 active:scale-95" data-days="1" type="button">
내일까지 (D-1)
</button>
<button class="dday-preset-btn px-2.5 py-1 rounded-lg border border-stone-400 bg-white hover:bg-emerald-50 text-[11px] font-medium text-stone-700 transition-all hover:border-emerald-600 active:scale-95" data-days="3" type="button">
D-3
</button>
<button class="dday-preset-btn px-2.5 py-1 rounded-lg border border-stone-400 bg-white hover:bg-emerald-50 text-[11px] font-medium text-stone-700 transition-all hover:border-emerald-600 active:scale-95" data-days="7" type="button">
D-7
</button>
<!-- 날짜 직접 선택 인풋 -->
<div class="relative flex items-center ml-auto">
<label class="sr-only" for="customDatePicker">마감 날짜 선택</label>
<input class="text-[11px] font-sans py-1 px-2 border border-stone-400 rounded-lg bg-white text-stone-700 hover:border-emerald-600 focus:outline-none focus:border-stone-800 focus:ring-0 cursor-pointer shadow-sm" id="customDatePicker" title="직접 날짜 선택" type="date"/>
</div>
</div>
</div>
<!-- 글자 수 카운터 -->
<div class="flex items-center justify-end border-t border-dashed border-stone-200 pt-2 text-xs text-stone-500">
<div class="text-[11px] text-stone-400">
<span id="charCount">0</span> / 300자
        </div>
</div>
<!-- 2. 메모 내용 입력창 -->
<div class="relative" data-purpose="memo-textarea-container">
<textarea class="w-full p-4 rounded-xl border-2 border-stone-300 focus:border-stone-800 focus:ring-0 font-hand text-xl text-stone-800 leading-relaxed bg-[#FFFDF9] placeholder:text-stone-400 resize-none transition-all duration-200 shadow-inner" id="memoInput" maxlength="300" placeholder="소소한 생각이나 기억하고 싶은 순간을 자유롭게 적어보세요... (기록 시 감성 도화지 색상이 랜덤으로 칠해집니다 🖍️)" rows="5"></textarea>
</div>
<!-- 입력 에러 메시지 라벨 (숨김 처리 기본) -->
<p class="hidden text-xs text-rose-500 font-medium -mt-2 flex items-center gap-1" id="validationMessage">
<span class="material-symbols-outlined text-sm">info</span> 내용을 2자 이상 입력해주세요!
      </p>
</section>
<!-- END: InputCardSection -->
<!-- BEGIN: ActionButtonSection -->
<!-- 와이어프레임 세 번째 블록: 기록하기 -->
<section class="flex justify-center" data-purpose="submit-action-section">
<button class="w-full py-4 px-8 bg-stone-900 text-amber-50 hover:bg-stone-800 font-hand text-2xl tracking-wide rounded-2xl border-2 border-stone-900 shadow-crayon hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm transition-all duration-150 flex items-center justify-center gap-2 group" id="saveMemoBtn" type="button">
<span class="material-symbols-outlined text-2xl text-amber-300 group-hover:rotate-12 transition-transform">edit_note</span>
<span>스케치북에 기록하기</span>
</button>
</section>
<!-- END: ActionButtonSection -->
<!-- BEGIN: PostItListSection -->
<!-- 와이어프레임 네 번째 블록: 포스트잇 목록 & 카테고리 필터 탭 -->
<section class="bg-white/80 backdrop-blur-sm crayon-border-lg p-5 sm:p-7 shadow-m3-2 flex flex-col gap-4 mt-2" data-purpose="memo-list-section">
<!-- 목록 헤더 -->
<div class="flex items-center justify-between border-b pb-3 border-stone-200">
<div>
<h2 class="text-xl font-bold font-hand text-stone-800 flex items-center gap-1.5">
<span class="material-symbols-outlined text-amber-600">collections_bookmark</span>
            포스트잇 갤러리
          </h2>
<p class="text-xs text-stone-500 font-sans">도화지 위에 차곡차곡 모인 크레파스 메모들</p>
</div>
<span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-stone-200 text-stone-700" id="memoBadgeCount">
          총 3개
        </span>
</div>
<!-- 카테고리 필터 탭: ('전체', '할 일', '아이디어', '기타') -->
<div class="flex flex-wrap items-center gap-2 pt-1" id="categoryFilterContainer">
<button class="filter-tab-btn active px-3.5 py-1 rounded-full text-xs font-bold border-2 border-stone-800 bg-stone-800 text-amber-50 transition-all shadow-sm" data-filter="전체" type="button">
        전체
      </button>
<button class="filter-tab-btn px-3.5 py-1 rounded-full text-xs font-medium border-2 border-transparent bg-stone-100 text-stone-600 hover:border-stone-400 transition-all" data-filter="할 일" type="button">
        할 일
      </button>
<button class="filter-tab-btn px-3.5 py-1 rounded-full text-xs font-medium border-2 border-transparent bg-stone-100 text-stone-600 hover:border-stone-400 transition-all" data-filter="아이디어" type="button">
        아이디어
      </button>
<button class="filter-tab-btn px-3.5 py-1 rounded-full text-xs font-medium border-2 border-transparent bg-stone-100 text-stone-600 hover:border-stone-400 transition-all" data-filter="기타" type="button">
        기타
      </button>
</div>
<!-- 포스트잇 카드 그리드 컨테이너 -->
<div class="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-2" data-purpose="cards-grid" id="postItGrid">
<!-- 샘플 카드 1 ('할 일' - 민트 도화지, D-Day 뱃지 포함 예시) -->
<article class="relative p-5 rounded-lg border-2 border-stone-800 bg-[#E8F8F5] shadow-postit transform rotate-1 hover:rotate-0 hover:scale-[1.02] transition-all duration-200 flex flex-col justify-between min-h-[170px]" data-card-id="1" data-category="할 일">
<!-- 마스킹 테이프 장식 -->
<div class="masking-tape w-20 h-4 absolute -top-2 left-1/2 -translate-x-1/2 rotate-[1deg] !bg-emerald-100/70"></div>
<div>
<div class="flex items-center justify-between text-xs text-stone-600 mb-2 border-b border-emerald-200 pb-1.5">
<div class="flex items-center gap-1.5">
<span class="font-bold flex items-center gap-1">
<span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                  할 일
                </span>
<!-- D-Day 스탬프 뱃지 예시 -->
<span class="font-hand text-xs font-bold px-2 py-0.5 rounded-full border border-stone-800 bg-amber-200 text-stone-900 shadow-crayon-sm flex items-center gap-0.5" title="마감 D-3">
<span class="text-[10px]">⏰</span> D-3
                </span>
</div>
<span class="text-[11px] text-stone-400">오늘 오전</span>
</div>
<p class="font-hand text-xl text-stone-800 whitespace-pre-wrap leading-snug">
              1. 산책 30분 다녀오기 🐕<br/>
              2. 읽다 만 책 30페이지 읽기<br/>
              3. 작은 화분에 물 주기 🌱
            </p>
</div>
<div class="flex justify-end pt-3 text-stone-400">
<button class="delete-memo-btn text-xs text-stone-400 hover:text-rose-500 flex items-center gap-0.5 p-1 rounded" title="삭제">
<span class="material-symbols-outlined text-sm">delete</span>
</button>
</div>
</article>
<!-- 샘플 카드 2 ('아이디어' - 파스텔 하늘 도화지) -->
<article class="relative p-5 rounded-lg border-2 border-stone-800 bg-[#E7F5FF] shadow-postit transform -rotate-1 hover:rotate-0 hover:scale-[1.02] transition-all duration-200 flex flex-col justify-between min-h-[170px]" data-card-id="2" data-category="아이디어">
<!-- 마스킹 테이프 장식 -->
<div class="masking-tape w-20 h-4 absolute -top-2 left-1/2 -translate-x-1/2 rotate-[-2deg] !bg-blue-100/70"></div>
<div>
<div class="flex items-center justify-between text-xs text-stone-600 mb-2 border-b border-blue-200 pb-1.5">
<span class="font-bold flex items-center gap-1">
<span class="w-2 h-2 rounded-full bg-sky-400"></span>
                아이디어
              </span>
<span class="text-[11px] text-stone-400">방금 전</span>
</div>
<p class="font-hand text-xl text-stone-800 whitespace-pre-wrap leading-snug">
              화려한 것보다 단순한 하루가 주는 따스함이 참 소중하다. 손글씨 엽서 세트 만들어보기! 💌
            </p>
</div>
<div class="flex justify-end pt-3 text-stone-400">
<button class="delete-memo-btn text-xs text-stone-400 hover:text-rose-500 flex items-center gap-0.5 p-1 rounded" title="삭제">
<span class="material-symbols-outlined text-sm">delete</span>
</button>
</div>
</article>
<!-- 샘플 카드 3 ('기타' - 연분홍 도화지) -->
<article class="relative p-5 rounded-lg border-2 border-stone-800 bg-[#FFF0F3] shadow-postit transform -rotate-2 hover:rotate-0 hover:scale-[1.02] transition-all duration-200 flex flex-col justify-between min-h-[170px]" data-card-id="3" data-category="기타">
<!-- 마스킹 테이프 장식 -->
<div class="masking-tape w-20 h-4 absolute -top-2 left-1/2 -translate-x-1/2 rotate-[-1deg] !bg-pink-100/80"></div>
<div>
<div class="flex items-center justify-between text-xs text-stone-600 mb-2 border-b border-rose-200 pb-1.5">
<span class="font-bold flex items-center gap-1">
<span class="w-2 h-2 rounded-full bg-rose-400"></span>
                기타
              </span>
<span class="text-[11px] text-stone-400">어제</span>
</div>
<p class="font-hand text-xl text-stone-800 whitespace-pre-wrap leading-snug">
              길을 걷다가 길냥이를 마주쳤다. 눈인사를 건넸더니 야옹 하고 화답해주었다. 별것 아닌 순간이 하루를 환하게 채웠다. 🐾
            </p>
</div>
<div class="flex justify-end pt-3 text-stone-400">
<button class="delete-memo-btn text-xs text-stone-400 hover:text-rose-500 flex items-center gap-0.5 p-1 rounded" title="삭제">
<span class="material-symbols-outlined text-sm">delete</span>
</button>
</div>
</article>
</div>
<!-- 빈 상태 알림 템플릿 (필터링 또는 데이터 없을 시) -->
<div class="hidden py-12 text-center text-stone-400" id="emptyMemoPlaceholder">
<span class="material-symbols-outlined text-4xl mb-1 text-stone-300">note_alt</span>
<p class="font-hand text-xl">해당 카테고리의 메모가 없어요.</p>
<p class="text-xs">상단에서 새 크레파스 메모를 작성해보세요!</p>
</div>
</section>
<!-- END: PostItListSection -->
<!-- 푸터 카피라이트 -->
<footer class="text-center text-xs text-stone-400 py-3" data-purpose="app-footer">
<span>🖍️ 도화지와 크레파스로 엮은 감성 아카이브 © 2025</span>
</footer>
</main>
<!-- END: AppContainer -->
<!-- BEGIN: Logic & Interaction Scripts -->
<script data-purpose="memo-manager-logic">
    document.addEventListener('DOMContentLoaded', () => {
      // 5종류 감성 파스텔 크레파스 도화지 프리셋 (노랑, 연분홍, 민트, 하늘색, 연보라)
      const PASTEL_PALETTE = [
        { bg: 'bg-[#FFFDE7]', borderLine: 'border-amber-200', dot: 'bg-amber-400', tape: '!bg-amber-100/70' },
        { bg: 'bg-[#FFF0F3]', borderLine: 'border-rose-200', dot: 'bg-rose-400', tape: '!bg-pink-100/80' },
        { bg: 'bg-[#E8F8F5]', borderLine: 'border-emerald-200', dot: 'bg-emerald-400', tape: '!bg-emerald-100/70' },
        { bg: 'bg-[#E7F5FF]', borderLine: 'border-blue-200', dot: 'bg-sky-400', tape: '!bg-blue-100/70' },
        { bg: 'bg-[#F3F0FF]', borderLine: 'border-purple-200', dot: 'bg-purple-400', tape: '!bg-purple-100/70' }
      ];

      // 상태 관리 변수
      let selectedCategory = '할 일';
      let activeFilter = '전체';
      let selectedDDayText = ''; // e.g. "D-Day", "D-3", "D+1"
      let selectedDDayDateStr = ''; // e.g. "2025-05-20"

      // DOM 참조
      const catInputBtns = document.querySelectorAll('.cat-input-btn');
      const categoryLabel = document.getElementById('selectedCategoryLabel');
      const memoInput = document.getElementById('memoInput');
      const charCount = document.getElementById('charCount');
      const saveBtn = document.getElementById('saveMemoBtn');
      const grid = document.getElementById('postItGrid');
      const badgeCount = document.getElementById('memoBadgeCount');
      const emptyPlaceholder = document.getElementById('emptyMemoPlaceholder');
      const validationMessage = document.getElementById('validationMessage');
      const filterBtns = document.querySelectorAll('.filter-tab-btn');

      // D-Day 관련 DOM 참조
      const dDaySection = document.getElementById('dDaySection');
      const dDayPresetBtns = document.querySelectorAll('.dday-preset-btn');
      const customDatePicker = document.getElementById('customDatePicker');
      const dDayBadgePreview = document.getElementById('dDayBadgePreview');
      const clearDDayBtn = document.getElementById('clearDDayBtn');

      // 오늘 날짜를 yyyy-mm-dd 형태로 계산
      function getFormattedDate(offsetDays = 0) {
        const target = new Date();
        target.setDate(target.getDate() + offsetDays);
        const y = target.getFullYear();
        const m = String(target.getMonth() + 1).padStart(2, '0');
        const d = String(target.getDate()).padStart(2, '0');
        return `${y}-${m}-${d}`;
      }

      // 날짜 차이 계산 함수
      function calculateDDay(targetDateStr) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const target = new Date(targetDateStr);
        target.setHours(0, 0, 0, 0);

        const diffTime = target.getTime() - today.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 0) return 'D-Day';
        if (diffDays > 0) return `D-${diffDays}`;
        return `D+${Math.abs(diffDays)}`;
      }

      // D-Day 상태 업데이트 UI
      function setDDay(dateStr) {
        if (!dateStr) {
          selectedDDayText = '';
          selectedDDayDateStr = '';
          dDayBadgePreview.classList.add('hidden');
          clearDDayBtn.classList.add('hidden');
          customDatePicker.value = '';
          dDayPresetBtns.forEach(b => {
            b.classList.remove('bg-emerald-600', 'text-white', 'border-stone-800', 'font-bold');
            b.classList.add('bg-white', 'text-stone-700', 'border-stone-400');
          });
          return;
        }

        selectedDDayDateStr = dateStr;
        selectedDDayText = calculateDDay(dateStr);

        dDayBadgePreview.textContent = `🏷️ [${selectedDDayText}] ${dateStr}`;
        dDayBadgePreview.classList.remove('hidden');
        clearDDayBtn.classList.remove('hidden');
      }

      // 1. 입력 폼 카테고리 선택 ('할 일', '아이디어', '기타')
      catInputBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          catInputBtns.forEach(b => {
            b.classList.remove('border-stone-800', 'scale-105', 'bg-amber-50', 'text-stone-800', 'font-bold');
            b.classList.add('border-transparent', 'bg-stone-100', 'text-stone-600', 'font-medium');
          });
          btn.classList.add('border-stone-800', 'scale-105', 'bg-amber-50', 'text-stone-800', 'font-bold');
          btn.classList.remove('border-transparent', 'bg-stone-100', 'text-stone-600', 'font-medium');

          selectedCategory = btn.dataset.category;
          categoryLabel.textContent = selectedCategory;

          // '할 일'일 때만 D-Day 설정 섹션 노출, 아닐 때는 부드럽게 숨김 처리
          if (selectedCategory === '할 일') {
            dDaySection.classList.remove('hidden');
          } else {
            dDaySection.classList.add('hidden');
            setDDay(''); // 비할 일 카테고리로 변경 시 D-Day 초기화
          }
        });
      });

      // 1-1. D-Day 프리셋 칩 클릭 이벤트
      dDayPresetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          dDayPresetBtns.forEach(b => {
            b.classList.remove('bg-emerald-600', 'text-white', 'border-stone-800', 'font-bold');
            b.classList.add('bg-white', 'text-stone-700', 'border-stone-400');
          });
          btn.classList.add('bg-emerald-600', 'text-white', 'border-stone-800', 'font-bold');
          btn.classList.remove('bg-white', 'text-stone-700', 'border-stone-400');

          const daysOffset = parseInt(btn.dataset.days, 10);
          const dateStr = getFormattedDate(daysOffset);
          customDatePicker.value = dateStr;
          setDDay(dateStr);
        });
      });

      // 1-2. 직접 날짜 선택 체인지 이벤트
      customDatePicker.addEventListener('change', (e) => {
        const val = e.target.value;
        if (val) {
          // 프리셋 스타일 해제
          dDayPresetBtns.forEach(b => {
            b.classList.remove('bg-emerald-600', 'text-white', 'border-stone-800', 'font-bold');
            b.classList.add('bg-white', 'text-stone-700', 'border-stone-400');
          });
          setDDay(val);
        }
      });

      // 1-3. D-Day 해제 버튼
      clearDDayBtn.addEventListener('click', () => {
        setDDay('');
      });

      // 2. 카테고리 필터 탭 클릭 이벤트 ('전체', '할 일', '아이디어', '기타')
      filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          filterBtns.forEach(b => {
            b.classList.remove('active', 'border-stone-800', 'bg-stone-800', 'text-amber-50', 'font-bold');
            b.classList.add('border-transparent', 'bg-stone-100', 'text-stone-600', 'font-medium');
          });
          btn.classList.add('active', 'border-stone-800', 'bg-stone-800', 'text-amber-50', 'font-bold');
          btn.classList.remove('border-transparent', 'bg-stone-100', 'text-stone-600', 'font-medium');

          activeFilter = btn.dataset.filter;
          applyFilter();
        });
      });

      function applyFilter() {
        const cards = grid.querySelectorAll('article');
        let visibleCount = 0;

        cards.forEach(card => {
          const cardCat = card.dataset.category;
          if (activeFilter === '전체' || cardCat === activeFilter) {
            card.classList.remove('hidden');
            visibleCount++;
          } else {
            card.classList.add('hidden');
          }
        });

        badgeCount.textContent = `총 ${visibleCount}개`;

        if (visibleCount === 0) {
          emptyPlaceholder.classList.remove('hidden');
        } else {
          emptyPlaceholder.classList.add('hidden');
        }
      }

      // 3. 글자 수 카운팅
      memoInput.addEventListener('input', () => {
        charCount.textContent = memoInput.value.length;
        if (memoInput.value.trim().length >= 2) {
          validationMessage.classList.add('hidden');
        }
      });

      // 4. 새 포스트잇 생성 함수 (D-Day 뱃지 렌더링 지원)
      function createMemoCard(text, category, dDayLabel = '') {
        // 무작위 파스텔 도화지 테마 선택
        const randomScheme = PASTEL_PALETTE[Math.floor(Math.random() * PASTEL_PALETTE.length)];
        const rotations = ['rotate-1', '-rotate-1', 'rotate-2', '-rotate-2'];
        const randomRot = rotations[Math.floor(Math.random() * rotations.length)];

        const now = new Date();
        const timeString = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

        const article = document.createElement('article');
        article.className = `relative p-5 rounded-lg border-2 border-stone-800 ${randomScheme.bg} shadow-postit transform ${randomRot} hover:rotate-0 hover:scale-[1.02] transition-all duration-200 flex flex-col justify-between min-h-[170px] animate-[fadeIn_0.3s_ease]`;
        article.dataset.category = category;

        // D-Day 뱃지 HTML 생성 (할 일이며 설정된 경우)
        let dDayBadgeMarkup = '';
        if (category === '할 일' && dDayLabel) {
          const isUrgent = dDayLabel === 'D-Day' || dDayLabel === 'D-1';
          const badgeBg = isUrgent ? 'bg-amber-300' : 'bg-amber-100';
          dDayBadgeMarkup = `
            <span class="font-hand text-xs font-bold px-2 py-0.5 rounded-full border border-stone-800 ${badgeBg} text-stone-900 shadow-crayon-sm flex items-center gap-0.5" title="${dDayLabel}">
              <span class="text-[10px]">⏰</span> ${escapeHtml(dDayLabel)}
            </span>
          `;
        }

        // 카드 내부 마크업
        article.innerHTML = `
          <div class="masking-tape w-20 h-4 absolute -top-2 left-1/2 -translate-x-1/2 ${randomRot} ${randomScheme.tape}"></div>
          <div>
            <div class="flex items-center justify-between text-xs text-stone-600 mb-2 border-b ${randomScheme.borderLine} pb-1.5">
              <div class="flex items-center gap-1.5">
                <span class="font-bold flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full ${randomScheme.dot}"></span>
                  ${escapeHtml(category)}
                </span>
                ${dDayBadgeMarkup}
              </div>
              <span class="text-[11px] text-stone-400">
                ${timeString} 작성
              </span>
            </div>
            <p class="font-hand text-xl text-stone-800 whitespace-pre-wrap leading-snug">${escapeHtml(text)}</p>
          </div>
          <div class="flex justify-end pt-3 text-stone-400">
            <button class="delete-memo-btn text-xs text-stone-400 hover:text-rose-500 flex items-center gap-0.5 p-1 rounded" title="삭제">
              <span class="material-symbols-outlined text-sm">delete</span>
            </button>
          </div>
        `;

        // 삭제 이벤트 연결
        const delBtn = article.querySelector('.delete-memo-btn');
        delBtn.addEventListener('click', () => {
          article.remove();
          applyFilter();
        });

        return article;
      }

      // XSS 방지 헬퍼
      function escapeHtml(str) {
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      }

      // 기존 렌더링된 카드 삭제 버튼 이벤트 바인딩
      grid.querySelectorAll('.delete-memo-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const card = e.target.closest('article');
          if (card) {
            card.remove();
            applyFilter();
          }
        });
      });

      // 5. '기록하기' 버튼 액션
      saveBtn.addEventListener('click', () => {
        const content = memoInput.value.trim();
        if (content.length < 2) {
          validationMessage.classList.remove('hidden');
          memoInput.focus();
          return;
        }

        validationMessage.classList.add('hidden');
        
        // 새 카드 생성 및 최상단 삽입 (선택된 D-Day 텍스트 전달)
        const dDayToApply = (selectedCategory === '할 일') ? selectedDDayText : '';
        const newCard = createMemoCard(content, selectedCategory, dDayToApply);
        grid.prepend(newCard);

        // 입력 폼 초기화
        memoInput.value = '';
        charCount.textContent = '0';
        setDDay(''); // D-Day 선택 초기화
        
        // 필터 상태 유지 및 업데이트
        applyFilter();

        // 방금 작성한 메모로 부드러운 스크롤
        if (activeFilter === '전체' || activeFilter === selectedCategory) {
          newCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      });
    });
  </script>
<!-- END: Logic & Interaction Scripts -->
</body></html>