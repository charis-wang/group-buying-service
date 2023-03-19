import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  initiator: String,
  shop: { type: Schema.Types.ObjectId, ref: "Shop" },
  orderDeadline: String,
  status: String,
});

const orderModel = mongoose.model("Order", orderSchema);

const generate = async (data) => {
  const payload = data;
  payload.status = "Processing";
  const order = await orderModel.create(payload);

  return order._id;
};

const fetch = async (orderId) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) return;
  return await orderModel.findById(orderId).populate("shop");
};

const updateStatus = async (orderId, orderStatus) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) return;
  await orderModel.findOneAndUpdate({ _id: orderId }, { status: orderStatus });
};

export default { orderSchema, orderModel, generate, fetch, updateStatus };
