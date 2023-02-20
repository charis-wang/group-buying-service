import { Router } from "express";
import { register, login, logout, info } from "../controllers/account";

const router = Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/info", info);

export default router;
