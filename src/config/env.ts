import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  PORT: z.string(),
  NODE_ENV: z.enum(["development", "production", "test"]),
  JWT_SECRET: z.string(),
  EXPIRES_IN: z.string(),
});

const parsedEnv = envSchema.parse(process.env);

export const env = {
  PORT: parsedEnv.PORT,
  NODE_ENV: parsedEnv.NODE_ENV,
  JWT_SECRET: parsedEnv.JWT_SECRET,
  EXPIRES_IN: parsedEnv.EXPIRES_IN,
};
