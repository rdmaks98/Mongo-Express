import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
export const { EXPRESS_PORT, MONGODB_URL, DEBUG_MODE, JWT_SECURE } =
  process.env;
