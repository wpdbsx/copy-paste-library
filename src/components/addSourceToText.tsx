export function addSourceToText(copiedText: string, sourceUrl: string): string {
  const sourceText = `\n\n출처: ${sourceUrl}`;
  return `${copiedText}${sourceText}`;
}