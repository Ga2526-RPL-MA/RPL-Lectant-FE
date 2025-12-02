"use client";

import React, { useState } from "react";

const FormLamar = ({ job, closeModal }) => {
  const [motivation, setMotivation] = useState("");
  const [transcript, setTranscript] = useState(null);

  // Handle application form submission
  const handleSubmitApplication = (e) => {
    e.preventDefault();
    alert("Lamaran telah terkirim!");
    setMotivation("");  // Reset the form
    setTranscript(null); // Reset the transcript file
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

          <div className="form-group">
            <label htmlFor="transcript">Transkrip Nilai *</label>
            <input
              type="file"
              id="transcript"
              onChange={(e) => setTranscript(e.target.files[0])}
              accept="application/pdf"
              required
            />
            {transcript && (
              <div className="file-preview">
                <span>{transcript.name}</span>
                <button
                  type="button"
                  onClick={() => setTranscript(null)}
                  className="remove-file"
                >
                  X
                </button>
              </div>
            )}
            <small>Pastikan dokumen yang Anda upload dapat dibaca dengan jelas.</small>
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
