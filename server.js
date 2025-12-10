// --- Core Dependencies ---
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");

// --- Custom Components ---
const connectDB = require("./config/db");
const contactRouter = require("./routes/contact");
const projectRouter = require("./routes/projects");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./middleware/errorHandler");

dotenv.config({ path: "./.env" });

connectDB();

const app = express();
app.use(express.json());

// Request Logger (Development only)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Security: CORS (Crucial for MERN to allow client/server communication)
const cors = require("cors");
app.use(cors());

app.use("/api/v1/contact", contactRouter);
app.use("/api/v1/projects", projectRouter);

app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  // Use colors for a nice console output
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// --- 7. Handle Unhandled Promise Rejections (Professional Graceful Shutdown) ---
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
