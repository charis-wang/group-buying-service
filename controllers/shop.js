import shop from "../models/shop";
import menu from "../models/menu";
import { errorResponse } from "./base";

const fetchShop = async (req, res) => {
  const shopId = req.query.id;
  const shop_data = await shop.fetch(shopId);

  if (!shop_data) {
    errorResponse(res, 404, "shopId Not Found");
    return;
  }

  res.json(shop_data);
};

const updateShopAndMenu = async (req, res) => {
  const data = req.body;

  const shopId = await shop.upsert(data.shop);

  await menu.updateMenu(shopId, data.menu);

  res.json({ id: shopId });
};

const deleteShopAndMenu = async (req, res) => {
  const shopId = req.query.id;

  await shop.remove(shopId);

  await menu.remove(shopId);

  res.end();
};

const fetchShopOptions = async (req, res) => {
  const result = await shop.fetchShopOptions();
  const shopOptions = result.map((option) => ({
    label: option.shopName,
    value: option._id,
    type: option.shopType,
  }));

  res.json(shopOptions);
};

export default {
  fetchShop,
  updateShopAndMenu,
  deleteShopAndMenu,
  fetchShopOptions,
};
