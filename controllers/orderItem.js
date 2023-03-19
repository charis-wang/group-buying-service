import mongoose from "mongoose";
import order from "../models/order";
import orderItem from "../models/orderItem";
import { errorResponse } from "./base";

const createOrderItem = async (req, res) => {
  const data = Object.values(req.body.orderItems).map((data) => ({
    ...data,
    buyer: req.user.username,
  }));
  await orderItem.upsert(req.body.orderId, req.user.username, data);
  res.end();
};

const fetchOrderItem = async (req, res) => {
  const [orderId, personal] = [req.query.id, req.query.personal];

  if (!req.user && personal) {
    res.json({ orderItems: [] });
    return;
  }

  const orderItemData = await orderItem.fetch(
    orderId,
    personal ? req.user.username : undefined
  );

  if (!orderItemData) {
    errorResponse(res, 404, "orderId Not Found");
    return;
  }

  const response = orderItemData.map((data) => ({
    order: data.order,
    buyer: data.buyer,
    itemId: data.itemId,
    itemName: data.itemName,
    orderDetail: data.orderDetail,
    price: data.price,
    extraCost: data.extraCost,
    amount: data.amount,
    subtotal: data.price + data.extraCost,
    status: data.status,
  }));

  res.json({ orderItems: response });
};

const updateOrderPaymentStatus = async (req, res) => {
  const username = req.user.username;
  const { orderId, buyer, status } = req.body;
  const orderData = await order.fetch(orderId);
  const initiator = orderData && orderData.initiator;

  if (!orderData) return errorResponse(res, 400, "Order not found.");
  if (username !== initiator && buyer !== username)
    return errorResponse(res, 403);

  orderItem.updatePaidStatus(orderId, buyer, status);
  res.end();
};

export default {
  createOrderItem,
  fetchOrderItem,
  updateOrderPaymentStatus,
};
