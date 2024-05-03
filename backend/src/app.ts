import { Hono } from "hono";
import { logger } from "hono/logger";
import { expensesRoutes } from "./routes/expensesRoutes";
const app = new Hono();

app.use("*", logger());

app.get("/test", (c) => c.json({ status: "Success", data: "test" }));
app.route("/api/v1/expenses", expensesRoutes);

export default app;
