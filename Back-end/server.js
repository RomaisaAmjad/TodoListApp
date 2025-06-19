require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const userRouter = require("./routes/user");
const taskRouter = require("./routes/task");

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);

app.use((req, res) => {
  res.status(404).send("Invalid Route, Not Found!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
