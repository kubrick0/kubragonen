const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

export type PortfolioItem = {
  id: string;
  user: string;
  name: string;
  image: string;
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

export function portfolioImageSrc(base64: string, mime = "image/png"): string {
  return `data:${mime};base64,${base64}`;
}
