import React, { createContext, useContext, useMemo, useState } from "react";

const ToastCtx = createContext(null);

export function ToastProvider({ children }) {
  const [items, setItems] = useState([]);

  const api = useMemo(() => ({
    push: (title, message) => {
      const id = crypto.randomUUID?.() || String(Date.now());
      setItems((prev) => [...prev, { id, title, message }]);
      setTimeout(() => {
        setItems((prev) => prev.filter((x) => x.id !== id));
      }, 2600);
    },
  }), []);

  return (
    <ToastCtx.Provider value={api}>
      {children}
      <div className="toastHost">
        {items.map((t) => (
          <div className="toast" key={t.id}>
            <div className="toastRow">
              <div>
                <p className="toastTitle">{t.title}</p>
                <p className="toastMsg">{t.message}</p>
              </div>
              <button className="btn btnGhost" onClick={() => setItems((p) => p.filter((x) => x.id !== t.id))}>
                Close
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

export function useToast() {
  const v = useContext(ToastCtx);
  if (!v) throw new Error("ToastProvider missing");
  return v;
}
