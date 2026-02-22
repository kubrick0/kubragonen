const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export type PortfolioItem = {
  id: string;
  user: string;
  name: string;
  path: string;
  context: string;
  position: number;
  createdAt: string;
  updatedAt: string;
};

export async function fetchPortfolio(user?: string): Promise<PortfolioItem[]> {
  const url = user
    ? `${API_BASE}/portfolio?user=${encodeURIComponent(user)}`
    : `${API_BASE}/portfolio`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch portfolio");
  return res.json();
}
