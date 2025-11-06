"use client";
import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");

  const handleReset = (e) => {
    e.preventDefault();
    if (
      !email.endsWith("@student.its.ac.id") &&
      !email.endsWith("@its.ac.id")
    ) {
      alert("Gunakan email ITS untuk reset password!");
      return;
    }

    alert("Email reset password telah dikirim!");
    window.location.href = "/check-email";
    //

   
  };

  return (
    <div className="auth-page">
      <div className="auth-container-forgot">
        <div className="auth-box-forgot">
          <img
            src="/images/KEY.png"
            alt="KEY"
            className="auth-image-forgot"
          />

        <h2 className="forgot-title">
          Forgot your password?
        </h2>

        <p className="forgot-text">
          Jangan khawatir, kami kirimkan email untuk reset password Anda
        </p>

        <form onSubmit={handleReset} className="forgot-form">
          <label className="forgot-label">Email ITS</label>
          <input
            type="email"
            placeholder="Type your email ITS here"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input-forgot"
            required
          />
          <button type="submit" className="auth-button-forgot">
            Reset Password
          </button>
        </form>

        <div className="forgot-text">
          <Link href="/signin" className="back-to-login">
            ← Back to log in
          </Link>
        </div>
      </div>
    </div>
  </div> 
  
  );
}
