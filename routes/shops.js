import { Router } from "express";
import shop from "../controllers/shop";

const router = Router();

router.get("/", shop.fetchShop);

export default router;
