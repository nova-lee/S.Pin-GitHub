# Universal Design DNA

모든 디지털 산출물 — 웹사이트, SaaS, 대시보드, 모바일·데스크톱 앱, PPTX 제안서, 데이터 시각화 — 의 공통 바탕이 되는 디자인 DNA다. **원칙, 토큰의 역할과 이름, 상태 규칙, 접근성 기준, 품질 게이트는 고정한다.** 브랜드 색(accent), 서체, 반경의 성격, 밀도, 이미지는 프로젝트마다 다시 정한다(맨 아래 "프로젝트 적응").

## 원칙

**Design before Decoration.** 기능과 콘텐츠의 목적을 먼저 이해하고, 그 목적을 가장 효과적으로 전달하는 구조를 설계한다. 고급스러움은 더하는 데서가 아니라 빼고 남은 것을 정교하게 다듬는 데서 나온다.

1. **목적** — 화면·슬라이드마다 하나의 목적과 하나의 주 행동을 정한다.
2. **위계** — 크기·굵기·여백·색 대비 순으로 위계를 만든다. 색은 마지막 수단이다.
3. **일관성** — 같은 의미는 같은 토큰으로. 새 값이 필요하면 토큰을 추가하고, 임의 값(hex, px)을 직접 쓰지 않는다.
4. **콘텐츠 중심** — 실제 문구·데이터·제품 화면으로 디자인한다. Lorem ipsum과 가짜 수치로 레이아웃을 확정하지 않는다.
5. **타이포그래피** — 레이아웃의 80%는 글자다. 스케일·행간·자간·줄 길이를 먼저 맞춘다.
6. **여백** — 여백은 남는 공간이 아니라 묶음과 분리를 표현하는 재료다.
7. **인터랙션** — 모든 반응은 사용자의 행동에 대한 답이어야 한다. 목적 없는 hover·모션은 없다.
8. **접근성** — 대비·포커스·키보드·모션 줄이기는 옵션이 아니라 바닥선이다.
9. **플랫폼 적합성** — 웹은 웹답게, 앱은 플랫폼 관습대로, 슬라이드는 투영 환경에 맞게.
10. **유지보수성** — 다음 사람이(다음 세션의 Claude가) 읽고 이어갈 수 있는 구조로 남긴다.

모든 시각 요소는 다섯 질문에 답해야 한다. 왜 존재하는가? 어떤 정보를 전달하는가? 사용성을 개선하는가? 브랜드에 기여하는가? **없어도 화면의 완성도가 유지되는가?** — 마지막 답이 "예"면 제거를 먼저 검토한다.

## Anti AI-Slop

다음은 기본값으로 금지한다. 쓰려면 이유를 한 문장으로 설명할 수 있어야 한다.

- 보라·파랑 그라데이션, 의미 없는 그라데이션 배경 → 단색 `canvas`·`surface`, 필요하면 `surface-inverse` 밴드.
- 모든 것을 같은 둥근 카드로, 모든 섹션을 아이콘+제목+설명 3열로 → 내용에 맞는 구성(비대칭 분할, 리스트, 표, 풀블리드 미디어).
- Glassmorphism, 전면 블러 → 불투명 표면. `scrim`도 블러 없이.
- 과도한 shadow·glow·border, 왼쪽 굵은 색 띠 카드 → `divider` 헤어라인 하나.
- 장식용 3D 오브젝트, 가짜 3D(그림자·CSS 기울기로 흉내 낸 것)를 3D라 부르기 → 설명에 기여할 때만 실제 3D(모션 & 3D 표준).
- 근거 없는 수치·가짜 통계·가짜 후기·가짜 로고 월 → 실제 데이터와 출처. 예시는 "예시"라고 표기.
- 모든 텍스트 중앙 정렬 → 왼쪽 정렬 기본.
- 모든 섹션에 같은 fade-up → 섹션의 이야기에 맞는 한두 가지 모션만.
- 기능 없는 아이콘·hover·인터랙션, 이모지 장식 → 제거.
- 저품질 AI 이미지·일반 스톡 사진 → 실제 제품 화면, 일관된 톤의 촬영·렌더.
- 기본 템플릿 그대로의 인상(Inter + 파란 버튼 + 3열 카드) → 이 DNA의 토큰과 프로젝트 고유의 구성.

