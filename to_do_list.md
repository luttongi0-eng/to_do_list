# Post-it Todo List

## 1단계: 서비스 디자인 요소 설계

- 구글 프레젠테이션으로 디자인 초안 잡기
- `디자인초안.png` 파일 참고

---

## 2단계: 스티치 바이브 디자인

- https://stitch.withgoogle.com 접속
- 스티치 프롬프트 창에서 **웹**을 선택하고 `디자인초안.png` 파일 첨부

**프롬프트**

```Prompt
- 사용자가 [메모 내용]에 메모를 작성하고 기록하기 버튼을 누르면 포스트잇 목록에 메모가 추가됨
- 디자인 시스템은 Google Material Design 사용
- 도화지와 크레파스 느낌의 포스트잇 형태, 그림 일기장 같은 느낌으로 디자인 실시
- 시안 3개 제시
```

- 스티치에서 최종 선택하고 수정한 디자인에 대한 `screen.png`, `DESIGN.md` 파일 참고

---

## 3단계: 빈 폴더 만들기

- 영문 소문자로 빈 폴더 생성
- 반드시 소문자이어야 함
- 본 과정에서는 `to_do_list`로 정하였음

---

## 4단계: 사전 설정 사항

**프롬프트**

- Antigravity 실행
- 채팅창의 **[New Conversation]-[New Project]** 를 통해 `to_do_list` 폴더 접근
- 안티그래비티의 에이전트 창에 아래 내용을 입력

```Prompt
- 한글로 출력
```

---

## 5단계: 기본 코드베이스 생성

- `npx create-next-app@latest .` 입력
- 명령어 실행 후 기본 선택 사항을 실행

---

## 6단계: 기본 기능 구현

- `screen.png`, `DESIGN.md` 파일을 `diary_ai_sentiments_analyzer26_2` 폴더 안으로 이동
- 프롬프트 창에 `screen.png` 파일 추가

**프롬프트**

```Prompt
- 메인페이지 가운데 메모 내용을 입력하고 범주를 선택하면 `도화지 포스트잇 스타일`로 출력
- 한 행에 메모를 `네 개까지 배치`
- 컬러는 노란색, 분홍색, 초록색, 파랑색 중 무작위 색상을 적용
- 메모가 착 하고 붙는 느낌의 애니매이션 추가
- 각 메모의 왼쪽 하단에 작성한 연월일 시간 요일을 작은 글씨로 흐릿하게 표시
- 라이트 모드와 다크 모드  기능 추가 (기본은 라이트 모드)
- 메모에 카테고리(`전체`, `할 일`, `아이디어`, `기타`)를 추가하고, 카테고리별로 필터링할 수 있는 드롭다운 메뉴 추가
-카테고리 중 `할 일`에만 d-day 기능 추가
- 메모 카드를 `드래그 앤 드롭으로 이동 기능 추가`. 반응형 모바일 웹에도 적용
- 각 메모에 삭제 버튼과 편집 버튼을 추가
```

---

## 7단계: 코드베이스 실행 및 확인

- `npm run dev` 입력
- `http://localhost:3000` 를 클릭
- 서비스가 실행되면 각 기능을 테스트해 봄

---

## 8단계: 반응형 모바일 웹 확인

- to_do_list 웹 서비스를 크롬 브라우저에서 띄우고, 오른쪽 상단의 점 세개 버튼(설정 버튼)을 선택
- **[도구 더보기]-[개발자 도구]**를 선택
- `Toggle device toolbar (Ctrl+Shift+M)` 실행
- 모바일 화면에서도 구성 요소가 안정적으로 배치되어 있는지 확인
-배치 수정은 화면 캡처를 통해 antigravity에 전달 가능

---

## 9단계: 구글 시트 설정

- 구글 드라이브에서 구글 시트 만들기
- 시트 제목: `to_do_list 시트`
- 필요 필드 만들기
1. A열 제목: timestamp, 시트기록날짜및시간, 날짜 시간 타입
2. B열 제목: datetime, 메모생성날짜및시간, 날짜 시간 타입
3. C열 제목: category, 메모범주, 문자 타입
4. D열 제목: content, 메모내용, 문자 타입
5. E열 제목: color, 메모색상, 색상(숫자) 타입
6. F열 제목: state, 체크 버튼을 눌러 완료가 되면 체크 또는 완료로 표시, 문자 타입
7. G열 제목: order, 메모순서, 숫자 타입

- 해당 구글 시트에서 **[파일]-[공유]-[다른 사용자와 공유]-[링크가 있는 모든 사용자]** 설정
- **[링크 복사]** 클릭
- 구글 시트 공유 링크 붙여넣기
https://docs.google.com/spreadsheets/d/1TictJ6mU2nk7-Ys-WANlFdI1KBn3YOZldmsYN_uNkaQ/edit?usp=sharing

