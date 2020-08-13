const db = require("../db/db.js");
const { response } = require("express");
const itemsController = {};

itemsController.getItems = (req, res, next) => {
  const sqlQuery = `SELECT * FROM items WHERE userid=$1;`;
  db.query(sqlQuery, [req.cookies.id])
    .then((response) => {
      res.locals.items = response.rows;
      console.log("getItems is successful");
      next();
    })
    .catch((err) => {
      next({ message: "Error in itemsController.getitems: " + err });
    });
};

itemsController.insertItems = (req, res, next) => {
  const sqlQuery = `INSERT INTO items(name,userid) VALUES($1,$2);`;
  db.query(sqlQuery, [req.body.name, req.cookies.id])
    .then(() => {
      console.log("Inserted Items: Successful");
      next;
    })
    .catch((err) => {
      next({ message: "Error in ItemsController.insertitems: " + err });
    });
};
module.exports = itemsController;
