import { Router } from "express";
import menu from "../controllers/menu";

const router = Router();

router.get("/", menu.fetchMenu);

export default router;
