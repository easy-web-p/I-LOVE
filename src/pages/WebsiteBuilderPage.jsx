import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { SectionPanel } from "../components/builder/SectionPanel";
import { PropertiesPanel } from "../components/builder/PropertiesPanel";
import { AddSectionModal } from "../components/builder/AddSectionModal";
import { SectionRenderer } from "../components/sections/SectionRenderer";
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  Eye,
  Share2,
  Check,
  RotateCcw,
  Sparkles,
  Maximize2,
  X,
  Layers,
  Sliders
} from "lucide-react";

export function WebsiteBuilderPage({ setActivePage, onOpenPublish, onOpenShare }) {
  const { activeProject, updateProject, saveStatus } = useApp();

  const [selectedSectionId, setSelectedSectionId] = useState(() => {
    return activeProject?.sections?.[0]?.id || null;
  });

  const [deviceMode, setDeviceMode] = useState("desktop"); // 'desktop' | 'tablet' | 'mobile'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFullscreenPreview, setIsFullscreenPreview] = useState(false);

  // Mobile Bottom Sheet State (Section 21 Mobile Builder)
  const [mobileActiveDrawer, setMobileActiveDrawer] = useState(null); // 'sections' | 'properties' | null

  if (!activeProject) {
    return (
      <div style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2>ไม่พบโปรเจกต์</h2>
        <button onClick={() => setActivePage("dashboard")} className="btn btn-primary" style={{ marginTop: "16px" }}>
          กลับสู่แดชบอร์ด
        </button>
      </div>
    );
  }

  const sections = activeProject.sections || [];
  const selectedSection = sections.find((s) => s.id === selectedSectionId) || sections[0];

  // Section Operations
  const handleUpdateSection = (updatedSection) => {
    const updatedSections = sections.map((s) => (s.id === updatedSection.id ? updatedSection : s));
    updateProject({ sections: updatedSections });
  };

  const handleReorderSection = (fromIndex, toIndex) => {
    const newSections = [...sections];
    const [moved] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, moved);
    updateProject({ sections: newSections }, false);
  };

  const handleToggleSection = (sectionId) => {
    const newSections = sections.map((s) =>
      s.id === sectionId ? { ...s, enabled: !s.enabled } : s
    );
    updateProject({ sections: newSections }, false);
  };

  const handleDuplicateSection = (sectionId) => {
    const target = sections.find((s) => s.id === sectionId);
    if (!target) return;
    const duplicated = {
      ...JSON.parse(JSON.stringify(target)),
      id: "sec-" + target.type.toLowerCase() + "-" + Date.now().toString(36),
      name: `${target.name || target.type} (สำเนา)`
    };
    const index = sections.findIndex((s) => s.id === sectionId);
    const newSections = [...sections];
    newSections.splice(index + 1, 0, duplicated);
    updateProject({ sections: newSections });
    setSelectedSectionId(duplicated.id);
  };

  const handleDeleteSection = (sectionId) => {
    if (sections.length <= 1) {
      alert("ไม่สามารถลบได้ ต้องมีอย่างน้อย 1 Section ในหน้า");
      return;
    }
    const newSections = sections.filter((s) => s.id !== sectionId);
    updateProject({ sections: newSections });
    if (selectedSectionId === sectionId) {
      setSelectedSectionId(newSections[0].id);
    }
  };

  const handleAddSection = (newSection) => {
    const newSections = [...sections, newSection];
    updateProject({ sections: newSections });
    setSelectedSectionId(newSection.id);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 68px)",
        overflow: "hidden",
        background: "var(--color-bg)"
      }}
    >
      {/* 1. TOP BUILDER TOOLBAR */}
      <div
        className="glass-header"
        style={{
          height: "56px",
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 10
        }}
      >
        {/* Left: Back & Title */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={() => setActivePage("dashboard")}
            className="btn btn-ghost btn-sm"
            title="กลับไปที่แดชบอร์ด"
          >
            <ArrowLeft size={16} />
            <span className="hide-on-mobile">แดชบอร์ด</span>
          </button>

          <div style={{ height: "20px", width: "1px", background: "var(--color-border)" }} />

          <input
            type="text"
            value={activeProject.title}
            onChange={(e) => updateProject({ title: e.target.value })}
            className="form-input"
            style={{
              fontWeight: 600,
              fontSize: "15px",
              padding: "4px 10px",
              maxWidth: "220px",
              background: "transparent",
              border: "1px solid transparent"
            }}
            title="คลิกเพื่อเปลี่ยนชื่อเว็บไซต์"
          />

          {/* Auto Save Status Badge */}
          <span
            style={{
              fontSize: "12px",
              color: saveStatus === "saving" ? "var(--color-primary)" : "var(--color-success)",
              display: "flex",
              alignItems: "center",
              gap: "4px"
            }}
          >
            <Check size={13} />
            {saveStatus === "saving" ? "กำลังบันทึก..." : "บันทึกแล้ว"}
          </span>
        </div>

        {/* Center: Device Viewport Switcher */}
        <div
          style={{
            display: "none",
            alignItems: "center",
            background: "#EDE4E9",
            borderRadius: "var(--radius-pill)",
            padding: "3px"
          }}
          className="device-switcher"
        >
          <style>{`
            @media (min-width: 900px) {
              .device-switcher { display: flex !important; }
            }
          `}</style>
          <button
            onClick={() => setDeviceMode("desktop")}
            className="btn-icon"
            style={{
              width: "32px",
              height: "32px",
              background: deviceMode === "desktop" ? "#FFF" : "transparent",
              color: deviceMode === "desktop" ? "var(--color-primary)" : "var(--color-text-secondary)"
            }}
            title="มุมมองเดสก์ท็อป"
          >
            <Monitor size={16} />
          </button>
          <button
            onClick={() => setDeviceMode("tablet")}
            className="btn-icon"
            style={{
              width: "32px",
              height: "32px",
              background: deviceMode === "tablet" ? "#FFF" : "transparent",
              color: deviceMode === "tablet" ? "var(--color-primary)" : "var(--color-text-secondary)"
            }}
            title="มุมมองแท็บเล็ต"
          >
            <Tablet size={16} />
          </button>
          <button
            onClick={() => setDeviceMode("mobile")}
            className="btn-icon"
            style={{
              width: "32px",
              height: "32px",
              background: deviceMode === "mobile" ? "#FFF" : "transparent",
              color: deviceMode === "mobile" ? "var(--color-primary)" : "var(--color-text-secondary)"
            }}
            title="มุมมองสมาร์ตโฟน"
          >
            <Smartphone size={16} />
          </button>
        </div>

        {/* Right: Actions (Preview & Publish) */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => setIsFullscreenPreview(true)}
            className="btn btn-secondary btn-sm"
            title="เปิดตัวอย่างเต็มจอ"
          >
            <Eye size={15} />
            <span className="hide-on-mobile">ดูตัวอย่าง</span>
          </button>
          <button
            onClick={() => onOpenPublish(activeProject)}
            className="btn btn-primary btn-sm"
          >
            <Share2 size={15} />
            เผยแพร่ (Publish)
          </button>
        </div>
      </div>

      {/* 2. THREE-COLUMN DESKTOP BUILDER WORKSPACE */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "280px 1fr 340px",
          flex: 1,
          overflow: "hidden",
          position: "relative"
        }}
        className="builder-grid"
      >
        <style>{`
          @media (max-width: 960px) {
            .builder-grid {
              grid-template-columns: 1fr !important;
            }
            .desktop-panel-left { display: none !important; }
            .desktop-panel-right { display: none !important; }
            .mobile-bottom-bar { display: flex !important; }
          }
          @media (min-width: 961px) {
            .mobile-bottom-bar { display: none !important; }
          }
        `}</style>

        {/* Left Column: Sections Panel */}
        <div className="desktop-panel-left" style={{ height: "100%", overflow: "hidden" }}>
          <SectionPanel
            sections={sections}
            selectedSectionId={selectedSectionId}
            onSelectSection={setSelectedSectionId}
            onReorderSection={handleReorderSection}
            onToggleSection={handleToggleSection}
            onDuplicateSection={handleDuplicateSection}
            onDeleteSection={handleDeleteSection}
            onOpenAddModal={() => setIsAddModalOpen(true)}
          />
        </div>

        {/* Center Column: Live Preview Canvas */}
        <div className="preview-canvas-wrapper">
          <div
            className={
              deviceMode === "mobile"
                ? "preview-device-mobile"
                : deviceMode === "tablet"
                ? "preview-device-tablet"
                : "preview-device-desktop"
            }
          >
            {sections
              .filter((s) => s.enabled)
              .map((sec) => (
                <SectionRenderer
                  key={sec.id}
                  section={sec}
                  theme={activeProject.theme}
                  isEditable={true}
                  isSelected={sec.id === selectedSectionId}
                  onSelect={(id) => {
                    setSelectedSectionId(id);
                    setMobileActiveDrawer("properties");
                  }}
                />
              ))}
          </div>
        </div>

        {/* Right Column: Properties Panel */}
        <div className="desktop-panel-right" style={{ height: "100%", overflow: "hidden" }}>
          <PropertiesPanel
            selectedSection={selectedSection}
            onUpdateSection={handleUpdateSection}
          />
        </div>
      </div>

      {/* 3. MOBILE BOTTOM TOOLBAR (Section 21 Mobile Builder) */}
      <div
        className="mobile-bottom-bar"
        style={{
          height: "56px",
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-border)",
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          padding: "0 10px",
          zIndex: 100
        }}
      >
        <button
          onClick={() => setMobileActiveDrawer(mobileActiveDrawer === "sections" ? null : "sections")}
          className="btn btn-ghost btn-sm"
          style={{ flexDirection: "column", gap: "2px", height: "46px" }}
        >
          <Layers size={18} />
          <span style={{ fontSize: "11px" }}>Sections</span>
        </button>

        <button
          onClick={() => setMobileActiveDrawer(mobileActiveDrawer === "properties" ? null : "properties")}
          className="btn btn-ghost btn-sm"
          style={{ flexDirection: "column", gap: "2px", height: "46px" }}
        >
          <Sliders size={18} />
          <span style={{ fontSize: "11px" }}>ตั้งค่า</span>
        </button>

        <button
          onClick={() => setIsFullscreenPreview(true)}
          className="btn btn-ghost btn-sm"
          style={{ flexDirection: "column", gap: "2px", height: "46px" }}
        >
          <Eye size={18} />
          <span style={{ fontSize: "11px" }}>ตัวอย่าง</span>
        </button>

        <button
          onClick={() => onOpenPublish(activeProject)}
          className="btn btn-primary btn-sm"
          style={{ borderRadius: "var(--radius-pill)" }}
        >
          <Share2 size={15} /> เผยแพร่
        </button>
      </div>

      {/* Mobile Drawer (Bottom Sheet) */}
      {mobileActiveDrawer && (
        <div
          className="modal-overlay"
          onClick={() => setMobileActiveDrawer(null)}
          style={{ alignItems: "flex-end", padding: 0 }}
        >
          <div
            className="modal-content"
            style={{
              width: "100%",
              maxHeight: "75vh",
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
              padding: 0
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", borderBottom: "1px solid var(--color-border)" }}>
              <span style={{ fontWeight: 600 }}>
                {mobileActiveDrawer === "sections" ? "จัดการ Sections" : "แก้ไขคุณสมบัติ"}
              </span>
              <button className="btn-icon" onClick={() => setMobileActiveDrawer(null)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ height: "60vh", overflowY: "auto" }}>
              {mobileActiveDrawer === "sections" ? (
                <SectionPanel
                  sections={sections}
                  selectedSectionId={selectedSectionId}
                  onSelectSection={(id) => {
                    setSelectedSectionId(id);
                    setMobileActiveDrawer("properties");
                  }}
                  onReorderSection={handleReorderSection}
                  onToggleSection={handleToggleSection}
                  onDuplicateSection={handleDuplicateSection}
                  onDeleteSection={handleDeleteSection}
                  onOpenAddModal={() => {
                    setIsAddModalOpen(true);
                    setMobileActiveDrawer(null);
                  }}
                />
              ) : (
                <PropertiesPanel
                  selectedSection={selectedSection}
                  onUpdateSection={handleUpdateSection}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* 4. ADD SECTION MODAL */}
      <AddSectionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSection={handleAddSection}
      />

      {/* 5. FULLSCREEN PREVIEW MODAL */}
      {isFullscreenPreview && (
        <div
          className="modal-overlay"
          style={{ padding: 0, zIndex: 11000 }}
          onClick={() => setIsFullscreenPreview(false)}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background: activeProject.theme?.backgroundColor || "#FFF9FB",
              overflowY: "auto",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Floating Button */}
            <button
              onClick={() => setIsFullscreenPreview(false)}
              className="btn btn-secondary"
              style={{
                position: "fixed",
                top: "20px",
                right: "20px",
                zIndex: 12000,
                borderRadius: "var(--radius-pill)",
                boxShadow: "var(--shadow-modal)"
              }}
            >
              <X size={18} /> ปิดหน้าพรีวิว
            </button>

            {/* Rendered Website */}
            <div style={{ maxWidth: "860px", margin: "0 auto", padding: "40px 0" }}>
              {sections
                .filter((s) => s.enabled)
                .map((sec) => (
                  <SectionRenderer
                    key={sec.id}
                    section={sec}
                    theme={activeProject.theme}
                  />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
