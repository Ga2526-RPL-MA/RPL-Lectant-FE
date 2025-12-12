"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function MahasiswaDashboardPage() {
  const router = useRouter();
  const [nrp, setNrp] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [semester, setSemester] = useState("");
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const photoInputRef = useRef(null);
  const [transcript, setTranscript] = useState(null);
  const transcriptInputRef = useRef(null);
  const [transcriptUrl, setTranscriptUrl] = useState("");

  const getProfileMahasiswa = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token)
        throw new Error("Token tidak ditemukan. Silakan login ulang.");

      const response = await fetch(
        "https://rpl-lectant-be.vercel.app/mahasiswa/profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      const result = await response.json();
      const profile = result.data;

      setNrp(profile.nrp || "");
      setNamaLengkap(profile.nama || "");
      setEmail(profile.email || "");
      setTelepon(profile.no_telepon || "");
      setJurusan(profile.jurusan || "");
      setAngkatan(profile.angkatan || "");
      // Fix: semester dari API adalah number, tapi state harus string untuk select
      setSemester(
        profile.semester !== undefined && profile.semester !== null
          ? String(profile.semester)
          : ""
      );
      // Fix: transcript tidak ada di response, jangan set dari sini
      // setTranscript(profile.transcript || "");
      setTranscriptUrl(profile.dokumen_url || "");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  useEffect(() => {
    getProfileMahasiswa();
  }, []);

  const getFileNameFromUrl = (url) => {
    if (!url) return "";
    return url.split("/").pop();
  };

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
    // Clear transcriptUrl ketika upload file baru
    setTranscriptUrl("");
  };

  const handleRemoveTranscript = () => {
    setTranscript(null);
    setTranscriptUrl("");
    if (transcriptInputRef.current) {
      transcriptInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token tidak ditemukan.");

      const hasFiles = photo || transcript;
      let payload;
      let headers = { Authorization: `Bearer ${token}` };

      if (hasFiles) {
        // --- FORM DATA ---
        payload = new FormData();
        payload.append("nrp", nrp);
        payload.append("nama", namaLengkap);
        payload.append("email", email);
        payload.append("no_telepon", telepon);
        payload.append("jurusan", jurusan);
        payload.append("angkatan", angkatan);
        payload.append("semester", semester);

        if (photo) payload.append("photo", photo);
        if (transcript) payload.append("transcript", transcript);
      } else {
        // --- JSON ---
        payload = JSON.stringify({
          nrp,
          nama: namaLengkap,
          email,
          no_telepon: telepon,
          jurusan,
          angkatan,
          semester: parseInt(semester),
        });

        headers["Content-Type"] = "application/json";
      }

      // FETC HANYA SEKALI
      const response = await fetch(
        "https://rpl-lectant-be.vercel.app/mahasiswa/profile",
        {
          method: "PUT",
          headers,
          body: payload,
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      alert("Profil berhasil diperbarui!");

      await getProfileMahasiswa();

      // reset file input
      setPhoto(null);
      setPhotoPreview("");
      setTranscript(null);
    } catch (err) {
      console.error(err);
      alert(`Gagal memperbarui profil: ${err.message}`);
    }
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
                    <option value="">Pilih jurusan</option>
                    <option value="Teknik Informatika">
                      Teknik Informatika
                    </option>
                    <option value="Rekayasa Perangkat Lunak">
                      Rekayasa Perangkat Lunak
                    </option>
                    <option value="Rekayasa Kecerdasan Artifisial">
                      Rekayasa Kecerdasan Artifisial
                    </option>
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
                    <option value="4">Semester 4</option>
                    <option value="5">Semester 5</option>
                    <option value="6">Semester 6</option>
                  </select>
                </div>
              </div>

              {/* TRANSKRIP NILAI – TOMBOL + PREVIEW NAMA FILE */}
              <div className="form-group">
                <label htmlFor="transcript" className="form-label">
                  Transkrip Nilai <span className="form-required">*</span>
                </label>

                <div className="student-upload-transkrip">
                  {!transcriptUrl && !transcript && (
                    <button
                      type="button"
                      className="student-upload-btn btn-secondary"
                      onClick={handleTranscriptButtonClick}
                    >
                      Upload Transkrip (PDF, Max 5MB)
                    </button>
                  )}

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

                {(transcriptUrl || transcript) && (
                  <div className="file-preview">
                    <a
                      href={transcriptUrl || "#"}
                      target={transcriptUrl ? "_blank" : "_self"}
                      rel="noopener noreferrer"
                    >
                      {transcript
                        ? transcript.name
                        : getFileNameFromUrl(transcriptUrl)}
                    </a>

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