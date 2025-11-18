"use client";
import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <div className="auth-page">
      <div className="auth-container-forgot">
        <div className="auth-box-forgot">
          <img
            src="/images/CHECKBOX.png" 
            alt="Mail Icon"
            className="check-email-icon"
          />

          <h2 className="forgot-title">Check Your Email</h2>

          <p className="forgot-text">
            Anda akan menerima email dengan tautan <br />
            untuk mengatur ulang kata sandi Anda. Silakan <br /> 
            periksa kotak masuk Anda.
          </p>

          <Link href="/forgot-password" className="check-email-link">
            Change Email
          </Link>
        </div>
      </div>
    </div>
  );
}
