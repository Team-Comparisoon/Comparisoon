const db = require("../db/db.js");
const categoriesController = {};

categoriesController.getCategories = (req, res, next) => {
  const sqlQuery = `SELECT * FROM categories WHERE userid=$1;`;
  db.query(sqlQuery, [req.cookies.id])
    .then((response) => {
      res.locals.categories = response.rows;
      console.log("getCategories was successful");
      next();
    })
    .catch((err) => {
      next({ message: "Error in categoriesController.getCategories: " + err });
    });
};

categoriesController.insertCategory = (req, res, next) => {
  const sqlQuery = `INSERT INTO categories(name, fields, userid) VALUES($1,$2,$3);`;
  db.query(sqlQuery, [req.body.name, req.body.fields, req.cookies.id])
    .then(() => {
      console.log("insertCategory was successful");
      next();
    })
    .catch((err) => {
      next({ message: "Error in categoriesController.insertCategory: " + err });
    });
};

categoriesController.getCategoryById = (req, res, next) => {
  const sqlQuery = `SELECT * FROM categories WHERE id=$1;`;
  db.query(sqlQuery, [req.params.categoryId])
    .then((response) => {
      res.locals.category = response.rows[0];
      console.log("getCategories by ID was successful");
      next();
    })
    .catch((err) => {
      next({ message: "Error in categoriesController.getCategoryById: " + err });
    });
};

module.exports = categoriesController;
