"use client";
import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <div className="auth-page">
      <div className="check-email-container">
        <div className="check-email-box">
          <img
            src="/images/CHECKBOX.png" 
            alt="Mail Icon"
            className="check-email-icon"
          />

          <h2 className="check-email-title">Check Your Email</h2>

          <p className="check-email-text">
            Anda akan menerima email dengan tautan untuk mengatur ulang kata sandi Anda. Silakan periksa kotak masuk Anda.
          </p>

          <Link href="/forgot-password" className="check-email-link">
            Change Email
          </Link>
        </div>
      </div>
    </div>
  );
}
