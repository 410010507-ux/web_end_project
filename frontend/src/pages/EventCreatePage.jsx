import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EventsAPI } from "../api/events.api";
import { getErrorMessage } from "../api/client";
import EventForm from "../components/EventForm";
import { useToast } from "../components/Toast";

export default function EventCreatePage() {
  const nav = useNavigate();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  const submit = async (payload) => {
    setSubmitting(true);
    try {
      const res = await EventsAPI.create(payload);
      const id = res.data?.data?._id;
      toast.push("建立成功", "活動已建立");
      nav(`/events/${id}`);
    } catch (e) {
      toast.push("建立失敗", getErrorMessage(e));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="pageTitle">
        <div>
          <h1>新增活動</h1>
          <p>建立一筆活動資料，之後可進入活動頁管理報名名單</p>
        </div>
      </div>

      <div className="card">
        <div className="cardBody">
          <EventForm onSubmit={submit} submitting={submitting} />
        </div>
      </div>
    </>
  );
}
