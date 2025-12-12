"use client";

import React, { useState } from "react";

const FormLamar = ({ job, closeModal }) => {
  const [motivation, setMotivation] = useState("");

  const [formData, setFormData] = useState({
    motivasi: "",
  });

  // Handle application form submission
  const handleSubmitApplication = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("accessToken");

    const bodyToSend = {
      motivasi: motivation,
    };
    
    try{
      const res = await fetch(`https://rpl-lectant-be.vercel.app/mahasiswa/lowongan/${job.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bodyToSend),
      });

      if (!res.ok) { 
        throw new Error("Failed to submit application");
      }
    } catch (error) {
      console.error("POST lamaran error:", err);
    }

    alert("Lamaran telah terkirim!");
    setMotivation("");  // Reset the form
    closeModal(); // Close the modal after submission
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Lamar Posisi Asisten Dosen</h2>
        <p><strong>{job.title}</strong></p>
        <p>{job.lecturer}</p>

        <form onSubmit={handleSubmitApplication}>
          <div className="form-group">
            <label htmlFor="motivation">Motivasi *</label>
            <textarea
              id="motivation"
              value={motivation}
              onChange={(e) => setMotivation(e.target.value)}
              placeholder="Tuliskan motivasi Anda untuk melamar"
              required
            />
            <small>Minimal 100 karakter</small>
          </div>

          <div className="form-footer">
            <button type="button" onClick={closeModal} className="cancel-btn">
              Batal
            </button>
            <button type="submit" className="submit-btn">
              Kirim Lamaran
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormLamar;
