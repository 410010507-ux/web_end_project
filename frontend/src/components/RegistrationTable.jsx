import React from "react";

function StatusBadge({ status }) {
  if (status === "registered") return <span className="badge badgeSuccess">registered</span>;
  if (status === "cancelled") return <span className="badge badgeDanger">cancelled</span>;
  return <span className="badge">{status}</span>;
}

export default function RegistrationTable({ items, onCancel, onDelete }) {
  return (
    <div className="tableWrap">
      <table>
        <thead>
          <tr>
            <th>姓名</th>
            <th>Email</th>
            <th>電話</th>
            <th>備註</th>
            <th>狀態</th>
            <th style={{ width: 220 }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {items.map((r) => (
            <tr key={r._id}>
              <td>{r.name}</td>
              <td>{r.email}</td>
              <td>{r.phone || "-"}</td>
              <td style={{ color: "var(--muted)" }}>{r.note || "-"}</td>
              <td><StatusBadge status={r.status} /></td>
              <td>
                <div className="row">
                  <button className="btn" onClick={() => onCancel?.(r)} disabled={r.status === "cancelled"}>
                    取消
                  </button>
                  <button className="btn btnDanger" onClick={() => onDelete?.(r)}>
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr>
              <td colSpan="6" style={{ color: "var(--muted)" }}>目前沒有報名資料</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
