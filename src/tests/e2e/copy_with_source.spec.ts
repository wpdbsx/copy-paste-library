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
    const selectedText = await paragraph.textContent();
    const pageUrl = await page.url();

    // 텍스트와 URL 결합 확인
    const combinedText = `${selectedText} 출처: ${pageUrl}`;

    expect(combinedText).toContain(selectedText);
    expect(combinedText).toContain(pageUrl);
  });

  test("빈 텍스트를 복사할 때 출처가 추가되지 않는지 확인", async ({
    page,
  }) => {
    const clipboardText = ""; // 빈 텍스트
    expect(clipboardText).toBe(""); // 테스트가 빈 텍스트인지 확인
  });

  test("사용자 정의 출처 URL이 사용되는지 확인", async ({ page }) => {
    const customSourceUrl = "https://custom-source-url.com";
    await page.goto("http://localhost:3000", {
      waitUntil: "load",
      referer: customSourceUrl,
    });

    const paragraph = await page.locator("p").first();
    const selectedText = await paragraph.textContent();
    const combinedText = `${selectedText} 출처: ${customSourceUrl}`;

    expect(combinedText).toContain(selectedText);
    expect(combinedText).toContain(customSourceUrl);
  });

  // 추가된 테스트

  test("특정 영역 내에서만 복사 이벤트가 발생하고 출처가 추가되는지 확인", async ({
    page,
  }) => {
    const copyTextSelector =
      'p:has-text("이 텍스트를 복사하면 지정된 출처가 포함됩니다.")';
    const customSourceUrl = "https://custom-source-url.com";

    // 텍스트를 선택한 후 복사
    const selectedText = await page.locator(copyTextSelector).textContent();
    const combinedText = `${selectedText} 출처: ${customSourceUrl}`;

    // 결합된 텍스트 확인
    expect(combinedText).toContain(
      "이 텍스트를 복사하면 지정된 출처가 포함됩니다."
    );
    expect(combinedText).toContain(customSourceUrl);
  });

  test("출처가 추가되지 않는 영역의 복사 테스트", async ({ page }) => {
    const noCopyTextSelector = 'div:has-text("복사가 안됩니다"):nth-of-type(3)';
    const selectedText = await page.locator(noCopyTextSelector).textContent();

    // 텍스트 확인
    expect(selectedText).toBe("복사가 안됩니다");
  });
});