## 컬러

- **잉크와 종이가 기본이다.** 페이지 바탕은 `canvas`, 그 위 표면은 `surface`, 떠 있는 표면은 `surface-raised`, 움푹한 영역은 `surface-sunken`, 반전 밴드는 `surface-inverse`. 순백 페이지 바탕을 쓰지 않는다.
- 텍스트는 세 단계만: `ink`(본문·제목), `ink-secondary`(설명), `ink-muted`(캡션·메타). `ink-muted`보다 옅은 텍스트를 만들지 않는다. `surface-inverse` 위는 `ink-inverse`.
- **행동은 잉크로 표시한다.** 주 버튼은 `primary` 채움 + `on-primary` 텍스트, 보조는 `secondary`. 브랜드 색으로 버튼을 칠하지 않는다.
- **`accent`는 화면 면적의 5% 이하**로, 정해진 일에만 쓴다: 링크, 포커스(`focus`), 컨트롤의 켜짐·선택(Checkbox, Radio, Switch, Progress), 정보 상태(`info`), 차트의 강조 계열(`data-1`), 브랜드 순간(아이브로우 마크, 표지 블록). accent 채움 위 텍스트는 항상 `on-accent`(다크 테마에서는 어두운 잉크).
- 상태색 `success`(청록) · `warning` · `danger`는 상태를 말할 때만, **항상 아이콘과 단어를 함께** 쓴다. 바탕이 필요하면 `*-subtle`, 그 위 텍스트는 `ink`.
- 경계: 의미 있는 경계(입력, 컨트롤, 테이블 헤더)는 `border`(3:1), 장식 구분선과 카드 외곽선은 `divider`.
- 차트는 이야기의 주인공 하나만 `data-1`, 비교 대상은 `data-2`, 나머지는 `data-3`. 범주마다 무지개색을 주지 않는다.
- 그라데이션은 실제 빛과 재질(3D 렌더의 조명, 사진)에서만 생긴다. UI 면에 그라데이션을 칠하지 않는다.
- 모든 텍스트 토큰은 note에 적힌 바탕 위에서 두 테마 모두 4.5:1 이상이 검증되어 있다. 새 조합을 만들면 직접 검증한다.

## 타이포그래피

- **Pretendard Variable 하나로 한글과 라틴을 함께 조판한다**(`--font-sans`). 코드·ID·로그·정렬되는 데이터 열만 IBM Plex Mono(`--font-mono`, 한글은 Pretendard로 대체). 두 서체 모두 SIL OFL 1.1.
- 스케일: `display-2xl`·`display-xl`·`display-lg`는 Brand Experience의 히어로와 챕터 오프너에만, 페이지당 하나. 페이지 제목 `heading-1`, 섹션 `heading-2`, 하위 `heading-3`~`heading-6`. 본문 `body`(16/1.65), 리드 `body-lg`, Utility 화면 본문 `body-sm`, 출처·메타 `caption`. 컨트롤은 `label`·`button`, 섹션 아이브로우 `overline`, 지표 `kpi`, 데이터 `data`, 코드 `code`.
- 한 화면에서 쓰는 크기는 3~4단계, 굵기는 400·500·600·700만.
- 한글 조판: `word-break: keep-all`(단어 중간 줄바꿈 금지), 본문 행간 1.6~1.7. 디스플레이 자간은 라틴 기준 −0.03em, 한글만 있는 제목은 −0.02em 안팎으로 완화한다. `overline`의 대문자·넓은 자간은 라틴에만, 한글 아이브로우는 자간 0.02em.
- 숫자는 `font-variant-numeric: tabular-nums`. 금액·수량·날짜 열은 오른쪽 정렬.
- 긴 글의 줄 길이는 `reading-max`(한글 약 38자) 이내.
- 서체가 설치되지 않은 환경(PPTX를 받은 PC 등)의 대체 순서: Pretendard → Apple SD Gothic Neo(macOS) → 맑은 고딕(Windows). 대체돼도 깨지지 않도록 슬라이드 텍스트 상자에 여유를 둔다.

## 간격과 레이아웃

