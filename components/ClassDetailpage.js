"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/compat/router";
import Head from "next/head";

export default function ClassDetailsPage() {
  const router = useRouter();
  const { classId } = router.query; // Get the classId from URL

  // Dummy data for applicants (this could be fetched from an API)
  const [applicants, setApplicants] = useState([
    { id: 1, name: "Alice", status: "Pending" },
    { id: 2, name: "Bob", status: "Approved" },
    { id: 3, name: "Charlie", status: "Rejected" },
  ]);

  const [filter, setFilter] = useState("Semua");

  // Filter applicants based on status
  const filteredApplicants = applicants.filter((applicant) =>
    filter === "Semua" || applicant.status === filter
  );

  // Handle filter change
  const handleFilterChange = (status) => {
    setFilter(status);
  };

  // Handle status change for applicants
  const handleStatusChange = (applicantId, newStatus) => {
    setApplicants((prevApplicants) =>
      prevApplicants.map((applicant) =>
        applicant.id === applicantId
          ? { ...applicant, status: newStatus }
          : applicant
      )
    );
  };

  return (
    <>
      <Head>
        <title>Class Details - {classId}</title>
      </Head>
      <div className="class-details-container">
        <button onClick={() => router.back()} className="back-button">
          Kembali
        </button>

        {/* Class Information */}
        <div className="class-info">
          <h1>Perancangan Perangkat Lunak</h1>
          <p>Dosen Pengampu: Bulan Bintang Galaksi</p>
          <p>Jadwal: Selasa, 13.30-15.20</p>
          <p>Asisten Dibutuhkan: 3 orang</p>
          <p>Total Pendaftar: {filteredApplicants.length}</p>
        </div>

        {/* Applicants List */}
        <div className="applicants-list">
          <h2>Daftar Pelamar</h2>
          <div className="applicant-filters">
            <button onClick={() => handleFilterChange("Semua")}>Semua</button>
            <button onClick={() => handleFilterChange("Pending")}>Pending</button>
            <button onClick={() => handleFilterChange("Approved")}>Diterima</button>
            <button onClick={() => handleFilterChange("Rejected")}>Ditolak</button>
          </div>

          {filteredApplicants.length === 0 ? (
            <div className="no-applicants">
              <img src="/images/BOOK.png" alt="No applicants" />
              <p>Belum ada pelamar yang diterima</p>
            </div>
          ) : (
            filteredApplicants.map((applicant) => (
              <div key={applicant.id} className="applicant-card">
                <div className="applicant-info">
                  <p>{applicant.name}</p>
                  <p>Status: {applicant.status}</p>
                </div>
                <div className="applicant-actions">
                  <button
                    onClick={() => handleStatusChange(applicant.id, "Approved")}
                  >
                    Terima
                  </button>
                  <button
                    onClick={() => handleStatusChange(applicant.id, "Rejected")}
                  >
                    Tolak
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
