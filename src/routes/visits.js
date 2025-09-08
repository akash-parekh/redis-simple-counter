import express from "express";
const router = express.Router();
import { asyncWrapper } from "../middleware/asyncWrapper.js";
import { format } from "date-fns-tz";
import { incrWithExpiry } from "../config/redis.js";

export default (client) => {
    router.get(
        "/",
        asyncWrapper(async (req, res) => {
            const date = format(new Date(), "yyyy-MM-dd");
            const { visits, ttl } = await incrWithExpiry(
                client,
                `visits:${date}`,
                360,
            );
            res.json({
                visits: visits,
                ttl_seconds: ttl,
            });
        }),
    );

    router.get(
        "/user/:id/visit",
        asyncWrapper(async (req, res) => {
            const { id } = req.params;
            const date = format(new Date(), "yyyy-MM-dd");
            const { visits, ttl } = await incrWithExpiry(
                client,
                `user:${id}:visits:${date}`,
                360,
            );

            res.json({
                user_id: id,
                visits: visits,
                ttl_seconds: ttl,
            });
        }),
    );

    router.get(
        "/stats",
        asyncWrapper(async (req, res) => {
            let cursor = "0";
            let keys = [];

            do {
                const result = await client.scan(cursor, {
                    MATCH: "*",
                    COUNT: 100,
                });
                cursor = result.cursor;
                keys.push(...result.keys); // <-- spread operator
            } while (cursor !== "0");

            let totalVisits = 0;
            let globalVisits = null;
            let users = [];

            for (const key of keys) {
                const keyStr = String(key);
                const value = await client.get(keyStr);
                const visits = parseInt(value || "0", 10);
                let ttl = await client.ttl(keyStr);
                if (ttl === -1 || ttl === -2) ttl = null;

                if (keyStr.includes("user")) {
                    users.push({ key: keyStr, visits, ttl_seconds: ttl });
                } else {
                    globalVisits = { key: keyStr, visits, ttl_seconds: ttl };
                }
                totalVisits += visits;
            }

            res.json({
                total_visits: totalVisits,
                global: globalVisits,
                users: users,
            });
        }),
    );

    return router;
};
