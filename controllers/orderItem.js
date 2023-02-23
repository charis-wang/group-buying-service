import orderItem from "../models/orderItem";

const createOrderItem = async (req, res) => {
  const data = Object.values(req.body);

  await orderItem.upsert(data);
};

export default {
  createOrderItem,
};
