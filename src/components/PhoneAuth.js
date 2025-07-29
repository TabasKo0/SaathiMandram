"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";

export default function PhoneAuth() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => {
            // reCAPTCHA solved
            console.log("reCAPTCHA solved");
          },
        }
      );
    }
  };

  const sendOtp = async () => {
    setupRecaptcha();
    const appVerifier = window.recaptchaVerifier;

    try {
      const confirmation = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(confirmation);
      alert("OTP sent");
    } catch (error) {
      console.error("Error during OTP send:", error);
      alert("OTP send failed: " + error.message);
    }
  };

  const verifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp)
        .then((userCredential) => {
          // User successfully signed in
          console.log(userCredential)
          alert("Phone number verified successfully!");
        });
    } catch (error) {
      console.error("OTP verification failed:", error);
      alert("Invalid OTP: " + error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Phone Login</h2>
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="+91XXXXXXXXXX"
        className="border p-2 mb-2 w-full"
      />
      <button onClick={sendOtp} className="bg-blue-600 text-white px-4 py-2 rounded w-full mb-4">
        Send OTP
      </button>

      <div id="recaptcha-container"></div>

      {confirmationResult && (
        <>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="border p-2 mb-2 w-full"
          />
          <button onClick={verifyOtp} className="bg-green-600 text-white px-4 py-2 rounded w-full">
            Verify OTP
          </button>
        </>
      )}
    </div>
  );
}
