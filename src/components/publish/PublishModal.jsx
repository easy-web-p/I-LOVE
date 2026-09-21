import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  X,
  Globe,
  Lock,
  Clock,
  EyeOff,
  CheckCircle,
  Share2,
  Calendar,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { hashPassword } from "../../utils/security";

export function PublishModal({ isOpen, onClose, project, onPublishedSuccess }) {
  const { publishProject } = useApp();

  const [slug, setSlug] = useState(project?.slug || `love-${Date.now().toString(36)}`);
  const [visibility, setVisibility] = useState(project?.visibility || "UNLISTED");
  const [password, setPassword] = useState("");
  const [revealMode, setRevealMode] = useState(project?.revealAt ? "SCHEDULED" : "IMMEDIATE");
  const [revealDate, setRevealDate] = useState(
    project?.revealAt
      ? new Date(project.revealAt).toISOString().slice(0, 16)
      : "2026-10-20T00:00"
  );
  const [hasExpiry, setHasExpiry] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen || !project) return null;

  const handlePublish = async (e) => {
    e.preventDefault();
    setLoading(true);

    let passwordHash = null;
    if (visibility === "PASSWORD" && password) {
      passwordHash = await hashPassword(password);
    }

    const publishConfig = {
      slug: slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      visibility: visibility,
      passwordHash: passwordHash, // Store only secure hash, never plaintext
      revealAt: revealMode === "SCHEDULED" ? new Date(revealDate).toISOString() : null,
      expiresAt: hasExpiry && expiryDate ? new Date(expiryDate).toISOString() : null
    };

    setTimeout(() => {
      publishProject(project.id, publishConfig);
      setLoading(false);
      onClose();
      if (onPublishedSuccess) {
        onPublishedSuccess(publishConfig.slug);
      }
    }, 400);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: "560px", padding: "32px 28px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "var(--color-primary-light)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <Share2 size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: "20px", color: "var(--color-text-primary)" }}>เผยแพร่เว็บไซต์</h2>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
                พร้อมส่งมอบของขวัญแสนพิเศษให้คนสำคัญแล้วหรือยัง?
              </p>
            </div>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handlePublish}>
          {/* 1. Slug URL */}
          <div className="form-group">
            <label className="form-label">ที่อยู่ลิงก์เว็บไซต์ (URL)</label>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#FAF4F7",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                overflow: "hidden"
              }}
            >
              <span
                style={{
                  padding: "10px 14px",
                  fontSize: "13.5px",
                  color: "var(--color-text-muted)",
                  background: "#F5EEF2",
                  borderRight: "1px solid var(--color-border)"
                }}
              >
                ilove.app/s/
              </span>
              <input
                type="text"
                required
                className="form-input"
                style={{ border: "none", background: "transparent", padding: "10px 14px", fontSize: "14px" }}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="happy-birthday-may"
              />
            </div>
          </div>

          {/* 2. Privacy Level */}
          <div className="form-group">
            <label className="form-label">สิทธิ์การเข้าถึง (Privacy)</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
              {[
                { id: "UNLISTED", label: "ทุกคนที่มีลิงก์ (แนะนำ)", icon: Globe },
                { id: "PUBLIC", label: "สาธารณะทั่วไป", icon: Sparkles },
                { id: "PASSWORD", label: "ป้องกันด้วยรหัสผ่าน", icon: Lock },
                { id: "PRIVATE", label: "เฉพาะเจ้าของ", icon: EyeOff }
              ].map((opt) => {
                const Icon = opt.icon;
                const isChecked = visibility === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setVisibility(opt.id)}
                    style={{
                      padding: "12px",
                      borderRadius: "var(--radius-sm)",
                      border: `1.5px solid ${isChecked ? "var(--color-primary)" : "var(--color-border)"}`,
                      background: isChecked ? "var(--color-primary-light)" : "var(--color-surface)",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      transition: "all 0.15s ease"
                    }}
                  >
                    <Icon size={16} color={isChecked ? "var(--color-primary)" : "var(--color-text-secondary)"} />
                    <span style={{ fontSize: "13px", fontWeight: isChecked ? 600 : 400 }}>
                      {opt.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Password Input if PASSWORD selected */}
          {visibility === "PASSWORD" && (
            <div className="form-group" style={{ animation: "fadeIn 0.2s ease" }}>
              <label className="form-label">กำหนดรหัสผ่านสำหรับเปิดดู</label>
              <input
                type="text"
                required
                placeholder="เช่น วันเกิด หรือคำลับ"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          )}

          {/* 3. Reveal Time */}
          <div className="form-group">
            <label className="form-label">เวลาเปิดเว็บไซต์ (Scheduled Reveal)</label>
            <div style={{ display: "flex", gap: "12px", marginBottom: "10px" }}>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "14px" }}>
                <input
                  type="radio"
                  name="revealMode"
                  checked={revealMode === "IMMEDIATE"}
                  onChange={() => setRevealMode("IMMEDIATE")}
                />
                เปิดให้ดูทันที
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", fontSize: "14px" }}>
                <input
                  type="radio"
                  name="revealMode"
                  checked={revealMode === "SCHEDULED"}
                  onChange={() => setRevealMode("SCHEDULED")}
                />
                กำหนดวันและเวลาเปิดเซอร์ไพรส์ 🎁
              </label>
            </div>

            {revealMode === "SCHEDULED" && (
              <div
                style={{
                  background: "#FFF4F8",
                  padding: "14px",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid rgba(232, 93, 142, 0.2)",
                  animation: "fadeIn 0.2s ease"
                }}
              >
                <div style={{ fontSize: "12.5px", color: "var(--color-primary)", marginBottom: "8px", fontWeight: 500 }}>
                  <Clock size={13} style={{ display: "inline", verticalAlign: "middle", marginRight: "4px" }} />
                  ก่อนถึงเวลานี้ ผู้รับจะเห็นหน้ากล่องของขวัญและตัวนับถอยหลัง (Time Zone: Asia/Bangkok)
                </div>
                <input
                  type="datetime-local"
                  required
                  className="form-input"
                  value={revealDate}
                  onChange={(e) => setRevealDate(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Submit Actions */}
          <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "28px" }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              ยกเลิก
            </button>
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "กำลังบันทึก..." : (
                <>
                  <CheckCircle size={16} />
                  ยืนยันและเผยแพร่
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
