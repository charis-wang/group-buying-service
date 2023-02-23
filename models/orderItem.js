import mongoose from "mongoose";
const Schema = mongoose.Schema;

const orderItemSchema = new Schema({
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
});

const orderItemModel = mongoose.model("OrderItem", orderItemSchema);

const upsert = async (data) => {
  data.map(async (payload) => {
    const orderId = mongoose.Types.ObjectId.isValid(data._id)
      ? data.orderId
      : undefined;

    let orderItem;

    if (orderId) {
      orderItem = await orderItemModel.updateOne({ order: orderId }, payload);
    } else {
      orderItem = await orderItemModel.create(payload);
    }
  });
};

export default { orderItemSchema, orderItemModel, upsert };
