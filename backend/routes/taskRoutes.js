const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");
const isAdmin = require("../middlewares/isAdmin");
const { 
  getMyTasks, 
  createNewTask, 
  deleteOneTask, 
  getGlobalTasks, 
  modifyTask 
} = require("../controllers/taskController");

router.get("/", auth, getMyTasks);
router.post("/", auth, createNewTask);
router.put("/:id", auth, modifyTask);
router.delete("/:id", auth, deleteOneTask);
router.get("/admin/all", auth, isAdmin, getGlobalTasks);

module.exports = router;