const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

router.get("/callback", (req, res) => {
  const body = {
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code: req.query.code,
  };
  console.log("~~~~", req.query);
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
      console.log("Token!!!!!!!: ", data);
      let token = data["access_token"];
      console.log("My token:", token);
      return token;
    })
    .then((token) => {
      res.cookie("token", token);
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
      const { login, id, avatar_url, name } = data;
      console.log("login: ", login);
      console.log("id: ", id);
      console.log("avatar url: ", avatar_url);
      console.log("name: ", name);
      const obj = { login, id, avatar_url, name };
      // res.send(obj);
      // return res.send(obj).redirect('/');
      return res.status(200).redirect('/');
    })
    .catch((err) => res.status(500).json({ message: err.message }));
});

router.get("/", (req, res) => {
  res.redirect(
    `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}`
  );
});

module.exports = router;
