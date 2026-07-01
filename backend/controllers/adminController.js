const { updateUserBlockStatus } = require("../services/adminService");

const toggleUserBlock = async (req, res) => {
  try {
    const { userId, block } = req.body;

    if (userId === req.user.id) {
      return res.status(400).json({
        success: false,
        message: "You cannot block or unblock yourself"
      });
    }

    const updatedUser = await updateUserBlockStatus(userId, block);
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: `User status updated to ${block ? "BLOCKED" : "ACTIVE"} successfully`,
      user: updatedUser
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

module.exports = { toggleUserBlock };