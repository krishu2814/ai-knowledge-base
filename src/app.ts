import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.get("/", (_, res) => {
  res.json({
    success: true,
    message: "AI Knowledge Base API",
  });
});

export default app;
