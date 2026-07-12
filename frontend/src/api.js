// Central API base URL. Set VITE_API_BASE_URL in the environment (Vercel /
// .env) to point the frontend at the deployed backend. Falls back to the
// local dev server. Trailing slashes are trimmed so `${API_BASE_URL}/path`
// is always well-formed.
export const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000"
).replace(/\/+$/, "");
