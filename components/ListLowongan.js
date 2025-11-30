"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateLowongan({ onSubmit }) {
  const [form, setForm] = useState({
    mataKuliah: "",
    kelas: "",
    tahunAjaran: "",
    persyaratan: "",
    jumlahAsisten: "",
    honor: "",
    periodeDaftarMulai: "",
    periodeDaftarSelesai: "",
    kontrakMulai: "",
    kontrakSelesai: "",
  });

  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

 const handleSubmit = (e) => {
    e.preventDefault();
    const courseName = form.mataKuliah.toLowerCase().replace(/\s+/g, "-");
    router.push(`/dosen/class/${courseName}`);
    if (onSubmit) {
      onSubmit(form); 
    }
  };

  return (
    <div className="create-page">
      {/* Header */}
      <div className="dashboard-header">
        <img
          src="/images/RPL-LECTANT.png"
          alt="Logo"
          className="dashboard-logo"
        />
      </div>

      {/* Back Button */}
      <div className="forgot-text" >
         <a href="/dosen" className="create-back-link">
          ← Back to Dashboard 
        </a>
      </div>

      {/* Main Content Layout */}
      <div className="create-layout">
        {/* Left section (form) */}
        <div className="create-form-card">
          <h1 className="create-title">Create Lowongan Asisten Dosen</h1>
          <p className="create-subtitle">
            Isi detail kelas dan lowongan yang ingin Anda buka.
          </p>

          <form onSubmit={handleSubmit}>
            {/* Mata Kuliah */}
            <div className="form-group">
              <label className="form-label">
                Mata Kuliah<span className="form-required">*</span>
              </label>
              <select
                name="mataKuliah"
                value={form.mataKuliah}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Pilih mata kuliah</option>
                <option value="Perancangan Perangkat Lunak">
                  Perancangan Perangkat Lunak
                </option>
                <option value="Pemrograman Berorientasi Objek">
                  Pemrograman Berorientasi Objek
                </option>
              </select>
            </div>

            {/* Kelas */}
            <div className="form-group">
              <label className="form-label">
                Kelas<span className="form-required">*</span>
              </label>
              <select
                name="kelas"
                value={form.kelas}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Pilih kelas</option>
                <option value="A">Kelas A</option>
                <option value="B">Kelas B</option>
              </select>
            </div>

            {/* Tahun Ajaran */}
            <div className="form-group">
              <label className="form-label">
                Tahun Ajaran<span className="form-required">*</span>
              </label>
              <select
                name="tahunAjaran"
                value={form.tahunAjaran}
                onChange={handleChange}
                className="form-input"
                required
              >
                <option value="">Pilih tahun ajaran</option>
                <option value="2024/2025">2024/2025</option>
                <option value="2025/2026">2025/2026</option>
              </select>
            </div>

            {/* Persyaratan */}
            <div className="form-group">
              <label className="form-label">
                Persyaratan<span className="form-required">*</span>
              </label>
              <textarea
                name="persyaratan"
                value={form.persyaratan}
                onChange={handleChange}
                className="form-textarea"
                rows={4}
                placeholder="Contoh: IPK minimal 3,5, telah lulus mata kuliah ini dengan nilai minimal A..."
                required
              />
            </div>

            {/* Jumlah Asisten & Honor */}
            <div className="form-row">
              <div className="form-col">
                <label className="form-label">Jumlah Asisten Dibutuhkan</label>
                <input
                  type="number"
                  name="jumlahAsisten"
                  value={form.jumlahAsisten}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Masukkan jumlah asisten"
                  min="1"
                />
              </div>
              <div className="form-col">
                <label className="form-label">Honor</label>
                <input
                  type="text"
                  name="honor"
                  value={form.honor}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Masukkan honor yang akan diberikan"
                />
              </div>
            </div>

            {/* Periode Pendaftaran */}
            <div className="form-group">
              <label className="form-label">Periode Pendaftaran</label>
              <div className="form-row">
                <div className="form-col">
                  <input
                    type="date"
                    name="periodeDaftarMulai"
                    value={form.periodeDaftarMulai}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-col">
                  <input
                    type="date"
                    name="periodeDaftarSelesai"
                    value={form.periodeDaftarSelesai}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            {/* Periode Kontrak */}
            <div className="form-group">
              <label className="form-label">Periode Kontrak</label>
              <div className="form-row">
                <div className="form-col">
                  <input
                    type="date"
                    name="kontrakMulai"
                    value={form.kontrakMulai}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-col">
                  <input
                    type="date"
                    name="kontrakSelesai"
                    value={form.kontrakSelesai}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button type="button" className="btn-secondary" onClick={() => {}}>
                Cancel
              </button>
              <button type="submit" className="btn-primary">
                Create Lowongan
              </button>
            </div>
          </form>
        </div>

        {/* Right Guide Panel */}
        <div className="create-guide-card">
          <h3 className="guide-title">Panduan Pengisian</h3>
          <ul className="guide-list">
            <li>Pastikan semua data sudah benar sebelum mengirim lowongan.</li>
            <li>Periode pendaftaran harus sebelum periode kontrak dimulai.</li>
            <li>Jelaskan persyaratan dengan detail untuk menarik kandidat terbaik.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
