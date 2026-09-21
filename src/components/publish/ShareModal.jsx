import React, { useState } from "react";
import { X, Copy, Check, ExternalLink, QrCode, Share2, Heart } from "lucide-react";
import confetti from "canvas-confetti";

export function ShareModal({ isOpen, onClose, slug, onViewSite }) {
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  if (!isOpen) return null;

  const fullUrl = `${window.location.origin}/s/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const handleLineShare = () => {
    const lineUrl = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(fullUrl)}`;
    window.open(lineUrl, "_blank");
  };

  const handleFbShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullUrl)}`;
    window.open(fbUrl, "_blank");
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: "500px", padding: "36px 30px", textAlign: "center" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #FFF0F5, #F4F1FE)",
            color: "var(--color-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 16px",
            boxShadow: "0 6px 16px rgba(232, 93, 142, 0.25)"
          }}
        >
          <Heart size={28} fill="var(--color-primary)" />
        </div>

        <h2 style={{ fontSize: "24px", color: "var(--color-text-primary)", marginBottom: "8px" }}>
          เว็บไซต์ของคุณพร้อมแล้ว 🎉
        </h2>
        <p style={{ fontSize: "14.5px", color: "var(--color-text-secondary)", marginBottom: "24px" }}>
          สามารถส่งมอบลิงก์นี้ให้คนพิเศษของคุณเปิดดูได้ทันที
        </p>

        {/* Link Box */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "#FAF4F7",
            border: "1.5px solid var(--color-border)",
            borderRadius: "var(--radius-pill)",
            padding: "6px 8px 6px 18px",
            marginBottom: "20px"
          }}
        >
          <span
            style={{
              flex: 1,
              textAlign: "left",
              fontSize: "14px",
              fontWeight: 500,
              color: "var(--color-text-primary)",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap"
            }}
          >
            {fullUrl}
          </span>
          <button
            onClick={handleCopy}
            className="btn btn-primary btn-sm"
            style={{ borderRadius: "var(--radius-pill)" }}
          >
            {copied ? (
              <>
                <Check size={14} /> คัดลอกแล้ว!
              </>
            ) : (
              <>
                <Copy size={14} /> คัดลอกลิงก์
              </>
            )}
          </button>
        </div>

        {/* Share Buttons */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px", marginBottom: "24px" }}>
          <button
            onClick={handleLineShare}
            className="btn btn-secondary btn-sm"
            style={{ background: "#06C755", color: "#FFF", borderColor: "#06C755" }}
          >
            แชร์ LINE
          </button>
          <button
            onClick={handleFbShare}
            className="btn btn-secondary btn-sm"
            style={{ background: "#1877F2", color: "#FFF", borderColor: "#1877F2" }}
          >
            Facebook
          </button>
          <button
            onClick={() => setShowQR(!showQR)}
            className="btn btn-secondary btn-sm"
          >
            <QrCode size={16} />
            {showQR ? "ซ่อน QR" : "QR Code"}
          </button>
        </div>

        {/* QR Code Container */}
        {showQR && (
          <div
            style={{
              padding: "20px",
              background: "#FFFFFF",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-border)",
              display: "inline-block",
              marginBottom: "24px",
              animation: "fadeIn 0.2s ease-out"
            }}
          >
            {/* Elegant SVG QR Pattern with heart center */}
            <svg width="180" height="180" viewBox="0 0 200 200">
              <rect width="200" height="200" fill="#FFFFFF" rx="12" />
              {/* Corner 1 */}
              <rect x="20" y="20" width="40" height="40" fill="#33252E" rx="4" />
              <rect x="28" y="28" width="24" height="24" fill="#FFFFFF" rx="2" />
              <rect x="34" y="34" width="12" height="12" fill="#E85D8E" rx="2" />
              {/* Corner 2 */}
              <rect x="140" y="20" width="40" height="40" fill="#33252E" rx="4" />
              <rect x="148" y="28" width="24" height="24" fill="#FFFFFF" rx="2" />
              <rect x="154" y="34" width="12" height="12" fill="#E85D8E" rx="2" />
              {/* Corner 3 */}
              <rect x="20" y="140" width="40" height="40" fill="#33252E" rx="4" />
              <rect x="28" y="148" width="24" height="24" fill="#FFFFFF" rx="2" />
              <rect x="34" y="154" width="12" height="12" fill="#E85D8E" rx="2" />
              {/* Data Blocks */}
              <rect x="80" y="24" width="12" height="12" fill="#33252E" />
              <rect x="104" y="24" width="12" height="12" fill="#33252E" />
              <rect x="80" y="48" width="12" height="12" fill="#33252E" />
              <rect x="104" y="48" width="12" height="12" fill="#33252E" />
              <rect x="24" y="80" width="12" height="12" fill="#33252E" />
              <rect x="48" y="80" width="12" height="12" fill="#33252E" />
              <rect x="24" y="104" width="12" height="12" fill="#33252E" />
              <rect x="140" y="80" width="12" height="12" fill="#33252E" />
              <rect x="164" y="104" width="12" height="12" fill="#33252E" />
              <rect x="80" y="140" width="12" height="12" fill="#33252E" />
              <rect x="104" y="164" width="12" height="12" fill="#33252E" />
              <rect x="140" y="140" width="12" height="12" fill="#33252E" />
              <rect x="164" y="164" width="12" height="12" fill="#33252E" />
              {/* Center Heart Badge */}
              <circle cx="100" cy="100" r="22" fill="#FFF9FB" />
              <path
                d="M100 110 C90 102 85 95 85 89 C85 84 89 80 94 80 C97 80 99 82 100 84 C101 82 103 80 106 80 C111 80 115 84 115 89 C115 95 110 102 100 110 Z"
                fill="#E85D8E"
              />
            </svg>
            <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginTop: "8px" }}>
              สแกนด้วยสมาร์ตโฟนเพื่อเปิดดู
            </div>
          </div>
        )}

        {/* View Site Action */}
        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <button className="btn btn-secondary" onClick={onClose}>
            ปิด
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onClose();
              if (onViewSite) onViewSite(slug);
            }}
          >
            <ExternalLink size={16} />
            เปิดดูเว็บไซต์ทันที
          </button>
        </div>
      </div>
    </div>
  );
}
