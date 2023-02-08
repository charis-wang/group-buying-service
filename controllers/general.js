import shop from "../models/shop";
import menu from "../models/menu";

export const updateShopAndMenu = async (req, res) => {
  const data = req.body;

  const shop_data = await shop.upsert(data.shop);
  const shopId = shop_data._id;

  await menu.updateMenuOfShop(shopId, data.menu);

  res.json({});
};
