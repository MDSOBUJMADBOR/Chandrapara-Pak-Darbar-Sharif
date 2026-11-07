import cors from "cors";
import express from "express";
import userRoutes from "./routes/user.routes.js";
import anserRoutes from "./routes/anser.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    mes: "Chandropara Pak Darbar Sharif CRUD is runningAPI",
  });
});

app.use("/api/users", userRoutes);
app.use("/api/anser", anserRoutes);
app.use("/api/ansers", anserRoutes);

export default app;
