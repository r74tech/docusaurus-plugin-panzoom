/**
 * Helper function to load SVG files as raw strings
 * @param path Path to the SVG file
 * @returns The SVG content as a string
 */
export function loadSvgAsString(path: string): string {
  // This approach works with webpack and similar bundlers that allow importing files as text
  return require(path).default || require(path);
}
