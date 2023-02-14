import { Router } from "express";
import { register, login, logout, info } from "../controllers/account";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/info", info);

export default router;
