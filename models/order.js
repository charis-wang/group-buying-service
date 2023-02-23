import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  initiator: String,
  shop: { type: Schema.Types.ObjectId, ref: "Shop" },
  orderDeadline: String,
});

const orderModel = mongoose.model("Order", orderSchema);

const generate = async (data) => {
  const payload = data;
  const order = await orderModel.create(payload);

  return order._id;
};

const fetch = async (orderId) =>
  await orderModel.findById(orderId).populate("shop");

export default { orderSchema, orderModel, generate, fetch };
