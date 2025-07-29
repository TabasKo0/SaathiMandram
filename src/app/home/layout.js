"use client";

import Link from 'next/link';
import { useEffect, useState } from 'react';

const dummyUser = {
  image: "/dummy.jpg",
  name: "Guest",
  age: "N/A",
  gender: "N/A",
  fieldOfWork: "N/A",
  experience: "N/A",
  contact: "N/A",
  bio: "No bio available.",
  position: "N/A",
  company: "N/A",
  is_recruiter: false,
};

const linkStyle = {
  textDecoration: 'none',
  color: '#ffffff',
  fontSize: '18px',
  textShadow: '2px 2px 6px rgba(0, 0, 0, 0.3)',
};

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const phone = sessionStorage.getItem("phoneOnly");
    if (!phone) {
      setUser(dummyUser);
      setError(true);
      return;
    }

    fetch(`/api/users?phone=${phone}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        const mapped = {
          image: data.picture_link || "/dummy.jpg",
          name: data.name || "Unnamed",
          age: data.age || "N/A",
          gender: data.gender || "N/A",
          fieldOfWork: data.field_of_work || "N/A",
          experience: data.years_of_experience
            ? `${data.years_of_experience} years`
            : "N/A",
          contact: data.phone || "N/A",
          bio: data.remarks || "No bio available.",
          position: data.position || "N/A",
          company: data.company_name || "N/A",
          is_recruiter: data.is_recruiter
        };
        setUser(mapped);
      })
      .catch((err) => {
        console.error("Server error:", err);
        setUser(dummyUser);
        setError(true);
      });
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <main style={{ flex: 1 }}>{!user ? <p className="p-4">Loading...</p> : children}</main>

      {user && (
        <nav
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: '60px',
            borderTop: '1px solid #eee',
            color: '#ffffff',
            fontWeight: 'bold',
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: 'linear-gradient(to left, #a855f7, #facc15)',
          }}
        >
          {user.is_recruiter ? (
          <>  <Link href="/home/people" style={linkStyle}>Available People</Link>
             <Link href="/home/jobc" style={linkStyle}>Job Management</Link></>
          ) : (
            <Link href="/home/jobs" style={linkStyle}>Jobs</Link>
          )}
          <Link href="/home/profile" style={linkStyle}>Profile</Link>
          <Link href="/home/support" style={linkStyle}>Support</Link>
        </nav>
      )}

      <div style={{ height: '60px' }} /> {/* Spacer for nav bar */}
    </div>
  );
}
