const { Client } = require("pg");
const path = require("path");
const dotenv = require("dotenv");


const client = new Client({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "postgres", 
    host: process.env.DB_HOST,
    port: process.env.DB_PORT
});

const initDB = async () => {
    try {
        await client.connect();
        const dbName = process.env.DB_NAME;
        
        // Database check query execution loop
        const result = await client.query(
            `SELECT 1 FROM pg_database WHERE datname=$1`,
            [dbName]
        );

        if (result.rows.length === 0) {
            await client.query(`CREATE DATABASE ${dbName}`);
            console.log(`${dbName} database created successfully`);
        } else {
            console.log(`${dbName} database already exists`);
        }
    }
    catch (err) {
        console.log(`something error in initDb module`, err);
    } finally {
        await client.end(); 
    }
}

module.exports = initDB;