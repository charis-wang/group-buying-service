import mongoose from "mongoose";
const Schema = mongoose.Schema;

const menuSchema = new Schema({
  groupName: String,
  itemName: String,
  price: Number,
  detail: String,
  shop: { type: Schema.Types.ObjectId, ref: "Shop" },
});

const menuModel = mongoose.model("Menu", menuSchema);
const unzipMenuByGroup = (menu) => {
  return Object.values(menu).reduce((accumulator, currentValue) =>
    accumulator.concat(currentValue)
  );
};

const updateMenuOfShop = async (shopId, menuData) => {
  menuModel.deleteMany({ shop: shopId });
  const processedMenuData = unzipMenuByGroup(menuData);
  const payload = processedMenuData.map((data) => ({
    ...data,
    shop: shopId,
  }));

  return menuModel.insertMany(payload);
};

export default { menuSchema, menuModel, updateMenuOfShop };
