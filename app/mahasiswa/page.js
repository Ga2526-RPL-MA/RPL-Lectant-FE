"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function MahasiswaDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState("Lowongan Tersedia");
  const [namaMahasiswa, setNamaMahasiswa] = useState("");

  const handleProfileClick = () => {
    router.push("/mahasiswa/profile");
  };

  const handleTabClick = [
    { id: "Lowongan Tersedia", label: "Lowongan Tersedia" },
    { id: "Lamaran Saya", label: "Lamaran Saya" },
  ];

  const handleExploreClick = () => {
    router.push("/mahasiswa/lowongan");
  };

  useEffect(() => {
    fetchNamaMahasiswa();
  }, []);

  const fetchNamaMahasiswa = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token tidak ditemukan");

      const res = await fetch(
        "https://rpl-lectant-be.vercel.app/mahasiswa/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Gagal mengambil profil");

      const result = await res.json();
      setNamaMahasiswa(result.data?.nama || "");
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img
          src="/images/RPL-LECTANT.png"
          alt="RPL Lectant"
          className="dashboard-logo"
        />
        <div className="dashboard-profile">
          <button className="profile-button" onClick={handleProfileClick}>
            MR
          </button>
        </div>
      </header>

      <div className="class-hero-card">
        <h1 className="class-hero-title">
          {" "}
          Selamat Datang{namaMahasiswa && `, ${namaMahasiswa}`}!
        </h1>
        <p className="student-header-subtitle">
          Temukan lowongan asisten dosen yang sesuai dengan keahlian Anda
        </p>
      </div>

      <div className="tabs-wrapper-mahasiswa">
        <div className="tabs-container-mahasiswa">
          {handleTabClick.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <main className="student-dashboard-body">
        <div className="student-empty-card">
          <div className="student-empty-icon-wrapper">
            <div className="student-empty-icon-circle">
              <img
                src="/images/ICON MAHASISWA.png"
                alt=""
                className="student-empty-icon"
              />
            </div>
          </div>

          <h2 className="student-empty-title">Belum Ada Lamaran</h2>
          <p className="student-empty-text">
            Anda belum mengirim lamaran untuk posisi asisten dosen.
            <br />
            Mulai lamar lowongan yang sesuai dengan keahlian dan minat Anda!
          </p>
          <button
            type="button"
            className="btn-primary student-explore-btn"
            onClick={handleExploreClick}
          >
            Jelajahi Lowongan Tersedia
          </button>
        </div>
      </main>
    </div>
  );
}
