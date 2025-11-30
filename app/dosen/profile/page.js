"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";

export default function ProfilePage() {
  const router = useRouter();
  const [routerReady, setRouterReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setRouterReady(true);
    }
  }, [router.isReady]);

  const [profileData, setProfileData] = useState({
    nip: "197805122005011001",
    namaLengkap: "Dr. Bulan Bintang Galaksi, S.Kom., M.T.",
    email: "bulan.galaksi@its.ac.id",
    nomorTelepon: "+62 812-3456-7890",
    jurusan: "Teknik Informatika",
    foto: "/images/miong.png",
  });

  const [courses, setCourses] = useState([
    { title: "Pemrograman Berorientasi Objek", semester: "Semester 1", year: "2024/2025" },
    { title: "Perancangan Perangkat Lunak", semester: "Semester 2", year: "2024/2025" },
    // Add more courses here if needed
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...profileData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        foto: fileUrl,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfileData(formData);
    setIsEditing(false);
    console.log("Profile Updated", formData);
  };

  const handleBackClick = () => {
    if (routerReady) {
      router.push("/dosen");
    } else {
      console.error("Router not ready yet");
    }
  };

  return (
    <>
      <Head>
        <title>Profil Dosen</title>
      </Head>

      <div className="dashboard-container">
        {/* Header with Logo */}
        <div className="dashboard-header">
          <img
            src="/images/RPL-LECTANT.png"
            alt="Logo"
            className="dashboard-logo"
          />
        </div>

        {/* Profile Section */}
        <a className="create-back-link" onClick={() => router.push("/dosen")}>
          Kembali
        </a>
        <div className="profile-container">
          {/* Header Container */}
          <div className="profile-header-container">
            <div className="profile-header">
              <h2>Profil Dosen</h2>
            </div>
          </div>

          {/* Profile View Mode */}
          {!isEditing ? (
            <div className="profile-view">
              <div className="profile-photo">
                <img src={profileData.foto} alt="Profile" />
              </div>
              <div className="profile-details">
                <p>
                  <strong>Nama:</strong> {profileData.namaLengkap}
                </p>
                <p>
                  <strong>NIP:</strong> {profileData.nip}
                </p>
                <p>
                  <strong>Email:</strong> {profileData.email}
                </p>
                <p>
                  <strong>Telepon:</strong> {profileData.nomorTelepon}
                </p>
                <p>
                  <strong>Jurusan:</strong> {profileData.jurusan}
                </p>
              </div>
              <div className="profile-actions">
                <button onClick={() => setIsEditing(true)}>Edit Profile</button>
              </div>
            </div>
          ) : (
            <div className="profile-edit">
              <form onSubmit={handleSubmit}>
                <div className="profile-photo">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <div className="profile-image-placeholder">
                    {formData.foto ? (
                      <img src={formData.foto} alt="Profile" />
                    ) : (
                      <span>Upload a Photo</span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="nip">NIP</label>
                  <input
                    type="text"
                    id="nip"
                    name="nip"
                    value={formData.nip}
                    onChange={handleInputChange}
                    placeholder="Masukkan NIP"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="namaLengkap">Nama Lengkap</label>
                  <input
                    type="text"
                    id="namaLengkap"
                    name="namaLengkap"
                    value={formData.namaLengkap}
                    onChange={handleInputChange}
                    placeholder="Masukkan nama lengkap"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@its.ac.id"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nomorTelepon">Nomor Telepon</label>
                  <input
                    type="text"
                    id="nomorTelepon"
                    name="nomorTelepon"
                    value={formData.nomorTelepon}
                    onChange={handleInputChange}
                    placeholder="08xx-xxxx-xxxx"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="jurusan">Jurusan</label>
                  <select
                    id="jurusan"
                    name="jurusan"
                    value={formData.jurusan}
                    onChange={handleInputChange}
                  >
                    <option value="Informatika">Informatika</option>
                    <option value="RPL">RPL</option>
                    <option value="RKA">RKA</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn-secondary"> Batal </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                  >
                    Simpan
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Statistics Section */}
          <div className="statistics-section">
            <div className="statistics-card">
              <h3>Statistik</h3>
              <p>
                <strong>Total Mata Kuliah:</strong> 5
              </p>
              <p>
                <strong>Lowongan Aktif:</strong> 8
              </p>
              <p>
                <strong>Total Asisten:</strong> 15
              </p>
              <p>Posisikan informasi profil Anda selalu up-to-date untuk memudahkan mahasiswa dan admin dalam berkomunikasi.</p>
            </div>
          </div>

          {/* Mata Kuliah yang Diampu */}
          <div className="courses-section">
            <div className="courses-card">
              <h3>Mata Kuliah yang Diampu</h3>
              <ul>
                {courses.map((course, index) => (
                  <li key={index} className="course-item">
                    <strong>{course.title}</strong> - {course.semester} ({course.year})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
