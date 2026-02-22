import { Router } from "express";
import { eq, asc } from "drizzle-orm";
import { db, portfolio } from "../db/schema.js";
import type { PortfolioCreate } from "../types/portfolio.js";

export const portfolioRouter = Router();

portfolioRouter.get("/", async (req, res) => {
  try {
    const user = req.query.user as string | undefined;
    const items = user
      ? await db
          .select()
          .from(portfolio)
          .where(eq(portfolio.user, user))
          .orderBy(asc(portfolio.position), asc(portfolio.id))
      : await db
          .select()
          .from(portfolio)
          .orderBy(asc(portfolio.position), asc(portfolio.id));
    res.json(items);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

portfolioRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).json({ error: "Invalid id" });
  try {
    const [item] = await db
      .select()
      .from(portfolio)
      .where(eq(portfolio.id, id))
      .limit(1);
    if (!item) return res.status(404).json({ error: "Not found" });
    res.json(item);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

portfolioRouter.post("/", async (req, res) => {
  const body = req.body as PortfolioCreate;
  if (!body.user || !body.name || !body.path) {
    return res.status(400).json({
      error: "Missing required fields: user, name, path",
    });
  }
  try {
    const [item] = await db
      .insert(portfolio)
      .values({
        user: body.user,
        name: body.name,
        path: body.path,
        context: body.context ?? "",
        position: body.position ?? 0,
      })
      .returning();
    if (!item) return res.status(500).json({ error: "Insert failed" });
    res.status(201).json(item);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});
