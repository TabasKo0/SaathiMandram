import Database from "better-sqlite3";
import path from "path";

const db = new Database(path.resolve(process.cwd(), "data.sqlite"));

const phone = "+911234567890";
db.prepare(`
    CREATE TABLE IF NOT EXISTS applications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        phone TEXT NOT NULL,
        job_id TEXT NOT NULL
    );
`).run();

// Delete user with the specified phone number
db.prepare("DELETE FROM users WHERE phone = ?").run(phone);

const users = db.prepare("SELECT * FROM users ").all();
console.log("👥 Users:");
console.table(users);

// Show all jobs
const jobs = db.prepare("SELECT * FROM jobs").all();
console.log("📄 Jobs:");
console.table(jobs);

const applicants = db.prepare("SELECT * FROM applications").all();
console.log("📄 Applicants:");
console.table(applicants);