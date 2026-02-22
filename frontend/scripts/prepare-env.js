import { writeFileSync } from "fs";

const url = process.env.VITE_SUPABASE_URL;
const anonKey =
  process.env.VITE_SUPABASE_ANON_KEY ??
  process.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

if (url && anonKey) {
  writeFileSync(
    ".env.production",
    `VITE_SUPABASE_URL=${url}\nVITE_SUPABASE_ANON_KEY=${anonKey}\n`
  );
}
