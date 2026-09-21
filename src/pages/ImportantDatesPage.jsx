import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Calendar,
  Plus,
  Trash2,
  Sparkles,
  Clock,
  Gift,
  Bell,
  X
} from "lucide-react";

export function ImportantDatesPage({ setActivePage }) {
  const { importantDates, createImportantDate, deleteImportantDate } = useApp();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [type, setType] = useState("ANNIVERSARY");
  const [repeatYearly, setRepeatYearly] = useState(true);
  const [reminderDays, setReminderDays] = useState(7);
  const [notes, setNotes] = useState("");

  const getDaysRemaining = (dateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateStr);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    createImportantDate({
      title,
      targetDate,
      type,
      repeatYearly,
      reminderDays: parseInt(reminderDays, 10),
      notes
    });
    setIsAddModalOpen(false);
    setTitle("");
    setTargetDate("");
    setNotes("");
  };

  return (
    <div style={{ padding: "36px 20px 80px" }}>
      <div className="container" style={{ maxWidth: "840px" }}>
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "32px"
          }}
        >
          <div>
            <div className="badge badge-pill-primary" style={{ marginBottom: "8px" }}>
              <Calendar size={14} style={{ marginRight: "4px" }} />
              COUNTDOWN & REMINDERS
            </div>
            <h1 style={{ fontSize: "28px", color: "var(--color-text-primary)" }}>
              วันสำคัญ & ตัวนับถอยหลัง
            </h1>
            <p style={{ fontSize: "14.5px", color: "var(--color-text-secondary)" }}>
              ไม่พลาดทุกโอกาสพิเศษ ตั้งเตือนและเตรียมนับถอยหลังสร้างของขวัญ
            </p>
          </div>

          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn btn-primary"
          >
            <Plus size={16} />
            เพิ่มวันสำคัญ
          </button>
        </div>

        {/* Dates List */}
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          {importantDates.map((item) => {
            const daysLeft = getDaysRemaining(item.targetDate);
            return (
              <div
                key={item.id}
                className="card card-hoverable"
                style={{
                  padding: "24px",
                  borderRadius: "var(--radius-lg)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "18px"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "18px",
                      background: "linear-gradient(135deg, var(--color-primary-light), #F4F1FE)",
                      color: "var(--color-primary)",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0
                    }}
                  >
                    <span style={{ fontSize: "20px", fontWeight: 700, lineHeight: 1 }}>
                      {daysLeft >= 0 ? daysLeft : "0"}
                    </span>
                    <span style={{ fontSize: "10.5px", fontWeight: 600, textTransform: "uppercase" }}>
                      วัน
                    </span>
                  </div>

                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span className="badge badge-pill-primary" style={{ fontSize: "11px" }}>
                        {item.type}
                      </span>
                      {daysLeft === 0 && (
                        <span className="badge badge-published">🎉 ถึงวันนี้แล้ว!</span>
                      )}
                      {daysLeft > 0 && daysLeft <= 14 && (
                        <span className="badge badge-scheduled">⏰ ใกล้ถึงแล้ว!</span>
                      )}
                    </div>
                    <h3 style={{ fontSize: "18px", color: "var(--color-text-primary)", marginBottom: "4px" }}>
                      {item.title}
                    </h3>
                    <div style={{ fontSize: "13.5px", color: "var(--color-text-secondary)", display: "flex", gap: "14px", flexWrap: "wrap" }}>
                      <span>📅 วันที่: {item.targetDate}</span>
                      {item.notes && <span>💡 {item.notes}</span>}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <button
                    onClick={() => setActivePage("project-wizard")}
                    className="btn btn-primary btn-sm"
                  >
                    <Gift size={14} />
                    สร้างเว็บเซอร์ไพรส์
                  </button>
                  <button
                    onClick={() => deleteImportantDate(item.id)}
                    className="btn-icon"
                    style={{ color: "var(--color-error)" }}
                    title="ลบวันสำคัญ"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Date Modal */}
        {isAddModalOpen && (
          <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
            <div
              className="modal-content"
              style={{ maxWidth: "520px", padding: "30px 24px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "20px", color: "var(--color-text-primary)" }}>เพิ่มวันสำคัญ</h2>
                <button className="btn-icon" onClick={() => setIsAddModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddSubmit}>
                <div className="form-group">
                  <label className="form-label">ชื่องาน / วันสำคัญ</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น วันเกิดแฟน, วันครบรอบ 3 ปี"
                    className="form-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">วันที่</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">ประเภท</label>
                  <select
                    className="form-select"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                  >
                    <option value="ANNIVERSARY">วันครบรอบ 💍</option>
                    <option value="BIRTHDAY">วันเกิด 🎂</option>
                    <option value="FIRST_DATE">เดทแรก / วันที่พบกัน 💖</option>
                    <option value="WEDDING">วันแต่งงาน 👰🤵</option>
                    <option value="GRADUATION">วันรับปริญญา 🎓</option>
                    <option value="OTHER">อื่นๆ 🌟</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">บันทึกเตือนความจำ (Note)</label>
                  <input
                    type="text"
                    placeholder="เช่น ซื้อดอกกุหลาบสีชมพู หรือสั่งเค้ก"
                    className="form-input"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                    ยกเลิก
                  </button>
                  <button type="submit" className="btn btn-primary">
                    บันทึกวันสำคัญ
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
