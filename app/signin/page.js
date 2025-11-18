"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSignIn = (e) => {
    e.preventDefault();

    if (email.endsWith("@student.its.ac.id")) {
      router.push("/mahasiswa");
    } else if (email.endsWith("@its.ac.id")) {
      router.push("/dosen");
    } else {
      alert("Gunakan email ITS yang valid!");
    }
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

          <h1 className="auth-title">Sign In</h1>

      <form onSubmit={handleSignIn}>
        <div className="input-selection">
          <label className="forgot-label">Email ITS</label>
        <input
          type="email"
          className="auth-input"
          placeholder="Email ITS"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>

        <div className="input-selection">
          <label className="forgot-label">Password</label>
        <input
          type="password"
          className="auth-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        </div>
        
        <div className="auth-footer">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />{" "}
            Remember me
          </label>
          <Link href="/forgot-password" className="auth-link">
            Forgot Password?
          </Link>
        </div>

        <div className="auth-footer">
          <Link href="/signup" className="auth-link">
            Don't have an account?
          </Link>
        
        <button type="submit" className="auth-button">
          Sign In
        </button>
        </div>
      </form>
    </div>
  </div>
  </div>
  );
}
