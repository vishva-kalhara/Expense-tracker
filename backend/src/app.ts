import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoutes } from "./routes/expensesRoutes";
import { serveStatic } from "hono/bun";
const app = new Hono();

app.use("*", logger());

app.route("/api/v1/expenses", expensesRoutes);

app.get("*", serveStatic({ root: "./dist" }));
app.get("*", serveStatic({ path: "./dist/index.html" }));

export default app;
