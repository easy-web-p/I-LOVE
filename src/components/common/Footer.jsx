import React from "react";
import { Heart, Sparkles } from "lucide-react";

export function Footer({ setActivePage }) {
  return (
    <footer
      style={{
        background: "linear-gradient(180deg, var(--color-bg) 0%, #F5EBF0 100%)",
        borderTop: "1px solid var(--color-border)",
        padding: "50px 20px 30px",
        marginTop: "60px",
        color: "var(--color-text-secondary)"
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "32px",
            marginBottom: "40px"
          }}
        >
          {/* Col 1: Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFF"
                }}
              >
                <Heart size={20} fill="#FFF" />
              </div>
              <span style={{ fontFamily: "var(--font-heading)", fontSize: "20px", fontWeight: 700, color: "var(--color-text-primary)" }}>
                ILOVE
              </span>
            </div>
            <p style={{ fontSize: "14px", lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
              เปลี่ยนความทรงจำของคุณให้กลายเป็นเว็บไซต์แสนพิเศษสำหรับคนสำคัญ บันทึกเรื่องราว วันสำคัญ และสร้างของขวัญที่ไม่มีวันลืม
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "14px" }}>
              เมนูลัด
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
              <span onClick={() => setActivePage("dashboard")} style={{ cursor: "pointer" }}>แดชบอร์ด</span>
              <span onClick={() => setActivePage("memories")} style={{ cursor: "pointer" }}>คลังความทรงจำ</span>
              <span onClick={() => setActivePage("important-dates")} style={{ cursor: "pointer" }}>วันสำคัญ & ตัวนับถอยหลัง</span>
              <span onClick={() => setActivePage("templates")} style={{ cursor: "pointer" }}>Templates ยอดนิยม</span>
            </div>
          </div>

          {/* Col 3: Templates */}
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "14px" }}>
              โอกาสพิเศษ
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
              <span onClick={() => setActivePage("templates")} style={{ cursor: "pointer" }}>เว็บไซต์วันเกิด 🎂</span>
              <span onClick={() => setActivePage("templates")} style={{ cursor: "pointer" }}>เว็บไซต์วันครบรอบ 💍</span>
              <span onClick={() => setActivePage("templates")} style={{ cursor: "pointer" }}>เว็บไซต์บอกรัก ❤️</span>
              <span onClick={() => setActivePage("templates")} style={{ cursor: "pointer" }}>เว็บไซต์ทริปท่องเที่ยว ✈️</span>
            </div>
          </div>

          {/* Col 4: Platform */}
          <div>
            <h4 style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "14px" }}>
              ความปลอดภัย & บริการ
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "14px" }}>
              <span onClick={() => setActivePage("billing")} style={{ cursor: "pointer" }}>ราคา & แพ็กเกจสมาชิก</span>
              <span>นโยบายความเป็นส่วนตัว</span>
              <span>คำถามที่พบบ่อย (FAQ)</span>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--color-primary)", marginTop: "6px", fontWeight: 500 }}>
                <Sparkles size={14} /> ขับเคลื่อนด้วย Firebase Cloud
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid var(--color-border)",
            paddingTop: "24px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "12px",
            fontSize: "13px",
            color: "var(--color-text-muted)"
          }}
        >
          <div>
            © 2026 ILOVE (Memory Website Builder). All rights reserved.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            Made with <Heart size={14} fill="var(--color-primary)" color="var(--color-primary)" /> for your most precious moments
          </div>
        </div>
      </div>
    </footer>
  );
}
