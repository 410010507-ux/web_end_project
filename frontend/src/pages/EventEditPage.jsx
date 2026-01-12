import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { EventsAPI } from "../api/events.api";
import { getErrorMessage } from "../api/client";
import Loading from "../components/Loading";
import EventForm from "../components/EventForm";
import { useToast } from "../components/Toast";

export default function EventEditPage() {
  const { id } = useParams();
  const nav = useNavigate();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await EventsAPI.get(id);
        setEvent(res.data?.data);
      } catch (e) {
        toast.push("載入失敗", getErrorMessage(e));
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const submit = async (payload) => {
    setSubmitting(true);
    try {
      await EventsAPI.update(id, payload);
      toast.push("更新成功", "活動已更新");
      nav(`/events/${id}`);
    } catch (e) {
      toast.push("更新失敗", getErrorMessage(e));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className="pageTitle">
        <div>
          <h1>編輯活動</h1>
          <p>修改活動資訊</p>
        </div>
      </div>

      {loading ? (
        <Loading text="Loading event..." />
      ) : (
        <div className="card">
          <div className="cardBody">
            <EventForm initial={event} onSubmit={submit} submitting={submitting} />
          </div>
        </div>
      )}
    </>
  );
}