- 4px 기반 `space-*`만 쓴다. 컴포넌트 내부 `space-1`~`space-6`, 컴포넌트 사이 `space-4`~`space-12`, 섹션 사이는 경험 레이어별로 `section-sm`(Utility) · `section-md`(Product) · `section-lg`(Brand).
- 관련된 것은 가깝게, 다른 것은 멀게. 제목과 그 본문 사이(`space-3`~`space-4`)는 블록 사이(`space-12` 이상)보다 확실히 좁아야 한다.
- 12열 그리드, 열 간격 `grid-gutter`. 컨테이너는 목적에 따라 `reading-max`(글·폼) · `content-max`(기본) · `wide-max`(대시보드·제품 프리뷰), 그 이상은 풀블리드. 좌우 여백은 모바일 `space-5`, 태블릿 `space-8`, 데스크톱 `space-10`.
- 브레이크포인트 `bp-sm` 640 · `bp-md` 768 · `bp-lg` 1024 · `bp-xl` 1280 · `bp-2xl` 1536.
- **왼쪽 정렬이 기본이다.** 중앙 정렬은 히어로의 한두 줄, 화면 전체가 빈 상태, 표지 슬라이드에서만.
- 비대칭 분할(7/5, 8/4, 4/8)과 풀블리드 미디어로 리듬을 만든다. 연속된 섹션이 같은 구조를 반복하지 않게 한다.

## 형태와 표면

- 반경은 역할에 따라 다르다: `radius-none` 풀블리드 미디어·섹션 밴드 · `radius-xs` 체크박스·툴팁 · `radius-md` 버튼·입력 · `radius-lg` 카드·Alert·Menu·Toast · `radius-xl` Dialog·대형 미디어 · `radius-full` Badge·Switch·Radio·Progress. 한 화면의 모든 것을 같은 반경으로 만들지 않는다.
- 그림자는 떠 있는 표면에만: `shadow-2` Menu·Tooltip·Toast, `shadow-3` Dialog. `shadow-1`은 인터랙티브 카드 hover와 스크롤된 고정 헤더에만. 카드는 그림자 대신 `divider` 외곽선.
- 테두리는 1px 하나. 이중 테두리, 컬러 테두리, glow를 쓰지 않는다.
- 블러는 쓰지 않는다. 예외는 Brand Experience에서 미디어 위에 겹치는 헤더처럼 가독성을 위해 꼭 필요하고 대비를 검증한 경우뿐이다.

## 모션

- 시간은 `duration-instant`(누름) · `duration-fast`(hover·색) · `duration-base`(Menu·Accordion·Tabs) · `duration-slow`(Dialog·Toast) · `duration-slower`(리빌) · `duration-cinematic`(장면 전환). 곡선은 진입 `ease-enter`, 퇴장 `ease-exit`, 일반 `ease-standard`, 장면 `ease-cinematic`, 스크롤 스크럽 `ease-linear`.
- Utility 화면은 `duration-base` 이하만. 이동 거리는 8~24px.
- `prefers-reduced-motion: reduce`에서는 위치 이동·스케일·패럴랙스·자동 재생을 끄고 불투명도 변화만 남긴다.
- 스크롤 기반 연출과 실제 3D의 기준은 "모션 & 3D 표준"(`MOTION_3D.md`)을 따른다.

## 상태와 포커스

- 모든 인터랙티브 요소는 Default · Hover · Focus · Active · Disabled를 갖고, 해당되면 Loading · Error · Success까지 정의한다.
- 포커스는 `focus` 2px 실선, offset 2px. `outline: none`으로 지우고 대체하지 않는 것은 금지.
- Hover는 한 단계 진하게(`primary-hover`, `secondary-hover`), Active는 scale 0.98, Disabled는 불투명도 0.4, Loading은 폭을 유지한 채 스피너로 바꾼다.

## 아이코노그래피

- 1.5px 스트로크, 20px 그리드, 둥근 끝·둥근 모서리, `currentColor` 한 가지 잉크. 크기는 16 · 20 · 24.
- 기본 세트는 check, chevron, close, plus, arrow, menu, info, success, warning, danger, sort, inbox. 더 필요하면 같은 성격의 Lucide(ISC, stroke 1.5)를 쓴다. 한 프로젝트에 아이콘 계열을 섞지 않는다.
- 아이콘은 라벨을 대신하지 않는다. 아이콘만 있는 버튼에는 `aria-label`과 Tooltip.
- 이모지를 장식으로 쓰지 않는다.
- 이 시스템에는 로고가 없다. 워드마크는 `heading-6` 굵기의 텍스트로 두고, 프로젝트의 실제 로고 파일로 교체한다. 로고를 그리거나 재구성하지 않는다.

