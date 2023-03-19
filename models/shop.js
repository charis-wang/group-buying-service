import mongoose from "mongoose";
const Schema = mongoose.Schema;

const shopSchema = new Schema({
  shopName: { type: String, unique: true, required: true },
  shopType: String,
  shopPhoneNumber: String,
  shopAddress: String,
  shopInfo: String,
});

const shopModel = mongoose.model("Shop", shopSchema);

const upsert = async (data) => {
  const _id = mongoose.Types.ObjectId.isValid(data._id) ? data._id : undefined;
  const payload = data;

  let shop;

  if (_id) {
    shop = await shopModel.updateOne({ _id: _id }, payload);
  } else {
    shop = await shopModel.create(payload);
  }

  return _id || shop._id;
};

const fetch = async (shopId) => {
  if (!mongoose.Types.ObjectId.isValid(shopId)) return;
  await shopModel.findById(shopId);
};
const fetchAll = async () => await shopModel.find();
const fetchShopOptions = async () => await shopModel.find({});

const remove = async (shopId) => await shopModel.deleteOne({ _id: shopId });

export default {
  shopSchema,
  shopModel,
  upsert,
  fetch,
  fetchAll,
  fetchShopOptions,
  remove,
};
