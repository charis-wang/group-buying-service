import menu from "../models/menu";

const fetchMenu = async (req, res) => {
  const params = req.query;

  if (params.shopId) {
    const menu_data = await menu.fetchByShopId(params.shopId);
    res.json(menu_data);
  }

  res.end();
};

export default { fetchMenu };
