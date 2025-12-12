"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();

  // Data asli dari backend
  const [profileData, setProfileData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [statistic, setStatistic] = useState({});

  // Data untuk form edit
  const [formData, setFormData] = useState({
    namaLengkap: "",
    nip: "",
    email: "",
    nomorTelepon: "",
    jurusan: "",
    foto: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  // ===========================
  // 🚀 GET PROFILE (useEffect)
  // ===========================
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const res = await fetch("https://rpl-lectant-be.vercel.app/dosen/profile-aing", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });


        if (!res.ok) throw new Error("Failed to fetch profile");

        const json = await res.json();
        const data = json.data;

        // mapping dari BE → FE
        const mapped = {
          namaLengkap: data.nama || "",
          nip: data.nip || "",
          email: data.email || "",
          nomorTelepon: data.no_telepon || "",
          jurusan: data.jurusan || "",
          foto: data.foto || "",
        };

        setProfileData(mapped);
      } catch (err) {
        console.error("GET profile error:", err);
      }
    };

    const fetchCourses = async () => {
      try {
        const res = await fetch("https://rpl-lectant-be.vercel.app/dosen/kelas-aing", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

        if (!res.ok) throw new Error("Failed to fetch classes");

        const json = await res.json();

        setCourses(json);

      } catch (err) {
        console.error("GET courses error:", err);
      }
    };

    const fetchStatistic = async () => {
      try {
        const res = await fetch("https://rpl-lectant-be.vercel.app/dosen/statistik-aing", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

        if (!res.ok) throw new Error("Failed to fetch statistics");

        const json = await res.json();

        // mapping dari BE → FE
        const mapped = {
          totalMatkul: json.total_matkul || "",
          jumlahLowongan: json.jumlah_lowongan || "",
          jumlahAsisten: json.jumlah_asisten || "",
        };

        setStatistic(mapped);

      } catch (err) {
        console.error("GET statistics error:", err);
      }
    };

    fetchProfile();
    fetchCourses();
    fetchStatistic();
  }, []);

  // ===========================
  // 🖊 Edit Mode
  // ===========================
  const handleEditClick = () => {
    setFormData(profileData); // copy data yg sudah ada
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  // ===========================
  // ✏ Input Handler
  // ===========================
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setFormData((prev) => ({ ...prev, foto: url }));
  };

  // ===========================
  // 📌 PATCH PROFILE
  // ===========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    const bodyToSend = {
      nama: formData.namaLengkap,
      nip: formData.nip,
      email: formData.email,
      no_telepon: formData.nomorTelepon,
      jurusan: formData.jurusan,
      // foto tidak dikirim jika backend belum mendukung upload
    };

    try {
      const res = await fetch("https://rpl-lectant-be.vercel.app/dosen/profile-aing", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyToSend),
      });

      if (!res.ok) throw new Error("Failed to update profile");

      const json = await res.json();
      const updated = json.data;

      const mapped = {
        namaLengkap: updated.nama,
        nip: updated.nip,
        email: updated.email,
        nomorTelepon: updated.no_telepon,
        jurusan: updated.jurusan,
        foto: updated.foto || "",
      };

      setProfileData(mapped);
      setIsEditing(false);
    } catch (err) {
      console.error("PATCH profile error:", err);
    }
  };

  // Helper untuk avatar
  const getInitials = (name) => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    return (parts[0][0] + (parts[parts.length - 1][0] || "")).toUpperCase();
  };

  const handleBackClick = () => {
    router.push("/dosen");
  };

  // sementara loading
  if (!profileData) {
    return <div style={{ padding: 30 }}>Loading profile...</div>;
  }

  const dataToShow = isEditing ? formData : profileData;

  return (
    <div className="dashboard-container">
      {/* HEADER */}
      <header className="dashboard-header">
        <img
          src="/images/RPL-LECTANT.png"
          alt="Logo"
          className="dashboard-logo"
        />
        <div className="dashboard-profile">
          <button className="profile-button">
            {getInitials(profileData.namaLengkap) || "BB"}
          </button>
        </div>
      </header>

      <main className="lecturer-dashboard-body">
        {/* Back link */}
        <button className="create-back-link" onClick={handleBackClick}>
          ← Back to Dashboard
        </button>

        {/* Judul halaman */}
        <div className="lecturer-page-title">
          <h1 className="lecturer-page-heading">Profil Dosen</h1>
        </div>

        {/* LAYOUT 2 KOLOM */}
        <div className="lecturer-layout">
          {/* KOLOM KIRI */}
          <div className="lecturer-main-column">
            {/* KARTU PROFIL */}
            <div className="lecturer-profile-card">
              {!isEditing ? (
                <>
                  <div className="lecturer-profile-top">
                    <div className="lecturer-avatar-wrapper">
                      <div className="lecturer-avatar-shadow" />
                      <div className="lecturer-avatar">
                        {dataToShow.foto ? (
                          <img src={dataToShow.foto} alt="Foto Dosen" />
                        ) : (
                          <span>{getInitials(dataToShow.namaLengkap)}</span>
                        )}
                      </div>
                    </div>

                    <div className="lecturer-profile-maininfo">
                      <div className="lecturer-name-row">
                        <h2>{dataToShow.namaLengkap}</h2>
                      </div>
                      <span className="lecturer-role-chip">Dosen</span>
                      <p className="lecturer-nip">{dataToShow.nip}</p>
                    </div>
                  </div>

                  <div className="lecturer-info-grid">
                    <div className="lecturer-info-item">
                      <span className="lecturer-info-icon">📧</span>
                      <div>
                        <div className="lecturer-info-label">Email</div>
                        <div className="lecturer-info-value">
                          {dataToShow.email}
                        </div>
                      </div>
                    </div>

                    <div className="lecturer-info-item">
                      <span className="lecturer-info-icon">🏫</span>
                      <div>
                        <div className="lecturer-info-label">Jurusan</div>
                        <div className="lecturer-info-value">
                          {dataToShow.jurusan}
                        </div>
                      </div>
                    </div>

                    <div className="lecturer-info-item">
                      <span className="lecturer-info-icon">📞</span>
                      <div>
                        <div className="lecturer-info-label">Telepon</div>
                        <div className="lecturer-info-value">
                          {dataToShow.nomorTelepon}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lecturer-profile-actions">
                    <button
                      className="lecturer-edit-btn btn-primary"
                      onClick={handleEditClick}
                    >
                      Edit Profile
                    </button>
                  </div>
                </>
              ) : (
                <form onSubmit={handleSubmit} className="lecturer-edit-form">
                  <div className="lecturer-profile-top">
                    <div className="lecturer-avatar-wrapper">
                      <div className="lecturer-avatar-shadow" />
                      <div className="lecturer-avatar">
                        {formData.foto ? (
                          <img src={formData.foto} alt="Foto Dosen" />
                        ) : (
                          <span>{getInitials(formData.namaLengkap)}</span>
                        )}
                      </div>
                    </div>

                    <div className="lecturer-profile-maininfo">
                      <h2>Edit Profil Dosen</h2>
                      <label className="lecturer-upload-label">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        Ganti Foto
                      </label>
                    </div>
                  </div>

                  <div className="lecturer-edit-grid">
                    <div className="form-col">
                      <label className="form-label" htmlFor="namaLengkap">
                        Nama Lengkap
                      </label>
                      <input
                        id="namaLengkap"
                        name="namaLengkap"
                        className="form-input"
                        type="text"
                        value={formData.namaLengkap}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-col">
                      <label className="form-label" htmlFor="nip">
                        NIP
                      </label>
                      <input
                        id="nip"
                        name="nip"
                        className="form-input"
                        type="text"
                        value={formData.nip}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-col">
                      <label className="form-label" htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        className="form-input"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-col">
                      <label className="form-label" htmlFor="nomorTelepon">
                        Nomor Telepon
                      </label>
                      <input
                        id="nomorTelepon"
                        name="nomorTelepon"
                        className="form-input"
                        type="text"
                        value={formData.nomorTelepon}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div className="form-col">
                      <label className="form-label" htmlFor="jurusan">
                        Jurusan
                      </label>
                      <input
                        id="jurusan"
                        name="jurusan"
                        className="form-input"
                        type="text"
                        value={formData.jurusan}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="lecturer-edit-actions form-actions">
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={handleCancelEdit}
                    >
                      Batal
                    </button>
                    <button type="submit" className="btn-primary">
                      Simpan Perubahan
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* KARTU MATA KULIAH */}
            <div className="lecturer-courses-card">
              <div className="lecturer-section-header">
                <span className="lecturer-section-icon">📚</span>
                <span>Mata Kuliah yang Diampu</span>
              </div>

              <table className="courses-table">
                <thead>
                  <tr>
                    <th>Kode MK</th>
                    <th>Nama Mata Kuliah</th>
                    <th>SKS</th>
                    <th>Semester</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((c, i) => (
                    <tr key={i}>
                      <td>{c.kode_matkul}</td>
                      <td>{c.nama_matkul}</td>
                      <td>{c.sks}</td>
                      <td>
                        <span className="badge-semester">
                          {c.semester}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* KOLOM KANAN */}
          <div className="lecturer-side-column">
            <div className="lecturer-stats-card">
              <h3>Statistik</h3>

              <div className="stats-grid">
                <div className="stats-item stats-blue">
                  <div className="stats-label">Total Mata Kuliah</div>
                  <div className="stats-value">{statistic.totalMatkul}</div>
                </div>
                <div className="stats-item stats-green">
                  <div className="stats-label">Lowongan Aktif</div>
                  <div className="stats-value">{statistic.jumlahLowongan}</div>
                </div>
                <div className="stats-item stats-pink">
                  <div className="stats-label">Total Asisten</div>
                  <div className="stats-value">{statistic.jumlahAsisten}</div>
                </div>
              </div>
            </div>

            <div className="lecturer-tip-card">
              <h3>Catatan</h3>
              <p>
                Pastikan informasi profil Anda selalu up-to-date untuk
                memudahkan mahasiswa dan admin dalam berkomunikasi.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
