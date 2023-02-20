import mongoose from "mongoose";
import LocalStrategy from "passport-local";

const Schema = mongoose.Schema;

const accountSchema = new Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  email: String,
  phoneNumber: String,
});

const accountModel = mongoose.model("Account", accountSchema);

const strategy = new LocalStrategy((username, password, callback) =>
  accountModel
    .findOne({ username, password })
    .then((user) => callback(null, user))
    .catch((err) => callback(err))
);

const createAccount = async (userInfo) => {
  try {
    const account = await accountModel.create(userInfo);
    return account;
  } catch (err) {
    if (err && err.code === 11000) return { error: "duplicate username" };
    throw err;
  }
};

export default { accountSchema, accountModel, strategy, createAccount };
