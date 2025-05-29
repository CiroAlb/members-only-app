// app.js
import path from "node:path";
import express from "express";
import AppRouter from "./routes/AppRouter.js";
import passport from "passport"; // Agregá esto arriba si no lo tenés
import { passportRoute } from "./passport/passportRoute.js";

const app = express();

app.set("views", path.join(path.resolve(), "views"));
app.set("view engine", "ejs");

app.use(passportRoute.sessionApp); // tu config de sesión está bien
app.use(passport.initialize()); // NECESARIO para inicializar passport
app.use(passport.session()); // NECESARIO para manejar sesiones
app.use(express.urlencoded({ extended: false }));

app.use("/", AppRouter);
app.use("/sign-up-form", AppRouter);
app.use("/sign-up", AppRouter);
app.use("/log-out", AppRouter);
app.use("/log-in", AppRouter);
app.use("/message-post", AppRouter);
app.use("/activate-membership", AppRouter);
app.use("/delete", AppRouter);
app.listen(3000, () => console.log("App listening on port 3000!"));
