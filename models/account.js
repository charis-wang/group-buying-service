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

const createAccount = async (userInfo) => accountModel.create(userInfo);

export default { accountSchema, accountModel, strategy, createAccount };
