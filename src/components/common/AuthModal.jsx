import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { X, Heart, Mail, Lock, User, ArrowRight, Sparkles } from "lucide-react";

export function AuthModal({ isOpen, onClose }) {
  const {
    loginWithEmail,
    registerWithEmail,
    loginWithGoogle,
    loginAsGuest,
    resetPassword
  } = useApp();
  const [tab, setTab] = useState("login"); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    let res;
    if (tab === "register") {
      res = await registerWithEmail(email, password, name);
    } else if (tab === "forgot") {
      res = await resetPassword(email);
    } else {
      res = await loginWithEmail(email, password);
    }

    setLoading(false);
    if (res && res.success) {
      onClose();
    } else if (res && res.error) {
      setErrorMessage(res.error);
    }
  };

  const handleGoogle = async () => {
    setLoading(true);
    setErrorMessage("");
    const res = await loginWithGoogle();
    setLoading(false);
    if (res && res.success) {
      onClose();
    } else if (res && res.error) {
      setErrorMessage(res.error);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    setErrorMessage("");
    const res = await loginAsGuest();
    setLoading(false);
    if (res && res.success) {
      onClose();
    } else if (res && res.error) {
      setErrorMessage(res.error);
    }
  };

  const handleDemoLogin = () => {
    loginWithEmail("may.sujitra@example.com", "demo1234");
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: "440px", padding: "32px 28px" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div
              style={{
                width: "32px",
                height: "32px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#FFF"
              }}
            >
              <Heart size={18} fill="#FFF" />
            </div>
            <span style={{ fontFamily: "var(--font-heading)", fontSize: "18px", fontWeight: 700 }}>
              ILOVE
            </span>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        {/* Title */}
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
          <h2 style={{ fontSize: "22px", color: "var(--color-text-primary)", marginBottom: "6px" }}>
            {tab === "login" && "ยินดีต้อนรับกลับมา"}
            {tab === "register" && "เริ่มต้นสร้างความทรงจำ"}
            {tab === "forgot" && "รีเซ็ตรหัสผ่าน"}
          </h2>
          <p style={{ fontSize: "14px", color: "var(--color-text-secondary)" }}>
            {tab === "login" && "เข้าสู่ระบบเพื่อจัดการเว็บไซต์และความทรงจำของคุณ"}
            {tab === "register" && "สมัครสมาชิกฟรี ไม่มีค่าใช้จ่าย"}
            {tab === "forgot" && "กรอกอีเมลเพื่อรับลิงก์ตั้งรหัสผ่านใหม่"}
          </p>
        </div>

        {/* Error Alert Box */}
        {errorMessage && (
          <div
            style={{
              padding: "10px 14px",
              background: "#FEE2E2",
              border: "1px solid #FCA5A5",
              color: "#B91C1C",
              borderRadius: "var(--radius-sm)",
              fontSize: "13px",
              marginBottom: "16px",
              textAlign: "center"
            }}
          >
            {errorMessage}
          </div>
        )}

        {/* Quick Demo Login Button */}
        {tab === "login" && (
          <div style={{ marginBottom: "20px" }}>
            <button
              onClick={handleDemoLogin}
              className="btn btn-secondary"
              style={{
                width: "100%",
                background: "linear-gradient(135deg, #FFF0F5, #F4F1FE)",
                borderColor: "rgba(232, 93, 142, 0.3)",
                color: "var(--color-primary)",
                fontWeight: 600
              }}
            >
              <Sparkles size={16} />
              ทดลองใช้งานทันที (Demo: คุณเมย์ 👋)
            </button>
          </div>
        )}

        {/* Google Login */}
        {tab !== "forgot" && (
          <button
            onClick={handleGoogle}
            className="btn btn-secondary"
            style={{ width: "100%", marginBottom: "18px" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            เข้าสู่ระบบด้วย Google
          </button>
        )}

        {/* Guest Login Option (Anonymous Authentication) */}
        {tab === "login" && (
          <button
            type="button"
            onClick={handleGuestLogin}
            className="btn btn-ghost"
            style={{
              width: "100%",
              marginBottom: "14px",
              color: "var(--color-text-secondary)",
              fontSize: "13px",
              border: "1px dashed var(--color-border)"
            }}
          >
            👤 ทดลองเข้าใช้งานในฐานะผู้เยี่ยมชม (Guest / ไม่ต้องล็อกอิน)
          </button>
        )}

        {tab !== "forgot" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              margin: "18px 0",
              color: "var(--color-text-muted)",
              fontSize: "13px"
            }}
          >
            <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
            <span>หรือใช้อีเมล</span>
            <div style={{ flex: 1, height: "1px", background: "var(--color-border)" }} />
          </div>
        )}

        {/* Email & Password Form */}
        <form onSubmit={handleSubmit}>
          {tab === "register" && (
            <div className="form-group">
              <label className="form-label">ชื่อของคุณ</label>
              <div style={{ position: "relative" }}>
                <input
                  type="text"
                  required
                  placeholder="เช่น เมย์ หรือ ก้อง"
                  className="form-input"
                  style={{ paddingLeft: "40px" }}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <User size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--color-text-muted)" }} />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">อีเมล</label>
            <div style={{ position: "relative" }}>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="form-input"
                style={{ paddingLeft: "40px" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Mail size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--color-text-muted)" }} />
            </div>
          </div>

          {tab !== "forgot" && (
            <div className="form-group">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                <label className="form-label" style={{ marginBottom: 0 }}>รหัสผ่าน</label>
                {tab === "login" && (
                  <span
                    onClick={() => setTab("forgot")}
                    style={{ fontSize: "12.5px", color: "var(--color-primary)", cursor: "pointer", fontWeight: 500 }}
                  >
                    ลืมรหัสผ่าน?
                  </span>
                )}
              </div>
              <div style={{ position: "relative" }}>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="form-input"
                  style={{ paddingLeft: "40px" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Lock size={16} style={{ position: "absolute", left: "14px", top: "14px", color: "var(--color-text-muted)" }} />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100%", marginTop: "8px" }}
            disabled={loading}
          >
            {loading ? "กำลังดำเนินการ..." : (
              <>
                {tab === "login" && "เข้าสู่ระบบ"}
                {tab === "register" && "สมัครสมาชิก"}
                {tab === "forgot" && "ส่งลิงก์รีเซ็ตรหัสผ่าน"}
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Footer Toggle */}
        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "13.5px", color: "var(--color-text-secondary)" }}>
          {tab === "login" && (
            <>
              ยังไม่มีบัญชีใช่ไหม?{" "}
              <span
                onClick={() => setTab("register")}
                style={{ color: "var(--color-primary)", fontWeight: 600, cursor: "pointer" }}
              >
                สมัครสมาชิกฟรี
              </span>
            </>
          )}
          {tab === "register" && (
            <>
              มีบัญชีอยู่แล้ว?{" "}
              <span
                onClick={() => setTab("login")}
                style={{ color: "var(--color-primary)", fontWeight: 600, cursor: "pointer" }}
              >
                เข้าสู่ระบบ
              </span>
            </>
          )}
          {tab === "forgot" && (
            <span
              onClick={() => setTab("login")}
              style={{ color: "var(--color-primary)", fontWeight: 600, cursor: "pointer" }}
            >
              ← กลับไปเข้าสู่ระบบ
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
