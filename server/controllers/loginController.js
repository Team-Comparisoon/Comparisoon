const fetch = require("node-fetch");
const db = require("../db/db.js");

const loginController = {};

// get user's GitHub data from the API with an access token
loginController.getGitHubData = (req, res, next) => {
  const body = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: req.query.code,
  };
  fetch(`https://github.com/login/oauth/access_token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => {
      let token = data["access_token"];
      return token;
    })
    .then((token) => {
      return fetch("https://api.github.com/user", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `token ${token}`,
        },
      });
    })
    .then((data) => data.json())
    .then((data) => {
      const { id, avatar_url, name } = data;
      res.locals.oauthData = { avatar_url, name };
      res.locals.id = id;
      console.log("res.locals", res.locals);
      next();
    })
    .catch((err) => next({ message: err.message }));
};

// store plaintext id in users table
loginController.storeId = (req, res, next) => {
  const idQuery = `INSERT INTO users(id) VALUES($1)`;
  db.query(idQuery, [res.locals.id])
    .then((res) => {
      next();
    })
    .catch((err) => {
      //console.log("storeId err", err);
      if (err.code == "23505") {
        console.log("duplicate key error");
        next();
      } else {
        next({ message: "Error in loginController.storeId: " + err });
      }
    });
};

// set cookie with hash id
loginController.setCookie = (req, res, next) => {
  res.cookie("id", res.locals.id, { httpOnly: true });
  next();
};

module.exports = loginController;
