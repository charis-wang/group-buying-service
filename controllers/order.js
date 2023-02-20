import order from "../models/order";

const createOrder = async (req, res) => {
  const data = req.body;
  const orderId = await order.generate(data);

  res.json({ id: orderId });
};

export default {
  createOrder,
};
