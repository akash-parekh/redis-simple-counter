import express from "express";
const router = express.Router();

export default (client) => {
    router.get("/", async (req, res) => {
        try {
            const visits = await client.incr("visits");
            res.send(`Number of visits: ${visits}`);
        } catch (err) {
            console.error("Error incrementing visits:", err);
            res.status(500).send("Internal Server Error");
        }
    });

    return router;
};
