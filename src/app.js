import express from "express";
import visitsRouter from "./routes/visits.js";

export const createApp = (client) => {
    const app = express();
    app.use("/", visitsRouter(client));
    return app;
};
