"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function MahasiswaDashboardPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/"); // atau "/mahasiswa/dashboard" kalau punya route lain
  };

  const handleProfileClick = () => {
    router.push("/mahasiswa/profile");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: kirim data ke backend
    console.log("Simpan perubahan profil mahasiswa");
  };

  return (
    <div className="dashboard-container">
      <Head>
        <title>Buat Profil Mahasiswa</title>
      </Head>

      {/* HEADER ATAS */}
      <header className="dashboard-header">
        <img
          src="/images/RPL-LECTANT.png"
          alt="Logo"
          className="dashboard-logo"
        />
        <div className="dashboard-profile">
          <button className="profile-button" onClick={handleProfileClick}>
            MH
          </button>
        </div>
      </header>

      <main className="student-main">
        <button className="create-back-link" onClick={handleBack}>
          ← Kembali
        </button>

        <div className="student-page-title">
          <h1 className="student-page-heading">Buat Profil Mahasiswa</h1>
          <p className="student-page-subtitle">
            Perbarui informasi profil Anda untuk meningkatkan peluang diterima
            sebagai asisten dosen.
          </p>
        </div>

        <div className="student-profile-wrapper">
          {/* KARTU UTAMA PROFIL */}
          <form className="student-profile-card" onSubmit={handleSubmit}>
            {/* BARIS FOTO PROFIL */}
            <div className="student-photo-row">
              <div className="student-photo-box">
                <div className="student-photo-placeholder">
                  {/* icon orang simple */}
                  <span>👤</span>
                </div>
                <button
                  type="button"
                  className="student-upload-btn btn-secondary"
                >
                  Upload Foto
                </button>
              </div>

              <div className="student-photo-text">
                <h2>Foto Profil</h2>
                <p>
                  Unggah foto profil Anda yang akan ditampilkan kepada dosen.
                  Gunakan foto formal dengan latar belakang yang jelas.
                </p>
                <ul>
                  <li>Format: JPG, PNG, atau GIF</li>
                  <li>Ukuran maksimal: 2MB</li>
                  <li>Rekomendasi: 400×400 piksel</li>
                </ul>
              </div>
            </div>

            {/* INFORMASI PERSONAL */}
            <section className="student-section">
              <div className="student-section-title">
                <span className="student-section-icon">👤</span>
                <span>Informasi Personal</span>
              </div>
              <p className="student-section-desc">
                Informasi dasar tentang identitas dan kontak Anda.
              </p>

              <div className="form-row">
                <div className="form-col">
                  <label className="form-label">
                    NRP <span className="form-required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Masukkan NRP"
                  />
                </div>
                <div className="form-col">
                  <label className="form-label">
                    Nama Lengkap <span className="form-required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
              </div>
            </section>

            {/* INFORMASI KONTAK */}
            <section className="student-section">
              <div className="student-section-title">
                <span className="student-section-icon">✉️</span>
                <span>Informasi Kontak</span>
              </div>
              <p className="student-section-desc">
                Pastikan informasi kontak Anda akurat untuk komunikasi dengan
                dosen.
              </p>

              <div className="form-row">
                <div className="form-col">
                  <label className="form-label">
                    Email <span className="form-required">*</span>
                  </label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="contoh@its.ac.id"
                  />
                </div>
                <div className="form-col">
                  <label className="form-label">
                    Nomor Telepon <span className="form-required">*</span>
                  </label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="08xx-xxxx-xxxx"
                  />
                </div>
              </div>
            </section>

            {/* INFORMASI AKADEMIK */}
            <section className="student-section">
              <div className="student-section-title">
                <span className="student-section-icon">🎓</span>
                <span>Informasi Akademik</span>
              </div>
              <p className="student-section-desc">
                Informasi terkait program studi dan prestasi akademik Anda.
              </p>

              <div className="form-row">
                <div className="form-col">
                  <label className="form-label">
                    Jurusan <span className="form-required">*</span>
                  </label>
                  <select className="form-input">
                    <option>Jurusan</option>
                    <option>Teknik Informatika</option>
                    <option>Sistem Informasi</option>
                  </select>
                </div>
                <div className="form-col">
                  <label className="form-label">
                    Angkatan <span className="form-required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Misal: 2021"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <label className="form-label">
                    Semester Aktif <span className="form-required">*</span>
                  </label>
                  <select className="form-input">
                    <option>Pilih semester</option>
                    <option>Semester 3</option>
                    <option>Semester 5</option>
                    <option>Semester 7</option>
                  </select>
                </div>
                <div className="form-col">
                  <label className="form-label">
                    IPK <span className="form-required">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Misal: 3.75"
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Transkrip Nilai <span className="form-required">*</span>
                </label>
                <div className="student-upload-transkrip">
                  <button
                    type="button"
                    className="student-upload-btn btn-secondary"
                  >
                    Upload Transkrip (PDF, Max 5MB)
                  </button>
                </div>
              </div>
            </section>

            {/* BUTTON AKSI */}
            <div className="form-actions">
              <button
                type="button"
                className="btn-secondary"
                onClick={handleBack}
              >
                Batal
              </button>
              <button type="submit" className="btn-primary">
                Simpan Perubahan
              </button>
            </div>
          </form>

          {/* KARTU TIPS */}
          <div className="student-tips-card">
            <h3>Tips Mengisi Profil</h3>
            <ul>
              <li>Pastikan semua field yang bertanda * telah diisi.</li>
              <li>Gunakan email institusi resmi (its.ac.id).</li>
              <li>
                Tulis skill dan pengalaman yang relevan dengan mata kuliah yang
                ingin Anda ambil.
              </li>
              <li>
                Deskripsi profil yang baik dapat meningkatkan peluang diterima
                sebagai asisten dosen.
              </li>
              <li>IPK minimal biasanya 3.00 untuk menjadi asisten dosen.</li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
