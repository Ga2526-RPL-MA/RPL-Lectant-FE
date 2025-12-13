"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Head from "next/head";
import link from "next/link";
import ListLowongan from "../../components/ListLowongan";

export default function DosenDashboard() {
  const router = useRouter();
  const [mode, setMode] = useState("list");
  const [classes, setClasses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("kelasAndaBuka");
  const [activeClass, setActiveClass] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  // Fetch data when tab changes
  useEffect(() => {
    fetchLowonganData();
  }, [activeTab]);

  const fetchLowonganData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const token = localStorage.getItem('accessToken');
      if (!token) {
        router.push('/signin');
        return;
      }

      // Determine endpoint based on active tab
      let endpoint = '';
      if (activeTab === 'kelasAndaBuka') {
        endpoint = 'https://rpl-lectant-be.vercel.app/dosen/lowongan/my-lowongan';
      } else if (activeTab === 'kelasYangDibuka') {
        endpoint = 'https://rpl-lectant-be.vercel.app/dosen/lowongan/aktif';
      } else if (activeTab === 'daftarKelas') {
        endpoint = 'https://rpl-lectant-be.vercel.app/dosen/lowongan/all';
      }

      const response = await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('accessToken');
        router.push('/signin');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch lowongan data');
      }

      const data = await response.json();

      // Map API response to component state
      const mappedClasses = data.map(lowongan => ({
        id: lowongan.id_lowongan,
        title: lowongan.matkul,
        lecturer: lowongan.dosen,
        schedule: lowongan.jadwal,
        applicants: `${lowongan.jumlah_asisten} asisten`,
        status: lowongan.status === 'aktif' ? 'Active' : 'Closed',
        deadline: lowongan.deadline_pendaftaran,
        lokasi: lowongan.lokasi
      }));

      setClasses(mappedClasses);
    } catch (err) {
      console.error('Error fetching lowongan:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: "kelasAndaBuka", label: "Kelas yang Anda Buka", },
    { id: "kelasYangDibuka", label: "Kelas yang Dibuka" },
    { id: "daftarKelas", label: "Daftar Kelas" },
  ];

  const handleCreateClick = () => {
    setMode("create");
  };

  const handleProfileClick = () => {
    router.push("/dosen/profile");
  };

  const handleDashboardClick = () => {
    router.push("/dosen"); 
  };

  const handleSubmitCreate = (form) => {
    const courseName = form.matkul.toLowerCase().replace(/\s+/g, "-");
    const newClass = {
      id: Date.now(),
      title: form.mataKuliah,
      lecturer: "Bulan Bintang Galaksi",
      schedule: `Kelas ${form.kelas} • ${form.tahunAjaran}`,
      applicants: "0 pelamar",
      status: "Active",
    };

    setClasses((prevClasses) => [...prevClasses, newClass]);
    setMode("list");
    router.push("/dosen");
  };

  const handleCancelCreate = () => {
    router.push("/dosen");  
  };

  const handleClassClick = (className) => {
    const courseName = className.toLowerCase().replace(/\s+/g, "-");
  router.push(`/dosen/class/${courseName}`);
  }

  return (
    <>
      <Head>
        <title>RPL Student - Dashboard</title>
      </Head>
      <div className="dashboard-container">


        {mode === "list" && (
          <>
          <div className="dashboard-header">
          <img
            src="/images/RPL-LECTANT.png"
            alt="Logo"
            className="dashboard-logo"
          />
          <div className="dashboard-profile">
            <button className="auth-button-dosen" onClick={handleCreateClick}>
              + Create
            </button>
            <button className="profile-button" onClick={handleProfileClick}>
              BB 
            </button>
          </div>
        </div>
        
            {/* Tabs */}
            <div className="tabs-wrapper">
              <div className="tabs-container">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => handleTabClick(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="dashboard-controls">
              <input
                type="text"
                className="search-input"
                placeholder="Search courses or instructors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="filter-btn">All Status ▾</button>
            </div>
            <div className="class-list">
              {classes.length === 0 ? (
                <div className="no-courses-found">
                  <img src="/images/BOOK.png" alt="Book" className="book-icon" />
                  <p>No courses found</p>
                  <p>Try adjusting your search or filters</p>
                </div>
              ) : (
                classes.map((kelas) => (
                  <div
                    key={kelas.id}
                    className="class-card"
                    onClick={() => router.push(`/dosen/class/${kelas.id}`)} 
                  >
                    <div className="card-header">
                      <span className="status">{kelas.status}</span>
                    </div>
                    <div className="card-body">
                      <h4>{kelas.title}</h4>
                      <p>{kelas.schedule}</p>
                      <p>{kelas.applicants}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {mode === "create" && (
          <ListLowongan onSubmit={handleSubmitCreate} />
        )}
      </div>
    </>
  );
}
