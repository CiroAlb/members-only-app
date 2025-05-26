import bcrypt from "bcryptjs";
import db from "../config/db.js";
import { passportRoute } from "../passport/passportRoute.js";

export class AppController {
  static async getMain(req, res) {
    res.render("index", { user: req.user });
  }
  static async getSignUp(req, res) {
    res.render("sign-up-form");
  }
  static async getLogOut(req, res, next) {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
  }
  static async postSignUp(req, res, next) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      await db.query("insert into users (username, password) values ($1, $2)", [
        req.body.username,
        hashedPassword,
      ]);
      res.redirect("/");
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  static async postLogIn() {
    passportRoute.passportSession;
  }
}
