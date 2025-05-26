import { Router } from "express";
import { AppController } from "../controllers/AppController.js";

const AppRouter = Router();

AppRouter.get("/", AppController.getMain);
AppRouter.get("/sign-up-form", AppController.getSignUp);
AppRouter.get("/log-out", AppController.getLogOut);

AppRouter.post("/sign-up", AppController.postSignUp);
AppRouter.post("/log-in", AppController.postLogIn);

export default AppRouter;
