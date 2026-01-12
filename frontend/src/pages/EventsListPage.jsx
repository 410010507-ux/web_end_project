import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EventsAPI } from "../api/events.api";
import { getErrorMessage } from "../api/client";
import Loading from "../components/Loading";
import EmptyState from "../components/EmptyState";
import { useToast } from "../components/Toast";

function StatusBadge({ status }) {
  if (status === "published") return <span className="badge badge-success">published</span>;
  if (status === "closed") return <span className="badge badge-danger">closed</span>;
  return <span className="badge">{status}</span>;
}

export default function EventsListPage() {
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await EventsAPI.list();
      setItems(res.data?.data?.items || []);
    } catch (e) {
      toast.push("載入失敗", getErrorMessage(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const remove = async (id) => {
    if (!confirm("確定要刪除這個活動？")) return;
    try {
      await EventsAPI.remove(id);
      toast.push("已刪除", "活動已刪除");
      await load();
    } catch (e) {
      toast.push("刪除失敗", getErrorMessage(e));
    }
  };

  return (
    <>
      <div className="section-head">
        <div>
          <h1 className="h1">活動列表</h1>
          <p className="p">建立、編輯、刪除活動，並進入活動頁管理名單</p>
        </div>

        <div className="actions">
          <button className="btn btn-ghost" onClick={load}>重新整理</button>
          <Link className="btn btn-primary" to="/events/new">新增活動</Link>
        </div>
      </div>

      {loading ? (
        <Loading text="Loading events..." />
      ) : items.length === 0 ? (
        <EmptyState title="尚無活動" desc="點右上角新增活動，開始建立第一筆資料。" />
      ) : (
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">活動清單</div>
              <div className="card-sub">共 {items.length} 筆</div>
            </div>
          </div>

          <div className="card-pad">
            <div className="table-wrap">
              <table className="table">
                <thead>
                  <tr>
                    <th>標題</th>
                    <th>時間</th>
                    <th>地點</th>
                    <th>名額</th>
                    <th>狀態</th>
                    <th style={{ width: 280 }}>操作</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((ev) => (
                    <tr key={ev._id}>
                      <td style={{ fontWeight: 800 }}>{ev.title}</td>
                      <td style={{ color: "var(--muted)" }}>
                        {ev.date ? new Date(ev.date).toLocaleString() : "-"}
                      </td>
                      <td>{ev.location || "-"}</td>
                      <td>{ev.quota ?? "-"}</td>
                      <td><StatusBadge status={ev.status} /></td>
                      <td>
                        <div className="actions">
                          <Link className="btn" to={`/events/${ev._id}`}>查看</Link>
                          <Link className="btn" to={`/events/${ev._id}/edit`}>編輯</Link>
                          <button className="btn btn-danger" onClick={() => remove(ev._id)}>刪除</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
