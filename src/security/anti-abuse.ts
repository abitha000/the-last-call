export function safeText(input: string, max = 1000): string {
  return input.replace(/[\u0000-\u001F\u007F]/g, "").trim().slice(0, max);
}
