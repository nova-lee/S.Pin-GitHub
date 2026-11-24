# 토큰 (Universal Design DNA)

원본: `assets/tokens.json` · CSS 변수: `assets/tokens.css`(라이트 `:root`, 다크 `[data-theme="dark"]`). 컴포넌트·페이지에서는 이름(`var(--surface)`)으로만 쓴다. `{accent}`는 다른 토큰을 가리키는 별칭이다.

## 컬러

| 토큰 | Light | Dark | 용도 |
|---|---|---|---|
| `canvas` | `#f5f4f0` | `#0e0e0d` | 페이지 바탕. 섹션 배경의 기본값. 순백이 아닌 종이 톤으로 눈부심을 줄이고 surface와 단차를 만든다. |
| `surface` | `#ffffff` | `#161615` | 카드·입력 필드·테이블·패널 바탕. canvas 위에 놓이는 1단 표면. |
| `surface-raised` | `#ffffff` | `#201f1e` | Dialog·Menu·Popover 등 떠 있는 표면. 라이트에서는 shadow-2/3으로, 다크에서는 밝기 차로 구분한다. |
| `surface-sunken` | `#ebeae5` | `#080808` | 코드 블록·테이블 헤더·트랙(Progress)·입력 그룹 등 움푹한 영역. |
| `surface-inverse` | `#121211` | `#f5f4f0` | 반전 밴드 섹션·Toast·Tooltip 바탕. 그 위 텍스트는 ink-inverse. |
| `ink` | `#121211` | `#edece8` | 본문·헤드라인 기본 텍스트. canvas·surface·surface-raised·surface-sunken·secondary 및 모든 *-subtle 위에서 4.5:1 이상(두 테마). |
| `ink-secondary` | `#47463f` | `#bebcb5` | 보조 본문·설명·테이블 셀 텍스트. canvas·surface·surface-raised·surface-sunken 위 4.5:1 이상(두 테마). |
| `ink-muted` | `#696862` | `#96948d` | 캡션·힌트·메타 정보·비활성 라벨. canvas·surface·surface-raised·surface-sunken 위 4.5:1 이상(두 테마). 이보다 옅은 텍스트는 만들지 않는다. |
| `ink-inverse` | `#f5f4f0` | `#121211` | surface-inverse 위 텍스트(Toast, Tooltip, 반전 섹션). 17:1. |
| `border` | `#8f8d86` | `#6f6d67` | 입력·체크박스·아웃라인 버튼 등 컨트롤 경계. canvas·surface·surface-raised 위 3:1 이상(두 테마). |
| `divider` | `#e2e0da` | `#2b2a28` | 헤어라인 구분선·카드 외곽선·테이블 행 구분. 장식용(의미 전달 금지) — 경계가 의미를 가지면 border를 쓴다. |
| `primary` | `#121211` | `#edece8` | 주 행동(Primary Button) 채움. 브랜드 컬러가 아니라 잉크로 행동을 표시한다. 한 화면에 하나. |
| `primary-hover` | `#34332f` | `#d6d4ce` | primary의 hover·pressed 채움. |
| `on-primary` | `#ffffff` | `#121211` | primary 채움 위 텍스트·아이콘. 15:1 이상. |
| `secondary` | `#e9e7e1` | `#272624` | 보조 버튼·중립 Badge·선택된 페이지 번호의 조용한 채움. 그 위 텍스트는 ink. |
| `secondary-hover` | `#dddbd4` | `#302f2c` | secondary의 hover 채움, Menu 항목 hover. |
| `accent` | `#2a44c6` | `#8ea0ff` | 시그니처 컬러(코발트). 링크·포커스·컨트롤의 켜짐/선택(Checkbox·Radio·Switch·Progress)·정보 상태·데이터 강조·브랜드 순간에만. 텍스트로 canvas·surface·surface-raised·accent-subtle 위 4.5:1 이상(두 테마). 면적의 5%를 넘기지 않는다. |
| `accent-hover` | `#1f37a8` | `#a9b7ff` | accent 링크·채움의 hover. |
| `on-accent` | `#ffffff` | `#0e0e0d` | accent 채움 위 텍스트·체크 아이콘. 다크 테마에서는 accent가 밝아지므로 어두운 잉크를 쓴다(흰색 금지). |
| `accent-subtle` | `#e7eafb` | `#1c2142` | 정보 Alert·accent Badge·선택된 행의 옅은 바탕. 그 위 텍스트는 ink 또는 accent. |
| `focus` | `{accent}` | `{accent}` | 키보드 포커스 링(2px 실선, offset 2px). 모든 표면 위 3:1 이상. |
| `success` | `#08676f` | `#55c4c9` | 성공·완료 상태 텍스트·아이콘. 청록 계열로 red–green 축을 벗어나 danger와 색약 사용자도 구분된다. 항상 아이콘·단어와 함께. canvas·surface·success-subtle 위 4.5:1 이상. |
| `success-subtle` | `#e0f0f0` | `#0f2627` | 성공 Alert·Badge 바탕. |
| `warning` | `#875200` | `#f0b450` | 주의 상태 텍스트·아이콘. 항상 아이콘·단어와 함께. canvas·surface·warning-subtle 위 4.5:1 이상. |
| `warning-subtle` | `#faefd7` | `#2c2110` | 주의 Alert·Badge 바탕. |
| `danger` | `#b3261e` | `#ff8f80` | 오류·파괴적 행동 텍스트·아이콘·Danger 버튼 채움. 항상 아이콘·단어와 함께. canvas·surface·danger-subtle 위 4.5:1 이상. |
| `danger-hover` | `#93201a` | `#ffaa9e` | Danger 버튼 hover. |
| `on-danger` | `#ffffff` | `#121211` | danger 채움 위 텍스트. |
| `danger-subtle` | `#fbe7e4` | `#331714` | 오류 Alert·Badge·오류 필드 영역 바탕. |
| `info` | `{accent}` | `{accent}` | 정보 상태 텍스트·아이콘. accent의 별칭 — 정보는 브랜드 목소리로 말한다. |
| `info-subtle` | `{accent-subtle}` | `{accent-subtle}` | 정보 Alert 바탕. |
| `scrim` | `rgba(18, 18, 17, 0.48)` | `rgba(0, 0, 0, 0.64)` | Dialog 뒤 오버레이. 블러 없이 어둡게만 — 블러는 쓰지 않는다. |
| `data-1` | `{accent}` | `{accent}` | 차트 강조 계열(이야기의 주인공 하나). 나머지는 data-2·data-3 중립으로 맥락만 준다. |
| `data-2` | `#8f8d86` | `#7d7b75` | 차트 맥락 계열(비교 대상). 강조 계열 옆에서 물러나는 진한 중립. |
| `data-3` | `#c9c7c0` | `#4a4945` | 차트 배경 계열·그리드 밖 참조선·나머지 범주. |

