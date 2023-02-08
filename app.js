import Router from "express";
import menuRoutes from "./routes/menus";
import shopRoutes from "./routes/shops";
import { updateShopAndMenu } from "./controllers/general";
const router = Router();

router.use("/menu", menuRoutes);
router.use("/shop", shopRoutes);

router.post("/shopWithMenu", updateShopAndMenu);

export default router;
