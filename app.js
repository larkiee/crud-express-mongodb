import "dotenv/config";
import "./init.js"
import express from "express";
import passport from "passport";
import passportConfig from "./config/passport.js";
import { router } from "./controllers/index.js";
import middlewares from "./middlewares/index.js";

const app = express();

passportConfig(passport);
app.use(passport.initialize());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(middlewares.errorHandler)

app.listen(Number.parseInt(process.env.APP_PORT));
