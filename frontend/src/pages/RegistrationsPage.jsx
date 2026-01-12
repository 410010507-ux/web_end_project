import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RegistrationsAPI } from "../api/registrations.api";
import { getErrorMessage } from "../api/client";
import Loading from "../components/Loading";
import RegistrationTable from "../components/RegistrationTable";
import { useToast } from "../components/Toast";

export default function RegistrationsPage() {
  const { id } = useParams();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [regs, setRegs] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await RegistrationsAPI.listByEvent(id);
      setRegs(res.data?.data?.items || []);
    } catch (e) {
      toast.push("載入失敗", getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [id]);

  const cancelReg = async (r) => {
    try {
      await RegistrationsAPI.update(r._id, { status: "cancelled" });
      toast.push("已更新", "狀態已改為 cancelled");
      await load();
    } catch (e) {
      toast.push("更新失敗", getErrorMessage(e));
    }
  };

  const deleteReg = async (r) => {
    if (!confirm("確定要刪除這筆報名？")) return;
    try {
      await RegistrationsAPI.remove(r._id);
      toast.push("已刪除", "報名已刪除");
      await load();
    } catch (e) {
      toast.push("刪除失敗", getErrorMessage(e));
    }
  };

  return (
    <>
      <div className="pageTitle">
        <div>
          <h1>報名名單</h1>
          <p>獨立頁檢視該活動所有報名資料</p>
        </div>
        <div className="row">
          <Link className="btn" to={`/events/${id}`}>回活動頁</Link>
          <button className="btn" onClick={load}>重新整理</button>
        </div>
      </div>

      {loading ? (
        <Loading text="Loading registrations..." />
      ) : (
        <RegistrationTable items={regs} onCancel={cancelReg} onDelete={deleteReg} />
      )}
    </>
  );
}
