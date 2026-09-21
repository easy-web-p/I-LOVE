import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  Heart,
  PlusCircle,
  FolderHeart,
  Calendar,
  Layers,
  Sparkles,
  CreditCard,
  User,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Shield
} from "lucide-react";

export function Navbar({ activePage, setActivePage, onOpenAuth }) {
  const { currentUser, logout } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { id: "landing", label: "หน้าแรก", icon: Sparkles },
    { id: "dashboard", label: "แดชบอร์ด", icon: LayoutDashboard },
    { id: "memories", label: "ความทรงจำ", icon: FolderHeart },
    { id: "important-dates", label: "วันสำคัญ", icon: Calendar },
    { id: "templates", label: "Templates", icon: Layers },
    { id: "billing", label: "ราคา & แผน", icon: CreditCard }
  ];

  return (
    <header
      className="glass-header"
      style={{
        position: "sticky",
        top: 0,
        zIndex: 8000,
        height: "68px",
        display: "flex",
        alignItems: "center"
      }}
    >
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        {/* Brand Logo */}
        <div
          onClick={() => setActivePage("landing")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            cursor: "pointer",
            userSelect: "none"
          }}
        >
          <div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "14px",
              background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              boxShadow: "0 4px 12px rgba(232, 93, 142, 0.35)"
            }}
          >
            <Heart size={22} fill="#FFFFFF" />
          </div>
          <div>
            <span
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "22px",
                fontWeight: 700,
                letterSpacing: "0.5px",
                background: "linear-gradient(135deg, var(--color-primary), #8B7CF6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              ILOVE
            </span>
            <span
              style={{
                display: "block",
                fontSize: "10.5px",
                color: "var(--color-text-muted)",
                fontWeight: 500,
                lineHeight: 1
              }}
            >
              Memory Website Builder
            </span>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: "none",
            alignItems: "center",
            gap: "6px"
          }}
          className="desktop-nav"
        >
          <style>{`
            @media (min-width: 900px) {
              .desktop-nav { display: flex !important; }
              .mobile-toggle { display: none !important; }
            }
          `}</style>
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className="btn btn-ghost btn-sm"
                style={{
                  color: isActive ? "var(--color-primary)" : "var(--color-text-secondary)",
                  backgroundColor: isActive ? "var(--color-primary-light)" : "transparent",
                  fontWeight: isActive ? 600 : 500
                }}
              >
                <Icon size={15} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* Create Project Button */}
          <button
            onClick={() => setActivePage("project-wizard")}
            className="btn btn-primary btn-sm"
            style={{ fontWeight: 600 }}
          >
            <PlusCircle size={16} />
            <span className="hide-on-mobile">สร้างเว็บไซต์</span>
          </button>

          {/* User Profile / Login */}
          {currentUser ? (
            <div style={{ position: "relative" }}>
              <div
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 8px 4px 4px",
                  borderRadius: "var(--radius-pill)",
                  background: "var(--color-surface)",
                  border: "1px solid var(--color-border)",
                  cursor: "pointer"
                }}
              >
                <img
                  src={currentUser.photoURL || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80"}
                  alt={currentUser.name}
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    objectFit: "cover"
                  }}
                />
                <span
                  style={{
                    fontSize: "13.5px",
                    fontWeight: 600,
                    maxWidth: "90px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }}
                >
                  {currentUser.name.split(" ")[0]}
                </span>
              </div>

              {/* Dropdown Menu */}
              {userDropdownOpen && (
                <div
                  className="card"
                  style={{
                    position: "absolute",
                    top: "46px",
                    right: 0,
                    width: "210px",
                    padding: "8px",
                    zIndex: 9999,
                    animation: "fadeIn 0.15s ease-out"
                  }}
                >
                  <div style={{ padding: "8px 10px", borderBottom: "1px solid var(--color-border)" }}>
                    <div style={{ fontWeight: 600, fontSize: "14px" }}>{currentUser.name}</div>
                    <div style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>{currentUser.email}</div>
                    <span className="badge badge-published" style={{ marginTop: "6px", fontSize: "10px" }}>
                      แผน: {currentUser.plan}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      setActivePage("admin");
                      setUserDropdownOpen(false);
                    }}
                    className="btn btn-ghost btn-sm"
                    style={{ width: "100%", justifyContent: "flex-start", marginTop: "4px", color: "#7C3AED" }}
                  >
                    <Shield size={15} />
                    ศูนย์ดูแลระบบ (Admin)
                  </button>
                  <button
                    onClick={() => {
                      setActivePage("settings");
                      setUserDropdownOpen(false);
                    }}
                    className="btn btn-ghost btn-sm"
                    style={{ width: "100%", justifyContent: "flex-start" }}
                  >
                    <User size={15} />
                    ข้อมูลโปรไฟล์ & แผน
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      setUserDropdownOpen(false);
                    }}
                    className="btn btn-ghost btn-sm"
                    style={{ width: "100%", justifyContent: "flex-start", color: "var(--color-error)" }}
                  >
                    <LogOut size={15} />
                    ออกจากระบบ
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn btn-secondary btn-sm"
            >
              เข้าสู่ระบบ
            </button>
          )}

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="btn-icon mobile-toggle"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          className="glass-panel"
          style={{
            position: "absolute",
            top: "68px",
            left: 0,
            right: 0,
            padding: "16px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            borderBottom: "1px solid var(--color-border)",
            animation: "fadeIn 0.2s ease-out"
          }}
        >
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActivePage(item.id);
                  setMobileMenuOpen(false);
                }}
                className="btn btn-ghost"
                style={{
                  justifyContent: "flex-start",
                  color: isActive ? "var(--color-primary)" : "var(--color-text-secondary)",
                  backgroundColor: isActive ? "var(--color-primary-light)" : "transparent",
                  fontWeight: isActive ? 600 : 500
                }}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
