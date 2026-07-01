const pool = require("../config/db");

const fetchAllTasks = async ({ user_id }) => {
  const result = await pool.query(
    `SELECT t.*, u.email AS user_email FROM tasks t JOIN users u ON t.user_id = u.id WHERE t.user_id = $1 ORDER BY t.id DESC`,
    [user_id]
  );
  return result.rows;
};

const fetchAllTasksForAdmin = async () => {
  const result = await pool.query(
    `SELECT t.*, u.email AS user_email FROM tasks t JOIN users u ON t.user_id = u.id ORDER BY t.id DESC`
  );
  return result.rows;
};

const addTask = async ({ user_id, data }) => {
  const result = await pool.query(
    `INSERT INTO tasks(user_id, title, description) VALUES($1, $2, $3) RETURNING *`,
    [user_id, data.title, data.description]
  );
  return result.rows[0];
};

const deleteProduct = async (task_id, user_id) => {
  const res = await pool.query(
    `DELETE FROM tasks WHERE id=$1 AND user_id=$2 RETURNING *`,
    [task_id, user_id]
  );
  return res.rows[0];
};

const deleteAnyTaskByAdmin = async (task_id) => {
  const res = await pool.query(
    `DELETE FROM tasks WHERE id=$1 RETURNING *`,
    [task_id]
  );
  return res.rows[0];
};

const updateTaskService = async (task_id, user_id, { title, description }) => {
  const res = await pool.query(
    `UPDATE tasks SET title=$1, description=$2 WHERE id=$3 AND user_id=$4 RETURNING *`,
    [title, description, task_id, user_id]
  );
  return res.rows[0];
};

module.exports = { 
  fetchAllTasks, 
  fetchAllTasksForAdmin, 
  addTask, 
  deleteProduct, 
  deleteAnyTaskByAdmin,
  updateTaskService
};