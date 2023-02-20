import shop from "../models/shop";
import menu from "../models/menu";

const fetchShop = async (req, res) => {
  const shopId = req.query.id;

  const shop_data = await shop.fetch(shopId);

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
};

const fetchShops = async (req, res) => {
  const shops = await shop.fetchAll();

  res.json({ shops: shops });
};

export default {
  fetchShop,
  updateShopAndMenu,
  deleteShopAndMenu,
  fetchShops,
};
