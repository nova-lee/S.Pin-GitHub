# 모션 & 3D 표준

모션은 시선의 순서를 정하고, 상태 변화를 설명하고, 공간을 이해시키기 위해 존재한다. 3D는 **보여줘야 이해되는 것**이 있을 때 쓰고, 쓰기로 했다면 아래 기법까지 갖춰 레퍼런스 수준으로 만든다.

분야별 사이트는 "3D 기준 시안 & 실사 자산 표준"(`3D_BASELINES.md`)의 레시피에서 시작한다(재무 HOGA · 가구 GYEOL · 여행 MEONGIL). 3D의 재료는 실제 이미지·실물 기반 모델·실제 데이터이고, 저작권이 깨끗한 것(CC0·퍼블릭 도메인·CC BY)만 쓴다.

책장 넘김·책 진열·마스크 리빌·셰이더 배경 등 ThreeUI에서 가져온 기법은 "ThreeUI 기법 카탈로그"(`THREEUI_TECHNIQUES.md`)에 있다.

## 모션 원칙

- 모든 모션은 시작과 끝이 분명하다. 진입은 `ease-enter`로 감속, 퇴장은 `ease-exit`로 가속하고 진입의 70% 시간.
- 이동 거리는 작게: UI 8~24px, 섹션 리빌 24~48px. 크게 움직이는 것은 장면 전환과 3D 카메라뿐이다.
- 한 화면에서 동시에 움직이는 그룹은 하나. 스태거는 40~80ms, 최대 6개 요소까지.
- 섹션마다 같은 fade-up을 반복하지 않는다. 섹션의 이야기에 맞는 동작 하나를 고른다(아래 목록).
- 모든 모션은 `prefers-reduced-motion: reduce`에서 불투명도 전환만 남기고, 패럴랙스·핀·스크럽·자동 재생을 끈다. 3D는 장(chapter)마다 정지 구도로 바뀐다.

## 스크롤 기반 연출 — 이야기에 맞춰 고른다

| 이야기 | 연출 |
|---|---|
| 제품의 구조 | 오브젝트 분해·결합(exploded view) + 부품 라벨이 3D 위치를 따라감 |
| 제품의 사용 흐름 | 화면 고정(pin) + 스크롤에 따른 UI 상태 변화 |
| 규모·공간 | 카메라가 스플라인 경로를 따라 이동(flythrough), 깊이 레이어 전환 |
| 재질·품질 | 클로즈업 + 조명 변화(반사, 굴절, 클리어코트) |
| 변화·전후 비교 | 스크럽 와이프, 셰이더 디졸브·모핑 |
| 장(chapter) 전환 | 배경이 `canvas` → `surface-inverse`로 바뀌는 시네마틱 전환(`ease-cinematic`), 또는 렌더 타깃 트랜지션 |

- 스크롤 진행률을 **하나의 값(0~1)**으로 만들고, 모든 상태(분해량, 카메라 위치, 재질, 배경)를 그 값의 함수로 계산한다. 렌더 루프에서 감쇠(damping)로 따라가게 해 끊김을 없앤다.
- 스크롤 1뷰포트당 한 가지 변화. 핀 구간은 최대 3뷰포트. 텍스트는 스크롤이 멈춘 상태에서 완전히 읽혀야 한다.
- 데스크톱은 오브젝트를 카피 반대편에, 모바일은 카피 위에 두도록 카메라 시선(lookAt)을 장마다 지정한다.

## 3D를 구현하는 세 가지 방식 — 먼저 고른다

| 방식 | 언제 | 레퍼런스 | 보고 명칭 |
|---|---|---|---|
| **실시간 3D** (WebGL2 / WebGPU) | 사용자가 보는 각도·상태가 스크롤·입력에 따라 계속 바뀌어야 할 때, 인터랙션·탐험 | igloo.inc, Lusion, Primland, Shopify Editions, Bruno Simon | "실시간 3D" |
| **사전 렌더 시네마틱** (스크롤 키프레임 비디오, 이미지 시퀀스 캔버스) | 영화 같은 렌더 품질이 필요하고 시점이 정해져 있을 때, 모바일 성능이 최우선일 때 | Apple AirPods Pro(스크롤 키프레임 비디오 + AR Quick Look) | "사전 렌더 시퀀스" — 3D라고 부르지 않는다 |
| **하이브리드** | 조명·그림자는 미리 굽고(bake) 카메라·인터랙션만 실시간 | Shopify Editions(베이크드 섀도 캐처 GLB) | "실시간 3D(베이크드 라이팅)" |

