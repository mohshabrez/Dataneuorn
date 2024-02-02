import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
// import { initializeDatabase } from "./db/db.connection.js";
import DataRouter from "./router/data.router.js";




/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// initializeDatabase();
app.get("/", (req, res) => {
  res.send("Hello User");
});

app.use("/api/v1", DataRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  // Log errors for debugging
  console.error(err.stack);
  // Send a generic 500 error response
  res.status(500).json({ message: "Something went wrong." });
});

// Not found route
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});



// /* MONGOOSE SETUP */
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  })
  .catch((error) => console.log(`${error} did not connect`));
