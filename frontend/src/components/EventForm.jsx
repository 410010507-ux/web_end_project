import React, { useMemo, useState } from "react";

function toDatetimeLocal(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n) => String(n).padStart(2, "0");
  const yyyy = d.getFullYear();
  const mm = pad(d.getMonth() + 1);
  const dd = pad(d.getDate());
  const hh = pad(d.getHours());
  const mi = pad(d.getMinutes());
  return `${yyyy}-${mm}-${dd}T${hh}:${mi}`;
}

export default function EventForm({ initial, onSubmit, submitting }) {
  const defaults = useMemo(() => ({
    title: "",
    description: "",
    date: "",
    location: "",
    quota: 30,
    status: "published",
  }), []);

  const [form, setForm] = useState(() => {
    const src = initial || defaults;
    return {
      title: src.title || "",
      description: src.description || "",
      date: toDatetimeLocal(src.date) || "",
      location: src.location || "",
      quota: Number(src.quota ?? 30),
      status: src.status || "published",
    };
  });

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      quota: Number(form.quota),
      date: form.date ? new Date(form.date).toISOString() : null,
    };
    onSubmit?.(payload);
  };

  return (
    <form onSubmit={handleSubmit} className="grid" style={{ gap: 14 }}>
      <div className="grid grid2">
        <div>
          <label className="label">活動標題</label>
          <input className="input" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="例如：迎新說明會" />
        </div>
        <div>
          <label className="label">狀態</label>
          <select className="select" value={form.status} onChange={(e) => set("status", e.target.value)}>
            <option value="published">published（可報名）</option>
            <option value="closed">closed（停止報名）</option>
          </select>
        </div>
      </div>

      <div>
        <label className="label">活動描述</label>
        <textarea className="textarea" value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="活動內容、流程、注意事項..." />
      </div>

      <div className="grid grid2">
        <div>
          <label className="label">時間</label>
          <input className="input" type="datetime-local" value={form.date} onChange={(e) => set("date", e.target.value)} />
          <div className="helper">會轉成 ISO 存入資料庫</div>
        </div>
        <div>
          <label className="label">地點</label>
          <input className="input" value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="例如：商館B1" />
        </div>
      </div>

      <div className="grid grid2">
        <div>
          <label className="label">名額（quota）</label>
          <input className="input" type="number" min="1" value={form.quota} onChange={(e) => set("quota", e.target.value)} />
        </div>
        <div className="row" style={{ justifyContent: "flex-end", marginTop: 18 }}>
          <button className="btn btnPrimary" disabled={submitting} type="submit">
            {submitting ? "Submitting..." : "儲存"}
          </button>
        </div>
      </div>
    </form>
  );
}
