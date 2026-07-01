const isAdmin = (req, res, next) => {
  if (req.user.role !== "ADMIN") {
    return res.status(403).json({
      message: "only admin can access"
    })
  }
  next();
}

module.exports = isAdmin;