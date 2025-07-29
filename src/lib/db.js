import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.resolve(process.cwd(), "data.sqlite"));
db.pragma('foreign_keys = ON');

// 🔁 Users table
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
    years_of_experience INTEGER DEFAULT 0,
    is_recruiter INTEGER DEFAULT 0, -- 0 = false, 1 = true
    position TEXT,
    company_name TEXT
  )
`).run();

// 📄 Jobs table
db.prepare(`
  CREATE TABLE IF NOT EXISTS jobs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recruiter_phone TEXT,
    area_of_work TEXT,
    pay TEXT,
    job_description TEXT,
    job_type TEXT,
    benefits TEXT,
    applicants TEXT DEFAULT '[]',
    location TEXT,
    FOREIGN KEY (recruiter_phone) REFERENCES users(phone) ON DELETE CASCADE
  )
`).run();

export default db;
