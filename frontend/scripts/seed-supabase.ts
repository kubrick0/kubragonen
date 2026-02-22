import { readdirSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL ?? process.env.VITE_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceRoleKey) {
  console.error("SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY são obrigatórios");
  process.exit(1);
}

const supabase = createClient(url, serviceRoleKey);

const assetsPath =
  process.env.SEED_ASSETS_PATH ??
  resolve(process.cwd(), "src/users/kubra-gonen/assets");
const user = process.env.SEED_USER ?? "kubra-gonen";
const pathPrefix = process.env.SEED_PATH_PREFIX ?? "";
const r2PublicUrl =
  process.env.R2_PUBLIC_URL?.replace(/\/$/, "") ??
  "https://pub-1f6f33d223c0447b8b5505bd14aa263d.r2.dev";
const r2KeyPrefix = process.env.R2_KEY_PREFIX ?? "portfolio";

async function seed() {
  const files = readdirSync(assetsPath).filter((f) =>
    /\.(png|jpe?g|webp|gif|svg)$/i.test(f),
  );

  if (files.length === 0) {
    console.log("Nenhum arquivo de imagem em", assetsPath);
    process.exit(0);
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const name = file.replace(/\.[^.]+$/, "");
    const path = pathPrefix
      ? `${pathPrefix}/${file}`
      : `${r2PublicUrl}/${r2KeyPrefix}/${file}`;

    const { error } = await supabase.from("portfolio").insert({
      user,
      name,
      path,
      context: "",
      position: i,
    });

    if (error) {
      console.error("Erro ao inserir:", name, error);
      process.exit(1);
    }
    console.log("Inserido:", name, "path:", path);
  }

  console.log(`${files.length} itens inseridos no portfolio.`);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
