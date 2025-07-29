// lib/db.js
import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.resolve(process.cwd(), "data.sqlite"));

// Create users table with years_of_experience column
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    phone TEXT UNIQUE,
    name TEXT,
    age INTEGER,
    place TEXT,
    field_of_work TEXT,
    remarks TEXT,
    picture_link TEXT,
    years_of_experience INTEGER DEFAULT 0
  )
`).run();

export default db;
