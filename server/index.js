import express from "express";
import dotenv from "dotenv";
import path from "path";
import connectdb from "./db/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { notFound, errorHandler } from "./middleware/error.js";
import userRoutes from "./routes/user.js";
import movieRoutes from "./routes/movie.js";
import watchlistRoutes from "./routes/watchList.js";

dotenv.config();

const port = process.env.PORT || 3001;
const app = express();

connectdb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

//Routes
app.use("/api/users", userRoutes);
app.use("/api/movie", movieRoutes);
app.use("/api/watchlist", watchlistRoutes);


if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "/public/build")));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "public", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
