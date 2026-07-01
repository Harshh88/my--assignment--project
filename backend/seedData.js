const pool = require("./config/db");
const bcrypt = require("bcrypt");

const seedData = async () => {
  const defaultPassword = "password123";
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  const adminEmail = "admin@test.com";
  const userEmail = "user@test.com";

  try {
    // 1. Handle Admin Setup
    const adminExist = await pool.query("SELECT * FROM users WHERE email = $1", [adminEmail]);
    if (adminExist.rows.length > 0) {
      await pool.query("UPDATE users SET role = $1, is_blocked = false WHERE email = $2", ["ADMIN", adminEmail]);
      console.log(`💡 Admin (${adminEmail}) already exists. Role enforced.`);
    } else {
      await pool.query(
        "INSERT INTO users (name, email, password, role, is_blocked) VALUES ($1, $2, $3, $4, $5)",
        ["System Admin", adminEmail, hashedPassword, "ADMIN", false]
      );
      console.log(`👑 Admin user successfully seeded!`);
    }

    // 2. Handle Normal User Setup
    const userExist = await pool.query("SELECT * FROM users WHERE email = $1", [userEmail]);
    if (userExist.rows.length > 0) {
      await pool.query("UPDATE users SET is_blocked = false WHERE email = $2", [userEmail]);
      console.log(`💡 User (${userEmail}) already exists.`);
    } else {
      await pool.query(
        "INSERT INTO users (name, email, password, role, is_blocked) VALUES ($1, $2, $3, $4, $5)",
        ["Regular User", userEmail, hashedPassword, "USER", false]
      );
      console.log(`👤 Testing User successfully seeded!`);
    }

    process.exit(0);
  } catch (err) {
    console.error("❌ Error seeding database:", err.message);
    process.exit(1);
  }
};

seedData();