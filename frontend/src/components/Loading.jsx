import React from "react";

export default function Loading({ text = "Loading..." }) {
  return (
    <div className="row" style={{ padding: 12 }}>
      <div className="spinner" />
      <div style={{ color: "var(--muted)", fontSize: 13 }}>{text}</div>
    </div>
  );
}