## 타이포그래피

- `--font-sans`: "Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, "Apple SD Gothic Neo", "Malgun Gothic", system-ui, sans-serif
- `--font-mono`: "IBM Plex Mono", "Pretendard Variable", ui-monospace, "SF Mono", Consolas, monospace

| 스타일 | 크기 | 행간 | 굵기 | 자간 | 서체 | 용도 |
|---|---|---|---|---|---|---|
| `display-2xl` | 96px | 1.0 | 700 | -0.035em | sans | Brand Experience 히어로 한 줄. 페이지당 1회. 한글만일 때 letter-spacing -0.025em으로 완화. |
| `display-xl` | 72px | 1.04 | 700 | -0.03em | sans | 히어로·챕터 오프너. 모바일에서는 display-lg로 한 단계 내린다. |
| `display-lg` | 56px | 1.08 | 700 | -0.025em | sans | 섹션 오프너·PPTX 표지 타이틀. |
| `heading-1` | 44px | 1.14 | 700 | -0.022em | sans | 페이지 제목(H1). 모바일 34px. |
| `heading-2` | 34px | 1.2 | 700 | -0.018em | sans | 섹션 제목(H2)·슬라이드 메시지 타이틀. |
| `heading-3` | 26px | 1.28 | 600 | -0.012em | sans | 하위 섹션(H3)·Dialog 대형 제목. |
| `heading-4` | 21px | 1.36 | 600 | -0.008em | sans | 카드·패널 제목(H4)·Dialog 제목. |
| `heading-5` | 18px | 1.44 | 600 | -0.004em | sans | 작은 블록 제목(H5)·Empty State 제목. |
| `heading-6` | 16px | 1.5 | 600 | 0 | sans | 목록 그룹 제목(H6)·Table 셀 강조. |
| `body-lg` | 19px | 1.68 | 400 | -0.004em | sans | 리드 문단·Brand/Product 페이지 본문. 한 줄 최대 reading-max. |
| `body` | 16px | 1.65 | 400 | 0 | sans | 기본 본문. 한글 가독성을 위해 1.65 행간, word-break: keep-all. |
| `body-sm` | 14px | 1.6 | 400 | 0 | sans | Utility 화면 본문·설명·Dialog 본문·Table 셀. |
| `caption` | 12px | 1.5 | 400 | 0.01em | sans | 출처·각주·메타 정보·Tooltip. ink-muted 이상의 대비에서만. |
| `label` | 13px | 1.4 | 500 | 0.005em | sans | 폼 라벨·Tabs·Badge 텍스트·Table 헤더. |
| `button` | 15px | 1.2 | 600 | -0.003em | sans | Button(md·lg). sm 버튼은 13px로 줄인다. |
| `overline` | 12px | 1.4 | 600 | 0.08em | sans | 섹션 아이브로우. 라틴 문자는 대문자, 한글은 자간 0.02em으로. 섹션당 하나. |
| `kpi` | 48px | 1.0 | 600 | -0.025em | sans | Stat 수치·대시보드 핵심 숫자. font-variant-numeric: tabular-nums. 반드시 출처(caption)와 함께. |
| `data` | 13px | 1.5 | 400 | 0 | mono | ID·코드·금액 열·로그. 정렬되는 숫자 열. |
| `code` | 13px | 1.6 | 400 | 0 | mono | 코드 블록(surface-sunken 바탕)·인라인 코드. |

