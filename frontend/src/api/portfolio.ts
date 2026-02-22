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

function mapRow(row: Record<string, unknown>): PortfolioItem {
  return {
    id: row.id as string,
    user: row.user as string,
    name: row.name as string,
    path: row.path as string,
    context: (row.context as string) ?? "",
    position: (row.position as number) ?? 0,
    createdAt: row.created_at as string,
    updatedAt: row.updated_at as string,
  };
}

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

  return (data ?? []).map(mapRow);
}

export type CreatePortfolioItem = {
  user: string;
  name: string;
  path: string;
  context?: string;
  position?: number;
};

export async function createPortfolioItem(
  item: CreatePortfolioItem
): Promise<PortfolioItem> {
  const { data, error } = await supabase
    .from("portfolio")
    .insert({
      user: item.user,
      name: item.name,
      path: item.path,
      context: item.context ?? "",
      position: item.position ?? 0,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapRow(data);
}

export type UpdatePortfolioItem = Partial<
  Pick<PortfolioItem, "name" | "path" | "context" | "position" | "user">
>;

export async function updatePortfolioItem(
  id: string,
  updates: UpdatePortfolioItem
): Promise<PortfolioItem> {
  const payload: Record<string, unknown> = { updated_at: new Date().toISOString() };
  if (updates.user !== undefined) payload.user = updates.user;
  if (updates.name !== undefined) payload.name = updates.name;
  if (updates.path !== undefined) payload.path = updates.path;
  if (updates.context !== undefined) payload.context = updates.context;
  if (updates.position !== undefined) payload.position = updates.position;

  const { data, error } = await supabase
    .from("portfolio")
    .update(payload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return mapRow(data);
}

export async function deletePortfolioItem(id: string): Promise<void> {
  const { error } = await supabase.from("portfolio").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function reorderPortfolio(
  updates: { id: string; position: number }[]
): Promise<void> {
  for (const { id, position } of updates) {
    await updatePortfolioItem(id, { position });
  }
}
