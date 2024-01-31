let jwt = require("jsonwebtoken");
let models = require("../models");
let passportJWT = require("passport-jwt");
const _ = require("lodash");

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let env = process.env.NODE_ENV || "development";
let config = require(__dirname + "/..\\config\\config.json")[env];

module.exports = (passport) => {
  let jwtOptions = {};
  jwtOptions.jwtFromRequest =
    ExtractJwt.fromAuthHeaderAsBearerToken("Authorization");
  jwtOptions.secretOrKey = config.secret;

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });

  let strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
    return models.User.findOne({
      where: {
        id: jwt_payload.id,
      },
    }).then((user) => {
      if (user) {
        let minimalUser = _.pick(user, ["username", "id"]);
        next(null, minimalUser);
      } else {
        next(null, false);
      }
    });
  });

  passport.use(strategy);
};
