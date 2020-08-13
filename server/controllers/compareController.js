const db = require("../db/db.js");
const compareController = {};

/* 
received categoryId as param 
Response body structure:
{
  <itemName>: {
    Dataflow: ‘unidirectional’
    etc.
  },
  <itemName>: {
    Dataflow: ‘unidirectional’
    etc.
  },
}

    SQL Query 1
    Figure out which items the category has from item_category table
    Fet the name of the item from the items table

    // Note: apparently it is better to use INNER JOIN vs. selecting from multiple tables (implicit join) like this:
    SELECT items.name FROM items, item_category WHERE item_category.categoryid=31 AND items.id=item_category.itemid
    
    SQL Query 2
    Use all_inputs to get the field: value pairs for the userid, categoryid, and the specific itemid

*/
compareController.getItemsToCompare = (req, res, next) => {
  const sqlQuery1 = `SELECT items.id,items.name FROM items INNER JOIN item_category ON items.id=item_category.itemid WHERE item_category.categoryid=$1;`;
  db.query(sqlQuery1, [req.params.categoryId])
    .then((response) => {
      // Array of objects with form {id: <itemId>, name: <itemName>}
      res.locals.items = response.rows;
      const sqlQuery2 = `SELECT * FROM all_inputs WHERE categoryid=$1;`;
      return db.query(sqlQuery2, [req.params.categoryId]);
    })
    .then((response) => {
      // Array of objects with form {itemid: <itemId>, categoryid: <categoryid>, fieldname: , value: }
      const inputs = response.rows;
      res.locals.data = {};
      inputs.forEach((input) => {
        const { itemid, fieldname, value } = input;
        if (!res.locals.data[itemid]) res.locals.data[itemid] = {};
        res.locals.data[itemid][fieldname] = value;
      });
      const itemIds = Object.keys(res.locals.data);
      // replace the itemid key with the itemName
      itemIds.forEach((itemId) => {
        const itemName = res.locals.items.filter((item) => item.id == itemId)[0]
          .name;
        res.locals.data[itemName] = res.locals.data[itemId];
        delete res.locals.data[itemId];
      });
      next();
    })
    .catch((err) => {
      next({ message: "Error in compareController.getItemsToCompare: " + err });
    });
};

module.exports = compareController;
