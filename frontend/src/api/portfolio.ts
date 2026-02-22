import { supabase } from "../lib/supabase";

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
  let query = supabase
    .from("portfolio")
    .select("*")
    .order("position", { ascending: true })
    .order("id", { ascending: true });

  if (user) {
    query = query.eq("user", user);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase portfolio error:", error);
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    user: row.user,
    name: row.name,
    path: row.path,
    context: row.context ?? "",
    position: row.position ?? 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}
