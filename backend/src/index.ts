import { config } from "dotenv";
import { resolve } from "path";

config({ path: resolve(process.cwd(), ".env") });
config({ path: resolve(process.cwd(), "../.env") });

import express from "express";
import cors from "cors";
import { portfolioRouter } from "./routes/portfolio.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/portfolio", portfolioRouter);

const PORT = process.env.PORT ?? 3001;
app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
