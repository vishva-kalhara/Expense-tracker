import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { z } from "zod";

const fakeExpenses: Expense[] = [
    { _id: 1, title: "Groceries", amount: 50 },
    { _id: 2, title: "Gasoline", amount: 30 },
    { _id: 3, title: "Dinner", amount: 60 },
    { _id: 4, title: "Movie Tickets", amount: 25 },
    { _id: 5, title: "Internet Bill", amount: 80 },
];

const expenseSchema = z.object({
    _id: z.number().min(1).positive(),
    title: z
        .string({ message: "Please enter a valid title" })
        .min(3, "Title should include more than 3 characters")
        .max(25),
    amount: z.number().int().positive(),
});

type Expense = z.infer<typeof expenseSchema>;

const postExpenseSchema = expenseSchema.omit({ _id: true });

export const expensesRoutes = new Hono()
    .get("/", (c) => {
        c.status(201);
        return c.json(fakeExpenses);
    })
    .post("/", zValidator("json", postExpenseSchema), async (c) => {
        const data = await c.req.valid("json");
        const expense = { ...data, _id: fakeExpenses.length + 1 };
        fakeExpenses.push(expense);
        return c.json(expense);
    })
    .get("/:id{[0-9]+}", (c) => {
        const id: Number = Number.parseInt(c.req.param("id"));
        const expense = fakeExpenses.find((item) => item._id === id);
        if (!expense) return c.notFound();
        return c.json({ status: "Success", data: expense });
    })
    .delete("/:id{[0-9]+}", (c) => {
        const id: Number = Number.parseInt(c.req.param("id"));
        const index = fakeExpenses.findIndex((item) => item._id === id);
        if (index === -1) return c.notFound();

        const deletedExpense = fakeExpenses.splice(index, 1)[0];
        c.status(204);
        return c.json({ status: "Success" });
    });
