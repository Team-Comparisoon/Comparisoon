const db = require("../db/db.js");
const format = require("pg-format");
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
  // First insert a new row in the items table to generate a unique itemId
  const sqlQuery = `INSERT INTO items(name,userid) VALUES($1,$2) RETURNING id;`;
  db.query(sqlQuery, [req.body.name, req.cookies.id])
    .then((response) => {
      console.log("Inserted Items: Successful");
      return response.rows[0].id;
    })
    // use the itemId to update the item_category table
    // with each category the item belongs to
    .then((itemId) => {
      // each key in the fields response object should be a categoryId
      // using pg-format, we can insert multiple rows at once via a nested array
      // so we need to create a row/array for each categoryId that also contains //the itemId and userId
      const rows = Object.keys(req.body.fields).map((categoryId) => [
        categoryId,
        itemId,
        req.cookies.id,
      ]);
      const itemQuery = format(
        `INSERT INTO item_category(categoryid, itemid, userid) VALUES %L RETURNING itemid`,
        rows
      );
      return db.query(itemQuery);
    })
    // update the all_inputs table with a row for each field in the item
    .then((response) => {
      console.log("Updated item_category relations table");
      /* 
        req.body structure:
        {
          name: <itemName>,  
          fields: { 
            <category1Id>: {’data flow’ :  value, ‘field2’: value }, 
            <category2Id>: { more key-value pairs }	
            }
          }
        trying to get data like this:
        [
          [category1Id, itemid, userid, 'data flow', value],
          [category1Id, itemid, userid, 'field2', value],
          etc.
        ]
      */
      //[[categoryid, itemid, userid, fieldname, value],];
      const itemId = response.rows[0].itemid;
      const rows = [];
      for (let categoryId in req.body.fields) {
        for (let fieldName in req.body.fields[categoryId]) {
          const row = [categoryId, itemId];
          row.push(fieldName);
          row.push(req.body.fields[categoryId][fieldName]);
          rows.push(row);
        }
      }
      const inputsQuery = format(
        `INSERT INTO all_inputs(categoryid, itemid, fieldname, value) VALUES %L`,
        rows
      );
      return db.query(inputsQuery);
    })
    .then(() => {
      console.log("Updated all_inputs relations table");
      next();
    })
    .catch((err) => {
      next({ message: "Error in ItemsController.insertitems: " + err });
    });
};

itemsController.getItemById = (req, res, next) => {
  // const getitemQuery = ``

};

module.exports = itemsController;
