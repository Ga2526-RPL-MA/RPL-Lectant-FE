"use client";

import Link from "next/link";

export default function DosenPage() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-green-800 mb-4">
        Selamat Datang, Dosen Informatika ITS 👨‍🏫
      </h1>
      <p className="text-gray-700 mb-6 text-center max-w-md">
        Anda berhasil login sebagai dosen.  
      </p>

      <ul className="text-gray-800 list-disc text-left mb-6">
        <li>📢 Membuat dan mengelola lowongan magang</li>
        <li>📑 Melihat daftar mahasiswa yang mendaftar</li>
        <li>🗂️ Menyetujui atau menolak aplikasi mahasiswa</li>
      </ul>

      <Link
        href="/signin"
        className="text-sm text-green-600 hover:underline"
      >
        Keluar
      </Link>
    </div>
  );
}

