# ThreeUI 기법 카탈로그 — 책장 넘김 외

> 공유본 안내: "책장 넘김 기준 구현"(`page-curl.js` · `page-curl.css` · `flex-book.js`)은 이 DNA의 작성자가 만든 아티팩트다. 링크는 키트의 README에 있고, 작성자가 공유한 경우에만 열린다. 열 수 없으면 아래 구조·수식·수치대로 직접 작성한다.

ThreeUI(threeui.com, Meng To)의 Community 소스를 직접 읽고, 다음 사이트에 바로 가져다 쓸 기법을 정리했다(2026-11-18). 책장 넘김은 두 방식을 다시 작성해 **기준 구현**으로 남겼다(도판은 퍼블릭 도메인 헤켈 도판).

책·카탈로그·매거진·포트폴리오·브로슈어·도감처럼 **페이지를 넘기는 경험**이 이야기에 맞는 사이트는 이 문서에서 시작한다.

## 출처와 라이선스

| 구분 | 범위 | 가져오는 법 | 규칙 |
|---|---|---|---|
| Community | 부모 컴포넌트 43개 · 변형 163개 · 경로 104개 | GitHub `MengTo/threeui`, npm `@designcodeio/threeui`(React 18~19, three ≥0.149) | MIT. 코드를 가져오면 파일 머리 주석에 "기법 출처: ThreeUI Community(Meng To, MIT)"를 남긴다 |
| Pro · Beta | 부모 컴포넌트 Pro 108개·Beta 23개는 공개 소스에서 빠짐(Book of Japan, Ashen Press, Workshop Books, 3D Paper 등) | 유료($199/년, $299 평생), 소스는 인증 CLI로만 | 사이트·프리뷰에서 복제하지 않는다. 구성과 원리만 참고한다 |
| 카탈로그 썸네일·프리뷰 영상 | threeui.com에서 불러오는 미디어 | — | MIT 아님. 쓰지 않는다 |

Community의 그림 자산 중 Sketchbook 펼침면은 생성 이미지(Higgsfield)다. 이 DNA의 "실제에서 출발한다" 원칙에 따라 그대로 쓰지 않고 실제 스캔·사진·퍼블릭 도메인 도판으로 바꾼다.

## 책장 넘김 — 먼저 방식을 고른다

| 방식 | 언제 | 원본 | 보고 명칭 | 무게 |
|---|---|---|---|---|
| **A. CSS 중첩 스트립 컬** | 페이지 내용이 주인공 — 카탈로그, 포트폴리오, 매거진, 도감 | Sketchbook(`/css/sketchbook`) | CSS 3D 변형(실시간 3D 아님) | 라이브러리 없음, 넘기는 동안 DOM 약 40개 |
| **B. three.js 플렉시블 페이지** | 책이라는 물건이 주인공 — 표지 열기, 책장에서 꺼내기, 천·금박 재질 | Bookshelf(`/three-js/bookshelf`), Working Volumes 랜딩 | 실시간 3D(WebGL2) | three.js, 기준 구현 드로우콜 9 |
| **C. CSS 책 진열** | 여러 권을 한 화면에 진열하고 고른 책의 표지가 살짝 열림 | Field Manuals 랜딩(`bestsellers-book-showcase`) | CSS 3D 변형 | 라이브러리 없음 |

A와 B를 한 페이지에 함께 쓰지 않는다. B를 고르면 B 안에서 표지 열기·페이지 넘김을 모두 처리한다.

### A. CSS 중첩 스트립 컬

**구조.** `.pc-stage`(perspective 1750px, origin 50% 46%) › `.pc-tilt`(preserve-3d, 커서 기울기) › `.pc-book`(aspect-ratio = 펼침면 가로/세로). 쉬는 동안은 펼침면 이미지 한 장(`.pc-full`). 넘기는 동안만 왼쪽 반·오른쪽 반·넘어가는 장(`.pc-curl`)을 만든다.

**넘어가는 장.** 장을 세로 띠 N=18개로 자르고, 띠를 **서로의 자식으로 중첩**한다(`left:100%; transform: rotateY(var(--td))`). 각 띠는 앞뒤 두 면(`backface-visibility:hidden`, 뒷면은 `rotateY(180deg)`)을 갖고, 면의 배경은 펼침면 이미지 전체(`background-size: 책 폭`)를 띠 위치만큼 민 것이다.
- 앞면(넘기기 전 페이지): `background-position-x = −(접힘선 + i·띠폭)`
- 뒷면(다음 펼침면의 왼쪽): `(i+1)·띠폭 − 접힘선`

**수식.** 진행률 t(0→1)에 대해 `th = π·t`, `β = 0.6·sin(π·t)`, 루트 회전 `tt = th + β`, 띠 사이 꺾임 `td = 2β/N`. 양 끝(t=0, 1)에서 β=0이라 평평하게 놓이고, 중간에서 가장 휜다. `BETA=0`이면 문짝처럼 평평하게 돈다.

