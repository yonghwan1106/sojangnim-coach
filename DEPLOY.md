# 배포 가이드 — GitHub 비공개 + Vercel 공개

## 명의 분리 원칙 (가족 병렬 응모 안전장치)

- GitHub 리포: **박용환 계정** (heisenbug0306) → **Private** 설정 필수
- Vercel 프로젝트명: `sojangnim-coach` (박용군 키워드 회피, 일반 명사)
- Vercel 도메인: `sojangnim-coach.vercel.app` (또는 가용 변형)
- Vercel 푸터/README 명의: **박용군 1호 코치, 평택 족발 10년**
- → 신청서 제출 시 박용군 이메일(parkbag799@gmail.com)로 데모 링크 공유

## 1단계: 로컬 검증

```bash
cd 사장님의사장님-prototype
npm install
cp .env.example .env.local
# .env.local 에 ANTHROPIC_API_KEY 입력
npm run dev
```

3개 화면 모두 동작 확인:
- http://localhost:3000 (랜딩)
- http://localhost:3000/diagnose (AI 진단)
- http://localhost:3000/match (코치 매칭)
- http://localhost:3000/resume (실패 경력서 PDF)

## 2단계: GitHub 비공개 리포 생성 (박용환 계정)

```bash
git init
git add .
git commit -m "feat: 사장님의사장님 P0 라이브 데모 (박용군 1호 코치)"
gh repo create sojangnim-coach --private --source=. --push
```

`gh` 미설치 시 GitHub 웹에서 Private 리포 생성 후 push.

## 3단계: Vercel 연결

1. https://vercel.com/new 접속 (박용환 GitHub 계정 연동)
2. `sojangnim-coach` 리포 Import
3. **Framework Preset**: Next.js (자동 감지)
4. **Environment Variables** 추가:
   - Key: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-...` (실제 키)
   - Environment: Production, Preview, Development 모두 체크
5. **Deploy** 클릭 → 약 90초 후 라이브

## 4단계: 도메인 확인 + 신청서 첨부

배포 완료 후 도메인:
- `https://sojangnim-coach.vercel.app` (또는 부여된 변형)

modoo.or.kr 신청서 Q8(영상/링크) 또는 Q4 본문 마지막 줄에 라이브 링크 첨부:

> 라이브 데모: https://sojangnim-coach.vercel.app
> 박용군 1호 코치 직접 운영 / Claude Haiku 4.5 LLM 통합

## 5단계: 결선 대비 백업

라이브 데모는 심사 중 다운 리스크 존재. **GIF 녹화 1개 + 화면 캡처 3장**을 별도로 보관하고, 결선 발표 슬라이드에 동시 첨부.

녹화 권장:
- 화면 1: `/diagnose` 입력 → 4주 캘린더 생성 흐름 (15초)
- 화면 2: `/match` 박용군 카드 + 더미 5명 (5초)
- 화면 3: `/resume` 실패 경력서 PDF 출력 (10초)

총 30초 GIF로 압축.

## 트러블슈팅

- **로컬 `npm run build` 시 OOM (out of memory)**: Windows + 한글 폴더 경로(`사장님의사장님-prototype`)에서 Next.js prerender 단계에 알려진 이슈. **Vercel(Linux + 영어 경로 `/vercel/path0`)에서는 정상 빌드**됨. 로컬 검증은 `npm run dev`로 충분.
- **빌드 실패**: `npm run build` 로컬에서 먼저 통과 확인 (Linux/Mac 또는 영어 경로 환경)
- **API 401**: Vercel 환경변수 재확인, 재배포 필요
- **응답 지연**: Haiku 4.5는 평균 2~4초. 로딩 스피너 이미 적용됨
- **명의 노출**: GitHub 리포가 Public으로 바뀌면 박용환 commit author가 노출 → **반드시 Private 유지**
