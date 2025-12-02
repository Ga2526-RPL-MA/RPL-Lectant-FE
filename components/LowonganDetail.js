"use client";

import React from "react";

const LowonganDetail = ({ job, closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="lowongan-detail-container">
        <div className="job-header">
          <h1>{job.title}</h1>
          <span className="status-badge">Buka</span> {/* Customize this if needed */}
        </div>

        <div className="job-info">
          <div className="info-item">
            <label>Dosen Pengampu</label>
            <p>{job.lecturer}</p>
          </div>
          <div className="info-item">
            <label>Jadwal</label>
            <p>{job.schedule}</p>
          </div>
          <div className="info-item">
            <label>Lokasi</label>
            <p>{job.location}</p>
          </div>
          <div className="info-item">
            <label>Deadline Pendaftaran</label>
            <p>{job.deadline}</p>
          </div>
          <div className="info-item">
            <label>Persyaratan</label>
            <p>{job.requirements}</p>
          </div>
        </div>

        <div className="deadline-warning">
          <p>Segera daftarkan diri Anda sebelum batas waktu berakhir.</p>
        </div>

        <div className="job-footer">
          <button className="btn-lamar" onClick={closeModal}>
            Tutup
          </button>
          <button className="btn-lamar">Lamar Sekarang</button>
        </div>
      </div>
    </div>
  );
};

export default LowonganDetail;
