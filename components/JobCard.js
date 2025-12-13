"use client";

import React, { useState } from "react";
import LowonganDetail from "../components/LowonganDetail";
import FormLamar from "../components/FormLamar";

const JobCard = ({ job, isLamaran }) => {
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  const handleViewDetail = () => setShowDetailModal(true);
  const handleApply = () => setShowApplyModal(true);
  const closeDetailModal = () => setShowDetailModal(false);
  const closeApplyModal = () => setShowApplyModal(false);

  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3>{job.title}</h3>
        <p>{job.lecturer}</p>
      </div>

      <div className="job-card-body">
        {isLamaran ? (
          <>
            <p>Tanggal Melamar: {job.dateApplied}</p>
            <p>
              Status:{" "}
              <span className={`status-badge ${job.statusBadge}`}>
                {job.statusText}
              </span>
            </p>
            <p>Pesan: {job.messageStatus}</p>
          </>
        ) : (
          <>
            <p>Jadwal: {job.schedule}</p>
            <p>Lokasi: {job.location}</p>
            <p>Deadline: {job.deadline}</p>
            <p>Persyaratan: {job.requirements}</p>
          </>
        )}
      </div>

      {/* Hanya tampilkan tombol jika bukan lamaran */}
      {!isLamaran && (
        <div className="job-card-footer">
          <button className="btn-detail" onClick={handleViewDetail}>
            Lihat Detail
          </button>
          <button className="job-card-button" onClick={handleApply}>
            Lamar Sekarang
          </button>
        </div>
      )}

      {/* Modal hanya untuk lowongan, tidak untuk lamaran */}
      {showDetailModal && !isLamaran && (
        <LowonganDetail job={job} closeModal={closeDetailModal} />
      )}
      {showApplyModal && !isLamaran && (
        <FormLamar job={job} closeModal={closeApplyModal} />
      )}
    </div>
  );
};

export default JobCard;
