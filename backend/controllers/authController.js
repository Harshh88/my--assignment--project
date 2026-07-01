const { findUserByEmail, createUser } = require("../services/authService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "all field required"
      });
    }

    const existUser = await findUserByEmail(email);
    if (existUser) {
      return res.status(409).json({
        success: false,
        message: "User already exist"
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await createUser({ name, email, hashPassword });

    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });

    res.status(201).json({
      success: true,
      message: "signup successfull",
      user,
      token
    });
  }
  catch (err) {
    console.log("err in signup controller", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const logIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const dbUser = await findUserByEmail(email);

    if (!dbUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (dbUser.is_blocked) {
      return res.status(403).json({
        success: false,
        message: "Your account has been blocked by admin"
      });
    }

    const isMatch = await bcrypt.compare(password, dbUser.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "password do not match"
      });
    }

    const payload = { id: dbUser.id, email: dbUser.email, role: dbUser.role };
    const safeUser = { id: dbUser.id, email: dbUser.email, role: dbUser.role };
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1d" });

    res.setHeader("Authorization", `Bearer ${token}`);
    res.status(200).json({
      success: true,
      message: "login successfull",
      token,
      safeUser
    });
  } catch (err) {
    console.log("something error in login function", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = { signUp, logIn };