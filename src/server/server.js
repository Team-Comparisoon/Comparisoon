
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const apiRouter = require('./routes/apiRouter.js');
// const categoriesRouter = require('./routes/categoriesRouter.js');
const port = 3000;

/* GLOBAL HANDLERS */
app.use(express.json());
// app.use(cors())

/* ROUTES */
app.use('/api', apiRouter);
// app.use('/api/categories', categoriesRouter);

// if (process.env.NODE_ENV === 'production') {

//   // serve index.html on the route '/'
// }
// app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/bundle.js', (req, res) => res.sendFile(path.resolve(__dirname, '../../dist/bundle.js')));

if(process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));

  app.get('*', (req, res) => {
    console.log("hi");
    res.sendFile(path.join(__dirname, '../../dist/index.html'));
  });
}

if(process.env.NODE_ENV === 'development') {
  app.get('*', (req, res) => {
    console.log("hi");
    res.sendFile(path.join(__dirname, '../../index.html'));
  });  
}

app.listen(() => console.log(`Server running on port: ${port}`));