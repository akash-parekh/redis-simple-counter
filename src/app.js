import express from "express";
import visitsRouter from "./routes/visits.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const createApp = (client) => {
    const app = express();
    app.use("/", visitsRouter(client));
    app.use(errorHandler);
    return app;
};
