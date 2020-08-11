const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const apiRouter = require('./routes/apiRouter.js');
// const categoriesRouter = require('./routes/categoriesRouter.js');
const port = 3000;

/* GLOBAL HANDLERS */
app.use(express.json());
app.use(cors());

/* ROUTES */
app.use('/api', apiRouter);
// app.use('/api/categories', categoriesRouter);

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  // serve index.html on the route '/'
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../index.html'));
  });
}

// app.use("/build", express.static(path.join(__dirname, "../build")));

// app.use("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../index.html"));
// });

app.listen(port, () => console.log(`Server running on port: ${port}`));