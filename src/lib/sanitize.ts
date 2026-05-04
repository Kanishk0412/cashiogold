// Strip HTML tags and dangerous characters from user input
export function sanitize(input: string, maxLen = 2000): string {
  return input
    .replace(/<[^>]*>/g, "")           // strip HTML tags
    .replace(/[<>]/g, "")              // strip leftover angle brackets
    .replace(/javascript:/gi, "")      // strip JS protocol
    .replace(/on\w+\s*=/gi, "")        // strip event handlers
    .trim()
    .slice(0, maxLen);
}

export function sanitizePhone(phone: string): string {
  return phone.replace(/\D/g, "").slice(0, 10);
}
