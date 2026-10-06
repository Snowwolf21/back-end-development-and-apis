 import bcrypt from "bcryptjs";

export function requireParentRole(req, res, next) {
  const { user } = req;
  if (!user || user.role !== "parent") {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
}

export function requireChild(req, res, next) {
    if (req.user.role !== "child") {
        return res.status(403).json({
            error: "Child role required"
        });
    }

    if (req.user._id.toString() !== req.params.userId) {
        return res.status(403).json({
            error: "You can only modify your own watchlist"
        });
    }

    next();
}

export const verifyPassword = (user, password) => {
  return bcrypt.compare(password, user.passwordHash);

}