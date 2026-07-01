# 🚀 Advanced Next.js Role-Based Task Management System

Hey there! This is a secure, highly scalable, and modular full-stack Task Management System built for the **Primetrade.ai Backend Developer Intern Assignment (Round-0)**. 

The application architecture features a rock-solid backend infrastructure driven by Node.js and PostgreSQL, coupled with a performance-optimized Next.js frontend interface that strictly honors identity-isolated role boundaries and administrative workflows.

---

## ⚡ Quick Test Credentials (Read This First!)

To streamline the evaluation pipeline without manually populating relational data hooks in PostgreSQL, you can leverage these pre-configured profiles. 

*(Alternatively, you can register fresh users directly using the Sign-Up screen on the UI!)*

> ⚠️ **Important Security Guard:** Ensure the Next.js UI interface mode toggle (`USER` / `ADMIN`) matches the exact profile context before entering credentials, as cross-login requests are strictly rejected at the middleware boundary layer!

### 👤 Test User Account
- **Email:** user@test.com
- **Password:** password123

### 👑 Test Admin Account
- **Email:** admin@test.com
- **Password:** password123

---

## 🛠️ Local Installation & Environment Setup

### Prerequisites
Ensure **Node.js** and **PostgreSQL** are configured on your local operating environment.

### 1. Environment Variable Integration
Create a `.env` file inside the `backend/` root directory and populate your local relational infrastructure parameters:

--env
PORT=3000
DB_USER=your_postgres_username
DB_PASSWORD=your_postgres_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_manager
JWT_SECRET=your_super_secret_jwt_key

2. Booting Up the REST API Engine (Backend)
Open a terminal instance routing to the backend folder to install core system dependencies (express, cors, pg, bcrypt, jsonwebtoken, dotenv) and spin up the execution runtime loop using nodemon:
cd backend
npm install
npm start
Note: The backend initialization hooks automatically execute query structure scripts to compile necessary relational database tables if missing from the active server layer.

👑 Seeding the Test Accounts Instantly
To securely provision the required administrative and testing user records inside your local system without database collision or duplicate entity error risks, open a parallel terminal shell window in the backend directory and trigger:
node seedData.js

3. Booting Up the Next.js Portal (Frontend)
Open a separate terminal window routing to the frontend directory to mount framework dependencies (next, react, react-dom, axios, tailwindcss):
cd frontend
npm install
npm run dev

Note: The Next.js web server loop is explicitly configured to establish dynamic host binding on http://localhost:3001 to completely eliminate any internal port routing conflicts with the backend architecture.

📂 Project Directory Topology

📂 project-root/ (my--assignment--project) --> This is my root folder name
 ┣ 📂 backend
 ┃ ┣ 📂 config (db.js, initDb.js)
 ┃ ┣ 📂 controllers (authController.js, taskController.js, adminController.js)
 ┃ ┣ 📂 services (authService.js, taskService.js, adminService.js)
 ┃ ┣ 📂 routes (authRoutes.js, taskRoutes.js, adminRoutes.js)
 ┃ ┣ 📂 middlewares (auth.js, isAdmin.js)
 ┃ ┣ 📜 seedData.js (Idempotent Test Data Provisioning Script)
 ┃ ┗ 📜 app.js
 ┗ 📂 frontend
   ┣ 📂 lib (api.js -> synced to backend target port 3000)
   ┗ 📂 app
     ┣ 📂 dashboard (page.js, DashboardLayout.jsx)
     ┣ 📂 register (page.js)
     ┗ 📜 page.js (Login Context Controller)


🌟 Technical Capabilities Implemented
👤 User Domain Functions
•	Context-Isolated Authorization: Utilizes robust verification structures where credential validation enforces matching client portal context selections to block cross-role penetration.
•	Next.js Client State Mutators: Full operational CRUD scope built via unified REST parameters allowing users to inline edit (PUT /api/v1/tasks/:id) records through React state management layers within Next.js components.
•	Dynamic Account Suspension Filters: Standard operational tokens are evaluated against active DB constraints at structural entry loops. Terminated entries yield descriptive server payloads: "Account blocked by admin".

👑 Admin Management Matrix
•	Global Database Visibility: Renders transactional metadata aggregate mappings across the complete workspace collection, explicitly tagging target item components with owner identity references (user_email).
•	Granular Filter Layering: High-performance functional state selection menus let admins filter down layout structures to evaluate an isolated user's performance matrix.
•	Bypass Deletion Control: Master override hook arrays enable admins to forcefully execute single-click administrative flushes on any target entity index.
•	Live User Suspension Decks: Interactive control blocks let system operators switch user records seamlessly between ACTIVE and BLOCKED states using safe, scalable background transactions.
Built with Next.js Client Engine, scalable service layers, and production-ready security patterns for Primetrade.ai.


