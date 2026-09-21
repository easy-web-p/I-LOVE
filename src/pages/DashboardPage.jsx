import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  PlusCircle,
  FolderHeart,
  Calendar,
  Globe,
  Eye,
  Edit,
  MoreVertical,
  Copy,
  Trash2,
  Share2,
  ExternalLink,
  Sparkles,
  Clock,
  Heart,
  HardDrive,
  BarChart3,
  Search,
  ArrowRight
} from "lucide-react";

export function DashboardPage({ setActivePage, onOpenPublish, onOpenShare, onOpenAnalytics }) {
  const {
    currentUser,
    projects,
    memories,
    importantDates,
    setActiveProjectId,
    duplicateProject,
    deleteProject,
    unpublishProject
  } = useApp();

  const [activeMenuId, setActiveMenuId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Calculate upcoming days
  const getDaysDiff = (dateStr) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(dateStr);
    target.setHours(0, 0, 0, 0);
    return Math.ceil((target - today) / (1000 * 60 * 60 * 24));
  };

  const upcomingImportantDates = importantDates.map((d) => ({
    ...d,
    daysLeft: getDaysDiff(d.targetDate)
  })).filter((d) => d.daysLeft >= 0).sort((a, b) => a.daysLeft - b.daysLeft);

  const totalPhotos = memories.reduce((acc, m) => acc + (m.images?.length || 0), 0) + 40;
  const totalViews = projects.reduce((acc, p) => acc + (p.views || 0), 0);

  const handleEditProject = (projId) => {
    setActiveProjectId(projId);
    setActivePage("builder");
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "PUBLISHED":
        return <span className="badge badge-published">เผยแพร่แล้ว</span>;
      case "SCHEDULED":
        return <span className="badge badge-scheduled">ตั้งเวลารอเปิด</span>;
      case "PRIVATE":
        return <span className="badge badge-private">ล็อกรหัสผ่าน</span>;
      default:
        return <span className="badge badge-draft">แบบร่าง (Draft)</span>;
    }
  };

  return (
    <div style={{ padding: "36px 20px 60px" }}>
      <div className="container">
        {/* 1. Header Greeting & Actions */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            marginBottom: "32px"
          }}
        >
          <div>
            <h1 style={{ fontSize: "28px", color: "var(--color-text-primary)", marginBottom: "6px" }}>
              สวัสดี {currentUser ? currentUser.name.split(" ")[0] : "คุณ"} 👋
            </h1>
            <p style={{ fontSize: "15px", color: "var(--color-text-secondary)" }}>
              มาสร้างความทรงจำพิเศษสำหรับคนที่คุณรักกันเถอะ
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ position: "relative", minWidth: "220px" }}>
              <Search size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
              <input
                type="text"
                placeholder="ค้นหาเว็บไซต์ หรือ แท็ก..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="form-input"
                style={{ paddingLeft: "34px", paddingRight: "10px", height: "38px", fontSize: "13.5px" }}
              />
            </div>
            <button
              onClick={() => setActivePage("project-wizard")}
              className="btn btn-primary"
            >
              <PlusCircle size={17} />
              สร้างเว็บไซต์ใหม่
            </button>
            <button
              onClick={() => setActivePage("memories")}
              className="btn btn-secondary"
            >
              <FolderHeart size={17} />
              เพิ่มความทรงจำ
            </button>
          </div>
        </div>

        {/* 2. Stat Cards Grid (Websites, Memories, Photos, Total Views) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
            gap: "16px",
            marginBottom: "32px"
          }}
        >
          {[
            { label: "เว็บไซต์ของฉัน", count: projects.length, icon: Globe, color: "var(--color-primary)" },
            { label: "ความทรงจำในคลัง", count: memories.length, icon: FolderHeart, color: "var(--color-secondary)" },
            { label: "รูปภาพบันทึกไว้", count: totalPhotos, icon: Heart, color: "#E04F80" },
            { label: "ยอดเข้าชมสะสม", count: totalViews, icon: Eye, color: "var(--color-success)" }
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="card"
                style={{
                  padding: "20px",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  gap: "16px"
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "14px",
                    background: `${stat.color}15`,
                    color: stat.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <Icon size={24} />
                </div>
                <div>
                  <div style={{ fontSize: "24px", fontWeight: 700, fontFamily: "var(--font-heading)", color: "var(--color-text-primary)" }}>
                    {stat.count}
                  </div>
                  <div style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Upcoming Dates Alert Banner (วันสำคัญใกล้ถึง) */}
        {upcomingImportantDates.length > 0 && (
          <div
            className="card"
            style={{
              padding: "20px 24px",
              marginBottom: "36px",
              background: "linear-gradient(135deg, #FFF0F5 0%, #FFFDFE 100%)",
              border: "1px solid rgba(232, 93, 142, 0.25)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "16px"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "42px",
                  height: "42px",
                  borderRadius: "12px",
                  background: "var(--color-primary)",
                  color: "#FFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Calendar size={22} />
              </div>
              <div>
                <div style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-primary)", textTransform: "uppercase" }}>
                  วันสำคัญใกล้ถึง
                </div>
                <div style={{ fontSize: "17px", fontWeight: 600, color: "var(--color-text-primary)" }}>
                  {upcomingImportantDates[0].title} — อีก {upcomingImportantDates[0].daysLeft} วันเท่านั้น!
                </div>
                <div style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
                  {upcomingImportantDates[0].notes || "อย่าลืมเตรียมของขวัญและความประทับใจนะ"}
                </div>
              </div>
            </div>

            <button
              onClick={() => setActivePage("project-wizard")}
              className="btn btn-primary btn-sm"
            >
              <Sparkles size={14} />
              สร้างเว็บเซอร์ไพรส์สำหรับวันนี้
            </button>
          </div>
        )}

        {/* 4. My Websites Section (เว็บไซต์ของฉัน) */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 style={{ fontSize: "22px", color: "var(--color-text-primary)" }}>
              เว็บไซต์ของฉัน ({projects.length})
            </h2>
            <button
              onClick={() => setActivePage("project-wizard")}
              className="btn btn-ghost btn-sm"
              style={{ color: "var(--color-primary)", fontWeight: 600 }}
            >
              <PlusCircle size={15} /> สร้างโปรเจกต์ใหม่
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "22px"
            }}
          >
            {projects
              .filter(
                (p) =>
                  !searchQuery ||
                  p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  (p.slug && p.slug.toLowerCase().includes(searchQuery.toLowerCase()))
              )
              .map((proj) => (
              <div
                key={proj.id}
                className="card card-hoverable"
                style={{
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative"
                }}
              >
                {/* Cover Image Preview */}
                <div
                  style={{
                    position: "relative",
                    height: "170px",
                    background: "#F4EDF1",
                    overflow: "hidden",
                    cursor: "pointer"
                  }}
                  onClick={() => handleEditProject(proj.id)}
                >
                  <img
                    src={proj.coverImage || "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600"}
                    alt={proj.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", top: "10px", left: "10px" }}>
                    {getStatusBadge(proj.status)}
                  </div>
                </div>

                {/* Card Body */}
                <div style={{ padding: "18px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                    <h3
                      onClick={() => handleEditProject(proj.id)}
                      style={{
                        fontSize: "17px",
                        color: "var(--color-text-primary)",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "200px"
                      }}
                      title={proj.title}
                    >
                      {proj.title}
                    </h3>

                    {/* More Menu Dropdown Toggle */}
                    <div style={{ position: "relative" }}>
                      <button
                        className="btn-icon"
                        style={{ width: "28px", height: "28px" }}
                        onClick={() => setActiveMenuId(activeMenuId === proj.id ? null : proj.id)}
                      >
                        <MoreVertical size={16} />
                      </button>

                      {activeMenuId === proj.id && (
                        <div
                          className="card"
                          style={{
                            position: "absolute",
                            right: 0,
                            top: "32px",
                            width: "180px",
                            padding: "6px",
                            zIndex: 100,
                            boxShadow: "var(--shadow-modal)"
                          }}
                        >
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              handleEditProject(proj.id);
                            }}
                            className="btn btn-ghost btn-sm"
                            style={{ width: "100%", justifyContent: "flex-start" }}
                          >
                            <Edit size={14} /> แก้ไข
                          </button>
                          {proj.slug && (
                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                onOpenShare(proj.slug);
                              }}
                              className="btn btn-ghost btn-sm"
                              style={{ width: "100%", justifyContent: "flex-start" }}
                            >
                              <Share2 size={14} /> แชร์ลิงก์
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              if (onOpenAnalytics) onOpenAnalytics(proj);
                            }}
                            className="btn btn-ghost btn-sm"
                            style={{ width: "100%", justifyContent: "flex-start", color: "var(--color-primary)" }}
                          >
                            <BarChart3 size={14} /> ดูสถิติ (Analytics)
                          </button>
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              duplicateProject(proj.id);
                            }}
                            className="btn btn-ghost btn-sm"
                            style={{ width: "100%", justifyContent: "flex-start" }}
                          >
                            <Copy size={14} /> ทำสำเนา
                          </button>
                          {proj.status !== "DRAFT" && (
                            <button
                              onClick={() => {
                                setActiveMenuId(null);
                                unpublishProject(proj.id);
                              }}
                              className="btn btn-ghost btn-sm"
                              style={{ width: "100%", justifyContent: "flex-start" }}
                            >
                              <Clock size={14} /> ยกเลิกเผยแพร่
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setActiveMenuId(null);
                              deleteProject(proj.id);
                            }}
                            className="btn btn-ghost btn-sm"
                            style={{ width: "100%", justifyContent: "flex-start", color: "var(--color-error)" }}
                          >
                            <Trash2 size={14} /> ลบเว็บไซต์
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "14px", flex: 1 }}>
                    {proj.description || `ประเภท: ${proj.category}`}
                  </p>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "12px", color: "var(--color-text-muted)", marginBottom: "14px" }}>
                    <span>เข้าชม: {proj.views} ครั้ง</span>
                    {proj.slug && <span>ilove.app/s/{proj.slug}</span>}
                  </div>

                  {/* Quick Action Buttons */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    <button
                      onClick={() => handleEditProject(proj.id)}
                      className="btn btn-primary btn-sm"
                    >
                      <Edit size={14} /> แก้ไขเว็บ
                    </button>
                    {proj.status === "PUBLISHED" || proj.status === "SCHEDULED" ? (
                      <button
                        onClick={() => onOpenShare(proj.slug)}
                        className="btn btn-secondary btn-sm"
                      >
                        <Share2 size={14} /> แชร์
                      </button>
                    ) : (
                      <button
                        onClick={() => onOpenPublish(proj)}
                        className="btn btn-secondary btn-sm"
                      >
                        <Globe size={14} /> เผยแพร่
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Recent Memories Section (Section 6) */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h2 style={{ fontSize: "22px", color: "var(--color-text-primary)", marginBottom: "4px" }}>
                ความทรงจำล่าสุด ({memories.length})
              </h2>
              <p style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>
                คลังเรื่องราวและภาพถ่ายที่พร้อมนำไปสร้างเป็นเว็บไซต์ได้ทุกเมื่อ
              </p>
            </div>
            <button
              onClick={() => setActivePage("memories")}
              className="btn btn-ghost btn-sm"
              style={{ color: "var(--color-secondary)", fontWeight: 600 }}
            >
              ดูทั้งหมด <ArrowRight size={14} />
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px"
            }}
          >
            {memories.slice(0, 3).map((mem) => (
              <div
                key={mem.id}
                className="card card-hoverable"
                onClick={() => setActivePage("memories")}
                style={{
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column"
                }}
              >
                <div style={{ height: "150px", overflow: "hidden", position: "relative" }}>
                  <img
                    src={mem.images?.[0] || "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600"}
                    alt={mem.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span
                    className="badge badge-pill-primary"
                    style={{
                      position: "absolute",
                      top: "10px",
                      left: "10px",
                      fontSize: "11px",
                      background: "rgba(255, 255, 255, 0.95)"
                    }}
                  >
                    📅 {mem.eventDate}
                  </span>
                </div>
                <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                  <div>
                    <h3 style={{ fontSize: "16px", fontWeight: 700, marginBottom: "6px", color: "var(--color-text-primary)" }}>
                      {mem.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "13.5px",
                        color: "var(--color-text-secondary)",
                        lineHeight: 1.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden"
                      }}
                    >
                      {mem.description}
                    </p>
                  </div>
                  <div style={{ marginTop: "12px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {(mem.tags || []).map((t, i) => (
                      <span key={i} style={{ fontSize: "11px", color: "var(--color-text-muted)", background: "var(--color-bg)", padding: "2px 8px", borderRadius: "4px" }}>
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Storage Quota Widget */}
        <div
          className="card"
          style={{
            padding: "20px 24px",
            borderRadius: "var(--radius-md)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "var(--color-primary-light)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <HardDrive size={20} />
            </div>
            <div>
              <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-text-primary)" }}>
                พื้นที่จัดเก็บความทรงจำ (Storage Quota)
              </div>
              <div style={{ fontSize: "12.5px", color: "var(--color-text-secondary)" }}>
                ใช้ไปแล้ว 38 MB จากทั้งหมด 100 MB (แผน Free)
              </div>
            </div>
          </div>

          {/* Visual Progress Bar */}
          <div style={{ width: "100%", maxWidth: "240px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "6px", color: "var(--color-text-secondary)" }}>
              <span>ใช้ไป 38%</span>
              <span>เหลือ 62 MB</span>
            </div>
            <div style={{ height: "8px", background: "var(--color-border)", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ width: "38%", height: "100%", background: "var(--color-primary)", borderRadius: "4px" }} />
            </div>
          </div>

          <button
            onClick={() => setActivePage("billing")}
            className="btn btn-secondary btn-sm"
            style={{ color: "var(--color-primary)", fontWeight: 600 }}
          >
            อัปเกรดเพื่อพื้นที่ไม่จำกัด
          </button>
        </div>
      </div>
    </div>
  );
}
