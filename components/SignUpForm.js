"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
/*import Swal from "sweetalert2";*/

export default function SignUpForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();

    if (
      !email.endsWith("@student.its.ac.id") &&
      !email.endsWith("@its.ac.id")
    ) {
      alert("Gunakan email ITS untuk Sign Up!");
      return;
    }

    setShowModal(true);
    setTimeout(() => {
      setShowModal(false);
      router.push("/signin");
    }, 2000);
  };

  return (
    <form onSubmit={handleSignUp} className="flex flex-col space-y-4">
      <input
        type="email"
        placeholder="Email ITS"
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition"
      >
        Sign Up
      </button>

      <p className="text-sm text-center text-gray-600">
        Already have an account?{" "}
        <a href="/signin" className="text-blue-600 hover:underline">
          Sign In
        </a>
      </p>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2 className="modal-title">✅ Akun Anda berhasil dibuat!</h2>
            <p className="modal-message">
              Selamat datang di{" "}
              <span className="font-semibold text-green-600">RPL Lectant</span> 🎉 <br />
              Silakan lanjut ke halaman Sign In untuk masuk ke akunmu.
            </p>
            <button className="modal-button" onClick={handleCloseModal}>
              OK
            </button>
          </div>
        </div>
      )}
    </form>
  );
}
