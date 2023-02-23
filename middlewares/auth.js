import passport from "passport";

const loginRequired = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401);
    return res.json({ error: "Not login yet." });
  }
  next();
};

export { loginRequired };
