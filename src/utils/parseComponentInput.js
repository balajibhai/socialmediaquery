// src/utils/parseComponentInput.js

/**
 * Parses a free-form input string and returns the component type
 * and an array of { date, distance } objects.
 *
 * @param {string} input
 * @returns {{ type: 'graph'|'table'|'text', format: Array<{date: string, distance: number}> }}
 */
export function parseComponentInput(input) {
  // 1) detect the component type
  const typeMatch = input.match(/\b(graph|table|text)\b/i);
  if (!typeMatch) {
    throw new Error("Could not determine component type (graph|table|text).");
  }
  const type = typeMatch[1].toLowerCase();

  // 2) pull out all "date: ... distance: ..." lines
  const format = [];
  const lineRegex =
    /date:\s*(\d{1,2}\/\d{1,2}\/\d{4})\s*distance:\s*(\d+(\.\d+)?)/gi;
  let m;
  while ((m = lineRegex.exec(input)) !== null) {
    format.push({
      date: m[1],
      distance: Number(m[2]),
    });
  }

  return { type, format };
}
