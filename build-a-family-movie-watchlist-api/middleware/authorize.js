export function authorizeModification(req, res, next) {
  const user = req.user;
  const { userId } = req.params;
  const isParent = user?.role === "parent";
  const isChildModifyingOwnWatchlist =
    user?.role === "child" && String(user.id) === userId;

  if (!isParent && !isChildModifyingOwnWatchlist) {
    return res.status(403).json({ error: "Access denied" });
  }

  return next();
}