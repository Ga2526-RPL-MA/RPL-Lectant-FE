"use client";
import React, { useState } from "react";
import Head from 'next/head';

export default function DosenDashboard() {
  const [activeTab, setActiveTab] = useState("kelasAndaBuka");
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCreate = () => {
    const newClass = {
      id: Date.now(),
      title: "Perancangan Perangkat Lunak",
      lecturer: "Bulan Bintang Galaksi",
      schedule: "Selasa, 13.30–15.20",
      applicants: "12 / 3 pelamar",
      status: "Active",
    };
    setClasses([...classes, newClass]);
  };

  const tabs = [
    { id: "kelasAndaBuka", label: "Kelas yang Anda Buka" },
    { id: "kelasYangDibuka", label: "Kelas yang Dibuka" },
    { id: "daftarKelas", label: "Daftar Kelas" },
  ];

  return (
    <>
      <Head>
        <title>RPC Student - Dashboard</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <img
            src="/images/RPL-LECTANT.png"
            alt="Logo"
            className="dashboard-logo"
          />
          <div className="dashboard-profile">
            <button className="auth-button-dosen" onClick={handleCreate}>
              + Create
            </button>
            <div className="profile-circle">BB</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="tabs-wrapper">
        <div style={{ display: "flex", justifyContent: "center", padding: "0 40px" }}>
          <div className="tabs-container">
            {tabs.map((tab) => (
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

        {/* Controls */}
        <div className="dashboard-controls">
          <input
            type="text"
            className="search-input"
            placeholder="Search courses or instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="filter-btn">All Status ▾</button>
        </div>

        {/* Class List */}
        <div
          className="class-list"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            padding: "40px",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "300px" // kasih tinggi minimal biar bisa kelihatan di tengah
          }}
        >
          {classes.length === 0 ? (
            <div
              style={{
                width: "100%",
                textAlign: "center",
                color: "#777",
              }}
            >
              <img
                src="/images/BOOK.png"
                alt="Book"
                style={{ width: "40px", opacity: "0.5" }}
              />
              <p style={{ fontSize: "18px", marginTop: "10px" }}>No courses found</p>
              <p style={{ fontSize: "14px", color: "#999" }}>
                Try adjusting your search or filters
              </p>
            </div>
          ) : (
            classes.map((kelas) => (
              <div key={kelas.id} className="class-card">
                <div className="card-header">
                  <span className="status">{kelas.status}</span>
                </div>
                <div className="card-body">
                  <h4 style={{ fontSize: "14px", color: "#001E6C" }}>{kelas.title}</h4>
                  <p style={{ fontSize: "13px" }}>
                    Dosen Pengampu:<br />
                    <strong>{kelas.lecturer}</strong>
                  </p>
                  <p style={{ fontSize: "13px", marginTop: "6px" }}>
                    {kelas.schedule}
                  </p>
                  <p style={{ fontSize: "13px", color: "#555", marginTop: "4px" }}>
                    {kelas.applicants}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      </div>
    </>
  );
}