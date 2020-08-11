require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const apiRouter = require('./routes/apiRouter.js');
const loginRouter = require('./routes/loginRouter.js');
const db = require("./db/db.js");

db.connect();

/* GLOBAL HANDLERS */
app.use(express.json());
app.use(cors());

/* ROUTES */

app.use('/api', apiRouter);

app.use('/login', loginRouter);

app.use('/build', express.static(path.join(__dirname, '../build')));

if (process.env.NODE_ENV === 'production') {
  // serve index.html on the route '/'
  app.get('*', (req, res) => {res.sendFile(path.join(__dirname, '../../index.html'))});
}

if (process.env.NODE_ENV === 'development') {
  // serve index.html on the route '/'
  app.get('*', (req, res) => {res.sendFile(path.join(__dirname, '../../index.html'))});
}

const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));