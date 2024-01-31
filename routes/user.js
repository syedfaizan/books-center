let env = process.env.NODE_ENV || "development";
let config = require(__dirname + "/..\\config\\config.json")[env];

let router = require("express").Router();
const userController = require("../controllers/user");
const jwt = require("jsonwebtoken");
const _ = require("lodash");

const passport = require("passport");

router.post("/", (req, res, next) => {
  let username = req.body.username;
  return userController
    .create(username)
    .then((user) => {
      let minimalUser = _.pick(user, ["username", "id"]);
      let out = {
        user: minimalUser,
        jwt: jwt.sign(minimalUser, config.secret, { expiresIn: 604800 }),
      };
      res.preparePayload(out);
    })
    .catch(next);
});

module.exports = router;
