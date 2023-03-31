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

const fetchOrders = async (buyer) => {
  const filter = {};
  if (buyer) filter["buyer"] = buyer;
  const myOrders = await orderItemModel.find(filter).populate("order");

  const orders = [];
  const orderIds = [];

  const filteredData = (orderItems) => {
    orderItems.forEach((orderItem) => {
      if (orderIds.includes(orderItem.order._id.toString())) return;
      orderIds.push(orderItem.order._id.toString());
      orders.push({
        [orderItem.order._id]: {
          orderDeadline: orderItem.order.orderDeadline,
          status: orderItem.order.status,
          payment: orderItem.status,
        },
      });
    });
  };

  await filteredData(myOrders);

  return orders;
};

const remove = async (orderId, buyer) => {
  const filter = { order: orderId };
  if (buyer) filter["buyer"] = buyer;
  const removeOrderItems = await orderItemModel.deleteMany(filter);

  return removeOrderItems.deletedCount;
};

export default {
  orderItemSchema,
  orderItemModel,
  upsert,
  updatePaidStatus,
  fetch,
  fetchOrders,
  remove,
};
