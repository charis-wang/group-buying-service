import mongoose from "mongoose";
const Schema = mongoose.Schema;

const shopSchema = new Schema({
  shopName: String,
  type: String,
  phoneNumber: String,
  address: String,
  info: String,
});

const shopModel = mongoose.model("Shop", shopSchema);

const upsert = async (data) => {
  const _id = mongoose.Types.ObjectId.isValid(data.id) ? data.id : undefined;
  const payload = {
    shopName: data.shopName,
    type: data.shopType,
    phoneNumber: data.shopPhoneNumber,
    address: data.shopAddress,
    info: data.shopInfo,
  };

  let shop;

  if (_id) {
    shop = await shopModel.updateOne({ _id: _id }, payload);
  } else {
    shop = await shopModel.create(payload);
  }

  return shop;
};

export default { shopSchema, shopModel, upsert };
