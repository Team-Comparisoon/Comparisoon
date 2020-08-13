const db = require("./db.js");

db.query(
  `create table users (
  id character varying(60) not null primary key
  );`
)
  .then(() => console.log("Created users table"))
  .then(
    db.query(
      `create table items (
      id serial primary key,
      name character varying(200) not null,
      userId character varying(60) not null,
      FOREIGN KEY(userId) REFERENCES users(id)
  );`
    )
  )
  .then(() => console.log("Created items table"))
  .catch((err) => console.log("Error in creating tables", err));

// Create users table DONE
`create table users (
    id character varying(60) not null primary key
    );` // Create items table DONE
`create table items (
    id serial primary key,
    name character varying(200) not null,
    FOREIGN KEY(userId) REFERENCES users(id)
);` // Create categories table DONE
`create table categories (
    id serial primary key,
    name character varying(200) not null,
    fields character varying(200) [] not null,
    userId character varying(60) not null,
    FOREIGN KEY(userId) REFERENCES users(id)
);` // Create item_category table DONE
`create table item_category (
  userId character varying(60) not null,
  itemId int not null,
  categoryId int not null,
  FOREIGN KEY(userId) REFERENCES users(id),
  FOREIGN KEY(itemId) REFERENCES items(id),
  FOREIGN KEY(categoryId) REFERENCES categories(id)
);` //Create table all_inputs
`create table all_inputs (
userId character varying(60) not null,
itemId int,
categoryId int,
fieldName character varying(200),
value text,
FOREIGN KEY(userId) REFERENCES users(id),
FOREIGN KEY(itemId) REFERENCES items(id),
FOREIGN KEY(categoryId) REFERENCES categories(id)
);`;
