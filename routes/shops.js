import { Router } from "express";
import shop from "../controllers/shop";

const router = Router();

router.get("/", shop.fetchShop);

router.post("/showAll", shop.fetchShops);

export default router;