**빛.** 띠마다 `lit = |cos(tt − i·td)|`(빛을 향한 정도), 띠 안의 음영 그라데이션 알파 `(1 − lit)·0.62`를 양 끝 값(l1, l2)으로 칠한다. 아래 페이지의 접힘선 그림자 `opacity = sin(π·t)·0.62`, 책 밑 그림자 웅덩이는 `1 − sin(π·t)·0.45`(장이 들리면 옅어짐).

**상호작용.**
- 오른쪽 반을 누르면 다음, 왼쪽 반은 이전. 진행률 = 끈 거리 ÷ (책 폭 × 0.62).
- 놓을 때 t > 0.42 또는 속도 > 1.1/s면 끝까지(스프링 k170·c26), 아니면 제자리로(k150·c24). 6px 미만은 탭 = 넘김.
- 멈췄다가 놓으면 튕김 속도를 0으로 본다(마지막 이동에서 100ms 넘게 지나면). 원본에는 없고 기준 구현에서 더한 것이다.
- 커서 기울기 X ±4.5°·Y ±7°, 감쇠 0.14. 터치에서는 끄고, 넘기는 중에는 고정, 커서가 나가면 0으로.
- ←·→ 키, 이전·다음 버튼(44px), 캡션은 `aria-live="polite"`. `prefers-reduced-motion`이면 애니메이션 없이 바로 바꾼다.

**원본에 더 있는 것(필요할 때 가져온다).** 캡션 교차 페이드(나가는 제목 t 0.10→0.38, 들어오는 제목 0.56→0.86 — 겹치지 않게), 페이지 위에 놓인 돋보기(드래그해서 옮기면 그 자리에 머무름), 여러 장을 고정 템포로 넘기는 리플(tween), 줌 0.9~1.5와 더블클릭 복귀.

**함정.**
- 면 사이 머리카락 같은 틈 → 면을 `right:-1.1px`로 1px 겹친다.
- `--bw`(책 폭 px)를 resize 때마다 갱신한다. 펼침면 이미지 비율과 `--ratio`가 다르면 넘기는 장의 그림이 어긋난다.
- 펼침면 이미지에 책 바깥 여백이 있으면 `span`을 0.45 안팎으로 줄인다(원본 0.449).
- preserve-3d 체인 중간 요소에 `overflow`(visible 외), `opacity < 1`, `filter`, `clip-path`, `mask`를 걸면 3D가 평평해진다. 그런 효과는 체인 바깥이나 면 안쪽 자식에 건다.
- 이미지는 첫 화면에서 모두 미리 받아 둔다(넘길 때 깜빡임 방지).

### B. three.js 플렉시블 페이지

**구조.** 책 = Group. 표지는 경첩 그룹(`frontPivot`), 낱장은 경첩 그룹 여러 개(원본 6장 중 4장만 넘기고 나머지는 두께용). 낱장 = `PlaneGeometry(1, 1, 18, 8)` 두 장(앞, 뒤 — 뒤는 `rotation.y = π`)을 경첩 그룹에 붙이고 `scale`로 크기를 준다.

**쌓임.** 덮인 장 각도 `−0.038 + 순서·0.008`, 넘긴 장 `−π + 0.085 + 순서·0.014` — 완전히 0·π가 아니라 장마다 조금씩 벌어져 부채처럼 쌓인다. z 위치는 `restZ`(덮였을 때) ↔ `turnedZ`(넘겼을 때)로 바꿔 그리는 순서를 지킨다.

**휨(정점 변형).** 경첩 0 → 가장자리 1인 좌표 `μ`에 대해
`z = ( curve·(sin(πμ)·0.84 + μ²·0.16)·(1 + y·0.14) + twist·y·μ^1.35 + twist·sin(2πμ)·(1 − min(1, |y|·1.65))·0.09 ) · 면방향`
- 경첩 쪽은 붙어 있고(아치) 바깥 가장자리가 더 들린다(μ²). twist는 대각선 비틀림과 잔물결.
- 목표 curve = `0.004 + sin(π·넘김진행)·0.082 + 드래그부스트`. curve는 스프링(k178·c19, −0.025~0.19), twist는 k210·c21(±0.12)로 따라간다. 정점을 바꾼 뒤 `computeVertexNormals()`.
- 각도·위치는 `THREE.MathUtils.damp(현재, 목표, 10.5, dt)`. reduced-motion이면 속도 1000(즉시).

