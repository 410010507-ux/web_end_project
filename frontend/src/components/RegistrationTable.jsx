import React from "react";

function StatusBadge({ status }) {
  const cls =
    status === "registered"
      ? "badge badgeSuccess"
      : status === "cancelled"
      ? "badge badgeDanger"
      : "badge";
  return <span className={cls}>{status}</span>;
}

export default function RegistrationTable({ items, onUpdate, onDelete }) {
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
            <th style={{ width: 240 }}>操作</th>
          </tr>
        </thead>

        <tbody>
          {items.map((r) => (
            <tr key={r._id}>
              <td style={{ fontWeight: 700 }}>{r.name}</td>
              <td style={{ color: "var(--muted)" }}>{r.email}</td>
              <td>{r.phone || "-"}</td>
              <td>{r.note || "-"}</td>
              <td>
                <StatusBadge status={r.status} />
              </td>
              <td>
                <div className="row">
                  {r.status === "registered" ? (
                    <button
                      className="btn"
                      onClick={() => onUpdate?.(r._id, { status: "cancelled", note: r.note || "" })}
                    >
                      取消
                    </button>
                  ) : (
                    <button
                      className="btn"
                      onClick={() => onUpdate?.(r._id, { status: "registered", note: r.note || "" })}
                    >
                      恢復
                    </button>
                  )}

                  <button className="btn btnDanger" onClick={() => onDelete?.(r._id)}>
                    刪除
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
