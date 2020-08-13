require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const apiRouter = require("./routes/apiRouter.js");
const loginRouter = require("./routes/loginRouter.js");
const itemsRouter = require("./routes/itemsRouter.js");
const db = require("./db/db.js");

db.connect();

/* GLOBAL HANDLERS */
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(cors());

/* ROUTES */
app.use("/api", apiRouter);
app.use("/login", loginRouter);
app.use("/items", itemsRouter);
app.use("/build", express.static(path.join(__dirname, "/build")));

// maybe
app.get('/bundle.js', (req, res) => res.sendFile(path.resolve(__dirname, '../build/bundle.js')));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

/* Global error handler */
app.use((err, req, res, next) => {
  const defaultErr = {
    status: 400,
    message: "Bad Request from global err handler",
  };
  const error = {
    ...defaultErr,
    ...err
  };
  res.status(error.status).json(error);
});

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));