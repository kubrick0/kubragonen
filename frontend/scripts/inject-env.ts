import { writeFileSync, readFileSync, existsSync } from "fs";
import { resolve } from "path";

function loadEnv(path: string): void {
  if (!existsSync(path)) return;
  const content = readFileSync(path, "utf-8");
  for (const line of content.split("\n")) {
    const match = line.match(
      /^(VITE_SUPABASE_(?:URL|ANON_KEY|PUBLISHABLE_DEFAULT_KEY))=(.*)$/
    );
    if (match && !process.env[match[1]]) {
      process.env[match[1]] = match[2].trim().replace(/^["']|["']$/g, "");
    }
  }
}

loadEnv(resolve(process.cwd(), ".env"));
loadEnv(resolve(process.cwd(), "../.env"));

const url = process.env.VITE_SUPABASE_URL;
const anonKey =
  process.env.VITE_SUPABASE_ANON_KEY ??
  process.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

const content = [
  url && `VITE_SUPABASE_URL=${url}`,
  anonKey && `VITE_SUPABASE_ANON_KEY=${anonKey}`,
]
  .filter(Boolean)
  .join("\n");

writeFileSync(".env.production.local", content);
