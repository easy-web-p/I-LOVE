import React from "react";
import {
  X,
  BarChart3,
  Users,
  Clock,
  Heart,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  TrendingUp,
  Share2,
  Sparkles,
  ExternalLink
} from "lucide-react";

export function AnalyticsModal({ isOpen, onClose, project }) {
  if (!isOpen || !project) return null;

  // Mock aggregated analytics based on Section 19 Daily Aggregate Model
  const totalViews = project.views || 142;
  const uniqueVisitors = Math.round(totalViews * 0.68);
  const avgDuration = "3m 48s";
  const engagementRate = "86.4%";

  // 7-Day Trend
  const dailyData = [
    { day: "จันทร์", views: Math.round(totalViews * 0.08) },
    { day: "อังคาร", views: Math.round(totalViews * 0.12) },
    { day: "พุธ", views: Math.round(totalViews * 0.15) },
    { day: "พฤหัส", views: Math.round(totalViews * 0.18) },
    { day: "ศุกร์", views: Math.round(totalViews * 0.22) },
    { day: "เสาร์", views: Math.round(totalViews * 0.16) },
    { day: "อาทิตย์", views: Math.round(totalViews * 0.09) }
  ];

  const maxDaily = Math.max(...dailyData.map((d) => d.views), 1);

  // Device breakdown
  const devices = [
    { name: "มือถือ (Mobile)", percent: 74, icon: Smartphone, color: "#E85D8E" },
    { name: "เดสก์ท็อป (Desktop)", percent: 20, icon: Monitor, color: "#8B7CF6" },
    { name: "แท็บเล็ต (Tablet)", percent: 6, icon: Tablet, color: "#F59E0B" }
  ];

  // Traffic Referrers
  const referrers = [
    { source: "ลิงก์โดยตรง (Direct)", count: Math.round(totalViews * 0.46), share: "46%" },
    { source: "LINE Chat", count: Math.round(totalViews * 0.32), share: "32%" },
    { source: "Instagram Story / Bio", count: Math.round(totalViews * 0.14), share: "14%" },
    { source: "Facebook / Messenger", count: Math.round(totalViews * 0.08), share: "8%" }
  ];

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div
        className="card"
        style={{
          maxWidth: "700px",
          width: "92%",
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "32px",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-modal)",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="btn-icon"
          style={{ position: "absolute", top: "20px", right: "20px" }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "var(--radius-md)",
              background: "var(--color-primary-light)",
              color: "var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <BarChart3 size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: "22px", color: "var(--color-text-primary)", margin: 0 }}>
              สถิติการเข้าชมเว็บไซต์ (Analytics)
            </h2>
            <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", margin: 0 }}>
              {project.title} · <span style={{ color: "var(--color-primary)" }}>/s/{project.slug}</span>
            </p>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
            gap: "14px",
            marginBottom: "28px"
          }}
        >
          <div
            style={{
              background: "#FAF6F8",
              padding: "18px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginBottom: "4px" }}>
              ยอดเปิดดูทั้งหมด (Views)
            </div>
            <div style={{ fontSize: "26px", fontWeight: 700, color: "var(--color-primary)" }}>
              {totalViews}
            </div>
          </div>

          <div
            style={{
              background: "#FAF6F8",
              padding: "18px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginBottom: "4px" }}>
              ผู้เข้าชมไม่ซ้ำ (Unique)
            </div>
            <div style={{ fontSize: "26px", fontWeight: 700, color: "#8B7CF6" }}>
              {uniqueVisitors}
            </div>
          </div>

          <div
            style={{
              background: "#FAF6F8",
              padding: "18px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginBottom: "4px" }}>
              เวลาเฉลี่ยที่เปิดอ่าน
            </div>
            <div style={{ fontSize: "26px", fontWeight: 700, color: "#10B981" }}>
              {avgDuration}
            </div>
          </div>

          <div
            style={{
              background: "#FAF6F8",
              padding: "18px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              textAlign: "center"
            }}
          >
            <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginBottom: "4px" }}>
              อัตราการมีส่วนร่วม
            </div>
            <div style={{ fontSize: "26px", fontWeight: 700, color: "#F59E0B" }}>
              {engagementRate}
            </div>
          </div>
        </div>

        {/* 7-Day Views Trend Bar Chart */}
        <div style={{ marginBottom: "32px" }}>
          <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
            <TrendingUp size={16} color="var(--color-primary)" />
            สถิติการเปิดดูรอบ 7 วันที่ผ่านมา (Daily Aggregates)
          </h3>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "12px",
              height: "160px",
              padding: "16px 12px 0",
              background: "#FFFDFE",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)"
            }}
          >
            {dailyData.map((item, idx) => {
              const heightPct = Math.max(15, Math.round((item.views / maxDaily) * 100));
              return (
                <div
                  key={idx}
                  style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    height: "100%",
                    justifyContent: "flex-end"
                  }}
                >
                  <span style={{ fontSize: "11px", fontWeight: 600, color: "var(--color-primary)", marginBottom: "4px" }}>
                    {item.views}
                  </span>
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "36px",
                      height: `${heightPct}%`,
                      background: "linear-gradient(180deg, var(--color-primary) 0%, rgba(232, 93, 142, 0.4) 100%)",
                      borderRadius: "6px 6px 0 0",
                      transition: "height 0.4s ease"
                    }}
                  />
                  <span style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "8px" }}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two-Column Grid: Devices & Traffic Sources */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {/* Devices Breakdown */}
          <div
            style={{
              padding: "18px",
              background: "#FAF6F8",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)"
            }}
          >
            <h4 style={{ fontSize: "14.5px", fontWeight: 600, marginBottom: "14px" }}>
              อุปกรณ์ที่ผู้รับใช้เปิดดู (Devices)
            </h4>
            {devices.map((d, i) => (
              <div key={i} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                  <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <d.icon size={14} color={d.color} />
                    {d.name}
                  </span>
                  <span style={{ fontWeight: 600 }}>{d.percent}%</span>
                </div>
                <div style={{ height: "6px", background: "#E5DEE3", borderRadius: "3px", overflow: "hidden" }}>
                  <div style={{ width: `${d.percent}%`, height: "100%", background: d.color, borderRadius: "3px" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Traffic Sources */}
          <div
            style={{
              padding: "18px",
              background: "#FAF6F8",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)"
            }}
          >
            <h4 style={{ fontSize: "14.5px", fontWeight: 600, marginBottom: "14px" }}>
              ช่องทางการส่งต่อ (Traffic Channels)
            </h4>
            {referrers.map((r, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "6px 0",
                  fontSize: "13.5px",
                  borderBottom: i < referrers.length - 1 ? "1px dashed var(--color-border)" : "none"
                }}
              >
                <span style={{ color: "var(--color-text-primary)" }}>{r.source}</span>
                <span style={{ fontWeight: 600, color: "var(--color-primary)" }}>
                  {r.count} ครั้ง ({r.share})
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "28px" }}>
          <button onClick={onClose} className="btn btn-secondary">
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
}
