import { response } from "express";
import passport from "passport";
import account from "../models/account";
import orderItem from "../models/orderItem";
import { errorResponse } from "./base";
import order from "../models/order";

const filteredUserInfo = (user) => ({
  username: user.username,
});

const register = async (req, res) => {
  const userInfo = req.body;

  account
    .createAccount(userInfo)
    .then((result) => res.json(result))
    .catch((error) => {
      if (error && error.code === 11000)
        errorResponse(res, 422, "username is duplicated.");
      else throw error;
    });
};

const login = async (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) next(err);

    if (!user) {
      errorResponse(res, 401, "authentication failed");
    }
    req.login(user, (loginErr) =>
      loginErr
        ? next(loginErr)
        : res.json({
            success: true,
            message: "Authentication succeeded",
            info: filteredUserInfo(user),
          })
    );
  })(req, res, next);
};

const logout = async (req, res, next) => {
  req.logout((err) => {
    if (err) next(err);
  });
  res.json({ success: true, msg: "Logout successfully" });
};

const info = async (req, res) => {
  const { username } = req.user;
  res.json({ username });
};

const myOrders = async (req, res) => {
  const { username } = req.user;
  const orders = await orderItem.fetchOrders(username);
  console.log("....", orders);
  res.json({ orders });
};

export { register, login, logout, info, myOrders };
