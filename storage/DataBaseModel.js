import db from "./config/db.js";
import { randomUUID } from "node:crypto";
import { validateUser } from "../schemas/userSchema.js";
import bcrypt from "bcryptjs";

export class DataBaseModel {
  static async getMessages() {
    const { rows } = await db.query("SELECT * FROM messages");
    return rows;
  }

  static async logInVerify(email, password, done) {
    try {
      const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect email" });
      }

      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }

  static async searchId(id, done) {
    try {
      const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [
        id,
      ]);
      const user = rows[0];
      done(null, user);
    } catch (err) {
      done(err);
    }
  }

  static async createUser(req, res, next) {
    try {
      const result = validateUser(req.body);
      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      if (!result.success) {
        return res
          .status(400)
          .json({ error: JSON.parse(result.error.message) });
      }

      const { username, first_name, last_name, email } = result.data;

      await db.query(
        "insert into users (username, password, first_name, last_name, email) values ($1, $2, $3, $4, $5)",
        [username, hashedPassword, first_name, last_name, email]
      );
      res.redirect("/");
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  static async postMessage({ input }) {
    const { title, texto, user_id, username } = input;
    const date = new Date();

    await db.query(
      `INSERT INTO messages (title, texto, user_id, date, username)
       VALUES ($1, $2, $3, $4, $5)`,
      [title, texto, user_id, date, username]
    );

    return { ...input };
  }

  static async activateMembership({ id }) {
    await db.query("UPDATE users SET membership = true WHERE id = $1", [id]);
  }

  static async delete(id) {
    const result = await db.query(`DELETE FROM messages WHERE id = $1`, [id]);
    return result.rowCount > 0;
  }
}