## 간격

4px 기반. 컴포넌트 내부는 space-1~6, 컴포넌트 사이는 space-4~12, 섹션 사이는 section-*.

| 토큰 | 값 | 용도 |
|---|---|---|
| `space-1` | `4px` | 아이콘–텍스트 간격, Badge 내부. |
| `space-2` | `8px` | 인접 컨트롤 간격, 라벨–입력 간격. |
| `space-3` | `12px` | 버튼 그룹 간격, 리스트 항목 내부. |
| `space-4` | `16px` | 카드 내부 작은 패딩, 폼 필드 간격. |
| `space-5` | `20px` | 모바일 컨테이너 좌우 여백. |
| `space-6` | `24px` | 카드·Dialog 패딩, 그리드 gutter. |
| `space-8` | `32px` | 블록 간 간격, 태블릿 컨테이너 여백. |
| `space-10` | `40px` | 데스크톱 컨테이너 여백, 제목–본문 블록 간격. |
| `space-12` | `48px` | 컴포넌트 그룹 간 간격. |
| `space-16` | `64px` | 섹션 내부 블록 간 큰 간격. |
| `section-sm` | `80px` | Utility 페이지 섹션 간격·모바일 섹션 간격. |
| `section-md` | `128px` | Product Experience 섹션 간격. |
| `section-lg` | `192px` | Brand Experience 섹션 간격·챕터 전환. |

## 반경

모든 요소를 같은 반경으로 만들지 않는다. 작을수록 정밀, 클수록 부드러움.

| 토큰 | 값 | 용도 |
|---|---|---|
| `radius-none` | `0` | 풀블리드 미디어·테이블·섹션 밴드. |
| `radius-xs` | `4px` | Checkbox·Tooltip·인라인 코드. |
| `radius-md` | `8px` | Button·입력 필드·Select·Menu 항목. |
| `radius-lg` | `12px` | Card·Alert·Menu·Toast 표면. |
| `radius-xl` | `20px` | Dialog·대형 미디어 카드. |
| `radius-full` | `999px` | Badge·Switch·Radio·Progress 트랙·아바타. |

