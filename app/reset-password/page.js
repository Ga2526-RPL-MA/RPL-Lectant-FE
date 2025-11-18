"use client";
import React, { useState } from "react";
import Link from "next/link";
import bcrypt from "bcryptjs";

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("❌ Password tidak sesuai!");
      return;
    }

    if (newPassword.length < 6) {
      alert("⚠️ Password minimal 6 karakter!");
      return;
    }

    try {
      setIsLoading(true);

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      console.log("Password (hash):", hashedPassword);

      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: hashedPassword }),
      });

      if (response.ok) {
        alert("✅ Password berhasil direset!");
        setTimeout(() => {
          window.location.href = "/signin";
        }, 1500);
      } else {
        alert("❌ Terjadi kesalahan saat reset password.");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Gagal menghash password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container-forgot">
        <div className="auth-box-forgot">
          <img
            src="/images/KEY.png"
            alt="Key Icon"
            className="auth-image-forgot"
          />

          <h2 className="forgot-title">Reset Password</h2>
          <p className="forgot-text">
            Choose a new password for your account
          </p>

          <form onSubmit={handleReset}>
            <div className="input-selection">
              <label className="forgot-label">Password</label>
              <input
                type="password"
                placeholder="Type your password here"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="auth-input"
                required
              />
            </div>

            <div className="input-selection">
              <label className="forgot-label">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm your password here"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="auth-input"
                required
              />
            </div>

            <button
              type="submit"
              className="auth-button-forgot"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Continue"}
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