## 콘텐츠와 보이스

- 기업·B2B 산출물은 합니다체, 친근한 B2C 제품은 해요체. 한 제품 안에서 섞지 않는다.
- 버튼은 동사로, 결과를 말한다: "변경 사항 저장", "영구 삭제". "확인/취소"만으로 끝내지 않는다.
- 오류 메시지는 무엇이 잘못됐고 어떻게 고치는지 한 문장으로.
- 숫자에는 출처를 붙인다(`Stat`의 `source`, `Table`의 `caption`). 예시 데이터는 "예시"라고 밝힌다.
- 느낌표, 이모지, 과장("혁신적인", "10배")을 쓰지 않는다. 제품명·고유명사만 원어로 표기한다.

## 컴포넌트

23종의 상태·치수·사용 규칙은 `COMPONENTS.md`에 있다. 모든 값은 토큰 변수를 참조하므로 토큰(`assets/tokens.css`)을 먼저 불러온다. 사용하는 프레임워크(React, Vue, 정적 HTML, 앱, PPTX)로 규격의 상태·치수·토큰을 그대로 옮겨 구현한다.

- 행동: `Button`(primary는 화면당 하나).
- 입력: `TextField`, `Select`, `Checkbox`, `RadioGroup`, `Switch` — 라벨·힌트·오류를 접근성 속성까지 연결한다.
- 내비게이션: `SiteHeader`, `Tabs`, `Breadcrumb`, `Pagination`.
- 피드백: `Alert`(지속), `Toast`(일시), `Badge`, `Progress`, `Spinner`.
- 오버레이: `Dialog`, `Tooltip`, `Menu` — 포커스 이동·Esc·키보드를 갖춘다.
- 데이터·콘텐츠: `Table`, `Stat`(출처 필수), `Card`, `Accordion`, `EmptyState`.

## 프로젝트 적응

**고정:** 원칙과 Anti AI-Slop, 토큰 이름과 역할, 타입 스케일의 비율과 행간, 간격 체계, 상태 정의, 대비·포커스·모션 줄이기 기준, 품질 게이트.

**프로젝트마다 다시 정한다:**

- `accent` 계열(`accent`, `accent-hover`, `accent-subtle`, `on-accent`) — 브랜드 색으로 교체하고 두 테마에서 대비를 다시 검증한다. accent가 빨강·주황 계열이면 `danger`와 구분되도록 danger를 더 진한 적색으로 옮긴다.
- 서체 — 브랜드 서체가 있으면 `--font-sans`를 교체하되 스케일과 행간은 유지한다. 한글 글리프가 없는 라틴 서체는 Pretendard를 뒤에 붙인다.
- 반경의 성격 — 부드러운 소비자 브랜드는 `radius-md` 12px, `radius-lg` 16px까지. 정밀한 B2B·데이터 제품은 그대로.
- 밀도, 이미지 톤, 모션 강도(경험 레이어별).
- 절차: ① 브랜드·대상·목적·플랫폼·기술 제약을 한 페이지로 정리 → ② accent와 서체 결정, 대비 검증 → ③ 페이지마다 경험 레이어 지정 → ④ 이 DNA와 다른 점만 프로젝트의 `DESIGN.md`에 기록.

## 매체별 표준

같은 폴더의 파일이 매체별 구현 기준이다: `WEB_DESIGN.md`(웹) · `MOTION_3D.md`(모션 & 3D) · `3D_BASELINES.md`(분야별 3D 레시피·실사 자산) · `THREEUI_TECHNIQUES.md`(책장 넘김 등) · `INTERNAL_PAGES.md`(결제·결재·관리자·표·팝업) · `APP_DESIGN.md`(앱) · `PPTX_DESIGN.md`(프레젠테이션) · `ASSET_GUIDELINES.md`(이미지·에셋) · `ACCESSIBILITY.md`(접근성·반응형) · `QUALITY_GATE.md`(품질 게이트). 토큰 값은 `TOKENS.md`, 컴포넌트는 `COMPONENTS.md`.
