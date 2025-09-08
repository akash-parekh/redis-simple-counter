const express = require("express");
const { createClient } = require("redis");
require("dotenv").config();

const app = express();

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_DB = process.env.REDIS_DB || 0;

const client = createClient({
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT,
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
