import app from "./src/app";

Bun.serve({
    fetch: app.fetch,
});
console.log("Server is Running");
