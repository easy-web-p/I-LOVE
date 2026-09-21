import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { CreditCard, Check, Sparkles, Star, Shield, ArrowRight } from "lucide-react";
import confetti from "canvas-confetti";

export function BillingPage({ setActivePage }) {
  const { currentUser, showToast } = useApp();
  const [billingCycle, setBillingCycle] = useState("yearly"); // 'monthly' | 'yearly' | 'lifetime'

  const handleUpgrade = (planName) => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    showToast(`อัปเกรดเป็นแพ็กเกจ ${planName} สำเร็จแล้ว! ขอบคุณที่ร่วมสนับสนุน ILOVE 🎉`);
  };

  return (
    <div style={{ padding: "40px 20px 80px" }}>
      <div className="container" style={{ maxWidth: "960px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <div className="badge badge-pill-primary" style={{ marginBottom: "8px" }}>
            <CreditCard size={14} style={{ marginRight: "4px" }} />
            PLANS & PRICING
          </div>
          <h1 style={{ fontSize: "32px", color: "var(--color-text-primary)", marginBottom: "8px" }}>
            เลือกแผนที่เหมาะกับคุณ
          </h1>
          <p style={{ fontSize: "16px", color: "var(--color-text-secondary)" }}>
            เก็บรักษาทุกความทรงจำให้ยาวนาน และสร้างของขวัญที่พิเศษเหนือระดับ
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            marginBottom: "50px"
          }}
        >
          {/* 1. FREE TIER */}
          <div
            className="card"
            style={{
              padding: "32px 24px",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <h3 style={{ fontSize: "20px", marginBottom: "4px" }}>แผนฟรี (FREE)</h3>
            <p style={{ fontSize: "13.5px", color: "var(--color-text-secondary)", marginBottom: "20px" }}>
              สำหรับทดลองใช้งานและสร้างเว็บไซต์ง่ายๆ
            </p>

            <div style={{ fontSize: "36px", fontWeight: 700, marginBottom: "24px" }}>
              ฿0 <span style={{ fontSize: "14px", fontWeight: 400, color: "var(--color-text-muted)" }}>/ ตลอดชีพ</span>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", flex: 1, marginBottom: "28px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Check size={16} color="var(--color-success)" /> สร้างเว็บไซต์ได้ 3 โปรเจกต์
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Check size={16} color="var(--color-success)" /> ใช้ Template ฟรี
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Check size={16} color="var(--color-success)" /> คลังความทรงจำ 100 MB
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Check size={16} color="var(--color-success)" /> ไทม์ไลน์และตัวนับเวลา
              </li>
            </ul>

            <button
              onClick={() => setActivePage("dashboard")}
              className="btn btn-secondary"
              style={{ width: "100%" }}
            >
              ใช้งานแผนปัจจุบัน
            </button>
          </div>

          {/* 2. PREMIUM TIER */}
          <div
            className="card"
            style={{
              padding: "32px 24px",
              borderRadius: "var(--radius-lg)",
              border: "2px solid var(--color-primary)",
              boxShadow: "0 16px 40px rgba(232, 93, 142, 0.2)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              background: "linear-gradient(180deg, #FFFFFF 0%, #FFF8FA 100%)"
            }}
          >
            <span
              className="badge badge-published"
              style={{
                position: "absolute",
                top: "-12px",
                right: "24px",
                background: "var(--color-primary)",
                color: "#FFF"
              }}
            >
              ⭐ แนะนำสูงสุด
            </span>

            <h3 style={{ fontSize: "20px", marginBottom: "4px" }}>พรีเมียม (PREMIUM)</h3>
            <p style={{ fontSize: "13.5px", color: "var(--color-text-secondary)", marginBottom: "20px" }}>
              สำหรับคู่รักที่ต้องการความเซอร์ไพรส์ไร้ขีดจำกัด
            </p>

            <div style={{ fontSize: "36px", fontWeight: 700, color: "var(--color-primary)", marginBottom: "24px" }}>
              ฿199 <span style={{ fontSize: "14px", fontWeight: 400, color: "var(--color-text-muted)" }}>/ ปี</span>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", flex: 1, marginBottom: "28px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Check size={16} color="var(--color-primary)" /> ปลดล็อก Template ทั้งหมด
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Check size={16} color="var(--color-primary)" /> ตั้งเวลาเปิดเซอร์ไพรส์ (Scheduled Reveal)
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Check size={16} color="var(--color-primary)" /> ล็อกรหัสผ่านเว็บไซต์ (Password Lock)
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Check size={16} color="var(--color-primary)" /> ใส่เพลงรักบรรเลงพื้นหลัง
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Check size={16} color="var(--color-primary)" /> ลบโลโก้ ILOVE ออกจากเว็บไซต์
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Check size={16} color="var(--color-primary)" /> พื้นที่เก็บรูปภาพ 5 GB
              </li>
            </ul>

            <button
              onClick={() => handleUpgrade("PREMIUM")}
              className="btn btn-primary"
              style={{ width: "100%" }}
            >
              <Sparkles size={16} /> อัปเกรดเป็น Premium
            </button>
          </div>

          {/* 3. LIFETIME TIER */}
          <div
            className="card"
            style={{
              padding: "32px 24px",
              borderRadius: "var(--radius-lg)",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <h3 style={{ fontSize: "20px", marginBottom: "4px" }}>ตลอดชีพ (LIFETIME)</h3>
            <p style={{ fontSize: "13.5px", color: "var(--color-text-secondary)", marginBottom: "20px" }}>
              จ่ายครั้งเดียว ใช้ได้ตลอดไปไม่หมดอายุ
            </p>

            <div style={{ fontSize: "36px", fontWeight: 700, color: "var(--color-secondary)", marginBottom: "24px" }}>
              ฿499 <span style={{ fontSize: "14px", fontWeight: 400, color: "var(--color-text-muted)" }}>/ ครั้งเดียว</span>
            </div>

            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", flex: 1, marginBottom: "28px" }}>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Check size={16} color="var(--color-secondary)" /> ทุกฟีเจอร์ของ Premium ตลอดชีพ
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Check size={16} color="var(--color-secondary)" /> สร้างเว็บไซต์ได้ไม่จำกัด
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Check size={16} color="var(--color-secondary)" /> พื้นที่เก็บรูปภาพไม่จำกัด
              </li>
              <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <Check size={16} color="var(--color-secondary)" /> สิทธิ์เข้าถึง Template ใหม่ในอนาคต
              </li>
            </ul>

            <button
              onClick={() => handleUpgrade("LIFETIME")}
              className="btn btn-secondary"
              style={{ width: "100%", borderColor: "var(--color-secondary)", color: "var(--color-secondary)" }}
            >
              ซื้อสิทธิ์ถาวร (Lifetime)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
