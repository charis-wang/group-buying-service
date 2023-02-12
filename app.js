import Router from "express";
import menuRoutes from "./routes/menus";
import shopRoutes from "./routes/shops";
import shop from "./controllers/shop";

const router = Router();

router.use("/menu", menuRoutes);
router.use("/shop", shopRoutes);

router.post("/shop_with_menu", shop.updateShopAndMenu);
router.delete("/shop_with_menu", shop.deleteShopAndMenu);

export default router;