**드래그.** 6px 이상 움직이고 가로가 세로의 0.72배 이상일 때 방향을 정한다. 150px = 진행률 1. **최대 진행률이 0.18을 넘으면 놓았을 때 넘어간다**(표지 열기 0.16, 닫기 0.20). 속도는 `lerp(이전, 순간, 0.42)`, 위아래 성분 `dy/180`은 비틀림으로, 빠를수록 휨 부스트 `sin(π·t)·(0.032 + 속도·0.064)`.

**닫힌 책에 마우스를 올리면** 표지가 −0.16rad 살짝 들린다 — 열어 보라는 초대.

### B의 재질·조명 레시피 (Working Volumes · Bookshelf)

- 렌더러: `SRGBColorSpace`, `ACESFilmicToneMapping` 노출 0.9, `PCFSoftShadowMap`, 투명 배경. `FogExp2(배경색, 0.027)`. 환경광 `PMREMGenerator.fromScene(new RoomEnvironment(), 0.04)`, `environmentIntensity` 0.72. 카메라 화각 32°.
- OrbitControls(쓸 때): damping 0.075, 극각 0.24π~0.76π, 거리 2.8~7.2, 기본은 꺼 두고 상세 보기에서만.
- 천 표지: `MeshPhysicalMaterial` roughness 0.92~0.98, metalness 0.02~0.035, 천 normal·roughness·bump 맵(bumpScale 0.0035~0.0045), **sheen 0.26~0.34 · sheenRoughness 0.76~0.78 · sheenColor = 금박색**, clearcoat 0.06(roughness 0.72).
- 금박 글자: metalness 0.94, roughness 0.2, clearcoat 0.18(roughness 0.12), alphaMap + 엠보스 bumpMap 0.016, `depthWrite:false` + `polygonOffset`.
- 종이: roughness 1, sheen 0.014~0.025. 페이지 덩어리 지오메트리는 책등 쪽 16% 구간을 smoothstep으로 0.012 눌러(거터 압축) 펼친 책 모양을, 앞쪽 가장자리는 `x⁸·sin(y·31)·0.00055`로 종이 결을 만든다.
- 바닥 접촉 그림자: 512×128 캔버스의 방사형 그라데이션을 `alphaMap`으로 쓴 평면(섀도맵 대신). **알파맵은 밝기(G 채널)를 읽으므로 회색으로 그린다** — 흰색 + 투명도로 그리면 그림자가 통째로 불투명해진다(기준 구현에서 확인).
- 픽셀비 최대 2, 좁은 화면(<820px)·터치 1.5. WebGL 생성 실패 시 정적 목록·정지 이미지 폴백. 변화가 있을 때만 그린다(`requestFrame` 플래그, 컨트롤 `change`에서만).

### C. CSS 책 진열 — 표지 열림 + 페이지 부채

- 진열대 `perspective: 1400px`. 책 카드마다 `--x --y --w --r --yaw`(예: 왼쪽 −8°·yaw −7°, 가운데 0.8°·−3°, 오른쪽 8°·7°)로 흩어 놓는다. hover: 28px 들림 + `scale(1.035) rotateX(−1.5deg)`.
- 고르면 표지 `translateZ(18px) rotateY(−29deg)`, 표지 아래 페이지 4장이 `translateZ(10~13px) rotateY(−4/−8/−12/−16deg)`로 부채처럼 따라 열린다. `transform-origin: 1.5% center`(책등), 1200ms ease.
- 페이지 면은 `repeating-linear-gradient`(2px·1px 줄)로 종이 단면, 표지는 inset 그림자 두 겹으로 두께감. 표지 위에 `muted playsinline loop` 비디오를 얹을 수 있다.

## 그 밖에 가져올 만한 기법

소스를 읽은 것(✔)과 카탈로그 설명만 본 것(◦)을 구분한다.

