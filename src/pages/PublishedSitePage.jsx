import React, { useState, useEffect, useRef } from "react";
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
import { verifyPassword, decryptPayloadWithPassword } from "../utils/security";
import { ROMANTIC_AUDIO_PRESETS } from "../utils/audio";
import { updatePageMetadata } from "../utils/seo";
import { fetchPublishedSiteFromFirestore } from "../services/firestore";

export function PublishedSitePage({ slug, onNavigateHome }) {
  const { getPublishedSiteBySlug } = useApp();

  const localProject = getPublishedSiteBySlug(slug);
  const [cloudProject, setCloudProject] = useState(null);
  const [isLoadingCloud, setIsLoadingCloud] = useState(!localProject);

  useEffect(() => {
    let isMounted = true;
    if (!localProject && slug) {
      setIsLoadingCloud(true);
      fetchPublishedSiteFromFirestore(slug)
        .then((remoteData) => {
          if (isMounted) {
            setCloudProject(remoteData);
            setIsLoadingCloud(false);
          }
        })
        .catch(() => {
          if (isMounted) setIsLoadingCloud(false);
        });
    } else {
      setIsLoadingCloud(false);
    }
    return () => {
      isMounted = false;
    };
  }, [slug, localProject]);

  const project = localProject || cloudProject;

  const [enteredPassword, setEnteredPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [decryptedSections, setDecryptedSections] = useState(null);
  const [passwordError, setPasswordError] = useState(false);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutSeconds, setLockoutSeconds] = useState(0);

  // Real Audio player state
  const bgAudioRef = useRef(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [likeCount, setLikeCount] = useState(88);

  // Dynamic SEO & OpenGraph tags
  useEffect(() => {
    if (project) {
      const cleanup = updatePageMetadata({
        title: project.title,
        description: project.description || "ของขวัญความทรงจำแสนพิเศษสำหรับคนสำคัญ",
        image: project.coverImage,
        url: window.location.href
      });
      return cleanup;
    }
  }, [project]);

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

  // Lockout Timer for Brute-force Prevention (Section 17.2)
  useEffect(() => {
    if (lockoutSeconds > 0) {
      const timer = setInterval(() => {
        setLockoutSeconds((s) => Math.max(0, s - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [lockoutSeconds]);

  if (isLoadingCloud) {
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
        <div style={{ fontSize: "40px", marginBottom: "16px", animation: "pulse 1.5s infinite" }}>💖</div>
        <h2 style={{ fontSize: "20px", color: "var(--color-text-primary)", fontWeight: 600, marginBottom: "8px" }}>
          กำลังเปิดกล่องความทรงจำ...
        </h2>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "14px" }}>
          กำลังดึงข้อมูลเว็บไซต์จาก Cloud Storage
        </p>
      </div>
    );
  }

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
    const handlePasswordSubmit = async (e) => {
      e.preventDefault();
      if (lockoutSeconds > 0) return;

      let isValid = false;

      // 1. Zero-Knowledge Decryption
      if (project.isEncrypted && project.encryptedPayload) {
        const decrypted = await decryptPayloadWithPassword(
          project.encryptedPayload,
          enteredPassword.trim()
        );
        if (decrypted && Array.isArray(decrypted)) {
          setDecryptedSections(decrypted);
          isValid = true;
        }
      } else {
        // 2. Hash check fallback
        isValid = await verifyPassword(enteredPassword.trim(), project.passwordHash);
        const isLegacyValid = !project.passwordHash && project.password && enteredPassword.trim() === project.password.trim();
        if (isValid || isLegacyValid) {
          isValid = true;
        }
      }

      if (isValid) {
        setIsUnlocked(true);
        setPasswordError(false);
        setFailedAttempts(0);
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      } else {
        const nextAttempts = failedAttempts + 1;
        setFailedAttempts(nextAttempts);
        setPasswordError(true);
        if (nextAttempts >= 5) {
          setLockoutSeconds(60);
          setFailedAttempts(0);
        }
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
                disabled={lockoutSeconds > 0}
                placeholder={lockoutSeconds > 0 ? `กรุณารออีก ${lockoutSeconds} วินาที...` : "กรอกรหัสผ่าน..."}
                className="form-input"
                style={{ textAlign: "center", fontSize: "18px", letterSpacing: "2px" }}
                value={enteredPassword}
                onChange={(e) => {
                  setEnteredPassword(e.target.value);
                  setPasswordError(false);
                }}
              />
              {lockoutSeconds > 0 ? (
                <div style={{ color: "var(--color-error)", fontSize: "13px", marginTop: "8px", textAlign: "center", fontWeight: 600 }}>
                  ⚠️ กรอกรหัสผิดหลายครั้งเกินไป ระบบล็อกชั่วคราว {lockoutSeconds} วินาที
                </div>
              ) : passwordError ? (
                <div style={{ color: "var(--color-error)", fontSize: "13px", marginTop: "6px", textAlign: "center" }}>
                  รหัสผ่านไม่ถูกต้อง (ลองผิดได้อีก {5 - failedAttempts} ครั้ง)
                </div>
              ) : null}
            </div>

            <button
              type="submit"
              disabled={lockoutSeconds > 0}
              className="btn btn-primary"
              style={{ width: "100%", opacity: lockoutSeconds > 0 ? 0.6 : 1 }}
            >
              <Unlock size={16} /> ปลดล็อกเว็บไซต์
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 3. Active Website Render
  const sections = (decryptedSections || project.sections || []).filter((s) => s.enabled);

  const musicSection = (project.sections || []).find((s) => s.type === "MUSIC");
  const bgAudioUrl = musicSection?.content?.audioUrl || ROMANTIC_AUDIO_PRESETS[0].url;
  const bgAudioTitle = musicSection?.content?.title || "Canon in D (Piano Solo)";

  const handleToggleMusic = () => {
    if (!bgAudioRef.current) return;
    if (isPlayingMusic) {
      bgAudioRef.current.pause();
      setIsPlayingMusic(false);
    } else {
      bgAudioRef.current
        .play()
        .then(() => setIsPlayingMusic(true))
        .catch((err) => console.warn("Background audio play blocked:", err));
    }
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    if (bgAudioRef.current) {
      bgAudioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

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
          padding: "6px 14px 6px 8px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          boxShadow: "var(--shadow-card)",
          cursor: "pointer"
        }}
        onClick={handleToggleMusic}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "50%",
            background: "var(--color-primary)",
            color: "#FFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
          }}
        >
          {isPlayingMusic ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: "2px" }} />}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--color-text-primary)" }}>
            {isPlayingMusic ? `กำลังเล่น: ${bgAudioTitle}` : "เปิดเพลงบรรเลง 🎶"}
          </span>
          <span style={{ fontSize: "10.5px", color: "var(--color-text-secondary)" }}>
            {isPlayingMusic ? "แตะเพื่อหยุดชั่วคราว" : "แตะเพื่อเปิดเพลงคลอ"}
          </span>
        </div>
        {isPlayingMusic && (
          <button
            type="button"
            className="btn-icon"
            onClick={handleToggleMute}
            style={{ width: "26px", height: "26px", color: "var(--color-text-secondary)", marginLeft: "4px" }}
            title={isMuted ? "เปิดเสียง" : "ปิดเสียง"}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        )}
      </div>

      <audio
        ref={bgAudioRef}
        src={bgAudioUrl}
        loop
        preload="none"
        onEnded={() => setIsPlayingMusic(false)}
        onError={() => {
          setIsPlayingMusic(false);
          console.warn("Background audio playback failed or URL unavailable");
        }}
      />

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
