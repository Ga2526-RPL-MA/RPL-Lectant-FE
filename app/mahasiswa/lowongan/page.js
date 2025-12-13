"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import JobCard from "../../../components/JobCard";

export default function LowonganMahasiswa() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("Lowongan Tersedia");
  const [searchQuery, setSearchQuery] = useState("");

  const [lowongan, setLowongan] = useState([]);
  const [lamaran, setLamaran] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =========================
      FETCH LOWONGAN TERSEDIA
    ========================= */
  useEffect(() => {
    if (activeTab === "Lowongan Tersedia") {
      fetchLowongan();
    }
  }, [activeTab]);

  const fetchLowongan = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token tidak ditemukan");

      const response = await fetch(
        "https://rpl-lectant-be.vercel.app/dosen/lowongan/all",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);

      const data = await response.json();

      const transformedData = data.map((item) => ({
        id: item.id_lowongan,
        title: item.matkul,
        lecturer: item.dosen,
        courseName: item.matkul,
        status: item.status === "aktif" ? "Lowongan Aktif" : "Draft",
        schedule: item.jadwal,
        location: item.lokasi,
        deadline: item.deadline_pendaftaran,
        requirements: item.persyaratan,
        kelas: item.nama_kelas,
        kode_mk: item.kode_mk,
        jumlah_asisten: item.jumlah_asisten,
        honor: formatCurrency(item.honor),
        jam_mulai: item.jam_mulai,
        jam_selesai: item.jam_selesai,
        hari: item.hari,
      }));

      setLowongan(transformedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
      FETCH LAMARAN SAYA
    ========================= */
  useEffect(() => {
    if (activeTab === "Lamaran Saya") {
      fetchLamaranSaya();
    }
  }, [activeTab]);

  const fetchLamaranSaya = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token tidak ditemukan");

      const res = await fetch(
        "https://rpl-lectant-be.vercel.app/mahasiswa/lamaran/lamaran-saya",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const result = await res.json();

      const transformedLamaran = result.data.map((item, index) => ({
        id: index,
        title: item.matkul,
        lecturer: item.dosen,
        dateApplied: item.tanggal_melamar,
        status: item.status, // accepted / rejected / pending
        messageStatus: item.message_status,
      }));

      setLamaran(transformedLamaran);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
      UTIL
    ========================= */
  const formatCurrency = (amount) => {
    if (!amount) return "-";
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleProfileClick = () => router.push("/mahasiswa/profile");

  const tabs = [
    { id: "Lowongan Tersedia", label: "Lowongan Tersedia" },
    { id: "Lamaran Saya", label: "Lamaran Saya" },
  ];

  const dataAktif = activeTab === "Lowongan Tersedia" ? lowongan : lamaran;

  const filteredJobs = dataAktif.filter(
    (job) =>
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.lecturer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  /* =========================
      RENDER
    ========================= */
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <img
          src="/images/RPL-LECTANT.png"
          alt="Logo"
          className="dashboard-logo"
        />
        <div className="dashboard-profile">
          <button className="profile-button" onClick={handleProfileClick}>
            MH
          </button>
        </div>
      </header>

      <div className="tabs-wrapper-mahasiswa">
        <div className="tabs-top-row">
          <div className="tabs-container-lowongan">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <p className="tabs-description">
            {activeTab === "Lowongan Tersedia" &&
              `Menampilkan ${filteredJobs.length} lowongan tersedia`}
            {activeTab === "Lamaran Saya" &&
              `Menampilkan ${filteredJobs.length} lamaran Anda`}
          </p>
        </div>

        <input
          type="text"
          className="search-input-mahasiswa"
          placeholder="Cari mata kuliah atau dosen..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {loading && (
        <div className="job-cards-container">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="skeleton-card"></div>
          ))}
        </div>
      )}

      {error && (
        <div className="text-center p-8">
          <p className="text-red-600 mb-4">Error: {error}</p>
        </div>
      )}

      {!loading && !error && (
        <div className="job-cards-container">
          {filteredJobs.length === 0 ? (
            <p className="text-center text-gray-600 p-8">
              Tidak ada data yang ditampilkan.
            </p>
          ) : (
            filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={{
                  ...job,
                  statusBadge:
                    job.status === "accepted"
                      ? "bg-green-100 text-green-800"
                      : job.status === "rejected"
                      ? "bg-red-100 text-red-800"
                      : "bg-yellow-100 text-yellow-800",
                  statusText:
                    job.status === "accepted"
                      ? "Diterima"
                      : job.status === "rejected"
                      ? "Ditolak"
                      : "Pending",
                }}
                isLamaran={activeTab === "Lamaran Saya"}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
