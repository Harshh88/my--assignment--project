"use client";

import React from "react";

export default function DashboardLayout({
  role,
  filteredTasks,
  filterUser,
  setFilterUser,
  newTitle,
  setNewTitle,
  newDesc,
  setNewDesc,
  handleCreateTask,
  handleDeleteTask,
  handleLogout,
  uniqueEmails,
  editingTaskId,
  setEditingTaskId,
  handleUpdateTask,
  handleToggleBlockUser
}) {
  return (
    <div className="bg-[#0E0E0E] min-h-screen text-white flex flex-col justify-between antialiased">
      <header className="flex py-4 px-6 items-center justify-between border-b border-[#141414] bg-[#0E0E0E] w-full">
        <h1 className="text-sm font-black tracking-widest uppercase">{role} DASHBOARD</h1>
        <button onClick={handleLogout} className="bg-red-950/40 border border-red-900/30 text-red-500 text-[10px] font-black tracking-widest px-4 py-1.5 rounded-full uppercase">LOGOUT</button>
      </header>

      <main className="flex-1 px-4 sm:px-8 py-8 max-w-[1400px] w-full mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl font-black italic tracking-tighter uppercase">{role} VIEW</h2>
          <p className="text-[10px] text-gray-500 font-bold tracking-widest flex items-center gap-2 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E2FF66]"></span>
            {filteredTasks.length} ITEMS FOUND
          </p>
        </div>

        {role !== "ADMIN" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#111] border border-[#1F1F1F] p-5 rounded-2xl h-fit">
              <h3 className="text-xs font-black tracking-widest uppercase mb-4 text-gray-400">
                {editingTaskId ? "EDIT TASK" : "ADD NEW TASK"}
              </h3>
              <form onSubmit={editingTaskId ? handleUpdateTask : handleCreateTask} className="space-y-3">
                <input type="text" placeholder="TITLE" value={newTitle} onChange={e => setNewTitle(e.target.value)} className="w-full bg-transparent border border-[#1F1F1F] px-3 py-2 text-xs font-bold tracking-widest text-white rounded-xl placeholder-gray-700 uppercase" required />
                <textarea placeholder="DESCRIPTION" value={newDesc} onChange={e => setNewDesc(e.target.value)} className="w-full bg-transparent border border-[#1F1F1F] px-3 py-2 text-xs font-bold tracking-widest text-white rounded-xl placeholder-gray-700 h-20 uppercase" required />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 bg-[#F7FFB0] text-black text-xs font-black tracking-widest py-2.5 rounded-xl uppercase">
                    {editingTaskId ? "UPDATE" : "SAVE TASK"}
                  </button>
                  {editingTaskId && (
                    <button type="button" onClick={() => { setEditingTaskId(null); setNewTitle(""); setNewDesc(""); }} className="bg-[#1C1C1E] border border-[#2C2C2E] text-white text-xs font-black tracking-widest py-2.5 px-4 rounded-xl uppercase">
                      CANCEL
                    </button>
                  )}
                </div>
              </form>
            </div>

            <div className="md:col-span-2 bg-[#111] border border-[#1F1F1F] p-5 rounded-2xl">
              <h3 className="text-xs font-black tracking-widest uppercase mb-4 text-gray-400">YOUR TASKS</h3>
              <div className="space-y-3">
                {filteredTasks.map(t => (
                  <div key={t.id} className="bg-[#151515] border border-[#1F1F1F] p-4 rounded-xl flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-xs tracking-wider text-gray-200 uppercase">{t.title}</h4>
                      <p className="text-[10px] text-gray-600 font-medium uppercase mt-0.5">{t.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => { setEditingTaskId(t.id); setNewTitle(t.title); setNewDesc(t.description); }} className="text-[10px] font-black text-[#E2FF66] border border-[#2C2C2E] bg-[#1C1C1E] px-3 py-1 rounded-lg">✏️ EDIT</button>
                      <button onClick={() => handleDeleteTask(t.id)} className="text-[10px] font-black text-red-500 border border-red-950 bg-red-950/20 px-3 py-1 rounded-lg">🗑️ DELETE</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="bg-[#111] border border-[#1F1F1F] p-5 rounded-2xl">
              <h3 className="text-xs font-black tracking-widest uppercase mb-4 text-gray-400">SYSTEM USER MATRIX (MANAGEMENT)</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {uniqueEmails.map(email => (
                  <div key={email} className="bg-[#151515] border border-[#1F1F1F] p-3 rounded-xl flex justify-between items-center">
                    <span className="font-mono text-xs text-gray-300">{email}</span>
                    <div className="flex gap-2">
                      <button onClick={() => handleToggleBlockUser(email, true)} className="text-[9px] font-black text-red-400 bg-red-950/30 border border-red-900/50 px-2.5 py-1 rounded-lg uppercase">BLOCK</button>
                      <button onClick={() => handleToggleBlockUser(email, false)} className="text-[9px] font-black text-emerald-400 bg-emerald-950/30 border border-emerald-900/50 px-2.5 py-1 rounded-lg uppercase">UNBLOCK</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#111] border border-[#1F1F1F] p-5 rounded-2xl">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3 border-b border-[#1F1F1F] pb-4">
                <h3 className="text-xs font-black tracking-widest uppercase text-gray-400">ALL USERS TASKS</h3>
                <div className="flex items-center gap-2">
                  <label className="text-[10px] font-black text-gray-600 tracking-widest uppercase">FILTER BY USER:</label>
                  <select value={filterUser} onChange={e => setFilterUser(e.target.value)} className="bg-[#151515] border border-[#1F1F1F] text-[10px] font-black text-white p-2 rounded-xl uppercase">
                    <option value="All">--- ALL USERS ---</option>
                    {uniqueEmails.map(email => <option key={email} value={email}>{email}</option>)}
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] font-bold border-collapse tracking-wider">
                  <thead>
                    <tr className="border-b border-[#1F1F1F] text-gray-600 uppercase text-[9px]">
                      <th className="pb-3">TITLE</th>
                      <th className="pb-3">DESCRIPTION</th>
                      <th className="pb-3">CREATED BY</th>
                      <th className="pb-3 text-right">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#1F1F1F]">
                    {filteredTasks.map(t => (
                      <tr key={t.id} className="text-gray-300">
                        <td className="py-3.5 uppercase">{t.title}</td>
                        <td className="py-3.5 text-gray-500 uppercase">{t.description}</td>
                        <td className="py-3.5"><span className="bg-[#1C1C1E] text-[#E2FF66] border border-[#2C2C2E] px-2 py-0.5 rounded font-mono text-[9px]">{t.user_email}</span></td>
                        <td className="py-3.5 text-right">
                          <button onClick={() => handleDeleteTask(t.id)} className="text-[9px] font-black text-red-500 border border-red-950 bg-red-950/20 px-2.5 py-1 rounded-md uppercase">DELETE</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}