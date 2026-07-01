const pool = require("../config/db");

const createTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        role VARCHAR(20) DEFAULT 'USER' CHECK(role IN ('USER','ADMIN')),
        password VARCHAR(255) NOT NULL,
        is_blocked BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )  
    `);
    console.log("User table synchronized successfully!");
  } catch (err) {
    console.log("something error in userModel", err);
    throw err;
  }
};

module.exports = createTable;