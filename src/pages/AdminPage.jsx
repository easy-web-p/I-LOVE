import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { TEMPLATES } from "../config/templates";
import {
  ShieldAlert,
  Users,
  Layout,
  Globe,
  HardDrive,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  ExternalLink,
  Ban,
  RefreshCw,
  Sliders,
  Sparkles,
  Activity,
  ArrowRight
} from "lucide-react";

export function AdminPage({ setActivePage }) {
  const { currentUser, projects, switchUserRole, switchUserPlan, showToast } = useApp();

  const [activeTab, setActiveTab] = useState("users"); // 'users' | 'templates' | 'moderation' | 'operations'
  const [searchQuery, setSearchQuery] = useState("");

  // Mock Managed Users
  const [userList, setUserList] = useState([
    {
      uid: "usr-may-001",
      name: "เมย์ สุจิตรา",
      email: "may.sujitra@example.com",
      role: "USER",
      plan: "FREE",
      status: "ACTIVE",
      projectsCount: 3,
      storageMB: 38,
      createdAt: "2026-02-01"
    },
    {
      uid: "usr-tan-002",
      name: "แทนไท พิธาน",
      email: "tanthai.p@example.com",
      role: "USER",
      plan: "PREMIUM",
      status: "ACTIVE",
      projectsCount: 8,
      storageMB: 240,
      createdAt: "2026-01-15"
    },
    {
      uid: "usr-ploy-003",
      name: "พลอยไพลิน ศศิน",
      email: "ploy.sasin@example.com",
      role: "USER",
      plan: "PREMIUM",
      status: "ACTIVE",
      projectsCount: 5,
      storageMB: 180,
      createdAt: "2026-02-14"
    },
    {
      uid: "usr-admin-004",
      name: "ผู้ดูแลระบบ ILOVE",
      email: "admin@ilove.app",
      role: "ADMIN",
      plan: "LIFETIME",
      status: "ACTIVE",
      projectsCount: 12,
      storageMB: 512,
      createdAt: "2025-12-01"
    }
  ]);

  // Moderated published sites
  const [siteModerationList, setSiteModerationList] = useState([
    {
      id: "proj-birthday-may",
      slug: "happy-birthday-may",
      title: "Happy Birthday เมย์ ❤️",
      owner: "may.sujitra@example.com",
      status: "ACTIVE",
      views: 142,
      reported: false,
      flagReason: null
    },
    {
      id: "proj-anniversary",
      slug: "our-anniversary-2026",
      title: "Our 2nd Anniversary เซอร์ไพรส์ 🎁",
      owner: "may.sujitra@example.com",
      status: "ACTIVE",
      views: 18,
      reported: false,
      flagReason: null
    },
    {
      id: "proj-flagged-sample",
      slug: "special-night-party",
      title: "ปาร์ตี้รวมแก๊งค์ริมสระ",
      owner: "guest.user@example.com",
      status: "REPORTED",
      views: 350,
      reported: true,
      flagReason: "รายงานเนื้อหาภาพไม่เหมาะสม"
    }
  ]);

  // Templates Management State
  const [templateList, setTemplateList] = useState(
    TEMPLATES.map((t) => ({ ...t, isActive: true }))
  );

  // Toggle user status
  const handleToggleUserStatus = (uid) => {
    setUserList((prev) =>
      prev.map((u) => {
        if (u.uid === uid) {
          const newStatus = u.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
          showToast(`เปลี่ยนสถานะผู้ใช้ ${u.name} เป็น ${newStatus}`);
          return { ...u, status: newStatus };
        }
        return u;
      })
    );
  };

  // Toggle site moderation
  const handleToggleSiteStatus = (slug) => {
    setSiteModerationList((prev) =>
      prev.map((s) => {
        if (s.slug === slug) {
          const newStatus = s.status === "ACTIVE" ? "DISABLED" : "ACTIVE";
          showToast(`เว็บไซต์ /s/${slug} ถูกปรับเป็น ${newStatus}`);
          return { ...s, status: newStatus, reported: false };
        }
        return s;
      })
    );
  };

  // Toggle template active
  const handleToggleTemplate = (templateId) => {
    setTemplateList((prev) =>
      prev.map((t) => {
        if (t.id === templateId) {
          const newActive = !t.isActive;
          showToast(`Template ${t.name}: ${newActive ? "เปิดใช้งาน" : "ปิดชั่วคราว"}`);
          return { ...t, isActive: newActive };
        }
        return t;
      })
    );
  };

  return (
    <div style={{ padding: "36px 20px 80px", background: "var(--color-bg)", minHeight: "calc(100vh - 68px)" }}>
      <div className="container">
        {/* Admin Header */}
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
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              <span className="badge badge-pill-primary" style={{ background: "#7C3AED", color: "#FFF" }}>
                🛡️ Operational Administration
              </span>
              <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
                Role: {currentUser?.role || "ADMIN"}
              </span>
            </div>
            <h1 style={{ fontSize: "28px", color: "var(--color-text-primary)" }}>
              ศูนย์ควบคุมผู้ดูแลระบบ (Admin Console)
            </h1>
            <p style={{ fontSize: "15px", color: "var(--color-text-secondary)" }}>
              บริหารจัดการผู้ใช้งาน Template ตรวจสอบเว็บไซต์ที่เผยแพร่ และติดตามสถานะระบบ
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => setActivePage("dashboard")} className="btn btn-secondary">
              กลับสู่แอปพลิเคชัน
            </button>
          </div>
        </div>

        {/* 4 Platform Metric Cards (Section 22.4) */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            marginBottom: "32px"
          }}
        >
          <div className="card" style={{ padding: "20px", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-muted)", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px" }}>ผู้ใช้งานทั้งหมด</span>
              <Users size={18} color="var(--color-primary)" />
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)" }}>
              1,420 คน
            </div>
            <div style={{ fontSize: "12px", color: "#10B981", marginTop: "4px" }}>
              +14% จากเดือนที่แล้ว
            </div>
          </div>

          <div className="card" style={{ padding: "20px", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-muted)", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px" }}>โปรเจกต์ที่สร้าง</span>
              <Layout size={18} color="#8B7CF6" />
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)" }}>
              3,890 เว็บ
            </div>
            <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "4px" }}>
              เผยแพร่จริง 2,150 เว็บ
            </div>
          </div>

          <div className="card" style={{ padding: "20px", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-muted)", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px" }}>สมาชิก Premium</span>
              <Sparkles size={18} color="#F59E0B" />
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)" }}>
              480 บัญชี
            </div>
            <div style={{ fontSize: "12px", color: "#10B981", marginTop: "4px" }}>
              33.8% Conversion Rate
            </div>
          </div>

          <div className="card" style={{ padding: "20px", borderRadius: "var(--radius-md)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-muted)", marginBottom: "8px" }}>
              <span style={{ fontSize: "13px" }}>Cloud Storage ที่ใช้</span>
              <HardDrive size={18} color="#06B6D4" />
            </div>
            <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-text-primary)" }}>
              84.2 GB
            </div>
            <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "4px" }}>
              จากโควตา 500 GB (16.8%)
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            borderBottom: "1px solid var(--color-border)",
            marginBottom: "24px"
          }}
        >
          {[
            { id: "users", label: "จัดการผู้ใช้งาน (Users)", icon: Users },
            { id: "templates", label: "จัดการ Templates", icon: Layout },
            { id: "moderation", label: "ตรวจสอบเว็บไซต์ (Moderation)", icon: Globe },
            { id: "operations", label: "ระบบและ Audit Logs", icon: Activity }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "12px 18px",
                  fontSize: "14.5px",
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? "var(--color-primary)" : "var(--color-text-secondary)",
                  background: "transparent",
                  border: "none",
                  borderBottom: isActive ? "2px solid var(--color-primary)" : "2px solid transparent",
                  cursor: "pointer"
                }}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ==================== TAB 1: USERS ==================== */}
        {activeTab === "users" && (
          <div className="card" style={{ padding: "24px", borderRadius: "var(--radius-lg)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
              <div style={{ position: "relative", minWidth: "280px" }}>
                <Search size={16} style={{ position: "absolute", left: "12px", top: "12px", color: "var(--color-text-muted)" }} />
                <input
                  type="text"
                  placeholder="ค้นหาชื่อ, อีเมลผู้ใช้..."
                  className="form-input"
                  style={{ paddingLeft: "36px" }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>
                แสดงทั้งหมด {userList.length} รายการ
              </div>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>
                    <th style={{ padding: "12px 16px" }}>ผู้ใช้</th>
                    <th style={{ padding: "12px 16px" }}>อีเมล</th>
                    <th style={{ padding: "12px 16px" }}>Role</th>
                    <th style={{ padding: "12px 16px" }}>Plan</th>
                    <th style={{ padding: "12px 16px" }}>พื้นที่ใช้งาน</th>
                    <th style={{ padding: "12px 16px" }}>สถานะ</th>
                    <th style={{ padding: "12px 16px", textAlign: "right" }}>จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  {userList
                    .filter((u) => u.name.includes(searchQuery) || u.email.includes(searchQuery))
                    .map((user) => (
                      <tr key={user.uid} style={{ borderBottom: "1px solid var(--color-border)" }}>
                        <td style={{ padding: "16px", fontWeight: 600, color: "var(--color-text-primary)" }}>
                          {user.name}
                        </td>
                        <td style={{ padding: "16px", color: "var(--color-text-secondary)" }}>
                          {user.email}
                        </td>
                        <td style={{ padding: "16px" }}>
                          <span className="badge" style={{ background: user.role === "ADMIN" ? "#7C3AED" : "#E5E7EB", color: user.role === "ADMIN" ? "#FFF" : "#374151" }}>
                            {user.role}
                          </span>
                        </td>
                        <td style={{ padding: "16px" }}>
                          <span className="badge" style={{ background: user.plan === "PREMIUM" ? "rgba(232, 93, 142, 0.15)" : "#F3F4F6", color: user.plan === "PREMIUM" ? "var(--color-primary)" : "#6B7280" }}>
                            {user.plan}
                          </span>
                        </td>
                        <td style={{ padding: "16px", color: "var(--color-text-secondary)" }}>
                          {user.storageMB} MB
                        </td>
                        <td style={{ padding: "16px" }}>
                          {user.status === "ACTIVE" ? (
                            <span style={{ color: "#10B981", display: "flex", alignItems: "center", gap: "4px" }}>
                              <CheckCircle size={14} /> ปกติ
                            </span>
                          ) : (
                            <span style={{ color: "#EF4444", display: "flex", alignItems: "center", gap: "4px" }}>
                              <Ban size={14} /> ระงับใช้งาน
                            </span>
                          )}
                        </td>
                        <td style={{ padding: "16px", textAlign: "right" }}>
                          <button
                            onClick={() => handleToggleUserStatus(user.uid)}
                            className="btn btn-ghost btn-sm"
                            style={{ color: user.status === "ACTIVE" ? "var(--color-error)" : "#10B981" }}
                          >
                            {user.status === "ACTIVE" ? "ระงับบัญชี" : "ปลดระงับ"}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== TAB 2: TEMPLATES ==================== */}
        {activeTab === "templates" && (
          <div className="card" style={{ padding: "24px", borderRadius: "var(--radius-lg)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>
              การจัดการ Template ทั้งหมด ({templateList.length} ธีม)
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
              {templateList.map((tpl) => (
                <div
                  key={tpl.id}
                  className="card"
                  style={{
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    border: "1px solid var(--color-border)",
                    opacity: tpl.isActive ? 1 : 0.6
                  }}
                >
                  <img
                    src={tpl.thumbnail}
                    alt={tpl.name}
                    style={{ width: "100%", height: "140px", objectFit: "cover" }}
                  />
                  <div style={{ padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                      <h4 style={{ fontSize: "16px", margin: 0 }}>{tpl.name}</h4>
                      <span className="badge badge-pill-primary">
                        {tpl.isPremium ? "Premium" : "Free"}
                      </span>
                    </div>
                    <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", marginBottom: "16px" }}>
                      {tpl.description}
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: "12.5px", color: tpl.isActive ? "#10B981" : "#EF4444" }}>
                        {tpl.isActive ? "● เปิดใช้งาน" : "○ ปิดใช้งาน"}
                      </span>
                      <button
                        onClick={() => handleToggleTemplate(tpl.id)}
                        className="btn btn-secondary btn-sm"
                      >
                        {tpl.isActive ? "ปิดชั่วคราว" : "เปิดใช้งาน"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================== TAB 3: MODERATION ==================== */}
        {activeTab === "moderation" && (
          <div className="card" style={{ padding: "24px", borderRadius: "var(--radius-lg)" }}>
            <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>
              ตรวจสอบเว็บไซต์สาธารณะและรายงาน (Website Moderation)
            </h3>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px", textAlign: "left" }}>
                <thead>
                  <tr style={{ borderBottom: "1px solid var(--color-border)", color: "var(--color-text-muted)" }}>
                    <th style={{ padding: "12px 16px" }}>ชื่อเว็บไซต์ & Slug</th>
                    <th style={{ padding: "12px 16px" }}>เจ้าของ</th>
                    <th style={{ padding: "12px 16px" }}>สถานะ</th>
                    <th style={{ padding: "12px 16px" }}>ยอดเข้าชม</th>
                    <th style={{ padding: "12px 16px" }}>รายงาน</th>
                    <th style={{ padding: "12px 16px", textAlign: "right" }}>การดำเนินการ</th>
                  </tr>
                </thead>
                <tbody>
                  {siteModerationList.map((site) => (
                    <tr key={site.slug} style={{ borderBottom: "1px solid var(--color-border)" }}>
                      <td style={{ padding: "16px" }}>
                        <div style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>{site.title}</div>
                        <div style={{ fontSize: "12px", color: "var(--color-primary)" }}>/s/{site.slug}</div>
                      </td>
                      <td style={{ padding: "16px", color: "var(--color-text-secondary)" }}>
                        {site.owner}
                      </td>
                      <td style={{ padding: "16px" }}>
                        <span
                          className="badge"
                          style={{
                            background: site.status === "ACTIVE" ? "rgba(16, 185, 129, 0.15)" : "#FEE2E2",
                            color: site.status === "ACTIVE" ? "#10B981" : "#EF4444"
                          }}
                        >
                          {site.status}
                        </span>
                      </td>
                      <td style={{ padding: "16px" }}>{site.views} ครั้ง</td>
                      <td style={{ padding: "16px" }}>
                        {site.reported ? (
                          <span style={{ color: "#EF4444", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px" }}>
                            <AlertTriangle size={14} /> {site.flagReason}
                          </span>
                        ) : (
                          <span style={{ color: "var(--color-text-muted)" }}>ไม่มีรายงาน</span>
                        )}
                      </td>
                      <td style={{ padding: "16px", textAlign: "right" }}>
                        <button
                          onClick={() => handleToggleSiteStatus(site.slug)}
                          className="btn btn-ghost btn-sm"
                          style={{ color: site.status === "ACTIVE" ? "var(--color-error)" : "#10B981" }}
                        >
                          {site.status === "ACTIVE" ? "ปิดกั้นเว็บไซต์ (Disable)" : "กู้คืน (Restore)"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ==================== TAB 4: OPERATIONS ==================== */}
        {activeTab === "operations" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "24px" }}>
            {/* Health & Status */}
            <div className="card" style={{ padding: "24px", borderRadius: "var(--radius-lg)" }}>
              <h3 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "16px", display: "flex", alignItems: "center", gap: "6px" }}>
                <Activity size={18} color="#10B981" /> สถานะเซิร์ฟเวอร์ & Backend Functions
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px dashed var(--color-border)" }}>
                  <span>Firebase Authentication</span>
                  <span style={{ color: "#10B981", fontWeight: 600 }}>● Operational (100%)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px dashed var(--color-border)" }}>
                  <span>Cloud Firestore</span>
                  <span style={{ color: "#10B981", fontWeight: 600 }}>● Operational (100%)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px dashed var(--color-border)" }}>
                  <span>Firebase Storage</span>
                  <span style={{ color: "#10B981", fontWeight: 600 }}>● Operational (100%)</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 0" }}>
                  <span>Payment Gateway Webhooks</span>
                  <span style={{ color: "#10B981", fontWeight: 600 }}>● Operational (100%)</span>
                </div>
              </div>
            </div>

            {/* Audit Logs */}
            <div className="card" style={{ padding: "24px", borderRadius: "var(--radius-lg)" }}>
              <h3 style={{ fontSize: "17px", fontWeight: 600, marginBottom: "16px" }}>
                บันทึกประวัติการทำงาน (Audit Logs)
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px" }}>
                <div style={{ padding: "10px 12px", background: "#FAF6F8", borderRadius: "8px" }}>
                  <div style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
                    PUBLISH_SITE_SUCCESS
                  </div>
                  <div style={{ color: "var(--color-text-secondary)" }}>
                    เผยแพร่เว็บไซต์ /s/happy-birthday-may โดย may.sujitra@example.com
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px" }}>
                    2026-02-10 12:00:00
                  </div>
                </div>

                <div style={{ padding: "10px 12px", background: "#FAF6F8", borderRadius: "8px" }}>
                  <div style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
                    ROLE_ENTITLEMENT_SYNC
                  </div>
                  <div style={{ color: "var(--color-text-secondary)" }}>
                    อัปเกรดแพ็กเกจเป็น PREMIUM สำเร็จสำหรับ tanthai.p@example.com
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px" }}>
                    2026-02-08 15:30:20
                  </div>
                </div>

                <div style={{ padding: "10px 12px", background: "#FAF6F8", borderRadius: "8px" }}>
                  <div style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
                    SYSTEM_DEPLOY_VERSION_1_0
                  </div>
                  <div style={{ color: "var(--color-text-secondary)" }}>
                    Deploy Production bundle to Firebase Hosting
                  </div>
                  <div style={{ fontSize: "11px", color: "var(--color-text-muted)", marginTop: "4px" }}>
                    2026-02-01 09:00:00
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
