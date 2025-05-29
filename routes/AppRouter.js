//AppRouter.js
import { Router } from "express";
import passport from "passport";
import { AppController } from "../controllers/AppController.js";

const AppRouter = Router();

AppRouter.get("/", AppController.getMain);
AppRouter.get("/sign-up-form", AppController.getSignUp);
AppRouter.get("/log-out", AppController.getLogOut);

AppRouter.post("/sign-up", AppController.postSignUp);
AppRouter.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);
AppRouter.post("/message-post", AppController.postMessage);
AppRouter.post("/activate-membership", AppController.postActivate);
AppRouter.post("/delete", AppController.delete);

export default AppRouter;
