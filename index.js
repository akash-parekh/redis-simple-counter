import dotenv from "dotenv";
import { createApp } from "./src/app.js";
import { createRedisClient, connectWithRetry } from "./src/config/redis.js";

dotenv.config();

const REDIS_HOST = process.env.REDIS_HOST || "localhost";
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_DB = process.env.REDIS_DB || 0;

const client = createRedisClient({
    host: REDIS_HOST,
    port: REDIS_PORT,
    db: REDIS_DB,
});

async function start() {
    await connectWithRetry(client);
    const app = createApp(client);
    app.listen(3000, () => {
        console.log("Server Running at http://localhost:3000");
    });
}

start();
