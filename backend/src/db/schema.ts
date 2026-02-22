import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import {
  pgTable,
  text,
  integer,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";

const pool = new Pool({
  host: process.env.DATABASE_HOST ?? "localhost",
  port: Number(process.env.DATABASE_PORT ?? 5432),
  user: process.env.DATABASE_USER ?? "postgres",
  password: process.env.DATABASE_PASSWORD ?? "postgres",
  database: process.env.DATABASE_NAME ?? "portfolio",
});

export const db = drizzle(pool);

export const portfolio = pgTable("portfolio", {
  id: uuid("id").primaryKey().defaultRandom(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  user: text("user").notNull(),
  name: text("name").notNull(),
  path: text("path").notNull(),
  context: text("context").default(""),
  position: integer("position").notNull().default(0),
});

export type PortfolioRow = typeof portfolio.$inferSelect;
export type PortfolioInsert = typeof portfolio.$inferInsert;
