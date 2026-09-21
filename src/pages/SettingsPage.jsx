import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { User, Shield, HardDrive, Bell, Save, Check } from "lucide-react";

export function SettingsPage({ setActivePage }) {
  const { currentUser, showToast } = useApp();

  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [photoURL, setPhotoURL] = useState(currentUser?.photoURL || "");

  const handleSave = (e) => {
    e.preventDefault();
    showToast("บันทึกข้อมูลโปรไฟล์เรียบร้อยแล้ว ✨");
  };

  return (
    <div style={{ padding: "36px 20px 80px" }}>
      <div className="container" style={{ maxWidth: "680px" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", color: "var(--color-text-primary)", marginBottom: "6px" }}>
            ตั้งค่าบัญชี & โปรไฟล์
          </h1>
          <p style={{ fontSize: "14.5px", color: "var(--color-text-secondary)" }}>
            จัดการข้อมูลส่วนตัวและแพ็กเกจสมาชิกของคุณ
          </p>
        </div>

        <div className="card" style={{ padding: "32px 28px", borderRadius: "var(--radius-lg)" }}>
          <form onSubmit={handleSave}>
            {/* Profile Avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: "20px", marginBottom: "28px" }}>
              <img
                src={photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                alt="Profile"
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "3px solid var(--color-primary-light)"
                }}
              />
              <div style={{ flex: 1 }}>
                <label className="form-label" style={{ marginBottom: "4px" }}>ลิงก์รูปภาพโปรไฟล์</label>
                <input
                  type="text"
                  className="form-input"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Name */}
            <div className="form-group">
              <label className="form-label">ชื่อผู้ใช้งาน</label>
              <input
                type="text"
                required
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">อีเมล</label>
              <input
                type="email"
                required
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Plan Info */}
            <div
              style={{
                background: "#FAF4F7",
                padding: "16px",
                borderRadius: "var(--radius-md)",
                marginBottom: "24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}
            >
              <div>
                <div style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>แผนสมาชิกปัจจุบัน</div>
                <div style={{ fontSize: "16px", fontWeight: 700, color: "var(--color-primary)" }}>
                  {currentUser?.plan || "FREE"}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActivePage("billing")}
                className="btn btn-secondary btn-sm"
              >
                ดูแผนสมาชิก
              </button>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
              <Save size={16} /> บันทึกการเปลี่ยนแปลง
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
