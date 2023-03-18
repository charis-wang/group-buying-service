import { Router } from "express";
import { loginRequired } from "../middlewares/auth";
import { register, login, logout, info } from "../controllers/account";

const router = Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", loginRequired, logout);
router.get("/info", loginRequired, info);

export default router;
