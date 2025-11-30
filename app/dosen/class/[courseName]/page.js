"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Head from "next/head";

export default function ClassDetailsPage() {
  const router = useRouter();
  const params = useParams();

  // Guard: kalau params belum siap
  const rawCourseName = params?.courseName;
  if (!rawCourseName) {
    return <div>Loading...</div>;
  }

  const decodedCourseName = decodeURIComponent(rawCourseName).replace(/-/g, " ");

  const handleProfileClick = () => {
    router.push("/dosen/profile");
  };

  const[selectedApplicant, setSelectedApplicant] = useState(null);

  const openApplicant = (applicant) => {
    setSelectedApplicant(applicant);
  }
  const closeApplicant = () => {
    setSelectedApplicant(null);
  }

 const closeApplicantModal = () => {
    setSelectedApplicant(null);
  };
  
  const [filter, setFilter] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");

  const [applicants, setApplicants] = useState([
    { 
      id: 1,
      name: "Ahmad Rizki Pratama",
      status: "Pending",
      nrp: "13521001",
      email: "ahmad@student.ac.id",
      ipk: 3.85,
      semester: 5,
      phone: "081234567890",
      appliedDate: "1 Nov 2024",
      motivation: "Saya tertarik menjadi asisten dosen karena ingin memperdalam pemahaman saya tentang materi kuliah serta mengembangkan kemampuan mengajar saya.",
    },
  ]);

  const filterTabs = [
    { id: "Semua", label: "Semua" },
    { id: "Pending", label: "Pending" },
    { id: "Approved", label: "Diterima" },
    { id: "Rejected", label: "Ditolak" },
  ];

  const classDetails = {
    title: decodedCourseName,
    lecturer: "Bulan Bintang Galaksi",
    schedule: "Selasa, 13.30–15.20",
    assistantsRequired: 3,
    totalApplicants: applicants.length,
    status: "Lowongan Aktif",
    jobDescription: `Asisten untuk mata kuliah ${decodedCourseName}`,
  };


  const handleFilterChange = (status) => setFilter(status);

  const filteredApplicants = applicants.filter((a) => {
    const matchStatus = filter === "Semua" || a.status === filter;
    const matchName = a.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchName;
  });

  const handleStatusChange = (id, newStatus) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const totalApproved = applicants.filter((a) => a.status === "Approved").length;

  return (
    <div className="dashboard-container">
      <Head>
        <title>{classDetails.title}</title>
      </Head>

      {/* HEADER ATAS (PUTIH) */}
      <header className="dashboard-header">
        <img
          src="/images/RPL-LECTANT.png"
          alt="Logo"
          className="dashboard-logo"
        />
        <div className="dashboard-profile">
          <button className="profile-button" onClick={handleProfileClick}>
            BB
          </button>
        </div>
      </header>

      {/* HERO BIRU */}
      <div className="class-hero-card">
        <button className="hero-back-btn" onClick={() => router.push("/dosen")}>
          ← Kembali
        </button>

        <div className="class-hero-top">
          <div>
            <h1 className="class-hero-title">{classDetails.title}</h1>
            <span className="status">{classDetails.status}</span>
          </div>

          <div className="class-status">
            <button className="finalize-button">Finalisasi Seleksi</button>
            <button className="close-button">Tutup Lowongan</button>
          </div>
        </div>

        {/* 4 KARTU INFO DI DALAM HERO */}
        <div className="class-hero-info-row">
          <div className="class-hero-info-card">
            <p className="class-hero-info-label">Dosen Pengampu</p>
            <p className="class-hero-info-value">{classDetails.lecturer}</p>
          </div>
          <div className="class-hero-info-card">
            <p className="class-hero-info-label">Jadwal</p>
            <p className="class-hero-info-value">{classDetails.schedule}</p>
          </div>
          <div className="class-hero-info-card">
            <p className="class-hero-info-label">Asisten Dibutuhkan</p>
            <p className="class-hero-info-value">
              {classDetails.assistantsRequired} orang
            </p>
          </div>
          <div className="class-hero-info-card">
            <p className="class-hero-info-label">Total Pelamar</p>
            <p className="class-hero-info-value">
              {classDetails.totalApplicants} pendaftar
            </p>
          </div>
        </div>
      </div>

      {/* KONTEN BAWAH */}
      <div className="class-details-container">
        <div className="applicants-header-row">
          <div className="job-description">
            <h3>Daftar Pelamar</h3>
          </div>

          <div className="applicants-meta">
            <span className="status applicants-badge">
              Total: {classDetails.totalApplicants}
            </span>
            <span className="status applicants-badge accepted">
              Diterima: {totalApproved}/{classDetails.assistantsRequired}
            </span>
          </div>
        </div>

        <div className="applicants-list">
          {selectedApplicant && (
          <div className="applicant-modal-backdrop" onClick={closeApplicantModal}>
            <div
              className="applicant-modal"
              onClick={(e) => e.stopPropagation()} // biar klik dalam modal tidak menutup
            >
              {/* HEADER MODAL */}
              <div className="applicant-modal-header">
                <div className="applicant-modal-header-left">
                  <div className="applicant-avatar-circle large" />
                  <div>
                    <p className="applicant-name">{selectedApplicant.name}</p>
                    <p className="applicant-subtext">
                      {selectedApplicant.nim} • Teknik Informatika
                    </p>
                  </div>
                </div>

                <div className="applicant-modal-header-right">
                  <span
                    className={`status-badge ${
                      selectedApplicant.status === "Approved"
                        ? "status-approved"
                        : selectedApplicant.status === "Rejected"
                        ? "status-rejected"
                        : "status-pending"
                    }`}
                  >
                    {selectedApplicant.status === "Approved"
                      ? "Diterima"
                      : selectedApplicant.status === "Rejected"
                      ? "Ditolak"
                      : "Menunggu"}
                  </span>
                  <button className="modal-close-btn" onClick={closeApplicantModal}>
                    ✕
                  </button>
                </div>
              </div>

              {/* GRID IPK / SEMESTER / MENDAFTAR */}
              <div className="applicant-summary-grid">
                <div className="summary-box">
                  <span className="summary-label">IPK</span>
                  <span className="summary-value">{selectedApplicant.ipk}</span>
                </div>
                <div className="summary-box">
                  <span className="summary-label">Semester</span>
                  <span className="summary-value">{selectedApplicant.semester}</span>
                </div>
                <div className="summary-box">
                  <span className="summary-label">Mendaftar</span>
                  <span className="summary-value">
                    {selectedApplicant.appliedDate}
                  </span>
                </div>
              </div>

              {/* INFORMASI KONTAK */}
              <div className="applicant-section">
                <p className="section-title">Informasi Kontak</p>
                <p className="section-text">{selectedApplicant.email}</p>
                <p className="section-text">{selectedApplicant.phone}</p>
              </div>

              {/* MOTIVASI */}
              <div className="applicant-section">
                <p className="section-title">Motivasi</p>
                <p className="section-text">{selectedApplicant.motivation}</p>
              </div>

              {/* ACTION BUTTONS BAWAH */}
              <div className="applicant-modal-actions">
                <button
                  className="btn-warning-outline"
                  onClick={() => {
                    handleStatusChange(selectedApplicant.id, "Pending");
                    closeApplicantModal();
                  }}
                >
                  Kembalikan ke Menunggu
                </button>
                <button
                  className="btn-danger-solid"
                  onClick={() => {
                    handleStatusChange(selectedApplicant.id, "Rejected");
                    closeApplicantModal();
                  }}
                >
                  Ubah ke Ditolak
                </button>
              </div>
            </div>
          </div>
        )}

          <div className="applicants-controls">
            <div className="tabs-container-applicants">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-button ${
                    filter === tab.id ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="applicants-search-row">
              <input
                type="text"
                className="search-input"
                placeholder="Cari pelamar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* ISI LIST / EMPTY STATE */}
          {filteredApplicants.length === 0 ? (
            <div className="no-applicants">
              <p>Belum ada pelamar yang diterima</p>
            </div>
          ) : (
            filteredApplicants.map((a) => (
              <div key={a.id} className="applicant-card-row">
                {/* KIRI: NAMA + INFO SINGKAT */}
                <div className="applicant-main">
                  <div className="applicant-avatar-circle" />

                  <div className="applicant-text">
                    <p className="applicant-name">{a.name}</p>
                    <p className="applicant-subtext">{a.nrp}</p>
                    <p className="applicant-subtext">
                      IPK: {a.ipk} • Semester {a.semester}
                    </p>
                     <button
                      className="applicant-view-btn"
                      onClick={() => openApplicant(a)}
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* KANAN: STATUS BADGE + TOMBOL AKSI */}
                <div className="applicant-right">
                  <span
                    className={`status-badge ${
                      a.status === "Approved"
                        ? "status-approved"
                        : a.status === "Rejected"
                        ? "status-rejected"
                        : "status-pending"
                    }`}
                  >
                    {a.status === "Approved"
                      ? "Accepted"
                      : a.status === "Rejected"
                      ? "Rejected"
                      : "Pending"}
                  </span>

                  <div className="applicant-actions-inline">
                    <button
                      className="btn-accept-small"
                      onClick={() => handleStatusChange(a.id, "Approved")}
                    >
                      Terima
                    </button>
                    <button
                      className="btn-reject-small"
                      onClick={() => handleStatusChange(a.id, "Rejected")}
                    >
                      Tolak
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
