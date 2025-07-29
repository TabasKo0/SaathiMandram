"use client";

import React, { useEffect, useState } from 'react';

// Dummy job listings used as fallback
const dummyJobs = [
  {
    id: "JOB001",
    title: "Electrician",
    location: "Chennai",
    pay: "₹20,000/month",
    benefits: "Free lunch, Transport allowance",
    contact: "9876543210"
  },
  {
    id: "JOB002",
    title: "Housekeeping Staff",
    location: "Mumbai",
    pay: "₹15,000/month",
    benefits: "Health insurance",
    contact: "9876543211"
  },
  {
    id: "JOB003",
    title: "Plumber",
    location: "Delhi",
    pay: "₹25,000/month",
    benefits: "Tools provided, Bonus after 6 months",
    contact: "9876543212"
  }
];

const JobBubbles = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/jobs') // Replace with your real endpoint
      .then(res => {
        if (!res.ok) throw new Error('Server Error');
        return res.json();
      })
      .then(data => setJobs(data))
      .catch(err => {
        console.error('Error fetching jobs:', err);
        setError(true);
        setJobs(dummyJobs); // fallback
      });
  }, []);

  return (
    <div className="p-4">
      {error && (
        <div className="bg-yellow-100 text-yellow-800 px-4 py-2 mb-4 rounded">
          Server not responding. Showing sample jobs.
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {jobs.map(job => (
          <div key={job.id} className="bg-white shadow-lg rounded-2xl p-4 border border-gray-200 transition-transform hover:scale-105">
            <h2 className="text-xl font-bold text-green-700">{job.title}</h2>
            <p className="text-black"><strong>Location:</strong> {job.location}</p>
            <p className="text-black"><strong>Pay:</strong> {job.pay}</p>
            <p className="text-black"><strong>Benefits:</strong> {job.benefits}</p>
            <p className="text-black"><strong>Contact:</strong> {job.contact}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobBubbles;
