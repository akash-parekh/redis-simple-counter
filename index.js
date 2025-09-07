const express = require("express");
const { createClient } = require("redis");

const app = express();

const client = createClient({
    socket: {
        host: "localhost",
        port: 6379,
    },
});

client.on("error", (err) => console.log("Redis Client Error", err));

async function start() {
    await client.connect();

    app.get("/", async (req, res) => {
        const vists = await client.incr("visits");
        res.send(`Number of visits: ${vists}`);
    });

    app.listen(3000, () => {
        console.log("Listening on port 3000");
    });
}

start();
