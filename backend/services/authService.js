const pool = require("../config/db");

const findUserByEmail = async (email) => {
  const result = await pool.query(
    `SELECT id, name, email, password, role, is_blocked FROM users WHERE email=$1`,
    [email]
  );
  return result.rows[0];
};

const createUser = async ({ name, email, hashPassword }) => {
  const result = await pool.query(
    `INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING id, name, email, role`,
    [name, email, hashPassword]
  );
  return result.rows[0];
};

module.exports = { findUserByEmail, createUser };