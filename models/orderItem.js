import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderItemSchema = new Schema(
  {
    buyer: String,
    order: { type: Schema.Types.ObjectId, ref: "Order" },
    itemIdAndDetail: String,
    itemId: { type: Schema.Types.ObjectId, ref: "Menu" },
    itemName: String,
    orderDetail: String,
    price: Number,
    extraCost: Number,
    amount: Number,
    status: String,
  },
  { autoIndex: true }
);
orderItemSchema.index(
  { order: 1, buyer: 1, itemId: 1, orderDetail: 1 },
  { unique: true }
);

const orderItemModel = mongoose.model("OrderItem", orderItemSchema);

const upsert = async (orderId, buyer, data) => {
  if (!mongoose.Types.ObjectId.isValid(orderId)) return;

  await orderItemModel.deleteMany({
    order: orderId,
    buyer: buyer,
  });
  await orderItemModel.insertMany(data);
};

const updatePaidStatus = async (order, buyer, status) =>
  orderItemModel.updateMany({ order, buyer }, { status });

const fetch = async (orderId, buyer) => {
  const filter = { order: orderId };
  if (buyer) filter["buyer"] = buyer;
  const orderItems = await orderItemModel.find(filter);

  return orderItems;
};

export default {
  orderItemSchema,
  orderItemModel,
  upsert,
  updatePaidStatus,
  fetch,
};
