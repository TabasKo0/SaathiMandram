import { NextResponse } from "next/server";
import db from "@/lib/db";
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const phone = searchParams.get("phone");

  if (!phone) {
    return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
  }

  try {
    const user = db.prepare("SELECT * FROM users WHERE phone = ?").get(phone);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  const data = await request.json();

  const {
    phone,
    name,
    age,
    place,
    field_of_work,
    remarks,
    picture_link,
    years_of_experience,
  } = data;

  try {
    const existingUser = db.prepare("SELECT * FROM users WHERE phone = ?").get(phone);

    if (existingUser) {
      db.prepare(
        `UPDATE users SET
          name = ?, age = ?, place = ?, field_of_work = ?,
          remarks = ?, picture_link = ?, years_of_experience = ?
         WHERE phone = ?`
      ).run(name, age, place, field_of_work, remarks, picture_link, years_of_experience, phone);
    } else {
      db.prepare(
        `INSERT INTO users
          (phone, name, age, place, field_of_work, remarks, picture_link, years_of_experience)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(phone, name, age, place, field_of_work, remarks, picture_link, years_of_experience);
    }

    return NextResponse.json({ message: "User saved successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
