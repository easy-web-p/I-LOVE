import React, { useState } from "react";
import {
  Sliders,
  Type,
  Palette,
  Sparkles,
  Settings,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Upload,
  Plus,
  Trash2
} from "lucide-react";

export function PropertiesPanel({ selectedSection, onUpdateSection }) {
  const [activeTab, setActiveTab] = useState("content"); // 'content' | 'style' | 'animation' | 'advanced'

  if (!selectedSection) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          padding: "30px",
          textAlign: "center",
          color: "var(--color-text-muted)"
        }}
      >
        <Sliders size={36} style={{ marginBottom: "12px", opacity: 0.5 }} />
        <h4 style={{ fontSize: "16px", color: "var(--color-text-secondary)", marginBottom: "6px" }}>
          ยังไม่ได้เลือก Section
        </h4>
        <p style={{ fontSize: "13px" }}>
          คลิกเลือก Section จากแถบซ้าย หรือคลิกที่ตัวอย่างตรงกลางเพื่อแก้ไขข้อความและสี
        </p>
      </div>
    );
  }

  const handleContentChange = (field, value) => {
    onUpdateSection({
      ...selectedSection,
      content: {
        ...selectedSection.content,
        [field]: value
      }
    });
  };

  const handleStyleChange = (field, value) => {
    onUpdateSection({
      ...selectedSection,
      styles: {
        ...selectedSection.styles,
        [field]: value
      }
    });
  };

  const handleAnimationChange = (field, value) => {
    onUpdateSection({
      ...selectedSection,
      animation: {
        ...selectedSection.animation,
        [field]: value
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--color-surface)",
        borderLeft: "1px solid var(--color-border)"
      }}
    >
      {/* Panel Header */}
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid var(--color-border)"
        }}
      >
        <div style={{ fontSize: "12px", color: "var(--color-text-muted)", marginBottom: "4px" }}>
          แก้ไข Section: {selectedSection.type}
        </div>
        <input
          type="text"
          value={selectedSection.name || ""}
          onChange={(e) => onUpdateSection({ ...selectedSection, name: e.target.value })}
          className="form-input"
          style={{ padding: "6px 10px", fontSize: "14px", fontWeight: 600 }}
        />
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          borderBottom: "1px solid var(--color-border)",
          background: "#FAF6F8"
        }}
      >
        {[
          { id: "content", label: "เนื้อหา", icon: Type },
          { id: "style", label: "สไตล์", icon: Palette },
          { id: "animation", label: "เอฟเฟกต์", icon: Sparkles },
          { id: "advanced", label: "ขั้นสูง", icon: Settings }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: "10px 4px",
                fontSize: "12.5px",
                fontWeight: isActive ? 600 : 500,
                border: "none",
                background: isActive ? "var(--color-surface)" : "transparent",
                color: isActive ? "var(--color-primary)" : "var(--color-text-secondary)",
                borderBottom: isActive ? "2px solid var(--color-primary)" : "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "2px"
              }}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Body */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px"
        }}
      >
        {/* ==================== TAB 1: CONTENT ==================== */}
        {activeTab === "content" && (
          <div>
            {/* HERO Content Fields */}
            {selectedSection.type === "HERO" && (
              <>
                <div className="form-group">
                  <label className="form-label">ป้ายข้อความสั้น (Badge)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.badge || ""}
                    onChange={(e) => handleContentChange("badge", e.target.value)}
                    placeholder="เช่น 🎉 Happy Birthday!"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">หัวข้อหลัก (Title)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.title || ""}
                    onChange={(e) => handleContentChange("title", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">คำบรรยายรอง (Subtitle)</label>
                  <textarea
                    className="form-textarea"
                    value={selectedSection.content.subtitle || ""}
                    onChange={(e) => handleContentChange("subtitle", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ลิงก์รูปภาพหน้าปก</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.imageURL || ""}
                    onChange={(e) => handleContentChange("imageURL", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ข้อความบนปุ่ม (Button Text)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.buttonText || ""}
                    onChange={(e) => handleContentChange("buttonText", e.target.value)}
                  />
                </div>
              </>
            )}

            {/* MESSAGE Content Fields */}
            {selectedSection.type === "MESSAGE" && (
              <>
                <div className="form-group">
                  <label className="form-label">หัวข้อจดหมาย</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.heading || ""}
                    onChange={(e) => handleContentChange("heading", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ข้อความจากใจ</label>
                  <textarea
                    className="form-textarea"
                    rows={6}
                    value={selectedSection.content.message || ""}
                    onChange={(e) => handleContentChange("message", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ลงชื่อผู้ส่ง (Author)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.author || ""}
                    onChange={(e) => handleContentChange("author", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">วันที่</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.date || ""}
                    onChange={(e) => handleContentChange("date", e.target.value)}
                  />
                </div>
              </>
            )}

            {/* SECRET MESSAGE Content Fields */}
            {selectedSection.type === "SECRET_MESSAGE" && (
              <>
                <div className="form-group">
                  <label className="form-label">หัวข้อกล่องของขวัญ</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.title || ""}
                    onChange={(e) => handleContentChange("title", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">คำโปรยก่อนเปิด</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.subtitle || ""}
                    onChange={(e) => handleContentChange("subtitle", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ข้อความลับที่จะเฉลยเมื่อแตะ 🎁</label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    value={selectedSection.content.secretText || ""}
                    onChange={(e) => handleContentChange("secretText", e.target.value)}
                  />
                </div>
              </>
            )}

            {/* COUNTDOWN Content Fields */}
            {selectedSection.type === "COUNTDOWN" && (
              <>
                <div className="form-group">
                  <label className="form-label">หัวข้อการนับเวลา</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.title || ""}
                    onChange={(e) => handleContentChange("title", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">วันที่เป้าหมาย / วันเริ่มต้น</label>
                  <input
                    type="date"
                    className="form-input"
                    value={selectedSection.content.startDate || ""}
                    onChange={(e) => handleContentChange("startDate", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">โหมดการนับ</label>
                  <select
                    className="form-select"
                    value={selectedSection.content.mode || "COUNT_UP"}
                    onChange={(e) => handleContentChange("mode", e.target.value)}
                  >
                    <option value="COUNT_UP">นับเวลาที่ผ่านมา (เช่น คบกันมาแล้ว)</option>
                    <option value="COUNT_DOWN">นับถอยหลังสู่วันสำคัญ</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">หมายเหตุด้านล่าง</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.note || ""}
                    onChange={(e) => handleContentChange("note", e.target.value)}
                  />
                </div>
              </>
            )}

            {/* QUOTE Content Fields */}
            {selectedSection.type === "QUOTE" && (
              <>
                <div className="form-group">
                  <label className="form-label">ข้อความคำคม</label>
                  <textarea
                    className="form-textarea"
                    rows={4}
                    value={selectedSection.content.quote || ""}
                    onChange={(e) => handleContentChange("quote", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ผู้กล่าว / แหล่งที่มา</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.author || ""}
                    onChange={(e) => handleContentChange("author", e.target.value)}
                  />
                </div>
              </>
            )}

            {/* GALLERY Content Fields */}
            {selectedSection.type === "GALLERY" && (
              <>
                <div className="form-group">
                  <label className="form-label">หัวข้ออัลบั้ม</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.title || ""}
                    onChange={(e) => handleContentChange("title", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">รายการรูปภาพ ({selectedSection.content.images?.length || 0})</label>
                  {(selectedSection.content.images || []).map((img, i) => (
                    <div key={i} style={{ marginBottom: "10px", padding: "8px", background: "#FAF4F7", borderRadius: "8px" }}>
                      <input
                        type="text"
                        placeholder="Image URL"
                        className="form-input"
                        style={{ fontSize: "12px", marginBottom: "4px" }}
                        value={img.url || img}
                        onChange={(e) => {
                          const newImages = [...selectedSection.content.images];
                          newImages[i] = { ...img, url: e.target.value };
                          handleContentChange("images", newImages);
                        }}
                      />
                      <div style={{ display: "flex", gap: "6px" }}>
                        <input
                          type="text"
                          placeholder="คำบรรยายรูป"
                          className="form-input"
                          style={{ fontSize: "12px" }}
                          value={img.caption || ""}
                          onChange={(e) => {
                            const newImages = [...selectedSection.content.images];
                            newImages[i] = { ...img, caption: e.target.value };
                            handleContentChange("images", newImages);
                          }}
                        />
                        <button
                          type="button"
                          className="btn-icon"
                          style={{ color: "var(--color-error)" }}
                          onClick={() => {
                            const newImages = selectedSection.content.images.filter((_, idx) => idx !== i);
                            handleContentChange("images", newImages);
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    className="btn btn-secondary btn-sm"
                    style={{ width: "100%", marginTop: "6px" }}
                    onClick={() => {
                      const newImages = [
                        ...(selectedSection.content.images || []),
                        { url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600", caption: "รูปภาพใหม่" }
                      ];
                      handleContentChange("images", newImages);
                    }}
                  >
                    <Plus size={14} /> เพิ่มรูปภาพในอัลบั้ม
                  </button>
                </div>
              </>
            )}

            {/* IMAGE Content Fields */}
            {selectedSection.type === "IMAGE" && (
              <>
                <div className="form-group">
                  <label className="form-label">ลิงก์รูปภาพ (Image URL)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.url || ""}
                    onChange={(e) => handleContentChange("url", e.target.value)}
                    placeholder="https://..."
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">คำบรรยายภาพ (Caption)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.caption || ""}
                    onChange={(e) => handleContentChange("caption", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">สไตล์กรอบรูป</label>
                  <select
                    className="form-select"
                    value={selectedSection.content.style || "polaroid"}
                    onChange={(e) => handleContentChange("style", e.target.value)}
                  >
                    <option value="polaroid">กรอบโพลารอยด์คลาสสิก (Polaroid)</option>
                    <option value="classic">กรอบรูปขอบมนเรียบหรู (Classic)</option>
                  </select>
                </div>
              </>
            )}

            {/* VIDEO Content Fields */}
            {selectedSection.type === "VIDEO" && (
              <>
                <div className="form-group">
                  <label className="form-label">หัวข้อคลิปวิดีโอ</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.title || ""}
                    onChange={(e) => handleContentChange("title", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">คำบรรยาย</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.subtitle || ""}
                    onChange={(e) => handleContentChange("subtitle", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ลิงก์วิดีโอ (YouTube URL หรือ MP4 URL)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.videoUrl || ""}
                    onChange={(e) => handleContentChange("videoUrl", e.target.value)}
                    placeholder="https://www.youtube.com/watch?v=..."
                  />
                </div>
              </>
            )}

            {/* MUSIC Content Fields */}
            {selectedSection.type === "MUSIC" && (
              <>
                <div className="form-group">
                  <label className="form-label">ชื่อเพลง</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.title || ""}
                    onChange={(e) => handleContentChange("title", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ศิลปิน / ผู้ร้อง</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.artist || ""}
                    onChange={(e) => handleContentChange("artist", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ไฟล์เพลง (MP3 Audio URL - ไม่บังคับ)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.audioUrl || ""}
                    onChange={(e) => handleContentChange("audioUrl", e.target.value)}
                    placeholder="https://.../song.mp3"
                  />
                </div>
              </>
            )}

            {/* PERSON PROFILE Content Fields */}
            {selectedSection.type === "PERSON_PROFILE" && (
              <>
                <div className="form-group">
                  <label className="form-label">ชื่อคนพิเศษ</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.name || ""}
                    onChange={(e) => handleContentChange("name", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ฉายาหรือชื่อเล่น</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.nickname || ""}
                    onChange={(e) => handleContentChange("nickname", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">รูปภาพโปรไฟล์ (Photo URL)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.photoUrl || ""}
                    onChange={(e) => handleContentChange("photoUrl", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">คำแนะนำตัว / สิ่งที่ชอบ</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    value={selectedSection.content.bio || ""}
                    onChange={(e) => handleContentChange("bio", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ข้อความบอกรักประจำตัว (Tagline)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.tagline || ""}
                    onChange={(e) => handleContentChange("tagline", e.target.value)}
                  />
                </div>
              </>
            )}

            {/* MAP Content Fields */}
            {selectedSection.type === "MAP" && (
              <>
                <div className="form-group">
                  <label className="form-label">ชื่อสถานที่สำคัญ</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.locationName || ""}
                    onChange={(e) => handleContentChange("locationName", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ที่อยู่ / พิกัด</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.address || ""}
                    onChange={(e) => handleContentChange("address", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ความทรงจำ ณ สถานที่นี้</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    value={selectedSection.content.note || ""}
                    onChange={(e) => handleContentChange("note", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ลิงก์ Google Maps</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.mapUrl || ""}
                    onChange={(e) => handleContentChange("mapUrl", e.target.value)}
                    placeholder="https://maps.google.com/..."
                  />
                </div>
              </>
            )}

            {/* BUTTON Content Fields */}
            {selectedSection.type === "BUTTON" && (
              <>
                <div className="form-group">
                  <label className="form-label">หัวข้อคำถาม</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.title || ""}
                    onChange={(e) => handleContentChange("title", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">คำอธิบายย่อย</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.subtitle || ""}
                    onChange={(e) => handleContentChange("subtitle", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ข้อความบนปุ่ม (Button Label)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.label || ""}
                    onChange={(e) => handleContentChange("label", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">ลิงก์ปลายทางเมื่อคลิก (ไม่บังคับ)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.actionUrl || ""}
                    onChange={(e) => handleContentChange("actionUrl", e.target.value)}
                    placeholder="https://line.me/..."
                  />
                </div>
              </>
            )}

            {/* IMPORTANT DATE Content Fields */}
            {selectedSection.type === "IMPORTANT_DATE" && (
              <>
                <div className="form-group">
                  <label className="form-label">ป้ายข้อความสั้น (Badge)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.badge || ""}
                    onChange={(e) => handleContentChange("badge", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">หัวข้อวันสำคัญ</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.title || ""}
                    onChange={(e) => handleContentChange("title", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">วันที่</label>
                  <input
                    type="text"
                    className="form-input"
                    value={selectedSection.content.date || ""}
                    onChange={(e) => handleContentChange("date", e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">คำบรรยายความทรงจำ</label>
                  <textarea
                    className="form-textarea"
                    rows={3}
                    value={selectedSection.content.description || ""}
                    onChange={(e) => handleContentChange("description", e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        )}

        {/* ==================== TAB 2: STYLE ==================== */}
        {activeTab === "style" && (
          <div>
            <div className="form-group">
              <label className="form-label">สีพื้นหลังของ Section</label>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <input
                  type="color"
                  value={selectedSection.styles?.backgroundColor && selectedSection.styles.backgroundColor !== "transparent" ? selectedSection.styles.backgroundColor : "#FFFFFF"}
                  onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                  style={{ width: "40px", height: "36px", border: "none", borderRadius: "6px", cursor: "pointer" }}
                />
                <input
                  type="text"
                  className="form-input"
                  value={selectedSection.styles?.backgroundColor || "transparent"}
                  onChange={(e) => handleStyleChange("backgroundColor", e.target.value)}
                />
              </div>
              <div style={{ display: "flex", gap: "6px", marginTop: "8px" }}>
                {["transparent", "#FFFFFF", "#FFF9FB", "#FFF0F5", "#F4F1FE", "#F4F9FA"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleStyleChange("backgroundColor", c)}
                    style={{
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      background: c === "transparent" ? "#EEE" : c,
                      border: "1px solid var(--color-border)",
                      cursor: "pointer"
                    }}
                    title={c}
                  />
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">สีตัวอักษร</label>
              <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                <input
                  type="color"
                  value={selectedSection.styles?.textColor || "#33252E"}
                  onChange={(e) => handleStyleChange("textColor", e.target.value)}
                  style={{ width: "40px", height: "36px", border: "none", borderRadius: "6px", cursor: "pointer" }}
                />
                <input
                  type="text"
                  className="form-input"
                  value={selectedSection.styles?.textColor || "#33252E"}
                  onChange={(e) => handleStyleChange("textColor", e.target.value)}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">การจัดตำแหน่งข้อความ</label>
              <div style={{ display: "flex", gap: "8px" }}>
                {[
                  { id: "left", label: "ชิดซ้าย", icon: AlignLeft },
                  { id: "center", label: "กึ่งกลาง", icon: AlignCenter },
                  { id: "right", label: "ชิดขวา", icon: AlignRight }
                ].map((align) => {
                  const Icon = align.icon;
                  const isSelected = (selectedSection.styles?.alignment || "center") === align.id;
                  return (
                    <button
                      key={align.id}
                      type="button"
                      onClick={() => handleStyleChange("alignment", align.id)}
                      className="btn btn-secondary btn-sm"
                      style={{
                        flex: 1,
                        background: isSelected ? "var(--color-primary-light)" : "transparent",
                        borderColor: isSelected ? "var(--color-primary)" : "var(--color-border)",
                        color: isSelected ? "var(--color-primary)" : "inherit"
                      }}
                    >
                      <Icon size={16} />
                      {align.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ==================== TAB 3: ANIMATION ==================== */}
        {activeTab === "animation" && (
          <div>
            <div className="form-group">
              <label className="form-label">รูปแบบ Animation</label>
              <select
                className="form-select"
                value={selectedSection.animation?.type || "fade"}
                onChange={(e) => handleAnimationChange("type", e.target.value)}
              >
                <option value="none">ไม่มี Animation (None)</option>
                <option value="fade">ค่อยๆ ปรากฏ (Fade In)</option>
                <option value="slideUp">เลื่อนขึ้น (Slide Up)</option>
                <option value="slideLeft">เลื่อนจากซ้าย (Slide Left)</option>
                <option value="zoom">ขยายเข้า (Zoom In)</option>
                <option value="float">ลอยเบาๆ (Floating Effect)</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                ความเร็วในการเคลื่อนไหว ({selectedSection.animation?.duration || 600} ms)
              </label>
              <input
                type="range"
                min="200"
                max="1500"
                step="50"
                value={selectedSection.animation?.duration || 600}
                onChange={(e) => handleAnimationChange("duration", parseInt(e.target.value, 10))}
                style={{ width: "100%" }}
              />
            </div>
          </div>
        )}

        {/* ==================== TAB 4: ADVANCED ==================== */}
        {activeTab === "advanced" && (
          <div>
            <div className="form-group">
              <label className="form-label">รหัสอ้างอิง Section (ID)</label>
              <input
                type="text"
                className="form-input"
                value={selectedSection.id}
                disabled
                style={{ background: "#F2EDF0", color: "var(--color-text-muted)" }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">การแสดงผลตามอุปกรณ์</label>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked /> แสดงบนคอมพิวเตอร์ (Desktop)
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked /> แสดงบนแท็บเล็ต (Tablet)
                </label>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", cursor: "pointer" }}>
                  <input type="checkbox" defaultChecked /> แสดงบนสมาร์ตโฟน (Mobile)
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
