import mongoose from "mongoose";
import LocalStrategy from "passport-local";
import bcrypt from "bcrypt";

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
    .findOne({ username })
    .then((user) =>
      bcrypt
        .compare(password, user.password)
        .then((res) => callback(null, res ? user : null))
    )
    .catch((err) => callback(err))
);

const createAccount = async (userInfo) => {
  bcrypt
    .hash(userInfo.password, 10)
    .then((hash) => accountModel.create({ ...userInfo, password: hash }));
};

export default { accountSchema, accountModel, strategy, createAccount };
