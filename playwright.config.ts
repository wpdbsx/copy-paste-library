import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./src/tests/e2e", // 테스트 파일이 위치한 디렉터리
  timeout: 30000, // 테스트 하나당 30초 타임아웃 설정
  retries: 1, // 테스트 실패 시 한 번 재시도
  use: {
    headless: true, // 헤드리스 모드에서 브라우저 실행
    viewport: { width: 1280, height: 720 }, // 브라우저 뷰포트 크기
    actionTimeout: 0, // 각 액션에 대한 타임아웃 설정
    baseURL: "http://localhost:3000", // 테스트 중 사용할 기본 URL
    trace: "on-first-retry", // 첫 번째 재시도 시에만 트레이스를 활성화
  },
  projects: [
    {
      name: "Chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "Firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "WebKit",
      use: { browserName: "webkit" },
    },
  ],
});
