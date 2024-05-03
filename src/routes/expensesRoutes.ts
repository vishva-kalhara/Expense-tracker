import { Hono } from "hono";

export const expensesRoutes = new Hono()
    .get("/", (c) => c.json({ status: "success", data: "data" }))
    .post("/", (c) => c.json({ data: "created" }));
