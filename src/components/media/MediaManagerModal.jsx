import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import {
  X,
  Upload,
  Image as ImageIcon,
  Check,
  Sparkles,
  Search,
  HardDrive
} from "lucide-react";

export function MediaManagerModal({ isOpen, onClose, onSelectImage }) {
  const { memories, showToast } = useApp();

  const [activeTab, setActiveTab] = useState("memories"); // 'memories' | 'presets' | 'upload'
  const [searchQuery, setSearchQuery] = useState("");

  if (!isOpen) return null;

  // Curated High-Quality Presets
  const curatedPresets = [
    {
      title: "ช่อกุหลาบและของขวัญ",
      url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=900&auto=format&fit=crop&q=80",
      category: "LOVE"
    },
    {
      title: "ลูกโป่งและเค้กวันเกิด",
      url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=900&auto=format&fit=crop&q=80",
      category: "BIRTHDAY"
    },
    {
      title: "ทะเลและแสงอาทิตย์ตก",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80",
      category: "TRAVEL"
    },
    {
      title: "คาเฟ่บรรยากาศอบอุ่น",
      url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&auto=format&fit=crop&q=80",
      category: "CAFE"
    },
    {
      title: "แสงไฟดินเนอร์สุดหรู",
      url: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=900&auto=format&fit=crop&q=80",
      category: "ANNIVERSARY"
    },
    {
      title: "ดอกไม้สีชมพูละมุน",
      url: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900&auto=format&fit=crop&q=80",
      category: "FLOWERS"
    }
  ];

  // Images from user's memories
  const memoryImages = memories.flatMap((m) =>
    (m.images || []).map((imgUrl) => ({
      title: m.title,
      url: imgUrl,
      date: m.eventDate
    }))
  );

  const handleChoose = (imgUrl) => {
    if (onSelectImage) {
      onSelectImage(imgUrl);
    }
    showToast("เลือกรูปภาพเรียบร้อยแล้ว ✨");
    onClose();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate size (< 10MB per Section 24)
    if (file.size > 10 * 1024 * 1024) {
      alert("ขนาดไฟล์เกิน 10MB กรุณาเลือกรูปภาพที่มีขนาดเล็กลง");
      return;
    }

    // Object URL for client preview
    const objectUrl = URL.createObjectURL(file);
    handleChoose(objectUrl);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div
        className="card"
        style={{
          maxWidth: "740px",
          width: "92%",
          maxHeight: "85vh",
          overflowY: "auto",
          padding: "28px",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-modal)",
          position: "relative"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="btn-icon"
          style={{ position: "absolute", top: "20px", right: "20px" }}
        >
          <X size={20} />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
          <div
            style={{
              width: "44px",
              height: "44px",
              borderRadius: "var(--radius-md)",
              background: "var(--color-primary-light)",
              color: "var(--color-primary)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <ImageIcon size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: "20px", color: "var(--color-text-primary)", margin: 0 }}>
              คลังรูปภาพและสื่อ (Media Library)
            </h2>
            <p style={{ fontSize: "13.5px", color: "var(--color-text-secondary)", margin: 0 }}>
              เลือกรูปภาพจากคลังความทรงจำ หรือใช้ภาพพรีเซ็ตโรแมนติก
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div style={{ display: "flex", gap: "8px", borderBottom: "1px solid var(--color-border)", marginBottom: "20px" }}>
          {[
            { id: "memories", label: `ความทรงจำของฉัน (${memoryImages.length})` },
            { id: "presets", label: `ภาพตัวอย่างแนะนำ (${curatedPresets.length})` },
            { id: "upload", label: "อัปโหลดไฟล์ใหม่" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 16px",
                fontSize: "14px",
                fontWeight: activeTab === tab.id ? 600 : 500,
                color: activeTab === tab.id ? "var(--color-primary)" : "var(--color-text-secondary)",
                background: "transparent",
                border: "none",
                borderBottom: activeTab === tab.id ? "2px solid var(--color-primary)" : "2px solid transparent",
                cursor: "pointer"
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab 1: Memory Images */}
        {activeTab === "memories" && (
          <div>
            {memoryImages.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--color-text-muted)" }}>
                ยังไม่มีรูปภาพในคลังความทรงจำ คุณสามารถอัปโหลดใหม่ หรือเลือกจากภาพพรีเซ็ตได้
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "14px" }}>
                {memoryImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => handleChoose(img.url)}
                    className="card card-hoverable"
                    style={{
                      borderRadius: "var(--radius-md)",
                      overflow: "hidden",
                      cursor: "pointer",
                      border: "1px solid var(--color-border)"
                    }}
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      style={{ width: "100%", height: "130px", objectFit: "cover", display: "block" }}
                    />
                    <div style={{ padding: "8px 10px", fontSize: "12.5px", fontWeight: 500, color: "var(--color-text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {img.title}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Curated Presets */}
        {activeTab === "presets" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "14px" }}>
            {curatedPresets.map((preset, i) => (
              <div
                key={i}
                onClick={() => handleChoose(preset.url)}
                className="card card-hoverable"
                style={{
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: "1px solid var(--color-border)"
                }}
              >
                <img
                  src={preset.url}
                  alt={preset.title}
                  style={{ width: "100%", height: "130px", objectFit: "cover", display: "block" }}
                />
                <div style={{ padding: "8px 10px", fontSize: "12.5px", fontWeight: 500, color: "var(--color-text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {preset.title}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Upload New File */}
        {activeTab === "upload" && (
          <div style={{ textAlign: "center", padding: "36px 20px" }}>
            <label
              style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "36px 40px",
                borderRadius: "var(--radius-lg)",
                border: "2px dashed var(--color-border)",
                cursor: "pointer",
                background: "#FAF6F8"
              }}
            >
              <Upload size={36} color="var(--color-primary)" style={{ marginBottom: "12px" }} />
              <span style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "4px" }}>
                คลิกเพื่ออัปโหลดรูปภาพจากอุปกรณ์
              </span>
              <span style={{ fontSize: "13px", color: "var(--color-text-muted)" }}>
                รองรับ JPG, PNG, WEBP (สูงสุดไม่เกิน 10MB)
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
