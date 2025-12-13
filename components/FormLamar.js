"use client";

import React, { useState } from "react";

const FormLamar = ({ job, closeModal }) => {
  const [motivation, setMotivation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitApplication = async (e) => {
    e.preventDefault();


    try {
      setLoading(true);

      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Silakan login ulang");

      const response = await fetch(
        `https://rpl-lectant-be.vercel.app/mahasiswa/lamaran/${job.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            motivasi: motivation,
          }),
        }
      );

      const result = await response.json();
      if (!response.ok) throw new Error(result.message);

      setMotivation("");
      closeModal();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Lamar Posisi Asisten Dosen</h2>
        <p>
          <strong>{job.title}</strong>
        </p>
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
          </div>

          <div className="info-box">
            <small>
              Transkrip nilai akan diambil otomatis dari profil mahasiswa.
              Pastikan transkrip Anda sudah di-upload di halaman profil.
            </small>
          </div>

          <div className="form-footer">
            <button
              type="button"
              onClick={closeModal}
              className="cancel-btn"
              disabled={loading}
            >
              Batal
            </button>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Mengirim..." : "Kirim Lamaran"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormLamar;
