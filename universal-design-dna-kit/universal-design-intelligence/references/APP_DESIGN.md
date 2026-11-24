# 앱 디자인 표준

모바일·데스크톱·태블릿 앱은 웹사이트처럼 보이면 안 된다. 같은 DNA(토큰, 타이포 위계, 상태 규칙)를 쓰되 **구조와 조작 방식은 플랫폼 관습을 따른다.**

## 플랫폼 관습

| | iOS / iPadOS | Android | Windows / macOS 데스크톱 |
|---|---|---|---|
| 주 내비게이션 | 하단 탭 바(3~5개) | 하단 내비게이션 바(3~5개) | 좌측 사이드바 + 상단 툴바 |
| 뒤로 가기 | 좌상단 백 버튼, 가장자리 스와이프 | 시스템 백 제스처 | 툴바·키보드(Alt+←, ⌘[) |
| 보조 행동 | 시트(sheet), 컨텍스트 메뉴 | 바텀 시트, 메뉴 | 컨텍스트 메뉴, 단축키 |
| 서체 | SF Pro + Apple SD Gothic Neo, 또는 번들한 Pretendard | Roboto + Noto Sans KR, 또는 Pretendard | Segoe UI Variable + 맑은 고딕(Windows), SF Pro(macOS), 또는 Pretendard |
| 최소 터치/클릭 영역 | 44×44pt | 48×48dp | 마우스 32px, 터치 겸용 40px |

- 시스템 컴포넌트(날짜 선택, 공유, 권한 요청, 파일 선택)는 직접 만들지 않고 플랫폼 것을 쓴다.
- 토큰 이름은 그대로 옮긴다: SwiftUI `Color("surface")`, Compose `DnaTheme.colors.surface`, XAML `{ThemeResource Surface}`. 값만 플랫폼 형식으로 변환한다.

## 정보 구조

- 탭/사이드바 최상위 항목은 사용자의 주된 일 3~5개. "더 보기"에 핵심 기능을 숨기지 않는다.
- 화면마다 하나의 주 행동. 모바일은 화면 하단 엄지 영역에, 데스크톱은 툴바 오른쪽 또는 폼 하단 오른쪽.
- 목록 → 상세 → 편집의 깊이는 3단계 이내. 태블릿·데스크톱은 목록과 상세를 나란히(split view).

## 컴포넌트

App Header(제목 + 최대 2개 행동) · Bottom Navigation / Sidebar · Button · Form · Input · Modal · Sheet · List · Card · Table(데스크톱) · Notification · Dialog · Settings · Loading · Error · Empty State.

- **List**가 앱의 기본 단위다. 행 높이 모바일 56~72, 데스크톱 36~44. 구분은 `divider` 인셋 선.
- **Sheet**는 모바일의 보조 작업(필터, 공유, 빠른 편집). 데스크톱에서는 Dialog 또는 우측 패널.
- **Settings**는 그룹화된 List + `Switch`(즉시 적용) + 상세 화면. 저장 버튼이 필요한 설정 화면은 만들지 않는다.
- **Notification**: 앱 내 일시 메시지는 `Toast`, 지속 상태는 상단 배너(`Alert`), 시스템 알림은 플랫폼 API.

## 상태와 피드백

- 모든 데이터 화면에 로딩(스켈레톤) · 빈 상태 · 오류 · 오프라인 · 권한 없음을 설계한다.
- 탭·누름 피드백은 100ms 안에(`duration-instant`). 저장은 낙관적 업데이트 + 실패 시 되돌리고 `Toast`로 알림.
- 파괴적 행동은 확인 Dialog 또는 실행 취소 Toast 중 하나 — 둘 다 없는 삭제는 금지.
- 햅틱은 확정적 행동(완료, 오류)에만, 스크롤·탭마다 쓰지 않는다.

## 접근성

- 동적 글꼴(Dynamic Type / 글꼴 크기 설정) 200%에서 레이아웃이 깨지지 않아야 한다. 고정 높이 텍스트 상자 금지.
- VoiceOver·TalkBack·Narrator 라벨을 모든 아이콘 버튼에.
- 데스크톱은 모든 기능을 키보드로 실행할 수 있어야 하고, 주요 행동에 단축키를 표시한다(Menu의 `shortcut`).
- 시스템 다크 모드·고대비 모드·모션 줄이기 설정을 따른다.
