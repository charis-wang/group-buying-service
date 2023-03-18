import order from "../models/order";
import menu from "../models/menu";

const createOrder = async (req, res) => {
  const data = req.body;
  const orderId = await order.generate(data);

  res.json({ id: orderId });
};

const fetchOrder = async (req, res) => {
  const orderId = req.query.id;

  const orderData = await order.fetch(orderId);
  const shopId = orderData.shop._id;
  const menuData = await menu.fetchByShopId(shopId);

  res.json({ orderData: orderData, menuData: menuData });
};

const updateOrderStatus = async (req, res) => {
  const orderId = req.query.id;
  const orderStatus = req.query.status;

  await order.updateStatus(orderId, orderStatus);
  res.end();
};

export default {
  createOrder,
  fetchOrder,
  updateOrderStatus,
};
