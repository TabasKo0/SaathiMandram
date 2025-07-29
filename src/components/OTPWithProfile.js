"use client";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export default function OTPWithProfile() {
    const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [loggedInPhone, setLoggedInPhone] = useState("");
  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    place: "",
    field_of_work: "",
    remarks: "",
    picture_link: "",
    years_of_experience: "",
  });

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
         auth,
        "recaptcha-container",
        { size: "invisible" },
       
      );
    }
  };

  const sendOtp = async () => {
    setupRecaptcha();
    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, window.recaptchaVerifier);
      setConfirmationResult(confirmation);
      alert("OTP sent");
    } catch (err) {
      alert("Failed to send OTP: " + err.message);
    }
  };

 const verifyOtp = async () => {
  try {
    const result = await confirmationResult.confirm(otp);
    const phoneNumber = result.user.phoneNumber;
    setLoggedInPhone(phoneNumber);
    alert("Phone verified!");

    // Fetch user info and handle redirection
    fetchUserInfo(phoneNumber);
  } catch (err) {
    alert("Invalid OTP");
  }
};


const fetchUserInfo = async (phoneNumber) => {
  try {
    const res = await fetch(`/api/users?phone=${encodeURIComponent(phoneNumber)}`);

    if (res.ok) {
      const data = await res.json();

      const user = {
        name: data.name ?? "",
        age: data.age ?? "",
        place: data.place ?? "",
        field_of_work: data.field_of_work ?? "",
        remarks: data.remarks ?? "",
        picture_link: data.picture_link ?? "",
        years_of_experience: data.years_of_experience ?? "",
      };

      setUserInfo(user);
      sessionStorage.setItem("userInfo", JSON.stringify({ phone: phoneNumber, ...user }));

      // ✅ Registered user → redirect to home
      router.push("/home");
    } else if (res.status === 404) {
      // ❌ Not registered → redirect to /regidtration
      sessionStorage.setItem("phoneOnly", phoneNumber);
      router.push("/registration");
    } else {
      alert("Unexpected error: " + (await res.text()));
    }
  } catch (error) {
    console.error("Failed to fetch user data", error);
    alert("Error checking user registration status.");
  }
};


  const handleInputChange = (e) => {
    setUserInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

 const saveUserInfo = async () => {
  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: loggedInPhone, ...userInfo }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      sessionStorage.setItem("userInfo", JSON.stringify({ phone: loggedInPhone, ...userInfo }));
      router.push("/home"); // Redirect after saving
    } else {
      alert(data.error);
    }
  } catch (err) {
    alert("Failed to save user info");
  }
};


  return (
    <div className="max-w-md mx-auto p-4">
      {!loggedInPhone && (
        <>
          <h2 className="text-xl font-bold mb-4">Login with Phone OTP</h2>
          <input
            type="tel"
            placeholder="+91XXXXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border p-2 mb-2 w-full"
          />
          <button
            onClick={sendOtp}
            className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-4"
          >
            Send OTP
          </button>

          <div id="recaptcha-container"></div>

          {confirmationResult && (
            <>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="border p-2 mb-4 w-full"
              />
              <button
                onClick={verifyOtp}
                className="bg-green-600 text-white px-4 py-2 rounded w-full mb-4"
              >
                Verify OTP
              </button>
            </>
          )}
        </>
      )}

      
    </div>
  );
}
