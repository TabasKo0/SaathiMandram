"use client";

import React, { useEffect, useState } from "react";

// Dummy fallback data
const dummyUser = {
  image: "/dummy.jpg",
  name: "Ravi Kumar",
  age: 32,
  gender: "Male",
  fieldOfWork: "Electrician",
  experience: "5 years",
  contact: "9876543210",
  bio: "Skilled and reliable technician with over 5 years of experience in residential and industrial wiring."
};

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const phone = sessionStorage.getItem("phoneOnly"); // assume phone stored here
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
        // Map DB fields to frontend-friendly structure
        console.log(data);
        const mapped = {
          image: data.picture_link || "/dummy.jpg",

          name: data.name || "Unnamed",
          age: data.age || "N/A",
          gender: data.gender || "N/A", // add this field in db later if needed
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

  if (!user) return <p className="text-center p-6 text-lg">Loading profile...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
      {error && (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-3 mb-6 rounded text-lg">
          Could not fetch from server. Showing sample data.
        </div>
      )}

      <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Profile Image */}
        <div className="md:w-1/3 w-full h-80 md:h-auto">
          <img
            src={user.image}
            alt={`${user.name}'s profile`}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>

        {/* Profile Info */}
        <div className="flex-1 space-y-3 text-gray-800 text-lg">
          <h2 className="text-3xl font-bold text-blue-700">{user.name}</h2>
          <>{console.log(user)}</>
          <text style={{ fontWeight: "bold", color: user.is_recruiter ? "green" : "blue" }}>{user.is_recruiter ? "Recruiter" : "Job Seeker"}</text>
          <p><strong>Age:</strong> {user.age}</p>
         {!user.is_recruiter? <><p><strong>Gender:</strong> {user.gender}</p>
          <p><strong>Field of Work:</strong> {user.fieldOfWork}</p>
          <p><strong>Experience:</strong> {user.experience}</p>
            <p><strong>Bio:</strong> {user.bio}</p></>: <><p><strong>Position:</strong> {user.position}</p>
          <p><strong>Company:</strong> {user.company}</p></>}

          <p><strong>Contact:</strong> {user.contact}</p>
        
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
