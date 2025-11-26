"use client";
import { useState } from "react";
import Link from "next/link";
import NotificationModal from "@/components/NotificationModal";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleSignUp = (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("❌ Password tidak sesuai!");
      return;
    }

    if (
      !email.endsWith("@student.its.ac.id") &&
      !email.endsWith("@its.ac.id")
    ) {
      alert("⚠️ Gunakan email ITS untuk Sign Up!");
      return;
    }

    alert("✅ Selamat, akun Anda berhasil dibuat!");

    setTimeout(() => {
      window.location.href = "/signin";
    }, 2000);
  };

  return (
    <div className="auth-page">
    <div className="auth-container">
      <div className="auth-box">
        <div className="welcome-row">
          <h1 className="welcome-text">
            Welcome to <span className="brand-text">RPL Lectant</span>
          </h1>
        <img
          src="/images/RPL-LECTANT.png"
          alt="RPL Lectant Logo"
          className="auth-image"
        />
        </div>

        <h1 className="auth-title">Sign Up</h1>

        <form onSubmit={handleSignUp}>
            <label className="forgot-label">Email ITS</label>
          <input
            type="email"
            placeholder="Email ITS"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

            <label className="forgot-label">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

           <label className="forgot-label">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            className="auth-input"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />

        <div className="auth-footer">
          <Link href="/signin" className="auth-link">
            Already have an account?
          </Link>
        
        <button type="submit" className="auth-button">
          Sign Up
        </button>
        </div>
      </form>
        
      </div>
    </div>
    </div>
  );
}
