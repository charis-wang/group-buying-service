import { Router } from "express";
import { loginRequired } from "../middlewares/auth";
import order from "../controllers/order";
import orderItem from "../controllers/orderItem";

const router = Router();

router.post("/create", order.createOrder);
router.get("/", order.fetchOrder);
router.get("/update", order.updateOrderStatus);

router.post("/order_item", loginRequired, orderItem.createOrderItem);
router.get("/order_item", orderItem.fetchOrderItem);
router.delete("/order_item", orderItem.removeOrderItems);

router.post(
  "/payment_status",
  loginRequired,
  orderItem.updateOrderPaymentStatus
);

export default router;
