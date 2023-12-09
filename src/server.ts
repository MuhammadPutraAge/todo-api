import dotenv from "dotenv";
dotenv.config();

import morgan from "morgan";
import express from "express";
import apiRouter from "./router";
import {
  errorMiddleware,
  notFoundMiddleware,
} from "./middlewares/errorMiddleware";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", apiRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
