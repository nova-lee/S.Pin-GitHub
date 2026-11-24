# 컴포넌트 23종 — 상태·치수·사용 규칙

모든 값은 토큰 변수를 참조한다(`TOKENS.md`). 프레임워크와 무관하게 아래 규격(받는 값 · 상태 · Do/Don't)을 그대로 구현한다. 공통 상태 규칙: Hover는 한 단계 진하게, Focus는 `focus` 2px 실선 + offset 2px, Active는 scale 0.98, Disabled는 불투명도 0.4.

목록 — 행동: Button · 입력: TextField, Select, Checkbox, RadioGroup, Switch · 내비게이션: SiteHeader, Tabs, Breadcrumb, Pagination · 피드백: Alert, Toast, Badge, Progress, Spinner · 오버레이: Dialog, Tooltip, Menu · 데이터·콘텐츠: Table, Stat, Card, Accordion, EmptyState

---

## Button

사용자가 실행할 행동 하나를 명확히 표시하는 버튼으로, 잉크(primary)가 주 행동이고 색은 행동에 쓰지 않는다.

**언제 쓰는가**
- **primary**: 화면의 목적이 되는 행동. 한 화면(또는 Dialog)에 하나.
- **secondary**: primary 옆의 대안 행동(미리보기, 임시 저장).
- **outline**: 툴바·필터처럼 여러 개가 나란히 놓이는 동급 행동.
- **ghost**: 취소·닫기처럼 물러나야 하는 행동.
- **danger**: 되돌릴 수 없는 파괴적 행동. 반드시 확인 Dialog를 거친다.
- **link**: 문장 안 또는 카드 하단의 이동. 페이지 이동이면 `<a>`를 쓴다.

**받는 값**: `variant`, `size`(`sm` 32 · `md` 40 · `lg` 48), `children`(동사로 시작하는 짧은 라벨), 선택적으로 `iconStart`/`iconEnd`, `loading`, `disabled`, `fullWidth`. 나머지 속성은 `<button>`으로 전달.

**상태**: Default · Hover(채움 한 단계 진하게) · Focus(`focus` 2px 링, offset 2px) · Active(scale 0.98, `duration-instant`) · Disabled(불투명도 0.4) · Loading(스피너 + `aria-busy`, 폭 유지).

- Do: "변경 사항 저장"처럼 결과를 말하는 동사형 라벨. 문장형 대소문자.
- Do: 버튼 그룹은 primary를 오른쪽(폼·Dialog) 또는 왼쪽(히어로)에 일관되게.
- Don't: primary를 한 화면에 여러 개 두거나 accent 색으로 칠하지 않는다.
- Don't: 아이콘만 있는 버튼에 라벨 없이 쓰지 않는다 — `aria-label` 필수.
- Don't: 그라데이션·글로우·그림자로 버튼을 강조하지 않는다.

## TextField

한 줄 또는 여러 줄의 텍스트를 입력받는 필드로, 라벨·힌트·오류가 접근성 속성까지 연결된 상태로 제공된다.

**받는 값**: `label`(항상 보이는 라벨 — placeholder로 대체 금지), 선택적으로 `hint`, `error`(문장으로 된 해결 방법), `required`, `multiline`/`rows`, 그리고 `value`·`onChange` 등 `<input>`/`<textarea>` 속성.

**상태**: Default(`border` 3:1) · Hover(`ink-secondary` 테두리) · Focus(`focus` 테두리 + 1px 링) · Error(`danger` 테두리 + 아이콘 + 메시지, `aria-invalid`) · Disabled(`surface-sunken` 바탕).

- Do: 오류 메시지는 무엇이 잘못됐고 어떻게 고치는지 한 문장으로. "유효하지 않은 값"은 금지.
- Do: 오류는 제출 시 또는 필드를 벗어날 때 표시. 입력 중에는 방해하지 않는다.
- Do: 폼 폭은 `reading-max` 이내, 관련 필드는 2열 그리드로 묶는다.
- Don't: 라벨을 placeholder로만 표시하거나, 필드 안에 장식 아이콘을 넣지 않는다.

## Select

정해진 목록에서 하나를 고르는 네이티브 select로, 플랫폼 기본 선택 UI와 키보드 동작을 그대로 살린다.

**받는 값**: `label`, `options`(문자열 또는 `{ value, label, disabled }`), 선택적으로 `placeholder`, `hint`, `error`, `required`, `value`/`onChange`.

**언제**: 선택지 5~15개. 4개 이하면 RadioGroup(한눈에 비교), 15개 초과면 검색 가능한 콤보박스를 만든다.

- Do: 모바일에서 네이티브 피커가 뜨도록 네이티브 `<select>`를 유지한다.
- Don't: 단순 선택에 커스텀 드롭다운을 새로 만들지 않는다 — 접근성 비용이 크다.

## Checkbox

여러 항목을 독립적으로 켜고 끄는 선택 컨트롤로, 켜짐 상태는 `accent` 채움과 `on-accent` 체크로 표시한다.

**받는 값**: `label`, 선택적으로 `description`, `checked`/`defaultChecked`, `onChange`, `indeterminate`(일부 선택), `disabled`, `name`·`value`.

**상태**: Unchecked(`border`) · Hover(`ink` 테두리) · Checked · Indeterminate · Focus(`focus` 링) · Disabled(0.4).

- Do: 라벨 전체가 클릭 영역이다. 터치 타깃은 행 높이로 44px을 확보한다.
- Do: 즉시 적용되는 설정은 Switch, 제출해야 적용되는 선택은 Checkbox.
- Don't: 상호 배타적인 선택에 쓰지 않는다 — RadioGroup을 쓴다.

## RadioGroup

상호 배타적인 2~5개 선택지 중 하나를 고르게 하는 묶음으로, `fieldset`/`legend`로 그룹 의미를 전달한다. 단일 Radio는 항상 그룹 안에서 쓴다.

**받는 값**: `legend`, `name`, `options`(`{ value, label, description?, disabled? }`), `value`/`defaultValue`, `onChange(value)`, 선택적으로 `direction`(`column` | `row`), `error`.

- Do: 기본값을 하나 선택해 둔다(사용자가 반드시 골라야 하는 경우만 예외).
- Do: 선택지가 짧고 2~3개면 `direction="row"`.
- Don't: 6개 이상이면 Select로 바꾼다.

## Switch

누르는 즉시 적용되는 켜기/끄기 설정으로, `role="switch"`와 `aria-checked`로 상태를 전달한다.

**받는 값**: `label`, 선택적으로 `description`, `checked`/`defaultChecked`, `onChange(checked)`, `disabled`.

- Do: 설정 화면처럼 저장 버튼 없이 바로 반영되는 곳에만 쓴다.
- Do: 라벨은 켜졌을 때의 상태를 말한다("알림 받기").
- Don't: 폼 제출이 필요한 동의 항목에는 Checkbox를 쓴다.

## SiteHeader

웹사이트 전역 헤더로, 워드마크·주 메뉴(최대 5개)·행동 1~2개를 64px 높이 한 줄에 담는다.

**받는 값**: `brand`(워드마크 텍스트 — 로고 파일이 있으면 교체), `links`(`{ label, href }`), `current`(현재 섹션 라벨), `actions`(Button 노드), `sticky`.

- Do: 바탕은 `canvas`, 아래 `divider` 헤어라인. 스크롤 후에도 같은 모습을 유지한다.
- Do: 주 행동은 primary `sm` 버튼 하나, 보조는 ghost.
- Don't: 반투명 유리 효과·블러 헤더를 기본값으로 쓰지 않는다. 히어로 위에 겹쳐야 하는 Brand Experience에서만, 대비를 검증한 뒤 예외로.
- Don't: 메뉴 6개 이상 — 정보 구조를 먼저 다시 설계한다.

## Tabs

같은 맥락 안의 동등한 보기들을 전환하는 탭으로, 선택은 잉크 텍스트와 2px 잉크 밑줄로 표시한다.

**받는 값**: `items`(`{ value, label, count?, disabled?, content? }`), `value`/`defaultValue`, `onChange`, `label`(탭 목록의 접근성 이름). `content`가 없으면 탭 목록만 렌더하고 패널은 사용하는 쪽이 그린다.

**상태**: Default(`ink-muted`) · Hover/Selected(`ink`) · Focus(안쪽 포커스 링) · Disabled(0.4). 밑줄은 `duration-base`·`ease-enter`로 그려진다.

- Do: 키보드 ← → Home End로 이동(로빙 tabindex).
- Do: 탭 2~6개. 그 이상이면 사이드 내비게이션으로.
- Don't: 페이지 이동(URL 변경)에 탭 모양을 쓰지 않는다 — SiteHeader나 링크를 쓴다.
- Don't: 알약·카드 모양 탭, 색 채움 탭을 만들지 않는다.

## Breadcrumb

계층 3단계 이상인 Utility·문서 화면에서 현재 위치와 상위 경로를 보여주는 내비게이션이다.

**받는 값**: `items`(`{ label, href? }` 배열, 마지막 항목이 현재 페이지 — 링크 없음).

- Do: 페이지 제목 바로 위에, `body-sm` 크기로 조용하게.
- Don't: 2단계 이하 구조나 Brand Experience 페이지에는 쓰지 않는다.

## Pagination

긴 목록·테이블을 페이지 단위로 탐색하게 하는 컨트롤로, 현재 페이지는 잉크 채움으로 표시한다.

**받는 값**: `total`(전체 페이지 수), `page`/`defaultPage`, `onChange(page)`.

- Do: 테이블 아래 오른쪽 정렬, 왼쪽에는 "1–20 / 482건" 같은 범위를 `caption`으로.
- Do: 7페이지를 넘으면 첫·끝·현재 주변만 보이고 나머지는 생략 기호로 접힌다.
- Don't: 피드형 콘텐츠에는 쓰지 않는다 — "더 보기" 버튼 또는 무한 스크롤.

## Alert

페이지나 섹션 안에서 지속적으로 보여야 하는 상태 메시지로, 옅은 `*-subtle` 바탕·톤 색 아이콘·잉크 텍스트로 구성된다.

**받는 값**: `tone`(`info` | `success` | `warning` | `danger` | `neutral`), `title`(한 문장 요약), 선택적으로 `children`(원인과 다음 행동), `action`(Button), `onDismiss`.

- Do: 색만으로 의미를 전달하지 않는다 — 아이콘과 제목 문장이 항상 함께 있다.
- Do: danger는 `role="alert"`로 즉시 읽힌다. 나머지는 `status`.
- Don't: 왼쪽 굵은 색 띠(left-border) 카드, 그라데이션, 그림자를 쓰지 않는다.
- Don't: 일시적 확인 메시지에 쓰지 않는다 — Toast를 쓴다.

## Toast

사용자 행동의 결과를 잠시 알려주는 반전 표면(`surface-inverse`) 메시지로, 화면 하단 중앙 또는 오른쪽 아래에 쌓인다.

**받는 값**: `children`(결과 한 문장), 선택적으로 `tone`(`neutral` | `success` | `warning` | `danger`), `actionLabel`+`onAction`(실행 취소 등), `onClose`. 위치·쌓기·자동 닫힘 타이머(기본 5초, 행동이 있으면 8초)는 토스트 영역이 관리한다.

- Do: "~했습니다"처럼 완료된 결과를 말한다. 파괴적 행동에는 "실행 취소"를 붙인다.
- Do: `aria-live="polite"`로 읽히며, 포커스를 빼앗지 않는다.
- Don't: 사용자가 반드시 읽고 결정해야 하는 내용 — Dialog나 Alert를 쓴다.

## Badge

항목 옆에 붙는 한두 단어의 상태·분류 표시로, 알약 모양(`radius-full`)과 `label` 글꼴을 쓴다.

**받는 값**: `children`(1~2단어), 선택적으로 `tone`(`neutral` | `accent` | `success` | `warning` | `danger` | `outline` | `inverse`), `dot`.

- Do: 톤은 의미가 있을 때만. 분류(카테고리)는 neutral 또는 outline.
- Do: 상태 Badge는 단어 자체가 상태를 말한다("운영 중") — 색만 다른 빈 점 금지.
- Don't: 클릭 가능한 필터로 쓰지 않는다 — 필터는 토글 버튼으로 만든다.

## Progress

작업의 진행 정도를 4px 트랙(`surface-sunken`) 위 `accent` 채움으로 보여주는 막대다. 값이 없으면 불확정(indeterminate) 상태가 된다.

**받는 값**: `label`, `value`(없으면 불확정), `max`(기본 100), `showValue`.

- Do: 2초 이상 걸리는 작업에만. 그보다 짧으면 Spinner 또는 아무것도 표시하지 않는다.
- Do: 모션 줄이기 설정에서는 불확정 애니메이션이 정지된 옅은 막대로 바뀐다.
- Don't: 진척과 무관한 장식용 게이지·도넛을 만들지 않는다.

## Spinner

짧은 대기(0.4~2초)를 알리는 회전 표시로, `currentColor`를 따라 버튼·텍스트 색에 맞춰진다.

**받는 값**: 선택적으로 `size`(`sm` | `md` | `lg`), `label`(스크린리더용, 기본 "불러오는 중").

- Do: 콘텐츠 영역 로딩은 레이아웃이 보이는 스켈레톤(`surface-sunken` 블록)을 우선한다.
- Don't: 화면 전체를 가리는 스피너 오버레이로 기다리게 하지 않는다.

## Dialog

현재 흐름을 멈추고 결정을 요구하는 모달로, `surface-raised` 패널·`radius-xl`·`shadow-3`과 블러 없는 `scrim`으로 구성된다.

**받는 값**: `open`, `onClose`, `title`(질문 또는 행동), 선택적으로 `description`, `children`(폼 등), `footer`(Button들 — 오른쪽 끝이 주 행동), `size`(`sm` 400 · `md` 520 · `lg` 720), `dismissible`, `autoFocus`(기본 true — 본문 첫 입력, 없으면 푸터 첫 버튼(취소)으로 포커스).

**동작**: 열리면 본문 첫 입력 또는 덜 파괴적인 버튼으로 포커스 이동 · Tab 순환 가두기 · Esc와 바깥 클릭으로 닫힘(`dismissible`) · 닫히면 원래 요소로 포커스 복귀 · `aria-modal`, 제목·설명 연결.

- Do: 제목은 질문형("삭제할까요?"), 버튼은 결과형("영구 삭제") — "확인/취소" 금지.
- Do: 파괴적 행동은 danger 버튼 + 결과 설명.
- Don't: 단순 정보 전달·성공 알림에 쓰지 않는다. Dialog 위에 Dialog를 띄우지 않는다.
- Don't: 배경 블러(glassmorphism)를 넣지 않는다.

## Tooltip

아이콘 버튼의 이름이나 짧은 보조 정보를 hover(400ms 지연)·포커스(즉시) 시 보여주는 반전 말풍선이다.

**받는 값**: `content`(한 줄, 최대 240px), `children`(포커스 가능한 단일 요소), 선택적으로 `side`(`top` | `bottom`), `delay`, `open`(문서·온보딩용 강제 표시).

- Do: 자식에 `aria-describedby`를 연결한다. Esc로 닫힌다.
- Don't: 작업에 꼭 필요한 정보를 툴팁에만 두지 않는다 — 터치 기기에서는 보이지 않는다.
- Don't: 링크·버튼 등 상호작용 요소를 툴팁 안에 넣지 않는다.
- Note: 화면 가장자리 충돌 회피(flip/shift)가 필요하면 Floating UI 등으로 위치를 계산한다.

## Menu

버튼에서 열리는 행동 목록으로, `surface-raised`·`shadow-2`·`radius-lg` 표면에 36px 항목이 놓인다.

**받는 값**: `items`(`{ label, onSelect, shortcut?, disabled?, tone? }` 또는 `{ separator: true }`), 선택적으로 `label`(기본 트리거 라벨), `trigger`(직접 만든 버튼 요소), `align`(`start` | `end`), `defaultOpen`(문서용 — 열려도 포커스를 가져가지 않음).

**동작**: 열리면 첫 항목에 포커스 · ↑↓ 이동 · Esc/Tab으로 닫히고 트리거로 복귀 · 바깥 클릭으로 닫힘.

- Do: 파괴적 항목은 맨 아래, 구분선 뒤, `tone: 'danger'`.
- Don't: 값을 고르는 용도로 쓰지 않는다 — Select/RadioGroup. 내비게이션 링크 모음에도 쓰지 않는다.

## Table

비교·스캔이 목적인 데이터 목록으로, 세로 테두리 없이 헤어라인 행 구분과 오른쪽 정렬된 표 숫자(tabular-nums)로 정밀하게 읽힌다.

**받는 값**: `columns`(`{ key, label, align?, numeric?, sortable?, width?, render? }`), `rows`, 선택적으로 `sort`(`{ key, direction }`)+`onSort(key)`, `density`(`comfortable` 56px | `compact` 40px), `caption`(출처·범위), `empty`, `rowKey`. 정렬·필터·페이지 계산은 사용하는 쪽이 한다.

- Do: 숫자·날짜·금액 열은 `align: 'end', numeric: true`. 단위는 헤더에.
- Do: 표는 `surface` 위에 두고, 출처나 "예시 데이터" 여부를 `caption`에 밝힌다.
- Do: Utility 화면은 compact, 보고서·제안서 표는 comfortable.
- Don't: 지브라 줄무늬, 세로선, 셀마다 다른 색 채움을 쓰지 않는다.

## Stat

하나의 핵심 수치를 라벨·변화량·출처와 함께 보여주는 지표 블록으로, 위쪽 1px 잉크 룰이 에디토리얼한 리듬을 만든다.

**받는 값**: `label`, `value`(서식이 적용된 문자열), `source`(**필수** — 없으면 "출처 미기재" 경고를 표시), 선택적으로 `unit`, `delta`(숫자 또는 문장), `deltaUnit`(`%`, `분` 등), `deltaLabel`(비교 기준), `goodDirection`(`up` | `down` — 비용·시간처럼 줄어드는 게 좋은 지표는 `down`), `trend`.

- Do: 변화의 좋고 나쁨은 화살표·부호·색이 함께 말한다(색만으로 전달하지 않음).
- Do: 3~4개를 가로로, `space-6` 간격. 모바일은 2열.
- Don't: 근거 없는 수치, 반올림된 과장("10x"), 예시 데이터를 실제처럼 표기하지 않는다.

## Card

하나의 대상(사례, 문서, 설정 묶음)을 요약하는 표면으로, 그림자 대신 `divider` 외곽선과 `radius-lg`로 구분한다.

**받는 값**: 선택적으로 `variant`(`outlined` | `sunken` | `plain`), `href`(카드 전체가 링크일 때만 — hover 시 `border`+`shadow-1`, 제목 밑줄), `eyebrow`, `title`, `children`, `media`(16:10 슬롯 — 실제 이미지·제품 화면), `footer`.

- Do: 카드는 묶을 이유가 있을 때만. 단순 텍스트 나열은 카드 없이 그리드와 여백으로.
- Do: 같은 그리드에서 카드 높이·미디어 비율을 맞춘다.
- Don't: 모든 섹션을 같은 3열 카드로 만들지 않는다. 아이콘+제목+설명 3열 반복은 금지 패턴이다.
- Don't: 카드 안에 또 카드, 왼쪽 색 띠, 그라데이션 테두리, 글로우를 쓰지 않는다.

## Accordion

질문·세부 항목을 접었다 펼치는 목록으로, 헤어라인 구분과 45° 회전하는 + 아이콘만으로 상태를 표시한다.

**받는 값**: `items`(`{ value?, title, content }`), 선택적으로 `multiple`(여러 개 동시 열기), `defaultOpen`(value 배열).

- Do: FAQ·세부 사양처럼 "필요한 사람만 읽는" 정보에.
- Do: 트리거는 `<h3>` 안의 버튼 — `aria-expanded`/`aria-controls`를 연결한다.
- Don't: 핵심 정보나 첫 화면 메시지를 접어 두지 않는다.

## EmptyState

목록·대시보드에 아직 내용이 없을 때 이유와 첫 행동을 알려주는 블록으로, 기본은 왼쪽 정렬이다(`align="center"`는 화면 전체가 비었을 때만).

**받는 값**: `title`(지금 상태를 사실대로), `children`(왜 비었는지·무엇을 하면 되는지), `action`(primary 1개), 선택적으로 `secondaryAction`, `icon`, `align`.

- Do: 검색 결과 없음, 권한 없음, 오류로 인한 빈 상태를 서로 다른 문장으로 구분한다.
- Don't: 일러스트·캐릭터·이모지로 빈 공간을 채우지 않는다.
