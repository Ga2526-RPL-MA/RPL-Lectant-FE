"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateLowongan({ onSubmit }) {
  const [kelasData, setKelasData] = useState([]);
  const [matkulData, setMatkulData] = useState([]);
  const [selectedMatkul, setSelectedMatkul] = useState();
  const [form, setForm] = useState({
    id_dosen: "",
    matkul:  "",
    kelas: "",
    tahun_ajaran: "",
    jumlah_asisten: "",
    honor: "",
    mulai_lowongan: "",
    akhir_lowongan: "",
    mulai_kontrak: "",
    akhir_kontrak: "",
    persyaratan: "",
  });
  
  console.log(form);
  useEffect(() => {
    const fetchDataMatkul = async () => {
      const data = await fetch('https://rpl-lectant-be.vercel.app/kelas/mata-kuliah', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      });
      return data.json();
    }
    fetchDataMatkul().then((data) => setMatkulData(data));
  }, []);

  const router = useRouter();
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "matkul") {
      // Find the selected mata kuliah object based on the value
      const selected = matkulData.find((matkul) => matkul.nama_mk == value);
      setSelectedMatkul(selected); // Set the selected mata kuliah object
      setForm((prev) => ({ ...prev, [name]: value })); // Update the form state
    } else {
      setForm((prev) => ({ ...prev, [name]: value })); // Update other form fields
    }
  };


 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = {
        ...form,
        jumlah_asisten: Number(form.jumlah_asisten),
        honor: Number(form.honor),
      }

      const response = await fetch('https://rpl-lectant-be.vercel.app/dosen/lowongan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
        body: JSON.stringify(formData),
      });

      const id_dosen = localStorage.getItem('id_dosen');
      form.id_dosen = id_dosen;
      console.log(id_dosen);

      if (!response.ok) {
        throw new Error('Failed to create lowongan');
      }

      const result = await response.json();
      console.log('Lowongan created:', result);

      const courseName = selectedMatkul.id_mk.toLowerCase().replace(/\s+/g, "-");
      router.push(`/dosen/class/${courseName}`);
      router.refresh();
      if (onSubmit) {
        onSubmit(form); 
      }
    } catch (error) {
      console.error('Error creating lowongan:', error);
      // Optionally, show an alert or set an error state
      alert('Failed to create lowongan. Please try again.');
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
              name="matkul"
              value={form.matkul}
              onChange={handleChange}
              className="form-input"
              required
            >
              <option value="">Pilih mata kuliah</option>
              {matkulData.map((matkul) => (
                <option key={matkul.id_mk} value={matkul.nama_mk}>
                  {matkul.nama_mk}
                </option>
              ))}
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
                placeholder="Pilih kelas"
                className="form-input"
                required
              >
                <option value="">Pilih kelas</option>
                { selectedMatkul ? selectedMatkul.kelas.map((kelas) => (
                  <option key={kelas.id_kelas} value={kelas.nama_kelas}>
                    {kelas.nama_kelas}
                  </option>
                )) : (
                  <option value="">Pilih mata kuliah terlebih dahulu</option>
                )}
              </select>
            </div>

            {/* Tahun Ajaran */}
            <div className="form-group">
              <label className="form-label">
                Tahun Ajaran<span className="form-required">*</span>
              </label>
              <select
                name="tahun_ajaran"
                value={form.tahun_ajaran}
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
                  name="jumlah_asisten"
                  value={form.jumlah_asisten}
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
                    name="mulai_lowongan"
                    value={form.mulai_lowongan}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-col">
                  <input
                    type="date"
                    name="akhir_lowongan"
                    value={form.akhir_lowongan}
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
                    name="mulai_kontrak"
                    value={form.mulai_kontrak}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
                <div className="form-col">
                  <input
                    type="date"
                    name="akhir_kontrak"
                    value={form.akhir_kontrak}
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
