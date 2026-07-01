"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/api";
import DashboardLayout from "./DashboardLayout";

export default function DashboardPage() {
  const [role, setRole] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filterUser, setFilterUser] = useState("All");
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const router = useRouter();

  const loadData = useCallback(async (token, currentRole) => {
    const endpoint = currentRole === "ADMIN" ? "/tasks/admin/all" : "/tasks";
    try {
      const res = await api.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data?.success) {
        setTasks(res.data.tasks);
        setFilteredTasks(res.data.tasks);
      }
    } catch (err) {
      console.error("error fetching data", err);
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");

    if (!token) {
      alert("Token missing. Redirecting to login.");
      router.push("/");
      return;
    }

    setRole(savedRole);
    loadData(token, savedRole);
  }, [router, loadData]);

  useEffect(() => {
    if (filterUser === "All") {
      setFilteredTasks(tasks);
    } else {
      setFilteredTasks(tasks.filter(t => t.user_email === filterUser));
    }
  }, [filterUser, tasks]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await api.post("/tasks", 
        { title: newTitle, description: newDesc },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data?.success) {
        alert("Task added successfully.");
        setNewTitle("");
        setNewDesc("");
        loadData(token, role);
      }
    } catch (err) {
      alert("Failed to add task.");
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await api.put(`/tasks/${editingTaskId}`,
        { title: newTitle, description: newDesc },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data?.success) {
        alert("Task updated successfully.");
        setEditingTaskId(null);
        setNewTitle("");
        setNewDesc("");
        loadData(token, role);
      }
    } catch (err) {
      alert("Failed to update task.");
    }
  };

  const handleDeleteTask = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.delete(`/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data?.success) {
        alert("Task deleted successfully.");
        loadData(token, role);
      }
    } catch (err) {
      alert("Failed to delete task.");
    }
  };

  const handleToggleBlockUser = async (userEmail, blockStatus) => {
    const token = localStorage.getItem("token");
    try {
      const userTasks = tasks.filter(t => t.user_email === userEmail);
      if (userTasks.length === 0) {
        alert("Cannot resolve raw user details from current view cache mapping.");
        return;
      }
      const resolvedUserId = userTasks[0].user_id;
      
      const res = await api.post("/admin/toggle-block", 
        { userId: resolvedUserId, block: blockStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.data?.success) {
        alert(res.data.message);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Operation failed.");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  const uniqueEmails = Array.from(new Set(tasks.map(t => t.user_email)));

  return (
    <DashboardLayout 
      role={role}
      tasks={tasks}
      filteredTasks={filteredTasks}
      filterUser={filterUser}
      setFilterUser={setFilterUser}
      newTitle={newTitle}
      setNewTitle={setNewTitle}
      newDesc={newDesc}
      setNewDesc={setNewDesc}
      handleCreateTask={handleCreateTask}
      handleDeleteTask={handleDeleteTask}
      handleLogout={handleLogout}
      uniqueEmails={uniqueEmails}
      editingTaskId={editingTaskId}
      setEditingTaskId={setEditingTaskId}
      handleUpdateTask={handleUpdateTask}
      handleToggleBlockUser={handleToggleBlockUser}
    />
  );
}