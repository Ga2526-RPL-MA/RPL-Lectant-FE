import React from "react";

export default function ClassCard({ data }) {
  return (
    <div className="class-card">
      <div className="card-header">
        <span className="status">{data.status}</span>
      </div>
      <div className="card-body">
        <h3>{data.namaKelas}</h3>
        <p>Dosen Pengampu: {data.dosen}</p>
        <p>🕒 {data.jadwal}</p>
        <p>👥 {data.kuota}</p>
      </div>
    </div>
  );
}
