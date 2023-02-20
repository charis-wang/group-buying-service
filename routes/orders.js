import { Router } from "express";
import order from "../controllers/order";

const router = Router();

router.post("/create", order.createOrder);

export default router;
