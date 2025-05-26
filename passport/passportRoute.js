import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcryptjs";
import session from "express-session";
import db from "../config/db.js"; // Asegúrate de que este archivo exporte tu instancia de Pool

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
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await db.query(
        "SELECT * FROM users WHERE username = $1",
        [username]
      );
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

// Session serialization
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/",
});
