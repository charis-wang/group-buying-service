import { Router } from "express";
import shop from "../controllers/shop";

const router = Router();

router.get("/", shop.fetchShop);

router.get("/shop_options", shop.fetchShopOptions);

export default router;
