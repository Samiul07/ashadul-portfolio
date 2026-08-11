/**
 * Generates a deterministic view count based on string slug seed and days since publication.
 */
export function getFormattedViews(slug: string, dateString: string): string {
  if (!slug) return "350 views";

  // Seed: character code sum, modulo 400, offset 350
  let charSum = 0;
  for (let i = 0; i < slug.length; i++) {
    charSum += slug.charCodeAt(i);
  }
  const seed = (charSum % 400) + 350;

  // Growth: 3 views per day since publication
  let days = 0;
  if (dateString) {
    try {
      const publishedDate = new Date(dateString);
      if (!isNaN(publishedDate.getTime())) {
        const timeDiff = new Date().getTime() - publishedDate.getTime();
        days = Math.max(0, Math.floor(timeDiff / (1000 * 60 * 60 * 24)));
      }
    } catch {
      // Keep days as 0 on parse error
    }
  }

  const total = seed + days * 3;

  // Formatting rules:
  // - If < 1000: round down to nearest 10.
  // - If >= 1000: floor to 1 decimal place (e.g., 1253 -> 1.2k).
  let result: string;
  if (total < 1000) {
    const rounded = Math.floor(total / 10) * 10;
    result = String(rounded);
  } else {
    const kValue = Math.floor(total / 100) / 10;
    result = `${kValue.toFixed(1)}k`;
  }

  return `${result} views`;
}
