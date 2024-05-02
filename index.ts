Bun.serve({
    fetch(req) {
        return new Response("Hello from Bun!");
    },
});
console.log("Server is Running");
