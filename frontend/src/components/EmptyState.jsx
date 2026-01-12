import React from "react";

export default function EmptyState({ title = "目前沒有資料", desc = "請先新增一筆資料再回來。" }) {
  return (
    <div className="card">
      <div className="cardBody">
        <div style={{ fontWeight: 800, marginBottom: 6 }}>{title}</div>
        <div style={{ color: "var(--muted)", fontSize: 13 }}>{desc}</div>
      </div>
    </div>
  );
}
