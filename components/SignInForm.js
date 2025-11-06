"use client";

import { useState } from "react";

export default function SignInForm({ onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email.endsWith("@student.its.ac.id")) {
      onSuccess("mahasiswa");
    } else if (email.endsWith("@its.ac.id")) {
      onSuccess("dosen");
    } else {
      alert("Gunakan email ITS yang valid!");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
      <input
        type="email"
        placeholder="Email ITS"
        className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        className="border border-gray-300 p-2 rounded-lg focus:ring-2 focus:ring-blue-500"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition"
      >
        Sign In
      </button>
    </form>
  );
}
