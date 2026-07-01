const { 
  fetchAllTasks, 
  fetchAllTasksForAdmin, 
  addTask, 
  deleteProduct, 
  deleteAnyTaskByAdmin,
  updateTaskService
} = require("../services/taskService");

const getMyTasks = async (req, res) => {
  try {
    const user_id = req.user.id;
    const taskRows = await fetchAllTasks({ user_id });
    res.status(200).json({
      success: true,
      message: "tasks fetch successfully",
      tasks: taskRows
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal error" });
  }
};

const createNewTask = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "all fields required"
      });
    }

    const newTask = await addTask({
      user_id,
      data: { title, description }
    });

    res.status(200).json({
      success: true,
      message: "task added successfully",
      task: newTask
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteOneTask = async (req, res) => {
  try {
    const { id: task_id } = req.params;
    const user_id = req.user.id;
    const user_role = req.user.role;

    let deletedTask;
    if (user_role === "ADMIN") {
      deletedTask = await deleteAnyTaskByAdmin(task_id);
    } else {
      deletedTask = await deleteProduct(task_id, user_id);
    }

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "task not found or unauthorized"
      });
    }
    res.status(200).json({
      success: true,
      message: "task deleted successfully",
      deletedTask
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getGlobalTasks = async (req, res) => {
  try {
    const taskRows = await fetchAllTasksForAdmin();
    res.status(200).json({
      success: true,
      message: "all tasks fetched successfully",
      tasks: taskRows
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const modifyTask = async (req, res) => {
  try {
    const { id: task_id } = req.params;
    const user_id = req.user.id;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "title and description required"
      });
    }

    const updatedTask = await updateTaskService(task_id, user_id, { title, description });
    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "task not found or unauthorized"
      });
    }

    res.status(200).json({
      success: true,
      message: "task updated successfully",
      task: updatedTask
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { getMyTasks, createNewTask, deleteOneTask, getGlobalTasks, modifyTask };