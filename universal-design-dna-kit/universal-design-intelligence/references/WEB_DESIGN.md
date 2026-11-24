# 웹 디자인 표준

웹사이트·SaaS·대시보드·인터랙티브 경험의 구현 기준. 모든 페이지를 3D로 만들지 않는다. **페이지마다 경험 레이어를 먼저 정하고**, 레이어가 허용하는 만큼만 연출한다.

## 경험 레이어

| 레이어 | 대상 | 허용 | 섹션 간격 | 모션 상한 |
|---|---|---|---|---|
| **Brand Experience** | 홈, 브랜드·서비스·제품 소개, 캠페인 | 실제 3D, scroll-driven 연출, 풀스크린 구성, `display-*` 타이포, 장면 전환 | `section-lg` | `duration-cinematic`, 스크럽 |
| **Product Experience** | 기능 소개, 솔루션 상세, 가격, 기능별 랜딩 | 인터랙티브 제품 시연, 실제 UI 프리뷰, 데이터 시각화, 기능 중심 모션 | `section-md` | `duration-slower` |
| **Utility Experience** | 로그인, 가입, 대시보드, 설정, 관리자, 데이터 관리 | 높은 정보 밀도, 일관된 컴포넌트, 빠른 피드백, 명확한 상태 | `section-sm` | `duration-base`, 3D·장식 모션 금지 |

한 사이트 안에서 레이어가 달라도 토큰·타이포·컴포넌트는 같다. 레이어는 **밀도와 연출의 양**만 바꾼다.

## Brand Experience 구성

- 첫 화면은 한 문장(`display-xl` 이상) + 한 개의 결정적 비주얼 + 주 행동 하나. 부가 설명은 스크롤 아래로.
- 섹션마다 다른 구성을 쓴다: 풀블리드 미디어 → 비대칭 텍스트 분할 → 고정(pin)된 제품 시퀀스 → `surface-inverse` 밴드 → 증거(실제 사례·수치·출처) → 마무리 행동.
- 증거 섹션의 수치는 `Stat`으로, 출처를 반드시 붙인다. 고객 로고는 실제 허락된 것만.
- 히어로 비주얼은 실제 제품·실제 3D·실제 촬영. 추상적 블롭·그라데이션 배경을 쓰지 않는다.

## Product Experience 구성

- 기능 하나 = 섹션 하나: 메시지 제목(`heading-2`) → 실제 UI 프리뷰 또는 짧은 루프 → 2~3개의 구체적 효용.
- 제품 UI 프리뷰는 실제 화면 캡처 또는 실제 컴포넌트로 만든 축소 화면. 가짜 대시보드 이미지를 그리지 않는다.
- 가격 페이지: 플랜 비교는 `Table`(기능 행 × 플랜 열), 추천 플랜은 `Badge` 하나로 표시. 카드 3개에 체크리스트를 반복하지 않는다.

## Utility Experience 구성

- 좌측 내비게이션(240px) 또는 상단 헤더 + 콘텐츠. 콘텐츠 폭 `wide-max`, 폼은 `reading-max`.
- 페이지 상단: `Breadcrumb`(3단계 이상) → `heading-1` 제목 + 우측 주 행동 → 필터·`Tabs` → 본문.
- 테이블 `density="compact"`, 행 hover만 허용. 차트는 `data-1` 강조 하나.
- 상태 화면을 반드시 설계한다: 로딩(레이아웃 스켈레톤), 빈 상태(`EmptyState`), 오류(`Alert danger` + 다시 시도), 권한 없음.

## 전역 레이아웃 시스템

- **Header**: `SiteHeader` — 64px, `canvas` 바탕, `divider` 하단선, 메뉴 5개 이하, 주 행동 하나. 768px 미만은 메뉴 버튼.
- **Footer**: `surface-inverse` 또는 `canvas` + 상단 `divider`. 4~5열 링크 그룹(`label` 제목 + `body-sm` 링크), 하단에 법적 고지 `caption`.
- **Main/Section Container**: 섹션은 풀폭, 내부는 `content-max` 중앙 배치, 좌우 여백은 레이아웃 규칙.
- **Page Transition**: 기본은 없음(즉시). Brand 사이트에서만 `duration-slow` 불투명도 전환, View Transitions API 사용 시 reduced-motion에서 끈다.
- **Breadcrumb**: Utility·문서에서 3단계 이상일 때만.
- **Loading / Empty / Error**: 모든 데이터 영역에 세 상태를 정의한 뒤 구현을 시작한다.

## 컴포넌트 상태

컴포넌트마다 Default · Hover · Focus · Active · Disabled · Loading · Error · Success 중 해당되는 상태를 모두 구현한다. 구현 기준은 `COMPONENTS.md`. 상태가 정의되지 않은 컴포넌트는 완성으로 보지 않는다.

## 기술 기준

- 스타일은 토큰 변수(`var(--surface)`, `var(--space-6)`)로만. 하드코딩된 hex·px는 리뷰에서 반려한다.
- Tailwind 프로젝트는 `theme.extend`에 토큰을 매핑하고 임의 값(`bg-[#...]`)을 금지한다.
- 다크 테마는 `[data-theme="dark"]` 한 곳에서 전환. 컴포넌트 안에 다크 분기를 쓰지 않는다.
- 이미지는 `srcset`·`sizes`, AVIF/WebP, `loading="lazy"`(첫 화면 제외), 명시적 `width`/`height`로 레이아웃 이동을 막는다.
- 폰트는 `font-display: swap`, 첫 화면 서체만 preload. Pretendard는 dynamic subset 사용을 권장.
- 성능 목표: LCP ≤ 2.5s, CLS ≤ 0.1, INP ≤ 200ms(모바일 4G 기준). 3D·모션 추가 후에도 유지되어야 한다.
