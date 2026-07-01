const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const { toggleUserBlock } = require("../controllers/adminController");

router.post("/admin/toggle-block", auth, isAdmin, toggleUserBlock);

module.exports = router;