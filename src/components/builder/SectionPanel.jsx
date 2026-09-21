import React from "react";
import {
  Plus,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  ChevronUp,
  ChevronDown,
  Layers,
  Sparkles,
  MessageSquareHeart,
  Image,
  Clock,
  Timer,
  BarChart3,
  Gift,
  Quote,
  Music,
  Video
} from "lucide-react";

export function SectionPanel({
  sections,
  selectedSectionId,
  onSelectSection,
  onReorderSection,
  onToggleSection,
  onDuplicateSection,
  onDeleteSection,
  onOpenAddModal
}) {
  const getSectionIcon = (type) => {
    switch (type) {
      case "HERO": return Sparkles;
      case "MESSAGE": return MessageSquareHeart;
      case "GALLERY": return Image;
      case "TIMELINE": return Clock;
      case "COUNTDOWN": return Timer;
      case "MEMORY_STATISTICS": return BarChart3;
      case "SECRET_MESSAGE": return Gift;
      case "QUOTE": return Quote;
      case "MUSIC": return Music;
      case "VIDEO": return Video;
      default: return Layers;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        background: "var(--color-surface)",
        borderRight: "1px solid var(--color-border)"
      }}
    >
      {/* Panel Header */}
      <div
        style={{
          padding: "16px",
          borderBottom: "1px solid var(--color-border)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Layers size={18} color="var(--color-primary)" />
          <span style={{ fontWeight: 600, fontSize: "15px" }}>Sections ในหน้า</span>
          <span
            className="badge badge-pill-primary"
            style={{ fontSize: "11px", padding: "2px 8px" }}
          >
            {sections.length}
          </span>
        </div>
      </div>

      {/* Sections List */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px",
          display: "flex",
          flexDirection: "column",
          gap: "8px"
        }}
      >
        {sections.map((sec, idx) => {
          const Icon = getSectionIcon(sec.type);
          const isSelected = sec.id === selectedSectionId;

          return (
            <div
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className="card"
              style={{
                padding: "12px 14px",
                borderRadius: "var(--radius-sm)",
                border: isSelected
                  ? "2px solid var(--color-primary)"
                  : "1px solid var(--color-border)",
                background: isSelected ? "var(--color-primary-light)" : "var(--color-surface)",
                cursor: "pointer",
                opacity: sec.enabled ? 1 : 0.6,
                transition: "all 0.15s ease"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", overflow: "hidden" }}>
                  <Icon
                    size={16}
                    color={isSelected ? "var(--color-primary)" : "var(--color-text-secondary)"}
                  />
                  <span
                    style={{
                      fontSize: "13.5px",
                      fontWeight: isSelected ? 600 : 500,
                      color: isSelected ? "var(--color-primary)" : "var(--color-text-primary)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis"
                    }}
                  >
                    {sec.name || sec.type}
                  </span>
                </div>

                {/* Move Controls */}
                <div style={{ display: "flex", alignItems: "center", gap: "2px" }} onClick={(e) => e.stopPropagation()}>
                  <button
                    disabled={idx === 0}
                    onClick={() => onReorderSection(idx, idx - 1)}
                    className="btn-icon"
                    style={{ width: "24px", height: "24px", opacity: idx === 0 ? 0.3 : 1 }}
                    title="เลื่อนขึ้น"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    disabled={idx === sections.length - 1}
                    onClick={() => onReorderSection(idx, idx + 1)}
                    className="btn-icon"
                    style={{ width: "24px", height: "24px", opacity: idx === sections.length - 1 ? 0.3 : 1 }}
                    title="เลื่อนลง"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>
              </div>

              {/* Action Toolbar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderTop: "1px dashed rgba(0,0,0,0.06)",
                  paddingTop: "6px",
                  fontSize: "11px"
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <span style={{ color: "var(--color-text-muted)" }}>
                  {sec.type}
                </span>

                <div style={{ display: "flex", gap: "4px" }}>
                  <button
                    onClick={() => onToggleSection(sec.id)}
                    className="btn-icon"
                    style={{ width: "26px", height: "26px" }}
                    title={sec.enabled ? "ซ่อน Section" : "แสดง Section"}
                  >
                    {sec.enabled ? <Eye size={13} /> : <EyeOff size={13} color="var(--color-text-muted)" />}
                  </button>
                  <button
                    onClick={() => onDuplicateSection(sec.id)}
                    className="btn-icon"
                    style={{ width: "26px", height: "26px" }}
                    title="ทำซ้ำ"
                  >
                    <Copy size={13} />
                  </button>
                  <button
                    onClick={() => onDeleteSection(sec.id)}
                    className="btn-icon"
                    style={{ width: "26px", height: "26px", color: "var(--color-error)" }}
                    title="ลบ Section"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Section Button */}
      <div style={{ padding: "14px", borderTop: "1px solid var(--color-border)" }}>
        <button
          onClick={onOpenAddModal}
          className="btn btn-secondary"
          style={{ width: "100%", borderRadius: "var(--radius-sm)", fontWeight: 600 }}
        >
          <Plus size={16} />
          เพิ่ม Section
        </button>
      </div>
    </div>
  );
}
