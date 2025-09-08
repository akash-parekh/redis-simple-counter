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

    return router;
};
