const express = require("express");
const router = express.Router();
const { signUp, logIn } = require("../controllers/authController");

router.post("/register", signUp);
router.post("/login", logIn);

module.exports = router;