import express from "express";
const router = express.Router();
import { asyncWrapper } from "../middleware/asyncWrapper.js";

export default (client) => {
    router.get(
        "/",
        asyncWrapper(async (req, res) => {
            const visits = await client.incr("visits");
            if (visits === 1) {
                await client.expire("visits", 10);
            }
            const ttl = await client.ttl("visits");
            res.send(`Number of visits: ${visits} (resets in ${ttl} seconds)`);
        }),
    );

    router.get(
        "/stats",
        asyncWrapper(async (req, res) => {
            const visits = parseInt(await client.get("visits"), 10) || 0;
            let ttl = await client.ttl("visits");
            if (ttl === -1) {
                ttl = "No Expiry Set";
            } else if (ttl === -2) {
                ttl = "Key Expired or Does not exist.";
            }
            res.json({
                visits,
                ttl,
            });
        }),
    );

    return router;
};
