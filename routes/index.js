const passport = require("passport");
let booksRouter = require("./book");
let usersRouter = require("./user");

module.exports = (app) => {
  app.use(
    "/api/book",
    passport.authenticate("jwt", { session: false }),
    booksRouter
  );
  app.use("/api/user", usersRouter);
};
