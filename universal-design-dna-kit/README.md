# github_intro — Universal Design DNA

Universal Design DNA design kit, published at [nova-lee.github.io/github_intro](https://nova-lee.github.io/github_intro/).

## Claude 및 GitHub Copilot 디자인 키트

웹사이트·앱·대시보드·PPTX를 만들 때 Claude와 GitHub Copilot이 같은 디자인 기준으로 작업하게 만드는 키트입니다. 디자인 원칙, 금지 패턴(Anti AI-Slop), 토큰(색·타이포·간격), 컴포넌트 23종, 웹·3D·모션·앱·PPTX 표준, 품질 게이트가 들어 있습니다.

> Claude나 Copilot을 "학습"시키는 방식은 아닙니다. 도구가 작업할 때마다 지침 파일을 읽고 따르는 방식입니다. Claude는 스킬과 `CLAUDE.md`, Copilot은 `.github/copilot-instructions.md`를 사용합니다.

## 들어 있는 것

```
universal-design-dna-kit/
├── README.md                         이 안내
├── CLAUDE.md                         디자인 작업 지침
├── .github/
│   ├── copilot-instructions.md       GitHub Copilot 저장소 지침
│   └── workflows/pages.yml           GitHub Pages 자동 배포
├── index.md                          GitHub Pages 홈
├── _config.yml                       GitHub Pages 설정
├── DESIGN.md                         디자인 DNA + 토큰을 한 파일로 — 스킬을 못 쓰는 곳에 첨부용
├── universal-design-intelligence/    스킬 폴더(전체 기준)
│   ├── SKILL.md
│   ├── references/                   DESIGN_DNA · TOKENS · COMPONENTS · WEB_DESIGN · MOTION_3D
│   │                                 3D_BASELINES · THREEUI_TECHNIQUES · INTERNAL_PAGES
│   │                                 APP_DESIGN · PPTX_DESIGN · ASSET_GUIDELINES · ACCESSIBILITY · QUALITY_GATE
│   └── assets/                       tokens.css · tokens.json
└── universal-design-intelligence.zip 스킬 업로드용(Claude 앱·웹)
```

## 쓰는 법 — 쓰는 환경에 맞는 것 하나

### A. Claude 앱·웹 (claude.ai)

1. **스킬 올리기** — `Customize > Skills`에서 `+` → `+ Create skill` → `Upload a skill`을 누르고 `universal-design-intelligence.zip`을 고릅니다. 스킬은 코드 실행·파일 생성 기능이 켜져 있어야 동작합니다(`Settings > Capabilities`). Team·Enterprise는 조직 관리자가 Skills를 허용해야 합니다.
2. (선택) **항상 적용할 지침** — 디자인 작업용 프로젝트를 만들고, 프로젝트 지침에 `CLAUDE.md` 내용을 붙여 넣습니다.

스킬을 올릴 수 없는 환경이면 `DESIGN.md`를 프로젝트 파일이나 대화에 첨부하고 "이 디자인 기준으로 만들어줘"라고 요청하면 됩니다.

### B. Claude Code (터미널·VS Code·데스크톱)

1. 스킬 폴더를 개인 스킬 위치로 복사합니다. 모든 프로젝트에서 인식됩니다.
   - macOS·Linux: `~/.claude/skills/universal-design-intelligence/`
   - Windows: `%USERPROFILE%\.claude\skills\universal-design-intelligence\`
   - 한 프로젝트에서만 쓰려면 그 프로젝트의 `.claude/skills/universal-design-intelligence/`
2. `CLAUDE.md`의 `<!-- UDI:BEGIN -->`~`<!-- UDI:END -->` 블록을 `~/.claude/CLAUDE.md`(모든 프로젝트) 또는 프로젝트 루트의 `CLAUDE.md` **끝에 붙입니다**. 기존 내용은 지우지 않습니다.
3. 새 세션을 열고 확인합니다: "랜딩 페이지를 만들 때 어떤 디자인 기준을 쓰지?"

### C. 다른 도구

`DESIGN.md` 한 파일이 디자인 DNA와 토큰 전체를 담고 있습니다. 시스템 프롬프트나 첨부 파일로 넣으면 됩니다.

### D. GitHub Copilot 및 GitHub Pages

- Copilot 저장소 지침은 `.github/copilot-instructions.md`에서 자동으로 읽힙니다. 상세 디자인 기준은 `CLAUDE.md`, `DESIGN.md`, 스킬의 관련 레퍼런스를 따릅니다.
- `main` 브랜치에 변경을 올리면 GitHub Actions가 Pages 사이트를 빌드하고 배포합니다: [nova-lee.github.io/github_intro](https://nova-lee.github.io/github_intro/).

## 프로젝트에 맞추기

- **고정:** 원칙, Anti AI-Slop, 토큰 이름과 역할, 상태·접근성 기준, 품질 게이트.
- **바꿔도 됨:** accent(브랜드 색), 서체, 반경 성격, 밀도. 예: "브랜드 컬러는 #0A7D5A, 이 기준으로 랜딩 페이지 만들어줘" → Claude가 두 테마 대비를 다시 검증하고 프로젝트의 `DESIGN.md`에 차이만 기록합니다.

## 폰트 (키트에 미포함, 둘 다 SIL OFL 1.1)

- Pretendard Variable — https://github.com/orioncactus/pretendard
- IBM Plex Mono — https://github.com/IBM/plex

설치하지 않아도 대체 서체(Apple SD Gothic Neo, 맑은 고딕)로 동작합니다.

## 작성자 기준 구현 링크 (선택)

문서에 나오는 기준 시안들입니다. **작성자가 공유 설정을 열어 둔 경우에만 열립니다.** 열리지 않아도 문서의 레시피·수치만으로 같은 기준을 적용할 수 있습니다.

| 이름 | 내용 | 링크 |
|---|---|---|
| Universal Design DNA | 디자인 시스템 원본(토큰·컴포넌트 프리뷰) | https://claude.ai/artifact/LuwWSFPxRTpsb7DqRxL9xS |
| DNA 3D Proof | 실시간 3D 기준 구현 | https://claude.ai/artifact/LrJPPpCFpKPTtB6Lb5rdQ7 |
| HOGA | 재무 3D 기준 시안 | https://claude.ai/artifact/7siPDMsjafZ2smqaQs99yq |
| GYEOL | 가구 3D 기준 시안 | https://claude.ai/artifact/P7rS236Ser2tM2LHxQv6zU |
| MEONGIL | 여행 3D 기준 시안 | https://claude.ai/artifact/VZy77WXhRCNoztHmWwaL4d |
| GYEOL 겨울 거실 | 가구 × 겨울 조합 예시 | https://claude.ai/artifact/Y8yuvfoZ1JmC8rWcYx2qnn |
| HOGA 겨울밤 차트 | 차트 × 겨울밤 조합 예시 | https://claude.ai/artifact/TG6Gg5Z9gWNkaFKVZUfL8V |
| GYEOL 내부 | 가구 내부 페이지(결제·관리자 등) | https://claude.ai/artifact/Ya6DNeZSehgxz8482BoiBA |
| HOGA 내부 | 재무 내부 페이지 | https://claude.ai/artifact/XWFR3rkkP1psSPDg8Ame1g |
| MEONGIL 내부 | 여행 내부 페이지 | https://claude.ai/artifact/PyKWgtB5MJ9WYgDMCpVJTk |
| 내부 페이지 리뷰 캔버스 | 세 브랜드 내부 페이지 비교 | https://claude.ai/artifact/NpfW2LF893nzY3YUJ5kEUy |
| 책장 넘김 기준 구현 | page-curl.js · flex-book.js | https://claude.ai/artifact/QvgXF65pVK9Ed8kJgtH4KN |

## 라이선스와 출처 표기

문서에 언급된 외부 기법·자산의 라이선스(ThreeUI Community MIT, Poly Haven CC0, Wikimedia 퍼블릭 도메인 등)는 각 문서에 적힌 규칙을 따릅니다. 레퍼런스 사이트는 구성과 기법만 참고하고, 브랜드·레이아웃·자산은 가져오지 않습니다.
