import { response } from "express";
import passport from "passport";
import account from "../models/account";

const register = async (req, res) => {
  const userInfo = req.body;

  const response = await account.createAccount(userInfo);

  if (response.error) res.status(422);

  res.json(response);
};

const login = async (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) next(err);

    if (!user)
      return res.json({ success: false, message: "authentication failed" });

    req.login(user, (loginErr) =>
      loginErr
        ? next(loginErr)
        : res.json({ success: true, message: "Authentication succeeded" })
    );
  })(req, res, next);
};

const logout = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(400);
    res.json({ error: "Not login yet." });
    return;
  }
  req.logout((err) => {
    if (err) next(err);
  });
  res.json({ success: true, msg: "Logout successfully" });
};

const info = async (req, res) => {
  if (!req.isAuthenticated()) {
    res.status(401);
    res.json({ error: "Not login yet." });
    return;
  }

  const { username } = req.user;
  res.json({ username });
};

export { register, login, logout, info };