사전 렌더 방식도 프리미엄 기법이다. 품질이 목표면 실시간을 고집하지 않는다. 다만 이름을 정확히 보고한다.

## 레퍼런스 수준을 만드는 기법 (실시간 3D 체크리스트)

1. **조명** — PMREM 환경광(HDRI 또는 `RoomEnvironment`)으로 반사를 만들고, 그림자는 실시간 섀도맵 대신 **베이크**한다: Blender에서 라이트맵·AO를 구워 `lightMap`/`aoMap`으로, 바닥 그림자는 섀도 캐처 평면(방사형 그라데이션 또는 구운 텍스처).
2. **재질** — PBR(`MeshStandard`/`MeshPhysical`): 금속은 metalness·roughness, 유리는 `transmission`·`ior`·`thickness`, 도장은 `clearcoat`. 브랜드 고유의 질감(얼음, 액체, 홀로그램)은 커스텀 셰이더로.
3. **커스텀 셰이더** — `ShaderMaterial` 또는 `onBeforeCompile`(WebGL), TSL 노드 머티리얼(WebGPU). 파티클·노이즈·디졸브·굴절은 GPU에서 계산한다.
4. **후처리** — `EffectComposer`: 블룸은 **임계값을 HDR 이상(>1)**으로 두어 발광체만 번지게, 필요할 때만 피사계 심도·비네팅·필름 그레인 소량. 톤 매핑은 PBR Neutral(색이 토큰에 가깝게 유지) 또는 AgX. 후처리가 배경까지 톤 매핑하므로 **배경색을 역보정해 `canvas`·`surface-inverse` 토큰과 정확히 일치**시킨다.
5. **카메라** — `CatmullRomCurve3` 경로 위를 스크롤 진행률로 이동, 시선은 장별 지점 사이를 보간, 포인터 패럴랙스는 감쇠해서 ±0.35rad 이내. 화각 30~45°(모바일 45~50°).
6. **파티클·대량 오브젝트** — `Points` + 셰이더, 반복 형상은 `InstancedMesh`(1 드로우콜). 수만 개 이상은 GPGPU(`GPUComputationRenderer`) 또는 WebGPU compute.
7. **HTML 동기화** — 라벨·캡션은 3D 앵커를 `project()`해 화면 좌표로 따라가게 하고, 텍스트 자체는 HTML로 둔다(검색·접근성·선명도).
8. **장면 전환** — 장(chapter)마다 다른 장면이 필요하면 렌더 타깃 두 개를 셰이더로 섞는다(디졸브·와이프). 장면 수가 많으면 공간을 여러 "방"으로 나눠 카메라가 이동한다.
9. **인터랙션** — 레이캐스트 hover, 드래그 회전, 커서 리빌. 플레이그라운드형 브랜드 경험에만 물리 엔진(Rapier, wasm).
10. **로딩** — `LoadingManager`의 실제 진행률로 프리로더를 채우고, `renderer.compileAsync()`로 셰이더를 미리 컴파일해 첫 스크롤의 끊김을 없앤다. 가짜 진행률 금지.
11. **사운드** — 기본 꺼짐, 사용자 제스처 후에만 시작, 음소거 토글을 항상 노출.
12. **WebGPU** — three.js `WebGPURenderer`(+TSL)는 WebGL2로 자동 폴백되는지 확인하고 쓴다. 지원 범위가 확실하지 않으면 WebGL2.

## 기술 선택

| 필요 | 선택 |
|---|---|
| 상태 전환·마이크로 인터랙션 | CSS transition + 토큰 |
| 스크롤 진행률·핀 | GSAP ScrollTrigger |
| 부드러운 스크롤 | Lenis — Brand Experience에서만, `lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker`로 구동, reduced-motion에서 끈다 |
| 실시간 3D (바닐라·Vue·Nuxt·Svelte) | Three.js (WebGL2 기본, 필요 시 WebGPU) |
| 실시간 3D (React) | React Three Fiber + drei + @react-three/postprocessing |
| 물리 | Rapier |
| 사전 렌더 | Blender/Cinema 4D 렌더 → 스크롤 키프레임 비디오(H.264/HEVC, 키프레임 간격 짧게) 또는 AVIF/WebP 이미지 시퀀스 + `<canvas>` |
| 에셋 파이프라인 | Blender → glTF 2.0(GLB) → `gltf-transform`로 Draco/Meshopt 압축, KTX2(Basis) 텍스처, 인스턴싱 |

새 라이브러리는 ① 기존 스택과의 호환성 ② 중복 여부 ③ 필요성 ④ 번들 크기 영향을 확인한 뒤 추가하고, 버전을 고정한다.

