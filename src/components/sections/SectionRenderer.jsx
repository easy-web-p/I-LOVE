import React, { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import {
  Heart,
  Sparkles,
  Calendar,
  Gift,
  Play,
  Pause,
  Volume2,
  ChevronRight,
  ExternalLink,
  Clock,
  Camera,
  MapPin,
  Lock,
  Unlock,
  Video,
  Music,
  User,
  Radio,
  CheckCircle2
} from "lucide-react";
import { sanitizeUrl, getSafeVideoEmbedUrl } from "../../utils/security";

export function SectionRenderer({
  section,
  theme = {},
  isEditable = false,
  isSelected = false,
  onSelect
}) {
  const [revealedSecret, setRevealedSecret] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [lightboxImg, setLightboxImg] = useState(null);

  // Time Calculation for Countdown
  const [timeUnits, setTimeUnits] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    if (section.type === "COUNTDOWN" && section.content.startDate) {
      const calculateTime = () => {
        const target = new Date(section.content.startDate).getTime();
        const now = new Date().getTime();
        const isCountUp = section.content.mode === "COUNT_UP";
        const diff = isCountUp ? Math.max(0, now - target) : Math.max(0, target - now);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeUnits({ days, hours, minutes, seconds });
      };
      calculateTime();
      const interval = setInterval(calculateTime, 1000);
      return () => clearInterval(interval);
    }
  }, [section]);

  const handleSecretReveal = () => {
    if (!revealedSecret) {
      setRevealedSecret(true);
      confetti({
        particleCount: 70,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#E85D8E", "#8B7CF6", "#FFD700", "#FF69B4"]
      });
    }
  };

  const sectionStyle = {
    backgroundColor: section.styles?.backgroundColor || "transparent",
    color: section.styles?.textColor || theme.textColor || "#33252E",
    padding: "48px 24px",
    position: "relative",
    fontFamily: theme.bodyFont || "'Noto Sans Thai', sans-serif"
  };

  const headingFontFamily = theme.headingFont || "'Mali', cursive";

  return (
    <div
      id={section.id}
      onClick={isEditable ? () => onSelect && onSelect(section.id) : undefined}
      className={`section-wrapper ${isSelected ? "builder-section-selected" : ""}`}
      style={sectionStyle}
    >
      {/* 1. HERO SECTION */}
      {section.type === "HERO" && (
        <div style={{ maxWidth: "760px", margin: "0 auto", textAlign: section.styles?.alignment || "center" }}>
          {section.content.badge && (
            <span
              className="badge badge-pill-primary"
              style={{
                marginBottom: "16px",
                display: "inline-flex",
                fontSize: "13px",
                padding: "6px 14px"
              }}
            >
              <Sparkles size={14} style={{ marginRight: "4px" }} />
              {section.content.badge}
            </span>
          )}

          <h1
            style={{
              fontFamily: headingFontFamily,
              fontSize: "clamp(28px, 5vw, 42px)",
              color: theme.accentColor || "var(--color-primary)",
              marginBottom: "16px",
              lineHeight: 1.3
            }}
          >
            {section.content.title || "หัวข้อต้อนรับ"}
          </h1>

          <p
            style={{
              fontSize: "17px",
              color: "var(--color-text-secondary)",
              marginBottom: "28px",
              lineHeight: 1.6
            }}
          >
            {section.content.subtitle}
          </p>

          {section.content.imageURL && (
            <div
              style={{
                position: "relative",
                maxWidth: "600px",
                margin: "0 auto 28px",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "var(--shadow-card)"
              }}
            >
              <img
                src={section.content.imageURL}
                alt={section.content.title}
                style={{
                  width: "100%",
                  maxHeight: "360px",
                  objectFit: "cover",
                  display: "block"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(51, 37, 46, 0.3) 0%, transparent 50%)"
                }}
              />
            </div>
          )}

          {section.content.buttonText && (
            <button
              className="btn btn-primary btn-lg"
              onClick={() => {
                const target = document.getElementById(section.content.buttonTarget);
                if (target) target.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {section.content.buttonText}
              <ChevronRight size={18} />
            </button>
          )}
        </div>
      )}

      {/* 2. MESSAGE SECTION */}
      {section.type === "MESSAGE" && (
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div
            className="card"
            style={{
              padding: "40px 32px",
              position: "relative",
              border: "1px solid var(--color-border)",
              background: "linear-gradient(180deg, #FFFFFF 0%, #FFFDFE 100%)",
              borderRadius: "var(--radius-lg)"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "-18px",
                left: "50%",
                transform: "translateX(-50%)",
                background: "var(--color-primary)",
                color: "#FFFFFF",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 10px rgba(232, 93, 142, 0.4)"
              }}
            >
              <Heart size={18} fill="#FFFFFF" />
            </div>

            <h2
              style={{
                fontFamily: headingFontFamily,
                textAlign: "center",
                fontSize: "24px",
                marginBottom: "20px",
                color: theme.accentColor || "var(--color-primary)"
              }}
            >
              {section.content.heading || "ข้อความจากใจ"}
            </h2>

            <p
              style={{
                fontSize: "16px",
                lineHeight: 1.8,
                color: "var(--color-text-primary)",
                whiteSpace: "pre-line",
                marginBottom: "24px",
                textAlign: "justify"
              }}
            >
              {section.content.message}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px dashed var(--color-border)",
                paddingTop: "16px",
                fontSize: "14px",
                color: "var(--color-text-muted)"
              }}
            >
              <span>{section.content.date}</span>
              <span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
                {section.content.author}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* 3. GALLERY SECTION */}
      {section.type === "GALLERY" && (
        <div style={{ maxWidth: "860px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "32px" }}>
            <h2
              style={{
                fontFamily: headingFontFamily,
                fontSize: "26px",
                color: theme.accentColor || "var(--color-primary)",
                marginBottom: "8px"
              }}
            >
              {section.content.title || "อัลบั้มรูปภาพ"}
            </h2>
            {section.content.subtitle && (
              <p style={{ color: "var(--color-text-secondary)", fontSize: "15px" }}>
                {section.content.subtitle}
              </p>
            )}
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "18px"
            }}
          >
            {(section.content.images || []).map((img, idx) => (
              <div
                key={idx}
                className="card card-hoverable"
                onClick={() => setLightboxImg(img)}
                style={{
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  cursor: "pointer",
                  position: "relative"
                }}
              >
                <img
                  src={img.url || img}
                  alt={img.caption || `รูปที่ ${idx + 1}`}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover"
                  }}
                />
                {img.caption && (
                  <div
                    style={{
                      padding: "10px 14px",
                      fontSize: "13.5px",
                      background: "rgba(255, 255, 255, 0.95)",
                      color: "var(--color-text-primary)",
                      fontWeight: 500
                    }}
                  >
                    {img.caption}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Lightbox Modal */}
          {lightboxImg && (
            <div
              className="modal-overlay"
              onClick={() => setLightboxImg(null)}
              style={{ zIndex: 10000 }}
            >
              <div
                style={{
                  maxWidth: "680px",
                  maxHeight: "85vh",
                  background: "#000",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden"
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={lightboxImg.url || lightboxImg}
                  alt="Enlarged"
                  style={{ width: "100%", maxHeight: "70vh", objectFit: "contain" }}
                />
                {lightboxImg.caption && (
                  <div style={{ padding: "14px", color: "#FFF", textAlign: "center" }}>
                    {lightboxImg.caption}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* 4. TIMELINE SECTION */}
      {section.type === "TIMELINE" && (
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <h2
              style={{
                fontFamily: headingFontFamily,
                fontSize: "26px",
                color: theme.accentColor || "var(--color-primary)",
                marginBottom: "8px"
              }}
            >
              {section.content.title || "ไทม์ไลน์ความทรงจำ"}
            </h2>
            {section.content.subtitle && (
              <p style={{ color: "var(--color-text-secondary)", fontSize: "15px" }}>
                {section.content.subtitle}
              </p>
            )}
          </div>

          <div style={{ position: "relative", paddingLeft: "36px" }}>
            <div className="timeline-stem" />

            {(section.content.events || []).map((evt, idx) => (
              <div key={idx} style={{ position: "relative", marginBottom: "32px" }}>
                <div
                  className="timeline-dot"
                  style={{
                    position: "absolute",
                    left: "-36px",
                    top: "4px"
                  }}
                />

                <div
                  className="card"
                  style={{
                    padding: "20px",
                    borderRadius: "var(--radius-md)"
                  }}
                >
                  <span
                    className="badge badge-pill-primary"
                    style={{ marginBottom: "8px" }}
                  >
                    <Calendar size={12} style={{ marginRight: "4px" }} />
                    {evt.date}
                  </span>

                  <h3
                    style={{
                      fontFamily: headingFontFamily,
                      fontSize: "18px",
                      marginBottom: "6px"
                    }}
                  >
                    {evt.title}
                  </h3>

                  <p
                    style={{
                      fontSize: "14.5px",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.6
                    }}
                  >
                    {evt.description}
                  </p>

                  {evt.image && (
                    <img
                      src={evt.image}
                      alt={evt.title}
                      style={{
                        marginTop: "12px",
                        borderRadius: "var(--radius-sm)",
                        maxHeight: "180px",
                        width: "100%",
                        objectFit: "cover"
                      }}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. COUNTDOWN / DAYS TOGETHER SECTION */}
      {section.type === "COUNTDOWN" && (
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: headingFontFamily,
              fontSize: "24px",
              color: theme.accentColor || "var(--color-primary)",
              marginBottom: "24px"
            }}
          >
            {section.content.title || "นับเวลาแห่งความรัก"}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "12px",
              marginBottom: "18px"
            }}
          >
            {[
              { label: "วัน", value: timeUnits.days },
              { label: "ชั่วโมง", value: timeUnits.hours },
              { label: "นาที", value: timeUnits.minutes },
              { label: "วินาที", value: timeUnits.seconds }
            ].map((unit, i) => (
              <div
                key={i}
                className="card"
                style={{
                  padding: "18px 10px",
                  borderRadius: "var(--radius-md)",
                  background: "#FFFFFF",
                  border: "1px solid var(--color-border)"
                }}
              >
                <div
                  style={{
                    fontSize: "clamp(24px, 4vw, 36px)",
                    fontWeight: 700,
                    fontFamily: headingFontFamily,
                    color: "var(--color-primary)"
                  }}
                >
                  {unit.value}
                </div>
                <div
                  style={{
                    fontSize: "13px",
                    color: "var(--color-text-muted)",
                    fontWeight: 500,
                    marginTop: "4px"
                  }}
                >
                  {unit.label}
                </div>
              </div>
            ))}
          </div>

          {section.content.note && (
            <p style={{ color: "var(--color-text-secondary)", fontSize: "15px" }}>
              {section.content.note}
            </p>
          )}
        </div>
      )}

      {/* 6. MEMORY STATISTICS SECTION */}
      {section.type === "MEMORY_STATISTICS" && (
        <div style={{ maxWidth: "740px", margin: "0 auto" }}>
          <h2
            style={{
              fontFamily: headingFontFamily,
              textAlign: "center",
              fontSize: "24px",
              color: theme.accentColor || "var(--color-primary)",
              marginBottom: "28px"
            }}
          >
            {section.content.title || "สถิติเรื่องราวของเรา"}
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "16px"
            }}
          >
            {(section.content.stats || []).map((st, i) => (
              <div
                key={i}
                className="card card-hoverable"
                style={{
                  padding: "24px 16px",
                  textAlign: "center",
                  borderRadius: "var(--radius-md)"
                }}
              >
                <div
                  style={{
                    fontSize: "30px",
                    fontWeight: 700,
                    fontFamily: headingFontFamily,
                    color: theme.accentColor || "var(--color-primary)",
                    marginBottom: "4px"
                  }}
                >
                  {st.value}
                </div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--color-text-primary)" }}>
                  {st.label}
                </div>
                {st.unit && (
                  <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "2px" }}>
                    {st.unit}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7. SECRET MESSAGE BOX SECTION */}
      {section.type === "SECRET_MESSAGE" && (
        <div style={{ maxWidth: "580px", margin: "0 auto" }}>
          <div
            className="secret-box-card"
            onClick={handleSecretReveal}
          >
            <div style={{ marginBottom: "12px" }}>
              {revealedSecret ? (
                <div className="animate-float" style={{ fontSize: "40px" }}>
                  🎁✨
                </div>
              ) : (
                <div className="animate-pulse-subtle" style={{ fontSize: "44px" }}>
                  🎁
                </div>
              )}
            </div>

            <h3
              style={{
                fontFamily: headingFontFamily,
                fontSize: "20px",
                color: "var(--color-primary)",
                marginBottom: "8px"
              }}
            >
              {section.content.title || "ของขวัญกล่องลับ"}
            </h3>

            {!revealedSecret ? (
              <>
                <p style={{ color: "var(--color-text-secondary)", fontSize: "14.5px", marginBottom: "16px" }}>
                  {section.content.subtitle || "แตะที่กล่องของขวัญเพื่อเปิดอ่านข้อความลับ"}
                </p>
                <button className="btn btn-primary btn-sm">
                  <Gift size={16} />
                  {section.content.buttonLabel || "แตะเพื่อเปิด"}
                </button>
              </>
            ) : (
              <div
                style={{
                  background: "#FFFFFF",
                  padding: "24px",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-primary)",
                  marginTop: "16px",
                  animation: "modalScaleUp 0.3s ease-out"
                }}
              >
                <p
                  style={{
                    fontSize: "17px",
                    fontWeight: 600,
                    color: "var(--color-text-primary)",
                    lineHeight: 1.7
                  }}
                >
                  {section.content.secretText}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 8. QUOTE SECTION */}
      {section.type === "QUOTE" && (
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "32px", color: "var(--color-primary)", marginBottom: "10px" }}>
            “
          </div>
          <p
            style={{
              fontFamily: headingFontFamily,
              fontSize: "20px",
              lineHeight: 1.7,
              color: "var(--color-text-primary)",
              marginBottom: "16px"
            }}
          >
            {section.content.quote}
          </p>
          {section.content.author && (
            <div style={{ fontSize: "14.5px", color: "var(--color-text-muted)", fontWeight: 500 }}>
              — {section.content.author}
            </div>
          )}
        </div>
      )}

      {/* 10. SINGLE IMAGE SECTION */}
      {section.type === "IMAGE" && (
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <div
            className="card card-hoverable"
            style={{
              padding: section.content.style === "polaroid" ? "16px 16px 24px" : "0",
              borderRadius: "var(--radius-lg)",
              overflow: "hidden",
              background: "#FFFFFF",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-card)"
            }}
          >
            <img
              src={section.content.url || "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800"}
              alt={section.content.caption || "ภาพแห่งความทรงจำ"}
              style={{
                width: "100%",
                maxHeight: "420px",
                objectFit: "cover",
                borderRadius: section.content.style === "polaroid" ? "var(--radius-sm)" : "0",
                display: "block"
              }}
            />
            {section.content.caption && (
              <div
                style={{
                  padding: "16px 20px",
                  fontFamily: headingFontFamily,
                  fontSize: "17px",
                  color: "var(--color-text-primary)"
                }}
              >
                {section.content.caption}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 11. VIDEO SECTION */}
      {section.type === "VIDEO" && (
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          {section.content.title && (
            <h2
              style={{
                fontFamily: headingFontFamily,
                fontSize: "24px",
                color: theme.accentColor || "var(--color-primary)",
                marginBottom: "8px"
              }}
            >
              {section.content.title}
            </h2>
          )}
          {section.content.subtitle && (
            <p style={{ color: "var(--color-text-secondary)", fontSize: "15px", marginBottom: "20px" }}>
              {section.content.subtitle}
            </p>
          )}
          <div
            style={{
              position: "relative",
              paddingBottom: "56.25%",
              height: 0,
              overflow: "hidden",
              borderRadius: "var(--radius-lg)",
              boxShadow: "var(--shadow-card)",
              background: "#000"
            }}
          >
            {section.content.videoUrl && (section.content.videoUrl.includes("youtube") || section.content.videoUrl.includes("youtu.be") || section.content.videoUrl.includes("vimeo")) ? (
              <iframe
                src={getSafeVideoEmbedUrl(section.content.videoUrl)}
                title={section.content.title || "Video"}
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                src={sanitizeUrl(section.content.videoUrl) || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"}
                controls
                style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
              />
            )}
          </div>
        </div>
      )}

      {/* 12. MUSIC PLAYER SECTION */}
      {section.type === "MUSIC" && (
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div
            className="card"
            style={{
              padding: "24px 28px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--color-border)",
              background: "linear-gradient(135deg, #FFF0F5 0%, #FFFFFF 100%)",
              boxShadow: "var(--shadow-card)",
              display: "flex",
              alignItems: "center",
              gap: "20px"
            }}
          >
            <div
              onClick={() => setIsPlayingMusic(!isPlayingMusic)}
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                background: "var(--color-primary)",
                color: "#FFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(232, 93, 142, 0.4)",
                flexShrink: 0
              }}
            >
              {isPlayingMusic ? <Pause size={24} /> : <Play size={24} style={{ marginLeft: "3px" }} />}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <Music size={15} color="var(--color-primary)" />
                <span style={{ fontSize: "12px", color: "var(--color-primary)", fontWeight: 600, textTransform: "uppercase" }}>
                  เพลงประจำความทรงจำ
                </span>
              </div>
              <h3 style={{ fontSize: "17px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "2px" }}>
                {section.content.title || "คู่ชีวิต (Our Song)"}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--color-text-secondary)" }}>
                {section.content.artist || "Cocktail"}
              </p>
            </div>
            <div style={{ display: "flex", gap: "3px", alignItems: "flex-end", height: "24px" }}>
              {[12, 20, 15, 24, 18, 10].map((h, i) => (
                <span
                  key={i}
                  style={{
                    width: "3px",
                    height: isPlayingMusic ? `${h}px` : "6px",
                    background: "var(--color-primary)",
                    borderRadius: "2px",
                    transition: "height 0.3s ease"
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 13. PERSON PROFILE SECTION */}
      {section.type === "PERSON_PROFILE" && (
        <div style={{ maxWidth: "620px", margin: "0 auto", textAlign: "center" }}>
          <div
            className="card"
            style={{
              padding: "36px 28px",
              borderRadius: "var(--radius-lg)",
              background: "#FFFFFF",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-card)"
            }}
          >
            <div style={{ position: "relative", width: "120px", height: "120px", margin: "0 auto 20px" }}>
              <img
                src={section.content.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300"}
                alt={section.content.name || "คนพิเศษ"}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                  border: "4px solid var(--color-primary-light)",
                  boxShadow: "0 6px 20px rgba(232, 93, 142, 0.25)"
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "2px",
                  right: "2px",
                  background: "var(--color-primary)",
                  color: "#FFF",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Heart size={16} fill="#FFF" />
              </div>
            </div>

            <h2 style={{ fontFamily: headingFontFamily, fontSize: "24px", color: "var(--color-text-primary)", marginBottom: "4px" }}>
              {section.content.name || "เมย์ สุจิตรา"}
            </h2>
            {section.content.nickname && (
              <span className="badge badge-pill-primary" style={{ marginBottom: "16px", display: "inline-block" }}>
                ฉายา: {section.content.nickname}
              </span>
            )}
            {section.content.bio && (
              <p style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--color-text-secondary)", marginBottom: "20px" }}>
                {section.content.bio}
              </p>
            )}
            {section.content.tagline && (
              <div
                style={{
                  padding: "12px 18px",
                  background: "var(--color-bg)",
                  borderRadius: "var(--radius-md)",
                  fontSize: "14px",
                  fontStyle: "italic",
                  color: "var(--color-primary)"
                }}
              >
                “{section.content.tagline}”
              </div>
            )}
          </div>
        </div>
      )}

      {/* 14. MAP & MEMORABLE LOCATION SECTION */}
      {section.type === "MAP" && (
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <div
            className="card"
            style={{
              padding: "32px 24px",
              borderRadius: "var(--radius-lg)",
              background: "#FFFFFF",
              border: "1px solid var(--color-border)",
              boxShadow: "var(--shadow-card)"
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "50%",
                background: "var(--color-primary-light)",
                color: "var(--color-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px"
              }}
            >
              <MapPin size={24} />
            </div>
            <h2 style={{ fontFamily: headingFontFamily, fontSize: "22px", color: "var(--color-text-primary)", marginBottom: "8px" }}>
              {section.content.locationName || "สถานที่แห่งความทรงจำ"}
            </h2>
            {section.content.address && (
              <p style={{ fontSize: "14.5px", color: "var(--color-text-secondary)", marginBottom: "16px" }}>
                {section.content.address}
              </p>
            )}
            {section.content.note && (
              <p style={{ fontSize: "14px", color: "var(--color-primary)", fontStyle: "italic", marginBottom: "24px" }}>
                {section.content.note}
              </p>
            )}
            {section.content.mapUrl ? (
              <a
                href={sanitizeUrl(section.content.mapUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-sm"
              >
                <ExternalLink size={15} />
                เปิดดูใน Google Maps
              </a>
            ) : null}
          </div>
        </div>
      )}

      {/* 15. CALL TO ACTION BUTTON SECTION */}
      {section.type === "BUTTON" && (
        <div style={{ maxWidth: "540px", margin: "0 auto", textAlign: "center" }}>
          {section.content.title && (
            <h2 style={{ fontFamily: headingFontFamily, fontSize: "22px", marginBottom: "8px" }}>
              {section.content.title}
            </h2>
          )}
          {section.content.subtitle && (
            <p style={{ color: "var(--color-text-secondary)", fontSize: "14.5px", marginBottom: "20px" }}>
              {section.content.subtitle}
            </p>
          )}
          <button
            className="btn btn-primary btn-lg"
            style={{
              padding: "14px 36px",
              fontSize: "17px",
              boxShadow: "0 8px 24px rgba(232, 93, 142, 0.35)"
            }}
            onClick={() => {
              confetti({ particleCount: 80, spread: 70 });
              if (section.content.actionUrl) {
                const safeUrl = sanitizeUrl(section.content.actionUrl);
                if (safeUrl && safeUrl !== "#") {
                  window.open(safeUrl, "_blank", "noopener,noreferrer");
                }
              }
            }}
          >
            <Heart size={18} fill="#FFF" />
            {section.content.label || "ตอบตกลง ❤️"}
          </button>
        </div>
      )}

      {/* 16. IMPORTANT DATE SECTION */}
      {section.type === "IMPORTANT_DATE" && (
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <div
            className="card"
            style={{
              padding: "32px 24px",
              borderRadius: "var(--radius-lg)",
              border: "1px solid rgba(232, 93, 142, 0.3)",
              background: "linear-gradient(180deg, #FFFFFF 0%, #FFFDFE 100%)",
              boxShadow: "var(--shadow-card)"
            }}
          >
            <span className="badge badge-pill-primary" style={{ marginBottom: "12px" }}>
              <Calendar size={13} style={{ marginRight: "4px" }} />
              {section.content.badge || "วันสำคัญของเรา"}
            </span>
            <h2 style={{ fontFamily: headingFontFamily, fontSize: "24px", color: "var(--color-primary)", marginBottom: "8px" }}>
              {section.content.title || "วันครบรอบ"}
            </h2>
            <div style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "12px" }}>
              {section.content.date || "20 ตุลาคม 2026"}
            </div>
            {section.content.description && (
              <p style={{ fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                {section.content.description}
              </p>
            )}
          </div>
        </div>
      )}

      {/* 9. FOOTER SECTION */}
      {section.type === "FOOTER" && (
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center", paddingTop: "20px" }}>
          <Heart
            size={24}
            fill="var(--color-primary)"
            color="var(--color-primary)"
            className="animate-pulse-subtle"
            style={{ margin: "0 auto 12px" }}
          />
          <p
            style={{
              fontFamily: headingFontFamily,
              fontSize: "17px",
              color: "var(--color-text-primary)",
              marginBottom: "6px"
            }}
          >
            {section.content.text || "Made with Love"}
          </p>
          <p style={{ fontSize: "12.5px", color: "var(--color-text-muted)" }}>
            {section.content.subtext || "ILOVE Memory Website Builder"}
          </p>
        </div>
      )}
    </div>
  );
}
