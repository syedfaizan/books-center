let express = require("express");
let logger = require("morgan");
let cors = require("cors");
// let models = require('./models');
let passport = require("passport");
const jwtStratergy = require("./middlewares/passport");

jwtStratergy(passport);

let app = express();

app.use(logger("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use((req, res, next) => {
  res.preparePayload = (payload) => {
    let defaulHappyPathResponse = {
      data: payload,
      status: "success",
    };
    let defaultUnhappyPathResponse = {
      status: "error",
      message: "Item not found or error occured!",
    };

    if (payload == null) {
      return res.send(defaultUnhappyPathResponse);
    }

    if (Array.isArray(payload)) {
      return res.send({
        defaulHappyPathResponse,
        ...{
          data: { items: payload },
          length: payload.length,
        },
      });
    }
    return res.send(defaulHappyPathResponse);
  };
  next();
});

require("./routes")(app);

// Gracefully catch all routes which are unintended.
app.get("*", (req, res) => {
  throw new Error("Invalid Route, please use /book route");
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({ message: err.message, errors: err.errors });
});

module.exports = app;
