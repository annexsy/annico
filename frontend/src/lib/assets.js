/** Prefix a public asset path with Vite's base URL (needed for GitHub Pages). */
export function asset(path) {
  if (!path) return path;
  const clean = String(path).replace(/^\//, '');
  return `${import.meta.env.BASE_URL}${clean}`;
}
