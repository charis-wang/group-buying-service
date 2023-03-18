export const errorResponse = (res, status, msg = "") => {
  res.status(status);
  if (msg) res.json({ message: msg });
  else res.end();
};
