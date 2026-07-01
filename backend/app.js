const express = require("express");
const cors = require("cors");
const initDB = require("./config/initDb");
const createUserTable = require("./models/userModel");
const createTaskTable = require("./models/taskModel");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/tasks", taskRoutes);
app.use("/api/v1", adminRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await initDB();
  await createUserTable();
  await createTaskTable();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();