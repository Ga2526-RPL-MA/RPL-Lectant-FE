import React from "react";

export default function DashboardTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { id: "kelasAndaBuka", label: "Kelas yang Anda Buka" },
    { id: "kelasYangDibuka", label: "Kelas yang Dibuka" },
    { id: "daftarKelas", label: "Daftar Kelas" },
  ];

  return (
    <div className="tabs-container">
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
  );
}
