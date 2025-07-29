"use client";

import React, { useEffect, useState } from "react";

const AvailablePeople = () => {
  const [people, setPeople] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/available-people") // New API route
      .then((res) => {
        if (!res.ok) throw new Error("Server Error");
        return res.json();
      })
      .then((data) => setPeople(data))
      .catch((err) => {
        console.error("Error fetching people:", err);
        setError(true);
        setPeople([]); // fallback: empty
      });
  }, []);

  return (
    <div className="p-4">
      {error && (
        <div className="bg-red-100 text-red-800 px-4 py-2 mb-4 rounded">
          Failed to load people. Try again later.
        </div>
      )}

      <h1 className="text-5xl font-bold mb-10 text-center text-green-800">Available People</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {people.map((person) => (
          <li
            key={person.phone}
            className="bg-white shadow rounded-xl p-4 border border-gray-200"
          >
            {person.picture_link && (
              <img
                src={person.picture_link}
                alt={person.name}
                className="w-full h-48 object-cover rounded mb-3"
              />
            )}
            <h3 className="text-xl font-semibold text-green-700">{person.name}</h3>
            <p className="text-black"><strong>Age:</strong> {person.age}</p>
            <p className="text-black"><strong>Place:</strong> {person.place}</p>
            <p className="text-black"><strong>Field:</strong> {person.field_of_work}</p>
            <p className="text-black"><strong>Experience:</strong> {person.years_of_experience} yrs</p>
            <p className="text-black"><strong>Remarks:</strong> {person.remarks}</p>
            <p className="text-black"><strong>Phone:</strong> {person.phone}</p>

            {/* Optional shortlist or contact button */}
            <button
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              onClick={() => window.open(`tel:${person.phone}`)}
            >
              Call / Contact
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AvailablePeople;
