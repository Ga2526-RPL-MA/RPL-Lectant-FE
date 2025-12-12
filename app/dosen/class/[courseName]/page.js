"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Head from "next/head";

export default function ClassDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const [jobStatus, setJobStatus] = useState("Seleksi Berlangsung");
  const [selectedApplicant, setSelectedApplicant] = useState(null);
  const [filter, setFilter] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");
  const [applicants, setApplicants] = useState([]);
  const [lowonganDetails, setLowonganDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Guard: kalau params belum siap
  const lowonganId = params?.courseName; // courseName is actually the lowongan ID from URL

  useEffect(() => {
    if (!lowonganId) return;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Get token from localStorage
        const token = localStorage.getItem('accessToken');

        if (!token) {
          router.push('/signin');
          return;
        }

        // Prepare headers with Authorization token
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        };

        // Fetch lowongan details
        const lowonganResponse = await fetch(
          `https://rpl-lectant-be.vercel.app/dosen/lowongan/${lowonganId}`,
          { headers }
        );

        if (lowonganResponse.status === 401 || lowonganResponse.status === 403) {
          localStorage.removeItem('accessToken');
          router.push('/signin');
          return;
        }

        if (!lowonganResponse.ok) throw new Error('Failed to fetch lowongan details');
        const lowonganData = await lowonganResponse.json();
        setLowonganDetails(lowonganData);

        // Fetch applicants list
        const applicantsResponse = await fetch(
          `https://rpl-lectant-be.vercel.app/dosen/lowongan/${lowonganId}/pendaftar`,
          { headers }
        );

        if (applicantsResponse.status === 401 || applicantsResponse.status === 403) {
          localStorage.removeItem('accessToken');
          router.push('/signin');
          return;
        }

        if (!applicantsResponse.ok) throw new Error('Failed to fetch applicants');
        const applicantsData = await applicantsResponse.json();

        // Map API response to component state
        const mappedApplicants = applicantsData.map(applicant => ({
          id: applicant.id,
          name: applicant.nama,
          status: applicant.status.charAt(0).toUpperCase() + applicant.status.slice(1), // Capitalize first letter
          nrp: applicant.nrp,
          semester: applicant.semester,
          phone: applicant.no_telp,
          appliedDate: applicant.tanggal_daftar,
        }));

        setApplicants(mappedApplicants);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [lowonganId, router]);

  if (!lowonganId) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard-container">Error: {error}</div>;
  }

  if (!lowonganDetails) {
    return <div className="dashboard-container">No data found</div>;
  }

  const handleProfileClick = () => {
    router.push("/dosen/profile");
  };
  const handleDashboardClick = () => {
    router.push("/dosen");
  }

  const openApplicant = async (applicant) => {
    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        router.push('/signin');
        return;
      }

      // Fetch detailed applicant data
      const response = await fetch(
        `https://rpl-lectant-be.vercel.app/dosen/lowongan/${lowonganId}/pendaftar/${applicant.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('accessToken');
        router.push('/signin');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch applicant details');
      }

      const result = await response.json();
      const detailedApplicant = result.data;

      // Map API response completely
      setSelectedApplicant({
        id: detailedApplicant.id,
        name: detailedApplicant.nama,
        nrp: detailedApplicant.nrp,
        jurusan: detailedApplicant.jurusan,
        semester: detailedApplicant.semester,
        email: detailedApplicant.email,
        phone: detailedApplicant.no_telp,
        motivation: detailedApplicant.motivasi || 'Tidak ada motivasi',
        pengalaman: detailedApplicant.pengalaman || [],
        dokumen: detailedApplicant.dokumen,
        appliedDate: detailedApplicant.tanggal_daftar,
        status: detailedApplicant.status.charAt(0).toUpperCase() + detailedApplicant.status.slice(1)
      });
    } catch (error) {
      console.error('Error fetching applicant details:', error);
      alert('Gagal memuat detail pelamar');
    }
  };

  const closeApplicant = () => {
    setSelectedApplicant(null);
  }

  const closeApplicantModal = () => {
    setSelectedApplicant(null);
  };

  const handleFinalizeClick = () => {
    setJobStatus("Lowongan Aktif");  // Finalizing the job
  };


  const filterTabs = [
    { id: "Semua", label: "Semua" },
    { id: "Pending", label: "Pending" },
    { id: "Accepted", label: "Diterima" },
    { id: "Rejected", label: "Ditolak" },
  ];

  const classDetails = {
    title: lowonganDetails.matkul,
    lecturer: lowonganDetails.dosen,
    schedule: lowonganDetails.jadwal,
    assistantsRequired: lowonganDetails.jumlah_asisten,
    totalApplicants: applicants.length,
    status: "Lowongan Aktif",
    location: lowonganDetails.lokasi,
    deadline: lowonganDetails.deadline_pendaftaran,
    requirements: lowonganDetails.persyaratan,
    jobDescription: `Asisten untuk mata kuliah ${lowonganDetails.matkul}`,
  };


  const handleFilterChange = (status) => setFilter(status);

  const filteredApplicants = applicants.filter((a) => {
    const matchStatus = filter === "Semua" || a.status === filter;
    const matchName = a.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchStatus && matchName;
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('accessToken');

      if (!token) {
        router.push('/signin');
        return;
      }

      // Map frontend status to backend status
      const statusMap = {
        'Accepted': 'accepted',
        'Rejected': 'rejected',
        'Pending': 'pending'
      };

      const backendStatus = statusMap[newStatus] || newStatus.toLowerCase();

      // Call API to update status
      const response = await fetch(
        `https://rpl-lectant-be.vercel.app/mahasiswa/lamaran/status/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            status_pendaftaran: backendStatus
          })
        }
      );

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('accessToken');
        router.push('/signin');
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update status');
      }

      const result = await response.json();
      console.log('Status updated:', result);

      // Update local state
      setApplicants((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
      );

      alert(result.message || `Status berhasil diubah menjadi ${newStatus}`);
    } catch (error) {
      console.error('Error updating status:', error);
      alert(`Gagal mengubah status: ${error.message}`);
    }
  };

  const totalAccepted = applicants.filter((a) => a.status === "Accepted").length;

  return (
    <div className="dashboard-container">
      <Head>
        <title>{classDetails.title}</title>
      </Head>

      {/* HEADER ATAS (PUTIH) */}
      <header className="dashboard-header">
        <img
          src="/images/RPL-LECTANT.png"
          alt="Logo"
          className="dashboard-logo"
        />
        <div className="dashboard-profile">
          <button className="profile-button" onClick={handleProfileClick}>
            BB
          </button>
        </div>
      </header>

      {/* HERO BIRU */}
      <div className="class-hero-card">
        <button className="hero-back-btn" onClick={() => router.push("/dosen")}>
          ← Kembali
        </button>

        <div className="class-hero-top">
          <div>
            <h1 className="class-hero-title">{classDetails.title}</h1>
            <span className="status">{classDetails.status}</span>
          </div>

          <div className="class-status">
            <button 
              className="finalize-button"
              onClick={handleFinalizeClick}
              disabled={jobStatus === "Lowongan Aktif"}
              >Finalisasi Seleksi
            </button>
            <button className="close-button" onClick={handleDashboardClick}>Tutup Lowongan</button>
          </div>
        </div>

        {/* 4 KARTU INFO DI DALAM HERO */}
        <div className="class-hero-info-row">
          <div className="class-hero-info-card">
            <p className="class-hero-info-label">Dosen Pengampu</p>
            <p className="class-hero-info-value">{classDetails.lecturer}</p>
          </div>
          <div className="class-hero-info-card">
            <p className="class-hero-info-label">Jadwal</p>
            <p className="class-hero-info-value">{classDetails.schedule}</p>
          </div>
          <div className="class-hero-info-card">
            <p className="class-hero-info-label">Asisten Dibutuhkan</p>
            <p className="class-hero-info-value">
              {classDetails.assistantsRequired} orang
            </p>
          </div>
          <div className="class-hero-info-card">
            <p className="class-hero-info-label">Total Pelamar</p>
            <p className="class-hero-info-value">
              {classDetails.totalApplicants} pendaftar
            </p>
          </div>
        </div>
      </div>

      {/* KONTEN BAWAH */}
      <div className="class-details-container">
        <div className="applicants-header-row">
          <div className="job-description">
            <h3>Daftar Pelamar</h3>
          </div>

          <div className="applicants-meta">
            <span className="status applicants-badge">
              Total: {classDetails.totalApplicants}
            </span>
            <span className="status applicants-badge accepted">
              Diterima: {totalAccepted}/{classDetails.assistantsRequired}
            </span>
          </div>
        </div>

        <div className="applicants-list">
          {selectedApplicant && (
          <div className="applicant-modal-backdrop" onClick={closeApplicantModal}>
            <div
              className="applicant-modal"
              onClick={(e) => e.stopPropagation()} 
            >
              {/* HEADER MODAL */}
              <div className="applicant-modal-header">
                <div className="applicant-modal-header-left">
                  <div className="applicant-avatar-circle large" />
                  <div>
                    <p className="applicant-name">{selectedApplicant.name}</p>
                    <p className="applicant-subtext">
                      {selectedApplicant.nrp} • {selectedApplicant.jurusan || 'Teknik Informatika'}
                    </p>
                  </div>
                </div>

                <div className="applicant-modal-header-right">
                  <span
                    className={`status-badge ${
                      selectedApplicant.status === "Accepted"
                        ? "status-accepted"
                        : selectedApplicant.status === "Rejected"
                        ? "status-rejected"
                        : "status-pending"
                    }`}
                  >
                    {selectedApplicant.status === "Accepted"
                      ? "Diterima"
                      : selectedApplicant.status === "Rejected"
                      ? "Ditolak"
                      : "Menunggu"}
                  </span>
                  <button className="modal-close-btn" onClick={closeApplicantModal}>
                    ✕
                  </button>
                </div>
              </div>

              {/* GRID SEMESTER / MENDAFTAR */}
              <div className="applicant-summary-grid">
                <div className="summary-box">
                  <span className="summary-label">Semester</span>
                  <span className="summary-value">{selectedApplicant.semester}</span>
                </div>
                <div className="summary-box">
                  <span className="summary-label">Mendaftar</span>
                  <span className="summary-value">
                    {selectedApplicant.appliedDate}
                  </span>
                </div>
              </div>

              {/* INFORMASI KONTAK */}
              <div className="applicant-section">
                <p className="section-title">Informasi Kontak</p>
                <p className="section-text">{selectedApplicant.email}</p>
                <p className="section-text">{selectedApplicant.phone}</p>
              </div>

              {/* MOTIVASI */}
              <div className="applicant-section">
                <p className="section-title">Motivasi</p>
                <p className="section-text">{selectedApplicant.motivation}</p>
              </div>

              {/* PENGALAMAN */}
              {selectedApplicant.pengalaman && selectedApplicant.pengalaman.length > 0 && (
                <div className="applicant-section">
                  <p className="section-title">Pengalaman</p>
                  {selectedApplicant.pengalaman.map((exp, index) => (
                    <div key={index} className="section-text">
                      <p><strong>{exp.posisi || exp.title}</strong></p>
                      <p>{exp.organisasi || exp.company} • {exp.tahun || exp.year}</p>
                      {exp.deskripsi && <p>{exp.deskripsi}</p>}
                    </div>
                  ))}
                </div>
              )}

              {/* DOKUMEN */}
              {selectedApplicant.dokumen && (
                <div className="applicant-section">
                  <p className="section-title">Dokumen Pendukung</p>
                  <a
                    href={selectedApplicant.dokumen}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="section-text"
                    style={{ color: '#007bff', textDecoration: 'underline', cursor: 'pointer' }}
                  >
                    Lihat Dokumen
                  </a>
                  {selectedApplicant.dokumen.match(/\.(jpg|jpeg|png|gif)$/i) && (
                    <div style={{ marginTop: '10px' }}>
                      <img
                        src={selectedApplicant.dokumen}
                        alt="Dokumen"
                        style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* ACTION BUTTONS BAWAH */}
              <div className="applicant-modal-actions">
                <button
                  className="btn-warning-outline"
                  onClick={() => {
                    handleStatusChange(selectedApplicant.id, "Pending");
                    closeApplicantModal();
                  }}
                >
                  Kembalikan ke Menunggu
                </button>
                <button
                  className="btn-danger-solid"
                  onClick={() => {
                    handleStatusChange(selectedApplicant.id, "Rejected");
                    closeApplicantModal();
                  }}
                >
                  Ubah ke Ditolak
                </button>
              </div>
            </div>
          </div>
        )}

          <div className="applicants-controls">
            <div className="tabs-container-applicants">
              {filterTabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-button ${
                    filter === tab.id ? "active" : ""
                  }`}
                  onClick={() => handleFilterChange(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="applicants-search-row">
              <input
                type="text"
                className="search-input"
                placeholder="Cari pelamar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* ISI LIST / EMPTY STATE */}
          {filteredApplicants.length === 0 ? (
            <div className="no-applicants">
              <p>Belum ada pelamar yang diterima</p>
            </div>
          ) : (
            filteredApplicants.map((a) => (
              <div key={a.id} className="applicant-card-row">
                {/* KIRI: NAMA + INFO SINGKAT */}
                <div className="applicant-main">
                  <div className="applicant-avatar-circle" />

                  <div className="applicant-text">
                    <p className="applicant-name">{a.name}</p>
                    <p className="applicant-subtext">{a.nrp}</p>
                    <p className="applicant-subtext">
                      Semester {a.semester}
                    </p>
                     <button
                      className="applicant-view-btn"
                      onClick={() => openApplicant(a)}
                    >
                      View Details
                    </button>
                  </div>
                </div>

                {/* KANAN: STATUS BADGE + TOMBOL AKSI */}
                <div className="applicant-right">
                  <span
                    className={`status-badge ${
                      a.status === "Accepted"
                        ? "status-accepted"
                        : a.status === "Rejected"
                        ? "status-rejected"
                        : "status-pending"
                    }`}
                  >
                    {a.status === "Accepted"
                      ? "Diterima"
                      : a.status === "Rejected"
                      ? "Ditolak"
                      : "Menunggu"}
                  </span>

                  <div className="applicant-actions-inline">
                    <button
                      className="btn-accept-small"
                      onClick={() => handleStatusChange(a.id, "Accepted")}
                    >
                      Terima
                    </button>
                    <button
                      className="btn-reject-small"
                      onClick={() => handleStatusChange(a.id, "Rejected")}
                    >
                      Tolak
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
