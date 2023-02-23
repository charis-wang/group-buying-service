import { Router } from "express";
import { loginRequired } from "../middlewares/auth";
import order from "../controllers/order";
import orderItem from "../controllers/orderItem";

const router = Router();

router.post("/create", order.createOrder);
router.get("/", order.fetchOrder);

router.post("/orderItem", loginRequired, orderItem.createOrderItem);

export default router;
