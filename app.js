import bodyParser from "body-parser";
import express from "express";
import "dotenv/config"; // for ES modules

import eventRoutes from "./routes/events.js";

const app = express();

app.use(bodyParser.json());

app.use(eventRoutes);

app.listen(process.env.PORT);
