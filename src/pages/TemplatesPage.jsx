import React, { useState } from "react";
import { TEMPLATES, CATEGORIES } from "../config/templates";
import { SectionRenderer } from "../components/sections/SectionRenderer";
import { Layers, Sparkles, Check, Eye, X, ArrowRight } from "lucide-react";

export function TemplatesPage({ setActivePage, onSelectTemplate }) {
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [filterPlan, setFilterPlan] = useState("ALL"); // 'ALL' | 'FREE' | 'PREMIUM'
  const [previewTemplate, setPreviewTemplate] = useState(null);

  const filteredTemplates = TEMPLATES.filter((tpl) => {
    const matchesCat = selectedCategory === "ALL" || tpl.category === selectedCategory;
    const matchesPlan =
      filterPlan === "ALL" ||
      (filterPlan === "FREE" && !tpl.isPremium) ||
      (filterPlan === "PREMIUM" && tpl.isPremium);
    return matchesCat && matchesPlan;
  });

  const handleUseTemplate = (tplId) => {
    if (onSelectTemplate) onSelectTemplate(tplId);
    setActivePage("project-wizard");
  };

  return (
    <div style={{ padding: "36px 20px 80px" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <div className="badge badge-pill-primary" style={{ marginBottom: "8px" }}>
            <Layers size={14} style={{ marginRight: "4px" }} />
            TEMPLATE GALLERY
          </div>
          <h1 style={{ fontSize: "32px", color: "var(--color-text-primary)", marginBottom: "8px" }}>
            เลือก Template ที่เหมาะกับเรื่องราวของคุณ
          </h1>
          <p style={{ fontSize: "16px", color: "var(--color-text-secondary)", maxWidth: "600px", margin: "0 auto" }}>
            ออกแบบอย่างประณีต รองรับทั้งคอมพิวเตอร์และมือถือ สามารถปรับแต่งข้อความและรูปภาพได้อิสระ
          </p>
        </div>

        {/* Filters */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "36px"
          }}
        >
          {/* Categories */}
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "6px" }}>
            {CATEGORIES.map((c) => {
              const isActive = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className="btn btn-sm"
                  style={{
                    borderRadius: "var(--radius-pill)",
                    background: isActive ? "var(--color-primary)" : "var(--color-surface)",
                    color: isActive ? "#FFF" : "var(--color-text-secondary)",
                    borderColor: isActive ? "var(--color-primary)" : "var(--color-border)",
                    fontWeight: isActive ? 600 : 400
                  }}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Plan Filter (Free vs Premium) */}
          <div style={{ display: "flex", gap: "6px" }}>
            {[
              { id: "ALL", label: "ทั้งหมด" },
              { id: "FREE", label: "ฟรี (Free)" },
              { id: "PREMIUM", label: "พรีเมียม ⭐" }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterPlan(f.id)}
                className="btn btn-sm"
                style={{
                  borderRadius: "var(--radius-sm)",
                  background: filterPlan === f.id ? "var(--color-primary-light)" : "transparent",
                  color: filterPlan === f.id ? "var(--color-primary)" : "var(--color-text-secondary)",
                  borderColor: filterPlan === f.id ? "var(--color-primary)" : "var(--color-border)",
                  fontWeight: filterPlan === f.id ? 600 : 400
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px"
          }}
        >
          {filteredTemplates.map((tpl) => (
            <div
              key={tpl.id}
              className="card card-hoverable"
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <div style={{ position: "relative", height: "200px", overflow: "hidden" }}>
                <img
                  src={tpl.thumbnail}
                  alt={tpl.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", gap: "6px" }}>
                  <span className="badge" style={{ background: "rgba(255,255,255,0.9)", color: "var(--color-text-primary)" }}>
                    {tpl.category}
                  </span>
                  {tpl.isPremium && (
                    <span className="badge badge-published" style={{ background: "var(--color-primary)", color: "#FFF" }}>
                      ⭐ PREMIUM
                    </span>
                  )}
                </div>
              </div>

              <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                <h3 style={{ fontSize: "18px", color: "var(--color-text-primary)", marginBottom: "6px" }}>
                  {tpl.name}
                </h3>
                <p style={{ fontSize: "13.5px", color: "var(--color-text-secondary)", lineHeight: 1.5, marginBottom: "20px", flex: 1 }}>
                  {tpl.description}
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <button
                    onClick={() => setPreviewTemplate(tpl)}
                    className="btn btn-secondary btn-sm"
                  >
                    <Eye size={15} /> ตัวอย่าง
                  </button>
                  <button
                    onClick={() => handleUseTemplate(tpl.id)}
                    className="btn btn-primary btn-sm"
                  >
                    เลือกใช้ <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Template Fullscreen Preview Modal */}
        {previewTemplate && (
          <div className="modal-overlay" style={{ padding: 0, zIndex: 12000 }} onClick={() => setPreviewTemplate(null)}>
            <div
              style={{
                width: "100%",
                height: "100%",
                background: previewTemplate.theme?.backgroundColor || "#FFF9FB",
                overflowY: "auto",
                position: "relative"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header Floating Action Bar */}
              <div
                className="glass-header"
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  padding: "12px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  zIndex: 13000
                }}
              >
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 600 }}>{previewTemplate.name}</h3>
                  <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>
                    หมวดหมู่: {previewTemplate.category}
                  </span>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleUseTemplate(previewTemplate.id)}
                    className="btn btn-primary btn-sm"
                  >
                    <Check size={16} /> ใช้ Template นี้
                  </button>
                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className="btn btn-secondary btn-sm"
                  >
                    <X size={16} /> ปิด
                  </button>
                </div>
              </div>

              {/* Rendered Template Sections */}
              <div style={{ maxWidth: "860px", margin: "70px auto 40px", padding: "20px" }}>
                {previewTemplate.sections.map((sec) => (
                  <SectionRenderer
                    key={sec.id}
                    section={sec}
                    theme={previewTemplate.theme}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
