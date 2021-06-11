import express from "express";
const app = express();
import routes from "./routes";
import { EXPRESS_PORT } from "./config";
import errorHandler from "./middleware/errorHandler";
require("./database/connection");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/api", routes);

app.use(errorHandler);
app.listen(EXPRESS_PORT, () => {
  console.log(`http://localhost:${EXPRESS_PORT}`);
});
