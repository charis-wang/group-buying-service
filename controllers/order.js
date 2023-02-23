import order from "../models/order";
import menu from "../models/menu";

const createOrder = async (req, res) => {
  const data = req.body;
  const orderId = await order.generate(data);

  res.json({ id: orderId });
};

const fetchOrder = async (req, res) => {
  const orderId = req.query.id;

  const order_data = await order.fetch(orderId);
  const shopId = order_data.shop._id;
  const menu_data = await menu.fetchByShopId(shopId);

  res.json({ orderData: order_data, menuData: menu_data });
};

export default {
  createOrder,
  fetchOrder,
};
