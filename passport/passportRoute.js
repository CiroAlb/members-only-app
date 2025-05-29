//passportRoute.js
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import session from "express-session";
import { DataBaseModel } from "../storage/DataBaseModel.js";

export class passportRoute {
  static sessionApp = session({
    secret: "cats",
    resave: false,
    saveUninitialized: false,
  });

  static passportSession = passport.session();
}

// Local strategy setup
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      DataBaseModel.logInVerify(email, password, done);
    }
  )
);

// Session serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  DataBaseModel.searchId(id, done);
});

passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
});