## 실제 3D의 정의

실제 3D는 **Geometry·Mesh·Material·Texture·Lighting·Camera·Perspective**로 구성된 장면을 WebGL2(또는 WebGPU)로 실시간 렌더링하는 것이다. CSS `transform: perspective()`, 이미지 확대, 그림자로 흉내 낸 것은 3D가 아니다. 미리 렌더한 비디오·이미지 시퀀스는 정당한 기법이지만 "사전 렌더 시퀀스"로 보고한다.

## 장면 기준과 예산

- **목적**: 3D가 없으면 이해가 어려운 것(구조·재질·공간·작동 원리)을 보여줄 때. 장식 오브젝트 금지.
- **조명 색**: 기본은 중성 환경광. 색 조명·네온은 브랜드가 요구할 때만.
- **카메라**: 움직임은 스크롤 또는 사용자 입력에 묶는다. 무한 자동 회전 금지(대기 상태의 느린 호흡 정도만).
- **색**: 배경은 `canvas` 또는 `surface-inverse`와 픽셀 단위로 일치. 오브젝트 강조는 `accent` 한 곳.
- **예산**(첫 화면 기준): 3D 에셋 합계 3MB 이하(GLB Draco/Meshopt + KTX2), 텍스처 2K 이하, 드로우콜 데스크톱 100·모바일 50 이하, 삼각형 데스크톱 300k·모바일 100k 이하, 후처리 패스 3개 이하. 작성자의 기준 구현은 드로우콜 22~29, 삼각형 98k~208k.

## 성능·수명 관리

- 페이지가 숨겨지면 렌더 루프를 멈추고(`visibilitychange` → `setAnimationLoop(null)`), 화면 밖 캔버스는 마운트하지 않거나 `frameloop="demand"`.
- `pagehide`·언마운트 시 geometry·material·texture·render target을 `dispose()`, ScrollTrigger `kill()`, Lenis `destroy()`, GSAP 컨텍스트 `revert()`.
- 3D 번들은 dynamic import로 분리하고, 로딩 중에는 같은 구도의 정지 이미지를 먼저 보여준다.
- `devicePixelRatio`는 최대 2, 터치 기기 1.5. 저사양(GPU 티어 감지 또는 첫 1초 평균 fps < 40)이면 후처리·파티클부터 끈다.
- **폴백**: WebGL2 미지원이면 같은 구도의 정지 이미지 또는 SVG. reduced-motion이면 스크럽·카메라 이동 없이 장별 정지 구도. 폴백 없는 3D는 완성으로 보지 않는다.

## 검증 (품질 게이트의 3D 항목)

- 장(chapter)마다 스크롤 위치를 고정하고 데스크톱·모바일·reduced-motion에서 스크린샷을 남긴다.
- `renderer.info.render`(calls, triangles)와 fps를 기록한다. 실기기 목표: 중급 노트북 55fps 이상, 중급 휴대폰 30fps 이상. 헤드리스(SwiftShader) 측정치는 기능 확인용이며 성능 수치로 보고하지 않는다.
- 콘솔 오류 0, WebGL2 끈 상태에서 폴백 확인, 페이지 이동 후 WebGL 컨텍스트·리스너 해제 확인.
- 배경 픽셀이 `canvas`/`surface-inverse` 토큰 값과 일치하는지 확인한다.

## 레퍼런스 분석 (2026-11, 브라우저에서 직접 확인)

| 사이트 | 렌더링 | 핵심 기법 |
|---|---|---|
| igloo.inc | Three.js r165 | Draco 메시 8개, KTX2/Basis 텍스처 45개, 파티클 메시 |
| Active Theory | 자체 WebGL 엔진(Hydra) | 셰이더 파일 기반 연출 |
| Lusion | Three.js r158 | 자체 메시 포맷, 캐릭터 애니메이션, 오디오 16개, 비디오 |
| Bruno Simon | Three.js r187 **WebGPU** | Rapier 물리(wasm), 압축 GLB 23개, Draco·Basis |
| Explore Primland | Nuxt + Three.js r179 WebGL2 | 지형 GLB, 새 비행 경로 GLB, KTX2·HDR, 사운드 |
| Shopify Editions | Three.js r181 | 조명을 구운 GLB(섀도 캐처 베이크) |
| Apple AirPods Pro | WebGL 없음 | 스크롤 키프레임 사전 렌더 비디오 16개, AR Quick Look |
| cartier.com(메인) | 3D 없음 | 이미지·비디오. 3D는 캠페인 마이크로사이트에서만 |