| 기법 | 원본 | 핵심 | DNA 메모 |
|---|---|---|---|
| ✔ 셰이더 배경 골격 | Emerald Horizon | `PlaneGeometry(2,2)` + `OrthographicCamera(−1,1,1,−1,0,1)`, `ShaderMaterial`(depthTest·depthWrite 끔), `u_time`·`u_resolution`. ResizeObserver로 크기, IntersectionObserver + `document.hidden`이면 rAF 중지, 언마운트에 dispose | 장식 배경 금지 — 데이터·흐름 등 의미가 있을 때만 |
| ✔ 텍스트 디코드 | Article Headings | 텍스트 노드를 순회해 `easeOut(1−(1−p)²)` 예산만큼 원문 공개, 다음 몇 글자는 `#%&@$…A–Z0–9`에서 무작위, 공백과 일부 글자는 유지. reduced-motion이면 생략 | 헤드라인 한 곳만, 한글은 자모가 아니라 글자 단위로 |
| ✔ 근접 확대 독 | Animated Top Dock | 영향 = smoothstep(1 − 거리/반경), 스프링 `v += (목표−값)·spring; v *= damping`, 폭을 px로 직접 기록 | glass 변형은 블러 금지와 충돌 — modern 변형 기준 |
| ✔ 마스크 리빌 | Sylva·Kage 랜딩 | `clip-path: inset(100% 0 0 0 round r)` → `inset(0)` 1.05s ease-out, `--d`로 지연. 원형은 `circle(0%)` → `circle(76%)`. 줄 단위는 `.mask-line > span`을 `translateY(110%)` → 0. **인트로가 끝나면 clip-path를 제거**(남겨 두면 스태킹 컨텍스트가 생겨 아래 섹션 z-index가 꼬인다) | 섹션마다 반복하지 않는다 |
| ✔ 스크롤 단일 진행률 | Kage 랜딩 | `progressFor(scrollY)` 값 하나로 카메라·단어 리빌을 계산, 단어 i는 `(진행 − i·0.075)/0.62` | "모션 & 3D 표준"과 같은 원칙 |
| ✔ 커서 기울기 | Sketchbook | ±4.5°/±7°, 감쇠 0.14, 터치 제외 | 물건(책·카드)에만, 절제 |
| ◦ 천·종이 시뮬레이션 | Woven Cloth(washi 등), 3D Paper(Pro) | Verlet 천, 바람·포인터 반발 | 노렌·커튼·리넨 소재 브랜드 |
| ◦ 액체·물방울 | Liquid Form(레이마칭 금속 액체), Condensation(유리 위 물방울) | fBm·curl 노이즈, 마우스 반응 | 화장품·음료 |
| ◦ 디더·하프톤 | CRT, Halftone 계열 | 8×8 ordered dithering, 하프톤 점 | 레트로·인쇄 톤 |
| ◦ 입자 네트워크 | Constellation Field | Canvas 2D 별·연결선 | 데이터·네트워크 설명용 |

## DNA와 맞추는 법

- ThreeUI 페이지는 `backdrop-filter` 블러 헤더가 많다 → 불투명 표면으로 바꾼다.
- Sketchbook의 크림 종이 + 세리프(Instrument Serif·Newsreader) 조합은 원본의 인상이 강하다 → 프로젝트 서체·토큰으로 다시 정한다. 종이 질감은 실제 스캔에서 가져온다.
- CSS로 만든 책은 "CSS 3D 변형"으로 보고한다. 실시간 3D라고 부르지 않는다.
- 페이지 그림은 실제 자산: 고객의 실제 카탈로그 사진·스캔, 퍼블릭 도메인 도판(Wikimedia Commons, Biodiversity Heritage Library 등). 출처를 푸터에 적는다.

## 다음 요청에서 쓰는 순서

1. 이야기에 맞는 방식(A·B·C)을 고른다.
2. 기준 구현 코드에 접근할 수 있으면 `page-curl.js`·`page-curl.css` 또는 `flex-book.js`와 호출부(`index.html`의 module 스크립트)를 가져온다. 없으면 위 구조·수식·수치대로 작성한다.
3. 펼침면 이미지를 만든다: 좌·우 페이지를 합친 한 장, 모든 장 같은 비율(기준 구현 1600×1120 WebP, 장당 약 350KB). B는 그 이미지를 반으로 잘라 `CanvasTexture`로.
4. 토큰을 입힌다: 그림자 색 `--pc-shadow-rgb`, 버튼·포커스·캡션은 DNA 컴포넌트 규칙.
5. 검증: 진행률 0·45·90% 스크린샷, 드래그 커밋·복귀, 탭, ←·→ 키, 390px 폭 가로 스크롤 0, reduced-motion 즉시 전환, WebGL 끈 상태 폴백.

## 자산을 받을 때의 함정

- Wikimedia Commons 원본은 `Special:FilePath/<파일명>?width=900`으로 받는다. User-Agent 없이 연달아 요청하면 429가 난다 → UA를 붙이고 4초 간격.
- 헤켈 『Kunstformen der Natur』(1899–1904)는 퍼블릭 도메인이다. 기준 구현은 Discomedusae·Actiniae·Orchidae·Trochilidae·Muscinae·Filicinae·Basimycetes 도판을 썼다.

## 검증 기록 (2026-11-18, 작성자 기준 구현)

헤드리스 Chrome(소프트웨어 WebGL)에서 기준 구현을 확인했다. A: 진행률 0·30·45·60·90% 렌더, 오른쪽 페이지 드래그 → 다음 장, 짧은 드래그 → 복귀, ← 키 → 이전 장. B: 드래그 커밋(18%) → 다음 장, → 키, 드로우콜 9. 1440·390 폭 가로 스크롤 0, reduced-motion에서 즉시 전환, WebGL을 막은 상태에서 정지 이미지 폴백, 콘솔 오류 0(파비콘 404 제외). 실기기 fps와 아티팩트 뷰어 안에서의 동작은 측정하지 않았다.
