import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import v1Routes from "./routes/index.js";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1", v1Routes);

export default app;
