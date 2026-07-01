const pool = require("../config/db");

const updateUserBlockStatus = async (user_id, is_blocked) => {
  const result = await pool.query(
    `UPDATE users SET is_blocked = $1 WHERE id = $2 RETURNING id, name, email, is_blocked`,
    [is_blocked, user_id]
  );
  return result.rows[0];
};

module.exports = { updateUserBlockStatus };