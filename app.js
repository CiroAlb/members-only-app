// app.js (ES Modules)
import path from "node:path";
import express from "express";
import AppRouter from "./routes/AppRouter.js";
import { passportRoute } from "./passport/passportRoute.js";

const app = express();

app.set("views", path.join(path.resolve(), "views")); // __dirname isn't defined in ES Modules
app.set("view engine", "ejs");

app.use(passportRoute.sessionApp);
app.use(passportRoute.passportSession);
app.use(express.urlencoded({ extended: false }));

app.use("/", AppRouter);
app.use("/sign-up-form", AppRouter);
app.use("/sign-up", AppRouter);
app.use("/log-out", AppRouter);
app.use("/log-in", AppRouter);

app.listen(3000, () => console.log("App listening on port 3000!"));
