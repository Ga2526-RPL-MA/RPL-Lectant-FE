"use client";

import React, { useState } from "react";
import LowonganDetail from "../components/LowonganDetail";  // Correct the path to the LowonganDetail component
import FormLamar from "../components/FormLamar";  // Correct the path to the FormLamar component
 // Modal for application form

const JobCard = ({ job }) => {
  const [showDetailModal, setShowDetailModal] = useState(false); // Modal for job details
  const [showApplyModal, setShowApplyModal] = useState(false); // Modal for application form

  const handleViewDetail = () => {
    setShowDetailModal(true); // Show the job detail modal
  };

  const handleApply = () => {
    setShowApplyModal(true); // Show the application modal
  };

  const closeDetailModal = () => {
    setShowDetailModal(false); // Close the job detail modal
  };

  const closeApplyModal = () => {
    setShowApplyModal(false); // Close the application modal
  };

  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3>{job.title}</h3>
        <p>{job.lecturer}</p>
      </div>

      <div className="job-card-body">
        <p>Jadwal: {job.schedule}</p>
        <p>Lokasi: {job.location}</p>
        <p>Deadline: {job.deadline}</p>
        <p>Persyaratan: {job.requirements}</p>
      </div>

      <div className="job-card-footer">
        <button className="btn-detail" onClick={handleViewDetail}>
          Lihat Detail
        </button>
        <button className="job-card-button" onClick={handleApply}>
          Lamar Sekarang
        </button>
      </div>

      {/* Modal for Job Details (LowonganDetail) */}
      {showDetailModal && (
        <LowonganDetail job={job} closeModal={closeDetailModal} />
      )}

      {/* Modal for Job Application (JobApplyForm) */}
      {showApplyModal && (
        <FormLamar job={job} closeModal={closeApplyModal} />
      )}
    </div>
  );
};

export default JobCard;
