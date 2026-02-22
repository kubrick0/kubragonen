import { readdirSync, readFileSync } from "fs";
import { join, resolve } from "path";
import { config } from "dotenv";

config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), "../.env") });

const assetsPath =
  process.env.SEED_ASSETS_PATH ??
  resolve(process.cwd(), "../frontend/src/users/kubra-gonen/assets");
const user = process.env.SEED_USER ?? "kubra-gonen";

async function seed() {
  const { db, portfolio } = await import("../src/db/schema.js");

  const files = readdirSync(assetsPath).filter((f) =>
    /\.(png|jpe?g|webp|gif|svg)$/i.test(f)
  );

  if (files.length === 0) {
    console.log("Nenhum arquivo de imagem em", assetsPath);
    process.exit(0);
  }

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const filePath = join(assetsPath, file);
    const buffer = readFileSync(filePath);
    const name = file.replace(/\.[^.]+$/, "");

    await db.insert(portfolio).values({
      user,
      name,
      image: buffer,
      context: "",
      position: i,
    });
    console.log("Inserido:", name);
  }

  console.log(`${files.length} itens inseridos no portfolio.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
