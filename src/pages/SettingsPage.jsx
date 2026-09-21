import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { User, Shield, HardDrive, Bell, Save, Check } from "lucide-react";

export function SettingsPage({ setActivePage }) {
  const { currentUser, showToast, switchUserPlan, switchUserRole } = useApp();

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

            {/* Plan Info & Role Switcher (Section 2 & 20) */}
            <div
              style={{
                background: "#FAF4F7",
                padding: "20px",
                borderRadius: "var(--radius-md)",
                marginBottom: "24px",
                border: "1px solid var(--color-border)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>แผนสมาชิกปัจจุบัน (Commercial Plan)</div>
                  <div style={{ fontSize: "18px", fontWeight: 700, color: "var(--color-primary)" }}>
                    {currentUser?.plan || "FREE"}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    type="button"
                    onClick={() => switchUserPlan("FREE")}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: "12px", padding: "4px 8px" }}
                  >
                    Free
                  </button>
                  <button
                    type="button"
                    onClick={() => switchUserPlan("PREMIUM")}
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: "12px", padding: "4px 8px" }}
                  >
                    Premium
                  </button>
                  <button
                    type="button"
                    onClick={() => switchUserPlan("LIFETIME")}
                    className="btn btn-primary btn-sm"
                    style={{ fontSize: "12px", padding: "4px 8px", background: "#7C3AED" }}
                  >
                    Lifetime
                  </button>
                </div>
              </div>

              {/* Role (Administrative Authority) */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px dashed var(--color-border)", paddingTop: "14px" }}>
                <div>
                  <div style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>สิทธิ์ผู้ดูแล (Administrative Role)</div>
                  <div style={{ fontSize: "15px", fontWeight: 600, color: currentUser?.role === "ADMIN" ? "#7C3AED" : "var(--color-text-primary)" }}>
                    {currentUser?.role || "USER"}
                  </div>
                </div>
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    type="button"
                    onClick={() => switchUserRole("USER")}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: "12px", padding: "4px 8px" }}
                  >
                    User
                  </button>
                  <button
                    type="button"
                    onClick={() => switchUserRole("ADMIN")}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: "12px", padding: "4px 8px", color: "#7C3AED" }}
                  >
                    Admin
                  </button>
                  {currentUser?.role === "ADMIN" && (
                    <button
                      type="button"
                      onClick={() => setActivePage("admin")}
                      className="btn btn-primary btn-sm"
                      style={{ fontSize: "12px", padding: "4px 8px", background: "#7C3AED" }}
                    >
                      เปิดหน้า Admin
                    </button>
                  )}
                </div>
              </div>

              {/* Storage Usage (Section 6.1) */}
              <div style={{ borderTop: "1px dashed var(--color-border)", paddingTop: "14px", marginTop: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", marginBottom: "6px" }}>
                  <span style={{ color: "var(--color-text-muted)" }}>พื้นที่จัดเก็บรูปภาพ & วิดีโอ</span>
                  <span style={{ fontWeight: 600 }}>{currentUser?.storageUsedMB || 38} MB / {currentUser?.plan === "FREE" ? "100 MB" : "5,000 MB"}</span>
                </div>
                <div style={{ height: "6px", background: "#E5DEE3", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: currentUser?.plan === "FREE" ? "38%" : "0.76%", height: "100%", background: "var(--color-primary)", borderRadius: "3px" }} />
                </div>
              </div>
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
