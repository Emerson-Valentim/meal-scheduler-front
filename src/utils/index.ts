export function cleanText(text: string): string {
  return text.replace(/\D+/g, '')
}