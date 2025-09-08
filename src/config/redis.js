import { createClient } from "redis";

export async function connectWithRetry(client, retries = 5, delay = 1000) {
    for (let i = 1; i <= retries; i++) {
        try {
            await client.connect();
            console.log("Connected to Redis");
            return;
        } catch (err) {
            console.error(
                `Failed to connect to Redis (attempt ${i + 1}):`,
                err,
            );
            if (i < retries) {
                const backoff = delay * i;
                console.log(`Retrying in ${backoff} ms...`);
                await new Promise((resolve) => setTimeout(resolve, backoff));
            } else {
                console.error(
                    "Could not connect to Redis after multiple attempts.",
                );
                throw err;
            }
        }
    }
}
export function createRedisClient({ host, port, db }) {
    const client = createClient({
        socket: {
            host,
            port,
        },
    });
    client.on("error", (err) => console.error("Redis Client Error", err));
    return client;
}