## 그림자

그림자는 떠 있는 표면에만. 카드는 그림자 대신 divider 외곽선을 쓴다.

| 토큰 | Light | Dark | 용도 |
|---|---|---|---|
| `shadow-1` | `0 1px 2px rgba(18, 18, 17, 0.06), 0 0 0 1px rgba(18, 18, 17, 0.04)` | `0 1px 2px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.04)` | 인터랙티브 카드 hover, 고정 헤더 스크롤 상태. |
| `shadow-2` | `0 12px 32px -12px rgba(18, 18, 17, 0.2), 0 2px 6px rgba(18, 18, 17, 0.06)` | `0 12px 32px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.06)` | Menu·Popover·Tooltip·Toast. |
| `shadow-3` | `0 32px 80px -24px rgba(18, 18, 17, 0.32), 0 4px 12px rgba(18, 18, 17, 0.08)` | `0 32px 80px -24px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(255, 255, 255, 0.08)` | Dialog·Sheet. |

## 시간

크기·거리가 클수록 길게. Utility 화면은 base 이하만.

| 토큰 | 값 | 용도 |
|---|---|---|
| `duration-instant` | `80ms` | press·체크 등 즉각 피드백. |
| `duration-fast` | `140ms` | hover·색 전환·Tooltip. |
| `duration-base` | `220ms` | Menu·Accordion·Tabs 전환. |
| `duration-slow` | `360ms` | Dialog·Toast 진입, 패널 슬라이드. |
| `duration-slower` | `560ms` | 섹션 리빌·이미지 전환. |
| `duration-cinematic` | `900ms` | Brand Experience 장면 전환·카메라 이동(스크럽이 아닐 때). |

## 곡선

진입은 감속, 퇴장은 가속. 스크롤 스크럽은 linear.

| 토큰 | 값 | 용도 |
|---|---|---|
| `ease-standard` | `cubic-bezier(0.2, 0, 0, 1)` | 일반 상태 전환·hover. |
| `ease-enter` | `cubic-bezier(0.16, 1, 0.3, 1)` | 등장·확장(Dialog, Menu, 리빌). |
| `ease-exit` | `cubic-bezier(0.7, 0, 0.84, 0)` | 퇴장·축소. duration은 진입의 70%. |
| `ease-cinematic` | `cubic-bezier(0.65, 0, 0.35, 1)` | 장면 전환·카메라 이동. |
| `ease-linear` | `linear` | ScrollTrigger scrub·Progress 무한 루프. |

## 레이아웃·브레이크포인트

12열 그리드. 콘텐츠 폭은 목적에 맞춰 세 단계 중 고른다.

| 토큰 | 값 | 용도 |
|---|---|---|
| `reading-max` | `680px` | 긴 본문·문서·폼의 최대 폭(한글 약 38자). |
| `content-max` | `1200px` | 기본 콘텐츠 컨테이너. |
| `wide-max` | `1440px` | 대시보드·풀폭 제품 프리뷰. 그 이상은 풀블리드. |
| `grid-gutter` | `24px` | 그리드 열 간격(모바일 16px). |
| `bp-sm` | `640px` | 대형 폰 이상. |
| `bp-md` | `768px` | 태블릿 세로. |
| `bp-lg` | `1024px` | 태블릿 가로·소형 노트북. |
| `bp-xl` | `1280px` | 데스크톱. |
| `bp-2xl` | `1536px` | 대형 데스크톱. |

## z-index

| 토큰 | 값 | 용도 |
|---|---|---|
| `z-sticky` | `100` | 고정 헤더·고정 테이블 헤더. |
| `z-dropdown` | `300` | Menu·Select 팝업. |
| `z-overlay` | `400` | scrim. |
| `z-modal` | `500` | Dialog. |
| `z-toast` | `600` | Toast. |
| `z-tooltip` | `700` | Tooltip. |