---

## 10단계: 구글 시트 CRUD 기능 및 스크립트 생성

```Prompt
- 구글 시트 공유 링크
https://docs.google.com/spreadsheets/d/1TictJ6mU2nk7-Ys-WANlFdI1KBn3YOZldmsYN_uNkaQ/edit?usp=sharing
- 해당 구글 시트의 'timestamp','datetime','category','content','color','state','order'에 대해 CRUD하는 구글 앱스 스크립트 생성
- 구글 시트와 연동하여 삭제 버튼은 메모를 즉시 제거하고 편집 버튼은 내용을 수정할 수 있도록 함
```
---

## 11단계: 구글 시트 연동 설정

- 구글 시트에 있는 **[확장프로그램]-[Apps Script]**를 클릭
- 제목: `Diary_AI_Sentiments_Analyzer`
- 안티그래비티에서 생성된 구글 앱스 스크립트 코드를 복사한 후 [Apps Script]에 붙여넣기. 이때 기존 코드를 모두 대체해야 함. 그리고 **[저장]** 버튼을 클릭
- **[배포]-[새 배포]** 클릭
- **[유형 선택]-[웹 앱]** 클릭
- 새 설명: to do list
- 다음 사용자 인증 정보로 실행: 나
- 액세스 권한이 있는 사용자: 모든 사용자
- [배포] 클릭
- [액세스 승인] 클릭
- 팝업 창이 나타나면 왼쪽 하단에 있는 `Advanced` 링크 클릭
- 인증 후 나타나는 `웹 앱 URL` 복사
https://script.google.com/macros/s/AKfycbxVc6Ii6JS4sH4tHyqbsl_RPqWI3ilUJaTNhPY9bbWratzpZgKWekvlMyKWtq7I2fbkUg/exec

---

## 12단계: 웹 앱 URL 등록

- .env.local 파일에 `웹 앱 URL`을 아래와 같이 편집
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxVc6Ii6JS4sH4tHyqbsl_RPqWI3ilUJaTNhPY9bbWratzpZgKWekvlMyKWtq7I2fbkUg/exec

---

## 13단계: 구글 시트 연동 기능 구현

**프롬프트**

```Prompt
- .env.local 파일에 있는 NEXT_PUBLIC_GOOGLE_SCRIPT_URL 키 값을 이용하여 메모의  'timestamp','datetime','category','content','color','state','order'에 대해 CRUD를 수행하는 기능 구현
- [스케치북에 기록하기] 버튼을 누르면 메모 저장
```

---

## 14단계: 디자인 수정

```Prompt
- Copyright INU To Do list by huijin An 으로 수정하고 Footer 영역을 세련되게 제작
-글씨체 변경
@font-face {
    font-family: 'OngleipParkDahyeon';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/2411-3@1.0/Ownglyph_ParkDaHyun.woff2') format('woff2');
    font-weight: normal;
    font-display: swap;
}

```

---

## 15단계: 코드베이스 실행 및 확인

- `npm run dev` 입력
- `http://localhost:3000` 를 클릭
- 앞서 가상 서버를 실행해놓은 상태라면 다시 할 필요는 없음
- 서비스가 실행되면 각 기능을 테스트해 봄
https://github.com/luttongi0-eng/to_do_list.git

---

## 16단계: 깃허브 사이트에 저장소 생성

- 깃허브 사이트에 접속하여 본 서비스를 업로드할 저장소 생성
- 본 과정에서는 `to_do_list` 로 설정함
- 저장소 주소 복사 및 붙여넣기

---

## 17단계: 깃허브 연결 확인

**프롬프트**

```Prompt
- git config --global user.email "luttongi0@gmail.com"
- git config --global user.name "luttongi0-eng"
- Personal access tokens (classic)=YOUR_GITHUB_PERSONAL_ACCESS_TOKEN
- 해당 저장소에 대해 깃허브 연결을 확인
```

---

## 18단계: 깃허브에 코드베이스 업로드

**프롬프트**

```Prompt
- https://github.com/luttongi0-eng/to_do_list.git
- 코드베이스를 깃허브에 업로드
```

---

## 19단계: 버셀을 통해 서비스 배포

- 버셀(Vercel)에 접속하여 깃허브의 `to_do_list` 저장소를 연결하여 배포
- `.env.local` 파일에 저장해둔 연동 키(API Key)도 **배포시 반드시 등록해주어야 함**
- 연동 키(API Key)는 직접 입력하여 등록할 수도 있지만  `.env.local` 파일을 지정하여 한번에 등록할 수 있음

---
