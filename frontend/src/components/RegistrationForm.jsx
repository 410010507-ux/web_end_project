import React, { useEffect, useState } from "react";

export default function RegistrationForm({ disabled, onSubmit, hint = "" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    note: "",
  });

  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setErrors([]);
  }, [disabled]);

  const onChange = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const validate = () => {
    const next = [];
    if (!form.name.trim()) next.push("name is required");
    if (!form.email.trim()) next.push("email is required");
    setErrors(next);
    return next.length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (disabled) return;
    if (!validate()) return;

    await onSubmit?.({
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      note: form.note.trim(),
    });

    // 成功後清空
    setForm({ name: "", email: "", phone: "", note: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {hint ? (
        <div className="hint" style={{ marginBottom: 10 }}>
          {hint}
        </div>
      ) : null}

      {errors.length > 0 ? (
        <div className="hint" style={{ marginBottom: 10 }}>
          {errors.join(" / ")}
        </div>
      ) : null}

      <div className="field">
        <label>姓名 *</label>
        <input
          value={form.name}
          onChange={onChange("name")}
          placeholder="例如：王小明"
          disabled={disabled}
        />
      </div>

      <div className="field">
        <label>Email *</label>
        <input
          value={form.email}
          onChange={onChange("email")}
          placeholder="test@example.com"
          disabled={disabled}
        />
      </div>

      <div className="field">
        <label>電話</label>
        <input
          value={form.phone}
          onChange={onChange("phone")}
          placeholder="0912345678"
          disabled={disabled}
        />
      </div>

      <div className="field">
        <label>備註</label>
        <input
          value={form.note}
          onChange={onChange("note")}
          placeholder="想坐前排"
          disabled={disabled}
        />
      </div>

      <button className="btn btnPrimary" type="submit" disabled={disabled}>
        送出報名
      </button>
    </form>
  );
}
