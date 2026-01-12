import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { EventsAPI } from "../api/events.api";
import { RegistrationsAPI } from "../api/registrations.api";
import { getErrorMessage } from "../api/client";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import RegistrationForm from "../components/RegistrationForm";
import RegistrationTable from "../components/RegistrationTable";
import { useToast } from "../components/Toast";

function StatusBadge({ status }) {
  if (status === "published") return <span className="badge badge-success">published</span>;
  if (status === "closed") return <span className="badge badge-danger">closed</span>;
  return <span className="badge">{status}</span>;
}

export default function EventDetailPage() {
  const { id } = useParams();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState(null);

  const [regLoading, setRegLoading] = useState(true);
  const [regs, setRegs] = useState([]);

  const [creating, setCreating] = useState(false);

  const remain = useMemo(() => {
    if (!event) return null;
    const quota = event.quota ?? 0;
    const active = regs.filter((r) => r.status !== "cancelled").length;
    return Math.max(quota - active, 0);
  }, [event, regs]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await EventsAPI.get(id);
      setEvent(res.data?.data || null);
    } catch (e) {
      toast.push("載入失敗", getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  const loadRegs = async () => {
    setRegLoading(true);
    try {
      const res = await EventsAPI.registrations(id); // 需對應你 events.api.js 的方法
      setRegs(res.data?.data?.items || []);
    } catch (e) {
      toast.push("名單載入失敗", getErrorMessage(e));
    } finally {
      setRegLoading(false);
    }
  };

  useEffect(() => {
    load();
    loadRegs();
  }, [id]);

  const onCreateRegistration = async (payload) => {
    setCreating(true);
    try {
      await EventsAPI.createRegistration(id, payload); // 需對應你 events.api.js 的方法
      toast.push("已新增", "報名已建立");
      await loadRegs();
    } catch (e) {
      toast.push("新增失敗", getErrorMessage(e));
    } finally {
      setCreating(false);
    }
  };

  const onUpdateRegistration = async (registrationId, payload) => {
    try {
      await RegistrationsAPI.update(registrationId, payload);
      toast.push("已更新", "報名已更新");
      await loadRegs();
    } catch (e) {
      toast.push("更新失敗", getErrorMessage(e));
    }
  };

  const onDeleteRegistration = async (registrationId) => {
    if (!confirm("確定要刪除這筆報名？")) return;
    try {
      await RegistrationsAPI.remove(registrationId);
      toast.push("已刪除", "報名已刪除");
      await loadRegs();
    } catch (e) {
      toast.push("刪除失敗", getErrorMessage(e));
    }
  };

  if (loading) return <Loading text="Loading event..." />;

  if (!event) {
    return (
      <EmptyState
        title="找不到活動"
        desc="可能已被刪除或網址不正確。"
        action={<Link className="btn btn-primary" to="/events">回列表</Link>}
      />
    );
  }

  return (
    <>
      <div className="section-head">
        <div>
          <h1 className="h1">活動資訊 + 報名名單管理</h1>
          <p className="p">管理活動內容、建立報名、更新狀態與刪除名單</p>
        </div>

        <div className="actions">
          <Link className="btn btn-ghost" to={`/events/${event._id}/edit`}>編輯活動</Link>
          <Link className="btn" to="/events">回列表</Link>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">{event.title}</div>
              <div className="card-sub">
                <span style={{ marginRight: 10 }}><StatusBadge status={event.status} /></span>
                名額 {event.quota ?? "-"}，剩餘 {remain ?? "-"}
              </div>
            </div>
          </div>

          <div className="card-pad">
            <div className="kv">
              <div className="kv-row">
                <div className="kv-k">時間</div>
                <div className="kv-v">{event.date ? new Date(event.date).toLocaleString() : "-"}</div>
              </div>
              <div className="kv-row">
                <div className="kv-k">地點</div>
                <div className="kv-v">{event.location || "-"}</div>
              </div>
              <div className="kv-row">
                <div className="kv-k">描述</div>
                <div className="kv-v">{event.description || "-"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">新增報名</div>
              <div className="card-sub">填寫資料後送出，會寫入 registrations 集合</div>
            </div>
          </div>

          <div className="card-pad">
            <RegistrationForm
              disabled={creating || event.status === "closed" || remain === 0}
              onSubmit={onCreateRegistration}
              hint={
                event.status === "closed"
                  ? "活動已關閉，無法報名"
                  : remain === 0
                    ? "名額已滿"
                    : ""
              }
            />
          </div>
        </div>
      </div>

      <div style={{ height: 16 }} />

      <div className="card">
        <div className="card-header">
          <div>
            <div className="card-title">報名名單</div>
            <div className="card-sub">共 {regs.length} 筆</div>
          </div>

          <div className="actions">
            <button className="btn" onClick={loadRegs} disabled={regLoading}>重新整理名單</button>
          </div>
        </div>

        <div className="card-pad">
          {regLoading ? (
            <Loading text="Loading registrations..." />
          ) : regs.length === 0 ? (
            <EmptyState title="目前沒有報名資料" desc="使用右側表單新增第一筆報名。" />
          ) : (
            <RegistrationTable
              items={regs}
              onUpdate={onUpdateRegistration}
              onDelete={onDeleteRegistration}
            />
          )}
        </div>
      </div>
    </>
  );
}
