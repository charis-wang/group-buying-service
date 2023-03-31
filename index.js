import dotenv from "dotenv";
dotenv.config();

import express from "express";
import session from "express-session";
import passport from "passport";
import cors from "cors";
import helmet from "helmet";
import bodyParser from "body-parser";
import { mongoose } from "mongoose";

import rootRoutes from "./app";
import account from "./models/account";

const PORT = process.env.PORT || 2001;
const app = express();

// Session
app.use(
  session({
    secret: process.env.SECRET_KEY,
    saveUninitialized: true,
    resave: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(account.strategy);
passport.serializeUser((user, done) => (user ? done(null, user._id) : false));
passport.deserializeUser((id, done) =>
  account.accountModel.findById(id).then((user) => done(null, user))
);

// Database
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017";
const debug = process.env.DB_DEBUG || false;
const db = mongoose.connection;

mongoose.set("strictQuery", false);
mongoose.set("debug", debug);
mongoose.connect(dbUrl);

db.on("error", console.error.bind(console, "Connection Error"));
db.once("open", async () => console.log("Database connected"));

// CORS
const corsOptions = {
  origin: ["http://localhost:3000"],
  methods: "GET,POST,DELETE,OPTIONS",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(helmet());
app.use(bodyParser.json());

app.use("/", rootRoutes);

process.on("uncaughtException", (err) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
