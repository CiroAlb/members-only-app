//AppController.js
import { DataBaseModel } from "../storage/DataBaseModel.js";
import { passportRoute } from "../passport/passportRoute.js";
import { randomUUID } from "node:crypto";
import { validateMessage } from "../schemas/messageSchema.js";
import "dotenv/config";

export class AppController {
  static async getMain(req, res) {
    const messages = await DataBaseModel.getMessages();
    res.render("index", { user: req.user, messages: messages });
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
    DataBaseModel.createUser(req, res, next);
  }
  static async postLogIn() {
    passportRoute.passportSession;
  }
  static async postMessage(req, res) {
    console.log(req.body);
    const result = validateMessage(req.body);
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) });
    }
    await DataBaseModel.postMessage({ input: result.data });
    return res.redirect("/");
  }
  static async postActivate(req, res) {
    const id = req.body.user_id;
    if (req.body.activate === process.env.SUPER_SECRET_CODE) {
      await DataBaseModel.activateMembership({ id });
    }
    return res.redirect("/");
  }

  static async delete(req, res) {
    const id = req.body.id;
    console.log(id);
    const result = await DataBaseModel.delete(id);

    if (result === false) {
      return res.status(404).json({ message: "message not found" });
    }

    return res.redirect("/");
  }
}
