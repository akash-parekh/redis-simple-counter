import express from "express";
const router = express.Router();

export default (client) => {
    router.get("/", async (req, res) => {
        try {
            const visits = await client.incr("visits");
            if (visits === 1) {
                await client.expire("visits", 10);
            }
            const ttl = await client.ttl("visits");
            res.send(`Number of visits: ${visits} (resets in ${ttl} seconds)`);
        } catch (err) {
            console.error("Error incrementing visits:", err);
            res.status(500).send("Internal Server Error");
        }
    });

    router.get("/stats", async (req, res) => {
        try {
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
        } catch (err) {
            console.error("Error fetching stats:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    });

    return router;
};
