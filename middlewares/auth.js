import passport from "passport";
import { errorResponse } from "../controllers/base";

const loginRequired = async (req, res, next) => {
  if (!req.isAuthenticated()) errorResponse(res, 401, "login required");
  else next();
};

export { loginRequired };
