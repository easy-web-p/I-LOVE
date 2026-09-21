import React, { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { SectionRenderer } from "../components/sections/SectionRenderer";
import {
  Gift,
  Lock,
  Unlock,
  Heart,
  Sparkles,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ExternalLink,
  ArrowRight
} from "lucide-react";
import confetti from "canvas-confetti";

export function PublishedSitePage({ slug, onNavigateHome }) {
  const { getPublishedSiteBySlug } = useApp();

  const project = getPublishedSiteBySlug(slug);

  const [enteredPassword, setEnteredPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // Audio player mock state
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [likeCount, setLikeCount] = useState(88);

  // Countdown for Scheduled Reveal
  const [scheduledDiff, setScheduledDiff] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    if (project?.revealAt) {
      const calcScheduled = () => {
        const target = new Date(project.revealAt).getTime();
        const now = new Date().getTime();
        const diff = target - now;
        if (diff <= 0) {
          setScheduledDiff({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        } else {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
          const minutes = Math.floor((diff / 1000 / 60) % 60);
          const seconds = Math.floor((diff / 1000) % 60);
          setScheduledDiff({ days, hours, minutes, seconds, isPast: false });
        }
      };
      calcScheduled();
      const timer = setInterval(calcScheduled, 1000);
      return () => clearInterval(timer);
    }
  }, [project]);

  if (!project) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          textAlign: "center",
          background: "var(--color-bg)"
        }}
      >
        <div style={{ fontSize: "50px", marginBottom: "16px" }}>💌🔍</div>
        <h1 style={{ fontSize: "26px", color: "var(--color-text-primary)", marginBottom: "8px" }}>
          ไม่พบเว็บไซต์ที่คุณค้นหา
        </h1>
        <p style={{ color: "var(--color-text-secondary)", maxWidth: "420px", marginBottom: "24px" }}>
          ที่อยู่นี้อาจยังไม่ถูกสร้าง หรือถูกเจ้าของยกเลิกการเผยแพร่แล้ว
        </p>
        <button onClick={onNavigateHome} className="btn btn-primary">
          กลับสู่หน้าหลัก ILOVE
        </button>
      </div>
    );
  }

  // 1. Scheduled Reveal Check
  const isLockedBySchedule = project.revealAt && !scheduledDiff.isPast;

  if (isLockedBySchedule) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          textAlign: "center",
          background: "radial-gradient(ellipse at center, #FFF0F5 0%, #FFF9FB 100%)"
        }}
      >
        <div
          className="card"
          style={{
            maxWidth: "520px",
            width: "100%",
            padding: "48px 32px",
            borderRadius: "var(--radius-lg)",
            border: "2px solid rgba(232, 93, 142, 0.3)",
            boxShadow: "var(--shadow-modal)"
          }}
        >
          <div className="animate-float" style={{ fontSize: "64px", marginBottom: "16px" }}>
            🎁✨
          </div>

          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "26px",
              color: "var(--color-primary)",
              marginBottom: "8px"
            }}
          >
            ของขวัญชิ้นนี้ยังเปิดไม่ได้ 🎁
          </h1>

          <p style={{ fontSize: "15px", color: "var(--color-text-secondary)", marginBottom: "28px" }}>
            คนพิเศษตั้งใจล็อกเวลาของขวัญชิ้นนี้ไว้ให้อย่างประณีต <br />
            กลับมาเปิดอีกครั้งใน:
          </p>

          {/* Countdown Blocks (matching file (8).txt) */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "10px",
              marginBottom: "28px"
            }}
          >
            {[
              { label: "วัน", val: scheduledDiff.days },
              { label: "ชั่วโมง", val: scheduledDiff.hours },
              { label: "นาที", val: scheduledDiff.minutes },
              { label: "วินาที", val: scheduledDiff.seconds }
            ].map((unit, i) => (
              <div
                key={i}
                style={{
                  background: "#FFF",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  padding: "16px 8px"
                }}
              >
                <div style={{ fontSize: "28px", fontWeight: 700, color: "var(--color-primary)", fontFamily: "var(--font-heading)" }}>
                  {unit.val}
                </div>
                <div style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                  {unit.label}
                </div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
            เวลาเปิดจริง: {new Date(project.revealAt).toLocaleString("th-TH")} (Timezone: Asia/Bangkok)
          </p>
        </div>
      </div>
    );
  }

  // 2. Password Protection Check
  if (project.visibility === "PASSWORD" && !isUnlocked) {
    const handlePasswordSubmit = (e) => {
      e.preventDefault();
      if (enteredPassword.trim() === (project.password || "").trim()) {
        setIsUnlocked(true);
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      } else {
        setPasswordError(true);
      }
    };

    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          textAlign: "center",
          background: "radial-gradient(ellipse at center, #FFF0F5 0%, #FFF9FB 100%)"
        }}
      >
        <div
          className="card"
          style={{
            maxWidth: "440px",
            width: "100%",
            padding: "40px 28px",
            borderRadius: "var(--radius-lg)",
            border: "1px solid rgba(232, 93, 142, 0.3)",
            boxShadow: "var(--shadow-modal)"
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "var(--color-primary-light)",
              color: "var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 16px"
            }}
          >
            <Lock size={26} />
          </div>

          <h2 style={{ fontSize: "22px", color: "var(--color-text-primary)", marginBottom: "8px" }}>
            เว็บไซต์นี้ได้รับการปกป้อง
          </h2>
          <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", marginBottom: "24px" }}>
            กรุณากรอกรหัสผ่านที่คุณได้รับเพื่อเปิดดูความทรงจำ
          </p>

          <form onSubmit={handlePasswordSubmit}>
            <div className="form-group" style={{ textAlign: "left" }}>
              <input
                type="password"
                required
                placeholder="กรอกรหัสผ่าน..."
                className="form-input"
                style={{ textAlign: "center", fontSize: "18px", letterSpacing: "2px" }}
                value={enteredPassword}
                onChange={(e) => {
                  setEnteredPassword(e.target.value);
                  setPasswordError(false);
                }}
              />
              {passwordError && (
                <div style={{ color: "var(--color-error)", fontSize: "13px", marginTop: "6px", textAlign: "center" }}>
                  รหัสผ่านไม่ถูกต้อง ลองใหม่อีกครั้งนะ
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
              <Unlock size={16} /> ปลดล็อกเว็บไซต์
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 3. Active Website Render
  const sections = (project.sections || []).filter((s) => s.enabled);

  const handleSendLove = () => {
    setLikeCount((c) => c + 1);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.9 },
      colors: ["#E85D8E", "#FF69B4", "#8B7CF6"]
    });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: project.theme?.backgroundColor || "#FFF9FB",
        color: project.theme?.textColor || "#33252E",
        position: "relative",
        overflowX: "hidden"
      }}
    >
      {/* Background Music Floating Bar */}
      <div
        className="glass-panel"
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          zIndex: 9000,
          borderRadius: "var(--radius-pill)",
          padding: "6px 16px 6px 10px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          boxShadow: "var(--shadow-card)",
          cursor: "pointer"
        }}
        onClick={() => setIsPlayingMusic(!isPlayingMusic)}
      >
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "var(--color-primary)",
            color: "#FFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          {isPlayingMusic ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: "2px" }} />}
        </div>
        <div style={{ fontSize: "12.5px", fontWeight: 600 }}>
          {isPlayingMusic ? "กำลังเล่น: Canon in D (Piano) 🎵" : "เปิดเพลงบรรเลง 🎶"}
        </div>
      </div>

      {/* Render All Sections */}
      <main style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 0 100px" }}>
        {sections.map((sec) => (
          <SectionRenderer
            key={sec.id}
            section={sec}
            theme={project.theme}
          />
        ))}
      </main>

      {/* Recipient Interaction Bar (Fixed Bottom) */}
      <div
        className="glass-header"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "12px 20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 8000
        }}
      >
        <button
          onClick={handleSendLove}
          className="btn btn-primary btn-sm"
          style={{ borderRadius: "var(--radius-pill)" }}
        >
          <Heart size={16} fill="#FFF" />
          ส่งหัวใจให้ผู้สร้าง ({likeCount})
        </button>

        <button
          onClick={onNavigateHome}
          className="btn btn-ghost btn-sm"
          style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}
        >
          สร้างเว็บความทรงจำของคุณเอง <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
