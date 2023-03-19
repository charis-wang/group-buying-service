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
  return Object.values(menu).reduce(
    (accumulator, currentValue) => accumulator.concat(currentValue),
    []
  );
};

const zipMenuByGroup = (menuData) => {
  let menu = {};
  for (let doc of menuData) {
    const groupName = doc.groupName;
    if (menu[groupName]) {
      menu[groupName].push(doc);
    } else {
      menu[groupName] = [doc];
    }
  }
  return menu;
};

const updateMenu = async (shopId, menuData) => {
  const payload = unzipMenuByGroup(menuData);

  for (let doc of payload) {
    doc["shop"] = shopId;
    if (doc["_id"]) delete doc["_id"];
  }

  await menuModel.deleteMany({ shop: shopId });
  await menuModel.insertMany(payload);

  return shopId;
};

const fetchByShopId = async (shopId) => {
  if (!mongoose.Types.ObjectId.isValid(shopId)) return;
  const result = await menuModel.find({ shop: shopId });
  if (result) return zipMenuByGroup(result);
};

const remove = async (shopId) => await menuModel.deleteMany({ shop: shopId });

export default { menuSchema, menuModel, updateMenu, fetchByShopId, remove };
