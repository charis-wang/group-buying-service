import mongoose from "mongoose";
const Schema = mongoose.Schema;

const shopSchema = new Schema({
  shopName: String,
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

const fetch = async (shopId) => await shopModel.findById(shopId);

const remove = async (shopId) => await shopModel.deleteOne({ _id: shopId });

export default { shopSchema, shopModel, upsert, fetch, remove };
