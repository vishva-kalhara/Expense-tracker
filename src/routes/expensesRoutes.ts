import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

type Expense = {
    _id: number;
    title: string;
    amount: number;
};

const fakeExpenses: Expense[] = [
    { _id: 1, title: "Groceries", amount: 50 },
    { _id: 2, title: "Gasoline", amount: 30 },
    { _id: 3, title: "Dinner", amount: 60 },
    { _id: 4, title: "Movie Tickets", amount: 25 },
    { _id: 5, title: "Internet Bill", amount: 80 },
];

const postExpenseSchema = z.object({
    title: z
        .string()
        .min(3, "Title should include more than 3 characters")
        .max(25),
    amount: z.number().int().positive(),
});

export const expensesRoutes = new Hono()
    .get("/", (c) => c.json(fakeExpenses))
    .post("/", zValidator("json", postExpenseSchema), async (c) => {
        const data = await c.req.valid("json");
        const expense = { ...data, _id: fakeExpenses.length + 1 };
        fakeExpenses.push(expense);
        return c.json(expense);
    });
