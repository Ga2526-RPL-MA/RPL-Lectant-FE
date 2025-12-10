"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function MahasiswaDashboardPage() {
  const router = useRouter();

  const [nrp, setNrp] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [semester, setSemester] = useState("");
  const [ipk, setIpk] = useState("");

  const [photo, setPhoto] = useState(null);           
  const [photoPreview, setPhotoPreview] = useState(""); 
  const photoInputRef = useRef(null);

  const [transcript, setTranscript] = useState(null); // file PDF
  const transcriptInputRef = useRef(null);

  const handleBack = () => {
    router.push("/mahasiswa");
  };

  const handleProfileClick = () => {
    router.push("/mahasiswa/profile");
  };

  const handleUploadPhotoClick = () => {
    if (photoInputRef.current) {
      photoInputRef.current.click();
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Ukuran foto maksimal 2MB");
      return;
    }

    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPhotoPreview("");
    if (photoInputRef.current) {
      photoInputRef.current.value = "";
    }
  };

  const handleTranscriptButtonClick = () => {
    if (transcriptInputRef.current) {
      transcriptInputRef.current.click();
    }
  };

  const handleTranscriptChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validasi ukuran 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("Ukuran transkrip maksimal 5MB");
      return;
    }

    setTranscript(file);
  };

  const handleRemoveTranscript = () => {
    setTranscript(null);
    if (transcriptInputRef.current) {
      transcriptInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("DATA PROFIL (front-end only):", {
      nrp,
      namaLengkap,
      email,
      telepon,
      jurusan,
      angkatan,
      semester,
      ipk,
      photo,
      transcript,
    });

    alert(
      "Data profil sudah dikumpulkan di front-end (cek console). Nanti tinggal disambungkan ke API."
    );
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header-mahasiswa">
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

      <main className="mahasiswa-dashboard-body">
        <p className="create-back-link" onClick={handleBack}>
          ← Kembali
        </p>

        <div className="student-profile-wrapper">
          {/* KARTU UTAMA PROFIL */}
          <form className="student-profile-card" onSubmit={handleSubmit}>
            {/* BARIS FOTO PROFIL */}
            <div className="student-photo-row">
              <div className="student-photo-box">
                <div className="student-photo-placeholder">
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Foto Profil"
                      className="student-photo-preview"
                    />
                  ) : (
                    <span>👤</span>
                  )}
                </div>

                <button
                  type="button"
                  className="student-upload-btn btn-secondary"
                  onClick={handleUploadPhotoClick}
                >
                  {photoPreview ? "Ganti Foto" : "Upload Foto"}
                </button>

                {photoPreview && (
                  <button
                    type="button"
                    className="student-upload-btn btn-secondary"
                    style={{ marginTop: "0.5rem" }}
                    onClick={handleRemovePhoto}
                  >
                    Hapus Foto
                  </button>
                )}

                {/* INPUT FILE FOTO (HIDDEN) */}
                <input
                  type="file"
                  accept="image/*"
                  ref={photoInputRef}
                  style={{ display: "none" }}
                  onChange={handlePhotoChange}
                />
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
                    value={nrp}
                    onChange={(e) => setNrp(e.target.value)}
                    required
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
                    value={namaLengkap}
                    onChange={(e) => setNamaLengkap(e.target.value)}
                    required
                  />
                </div>
              </div>
            </section>

            {/* INFORMASI KONTAK */}
            <section className="student-section">
              <div className="student-section-title">
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                    value={telepon}
                    onChange={(e) => setTelepon(e.target.value)}
                    required
                  />
                </div>
              </div>
            </section>

            {/* INFORMASI AKADEMIK */}
            <section className="student-section">
              <div className="student-section-title">
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
                  <select
                    className="form-input"
                    value={jurusan}
                    onChange={(e) => setJurusan(e.target.value)}
                    required
                  >
                    <option value="">Jurusan</option>
                    <option value="Teknik Informatika">Teknik Informatika</option>
                    <option value="Sistem Informasi">Sistem Informasi</option>
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
                    value={angkatan}
                    onChange={(e) => setAngkatan(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-col">
                  <label className="form-label">
                    Semester Aktif <span className="form-required">*</span>
                  </label>
                  <select
                    className="form-input"
                    value={semester}
                    onChange={(e) => setSemester(e.target.value)}
                    required
                  >
                    <option value="">Pilih semester</option>
                    <option value="3">Semester 3</option>
                    <option value="5">Semester 5</option>
                    <option value="7">Semester 7</option>
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
                    value={ipk}
                    onChange={(e) => setIpk(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* TRANSKRIP NILAI – TOMBOL + PREVIEW NAMA FILE */}
              <div className="form-group">
                <label htmlFor="transcript" className="form-label">
                  Transkrip Nilai <span className="form-required">*</span>
                </label>

                <div className="student-upload-transkrip">
                  <button
                    type="button"
                    className="student-upload-btn btn-secondary"
                    onClick={handleTranscriptButtonClick}
                  >
                    Upload Transkrip (PDF, Max 5MB)
                  </button>

                  {/* INPUT FILE (HIDDEN) */}
                  <input
                    type="file"
                    id="transcript"
                    ref={transcriptInputRef}
                    onChange={handleTranscriptChange}
                    accept="application/pdf"
                    style={{ display: "none" }}
                  />
                </div>

                {transcript && (
                  <div className="file-preview">
                    <span>{transcript.name}</span>
                    <button
                      type="button"
                      onClick={handleRemoveTranscript}
                      className="remove-file"
                    >
                      X
                    </button>
                  </div>
                )}

                <small>
                  Pastikan dokumen yang Anda upload dapat dibaca dengan jelas.
                </small>
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
