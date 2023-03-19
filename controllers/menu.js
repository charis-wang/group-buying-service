import menu from "../models/menu";
import { errorResponse } from "./base";

const fetchMenu = async (req, res) => {
  const params = req.query;

  if (params.shopId) {
    const menu_data = await menu.fetchByShopId(params.shopId);

    if (!menu_data) {
      errorResponse(res, 404, "orderId Not Found");
      return;
    }

    res.json(menu_data);
  }

  res.end();
};

export default { fetchMenu };
