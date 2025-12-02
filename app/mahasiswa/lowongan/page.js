"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import JobCard from "../../../components/JobCard"; 
import JobDetailsModal from "../../../components/LowonganDetail";

export default function LowonganMahasiswa() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Lowongan Tersedia");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample Jobs Data
  const jobs = [
    { id: 1, title: "Perancangan Perangkat Lunak", lecturer: "Bulan Bintang", courseName: "perancangan-perangkat-lunak", status: "Lowongan Aktif" },
    { id: 2, title: "Pemrograman Berorientasi Objek", lecturer: "Rizky Ridho", courseName: "pemrograman-berorientasi-objek", status: "Lowongan Aktif" },
    { id: 3, title: "Pengujian Perangkat Lunak", lecturer: "Zevanya Christin", courseName: "pengujian-perangkat-lunak", status: "Draft" },  // Not active yet
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const tabs = [
    { id: "Lowongan Tersedia", label: "Lowongan Tersedia" },
    { id: "Lamaran Saya", label: "Lamaran Saya" },
  ];

  const filteredJobs = jobs.filter((job) =>
    job.status === "Lowongan Aktif" &&
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img src="/images/RPL-LECTANT.png" alt="Logo" className="dashboard-logo" />
        <div className="dashboard-profile">
          <button className="profile-button">MR</button>
        </div>
      </header>

      <div className="tabs-wrapper-mahasiswa">
        <div className="tabs-container-mahasiswa">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <input
          type="text"
          className="search-input-mahasiswa"
          placeholder="Cari mata kuliah atau dosen..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {activeTab === "Lowongan Tersedia" && (
        <div className="job-cards-container">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {activeTab === "Lamaran Saya" && (
        <div className="job-cards-container">
          {filteredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
