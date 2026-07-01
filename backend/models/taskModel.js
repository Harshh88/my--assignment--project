const pool = require("../config/db");

const createTaskTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks(
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )  
    `);
    console.log("Task table synchronized successfully!");
  } catch (err) {
    console.log("something error in taskModel", err);
    throw err;
  }
};

module.exports = createTaskTable;