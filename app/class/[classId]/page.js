"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function ClassDetailsPage() {
  const router = useRouter();
  const [classId, setClassId] = useState(null); // State to store classId
  const [applicants, setApplicants] = useState([
    { id: 1, name: "Alice", status: "Pending" },
    { id: 2, name: "Bob", status: "Approved" },
    { id: 3, name: "Charlie", status: "Rejected" },
  ]);
  const [filter, setFilter] = useState("Semua");

  useEffect(() => {
    // Wait for the router.query.classId to be available
    if (router.query.classId) {
      setClassId(router.query.classId);  // Set the classId once query is available
    }
  }, [router.query.classId]);  // Trigger when router.query.classId changes

  // If classId is not available yet, show a loading message
  if (!classId) {
    return <div>Loading...</div>;  // Or any other loading state
  }

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const filteredApplicants = applicants.filter(
    (applicant) => filter === "Semua" || applicant.status === filter
  );

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
    <div>
      <h1>Class Details for {classId}</h1>
      <div className="class-info">
        <h2>Perancangan Perangkat Lunak</h2>
        <p>Dosen Pengampu: Bulan Bintang Galaksi</p>
        <p>Jadwal: Selasa, 13.30-15.20</p>
        <p>Asisten Dibutuhkan: 3 orang</p>
        <p>Total Pendaftar: {filteredApplicants.length}</p>
      </div>

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
  );
}
