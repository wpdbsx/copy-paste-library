import { test, expect } from "@playwright/test";

test.describe("CopyWithSource 컴포넌트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("컴포넌트가 정상적으로 렌더링되는지 확인", async ({ page }) => {
    const header = await page.locator("h1");
    await expect(header).toContainText("출처가 자동으로 추가됩니다.");
  });

  test("텍스트를 복사할 때 출처 URL이 추가되는지 확인", async ({ page }) => {
    const paragraph = await page.locator("p").first();
    await paragraph.selectText();
    await page.keyboard.press("Control+C");

    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText()
    );
    expect(clipboardText).toContain(await paragraph.textContent());
    expect(clipboardText).toContain(page.url());
  });

  test("빈 텍스트를 복사할 때 출처가 추가되지 않는지 확인", async ({
    page,
  }) => {
    await page.click("body"); // 아무것도 선택되지 않은 상태
    await page.keyboard.press("Control+C");

    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText()
    );
    expect(clipboardText).toBe("");
  });

  test("사용자 정의 출처 URL이 사용되는지 확인", async ({ page }) => {
    const customSourceUrl = "https://custom-source-url.com";
    await page.goto("http://localhost:3000", {
      waitUntil: "load",
      referer: customSourceUrl,
    });

    const paragraph = await page.locator("p").first();
    await paragraph.selectText();
    await page.keyboard.press("Control+C");

    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText()
    );
    expect(clipboardText).toContain(customSourceUrl);
  });

  // 추가된 테스트

  test("특정 영역 내에서만 복사 이벤트가 발생하고 출처가 추가되는지 확인", async ({
    page,
  }) => {
    const copyTextSelector =
      'p:has-text("이 텍스트를 복사하면 지정된 출처가 포함됩니다.")';
    const customSourceUrl = "https://custom-source-url.com";

    // 텍스트를 선택한 후 복사
    await page.locator(copyTextSelector).selectText();
    await page.keyboard.press("Control+C");

    // 클립보드의 텍스트를 확인
    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText()
    );
    expect(clipboardText).toContain(
      "이 텍스트를 복사하면 지정된 출처가 포함됩니다."
    );
    expect(clipboardText).toContain(customSourceUrl);
  });

  test("출처가 추가되지 않는 영역의 복사 테스트", async ({ page }) => {
    const noCopyTextSelector = 'div:has-text("복사가 안됩니다")';

    // 두 번째 div에서 텍스트 선택 및 복사
    await page.locator(noCopyTextSelector).selectText();
    await page.keyboard.press("Control+C");

    // 클립보드의 텍스트를 확인
    const clipboardText = await page.evaluate(() =>
      navigator.clipboard.readText()
    );
    expect(clipboardText).toBe("복사가 안됩니다");
  });
});
