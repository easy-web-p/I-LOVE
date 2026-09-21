import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  FolderHeart,
  Plus,
  Calendar,
  MapPin,
  Tag,
  Trash2,
  Sparkles,
  Grid,
  List,
  Search,
  X,
  CheckSquare,
  Square,
  ArrowRight
} from "lucide-react";

export function MemoryLibraryPage({ setActivePage }) {
  const { memories, createMemory, deleteMemory, createProjectFromMemories } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [viewMode, setViewMode] = useState("timeline"); // 'timeline' | 'grid'
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Multi-select for "สร้างเว็บไซต์จากความทรงจำ" (Section 12.3)
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedMemoryIds, setSelectedMemoryIds] = useState([]);

  // Add Memory Modal Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [eventDate, setEventDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("LOVE");
  const [locationName, setLocationName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [tagsInput, setTagsInput] = useState("");

  const categories = [
    { id: "ALL", label: "ทั้งหมด" },
    { id: "LOVE", label: "บอกรัก & คู่รัก ❤️" },
    { id: "BIRTHDAY", label: "วันเกิด 🎂" },
    { id: "ANNIVERSARY", label: "วันครบรอบ 💍" },
    { id: "TRAVEL", label: "ท่องเที่ยว ✈️" },
    { id: "FIRST_TIME", label: "ครั้งแรก 🌟" },
    { id: "FRIENDSHIP", label: "มิตรภาพ 👥" }
  ];

  // Filtering
  const filteredMemories = memories.filter((m) => {
    const matchesCat = selectedCategory === "ALL" || m.category === selectedCategory;
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Group by Year for Timeline (2026, 2025...)
  const memoriesByYear = filteredMemories.reduce((acc, m) => {
    const year = m.eventDate ? m.eventDate.split("-")[0] : "อื่นๆ";
    if (!acc[year]) acc[year] = [];
    acc[year].push(m);
    return acc;
  }, {});

  const handleAddSubmit = (e) => {
    e.preventDefault();
    createMemory({
      title,
      description,
      eventDate,
      category,
      location: { name: locationName },
      images: imageUrl ? [imageUrl] : ["https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600"],
      tags: tagsInput.split(",").map((t) => t.trim()).filter(Boolean)
    });
    setIsAddModalOpen(false);
    // Reset form
    setTitle("");
    setDescription("");
    setImageUrl("");
    setLocationName("");
    setTagsInput("");
  };

  const handleGenerateWebsite = () => {
    if (selectedMemoryIds.length === 0) {
      alert("กรุณาเลือกความทรงจำอย่างน้อย 1 รายการเพื่อสร้างเว็บไซต์");
      return;
    }
    createProjectFromMemories(selectedMemoryIds, "ความทรงจำแสนพิเศษของเรา 💕");
    setActivePage("builder");
  };

  return (
    <div style={{ padding: "36px 20px 80px" }}>
      <div className="container">
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "32px"
          }}
        >
          <div>
            <div className="badge badge-pill-primary" style={{ marginBottom: "8px" }}>
              <FolderHeart size={14} style={{ marginRight: "4px" }} />
              MEMORY LIBRARY
            </div>
            <h1 style={{ fontSize: "28px", color: "var(--color-text-primary)" }}>
              คลังความทรงจำ ({memories.length})
            </h1>
            <p style={{ fontSize: "14.5px", color: "var(--color-text-secondary)" }}>
              บันทึกเรื่องราว รูปภาพ และความรู้สึกดีๆ ไว้ในที่เดียว
            </p>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => {
                setIsSelectMode(!isSelectMode);
                setSelectedMemoryIds([]);
              }}
              className="btn btn-secondary"
            >
              <CheckSquare size={16} />
              {isSelectMode ? "ยกเลิกเลือก" : "เลือกเพื่อสร้างเว็บ"}
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="btn btn-primary"
            >
              <Plus size={16} />
              เพิ่มความทรงจำ
            </button>
          </div>
        </div>

        {/* Action Bar for Multi-select */}
        {isSelectMode && (
          <div
            className="card"
            style={{
              padding: "16px 20px",
              marginBottom: "24px",
              background: "linear-gradient(135deg, #FFF0F5 0%, #F4F1FE 100%)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              animation: "fadeIn 0.2s ease"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <Sparkles size={18} color="var(--color-primary)" />
              <span style={{ fontWeight: 600, fontSize: "15px" }}>
                เลือกแล้ว {selectedMemoryIds.length} รายการ
              </span>
            </div>
            <button
              onClick={handleGenerateWebsite}
              className="btn btn-primary btn-sm"
              disabled={selectedMemoryIds.length === 0}
            >
              สร้างเว็บไซต์จากที่เลือกทันที <ArrowRight size={15} />
            </button>
          </div>
        )}

        {/* Filters & Search Toolbar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "32px"
          }}
        >
          {/* Categories Pill Bar */}
          <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "4px" }}>
            {categories.map((c) => {
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

          {/* Search & View Toggle */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              <input
                type="text"
                placeholder="ค้นหาความทรงจำ..."
                className="form-input"
                style={{ paddingLeft: "34px", paddingRight: "12px", minWidth: "220px" }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={16} style={{ position: "absolute", left: "12px", top: "14px", color: "var(--color-text-muted)" }} />
            </div>

            <div style={{ display: "flex", border: "1px solid var(--color-border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
              <button
                onClick={() => setViewMode("timeline")}
                className="btn-icon"
                style={{
                  background: viewMode === "timeline" ? "var(--color-primary-light)" : "#FFF",
                  color: viewMode === "timeline" ? "var(--color-primary)" : "inherit",
                  borderRadius: 0
                }}
                title="มุมมองไทม์ไลน์"
              >
                <List size={18} />
              </button>
              <button
                onClick={() => setViewMode("grid")}
                className="btn-icon"
                style={{
                  background: viewMode === "grid" ? "var(--color-primary-light)" : "#FFF",
                  color: viewMode === "grid" ? "var(--color-primary)" : "inherit",
                  borderRadius: 0
                }}
                title="มุมมองการ์ด (Grid)"
              >
                <Grid size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {filteredMemories.length === 0 && (
          <div
            className="card"
            style={{
              padding: "60px 20px",
              textAlign: "center",
              borderRadius: "var(--radius-lg)"
            }}
          >
            <FolderHeart size={48} color="var(--color-primary)" style={{ margin: "0 auto 16px", opacity: 0.6 }} />
            <h3 style={{ fontSize: "20px", marginBottom: "8px" }}>ยังไม่มีความทรงจำที่ตรงกับเงื่อนไข</h3>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "14px", marginBottom: "20px" }}>
              เริ่มบันทึกเรื่องราว รูปภาพ และวันสำคัญแรกของคุณ แล้วนำไปสร้างเว็บไซต์ได้ทุกเมื่อ
            </p>
            <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary">
              <Plus size={16} /> บันทึกความทรงจำใหม่
            </button>
          </div>
        )}

        {/* ================= TIMELINE VIEW ================= */}
        {viewMode === "timeline" && Object.keys(memoriesByYear).length > 0 && (
          <div style={{ maxWidth: "780px", margin: "0 auto" }}>
            {Object.keys(memoriesByYear)
              .sort((a, b) => b.localeCompare(a))
              .map((year) => (
                <div key={year} style={{ marginBottom: "48px" }}>
                  {/* Year Header Badge */}
                  <div
                    style={{
                      display: "inline-block",
                      fontSize: "24px",
                      fontWeight: 700,
                      fontFamily: "var(--font-heading)",
                      color: "var(--color-primary)",
                      background: "var(--color-primary-light)",
                      padding: "4px 18px",
                      borderRadius: "var(--radius-pill)",
                      marginBottom: "24px",
                      boxShadow: "var(--shadow-xs)"
                    }}
                  >
                    {year}
                  </div>

                  <div style={{ position: "relative", paddingLeft: "32px" }}>
                    <div className="timeline-stem" />

                    {memoriesByYear[year].map((mem) => {
                      const isSelected = selectedMemoryIds.includes(mem.id);
                      return (
                        <div key={mem.id} style={{ position: "relative", marginBottom: "28px" }}>
                          <div
                            className="timeline-dot"
                            style={{ position: "absolute", left: "-32px", top: "18px" }}
                          />

                          <div
                            className="card card-hoverable"
                            style={{
                              padding: "20px",
                              borderRadius: "var(--radius-md)",
                              border: isSelected ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                              cursor: isSelectMode ? "pointer" : "default"
                            }}
                            onClick={() => {
                              if (isSelectMode) {
                                setSelectedMemoryIds((prev) =>
                                  isSelected ? prev.filter((id) => id !== mem.id) : [...prev, mem.id]
                                );
                              }
                            }}
                          >
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                              <div>
                                <span className="badge badge-pill-primary" style={{ marginBottom: "6px" }}>
                                  <Calendar size={12} style={{ marginRight: "4px" }} />
                                  {mem.eventDate}
                                </span>
                                <h3 style={{ fontSize: "18px", color: "var(--color-text-primary)", fontWeight: 600 }}>
                                  {mem.title}
                                </h3>
                              </div>

                              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                {isSelectMode ? (
                                  isSelected ? (
                                    <CheckSquare size={20} color="var(--color-primary)" />
                                  ) : (
                                    <Square size={20} color="var(--color-text-muted)" />
                                  )
                                ) : (
                                  <button
                                    onClick={() => deleteMemory(mem.id)}
                                    className="btn-icon"
                                    style={{ width: "30px", height: "30px", color: "var(--color-error)" }}
                                    title="ลบความทรงจำ"
                                  >
                                    <Trash2 size={15} />
                                  </button>
                                )}
                              </div>
                            </div>

                            <p style={{ fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: "14px" }}>
                              {mem.description}
                            </p>

                            {/* Images */}
                            {mem.images && mem.images.length > 0 && (
                              <div style={{ display: "flex", gap: "10px", overflowX: "auto", marginBottom: "12px" }}>
                                {mem.images.map((img, idx) => (
                                  <img
                                    key={idx}
                                    src={img}
                                    alt={mem.title}
                                    style={{
                                      width: "140px",
                                      height: "100px",
                                      objectFit: "cover",
                                      borderRadius: "var(--radius-sm)",
                                      flexShrink: 0
                                    }}
                                  />
                                ))}
                              </div>
                            )}

                            {/* Tags & Location */}
                            <div style={{ display: "flex", gap: "12px", alignItems: "center", fontSize: "12.5px", color: "var(--color-text-muted)" }}>
                              {mem.location?.name && (
                                <span style={{ display: "flex", alignItems: "center", gap: "3px" }}>
                                  <MapPin size={13} /> {mem.location.name}
                                </span>
                              )}
                              {mem.tags && mem.tags.length > 0 && (
                                <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                                  <Tag size={13} /> {mem.tags.map((t) => `#${t}`).join(" ")}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
          </div>
        )}

        {/* ================= GRID VIEW ================= */}
        {viewMode === "grid" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              gap: "20px"
            }}
          >
            {filteredMemories.map((mem) => {
              const isSelected = selectedMemoryIds.includes(mem.id);
              return (
                <div
                  key={mem.id}
                  className="card card-hoverable"
                  style={{
                    borderRadius: "var(--radius-md)",
                    overflow: "hidden",
                    border: isSelected ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                    cursor: isSelectMode ? "pointer" : "default"
                  }}
                  onClick={() => {
                    if (isSelectMode) {
                      setSelectedMemoryIds((prev) =>
                        isSelected ? prev.filter((id) => id !== mem.id) : [...prev, mem.id]
                      );
                    }
                  }}
                >
                  {mem.images && mem.images[0] && (
                    <img
                      src={mem.images[0]}
                      alt={mem.title}
                      style={{ width: "100%", height: "160px", objectFit: "cover" }}
                    />
                  )}
                  <div style={{ padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                      <span className="badge badge-pill-primary" style={{ fontSize: "11px" }}>
                        {mem.eventDate}
                      </span>
                      {!isSelectMode && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteMemory(mem.id);
                          }}
                          className="btn-icon"
                          style={{ width: "24px", height: "24px", color: "var(--color-error)" }}
                        >
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                    <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "6px" }}>
                      {mem.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.5, marginBottom: "10px" }}>
                      {mem.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 4. ADD MEMORY MODAL */}
        {isAddModalOpen && (
          <div className="modal-overlay" onClick={() => setIsAddModalOpen(false)}>
            <div
              className="modal-content"
              style={{ maxWidth: "560px", padding: "30px 24px" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontSize: "20px", color: "var(--color-text-primary)" }}>เพิ่มความทรงจำใหม่</h2>
                <button className="btn-icon" onClick={() => setIsAddModalOpen(false)}>
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleAddSubmit}>
                <div className="form-group">
                  <label className="form-label">หัวข้อความทรงจำ</label>
                  <input
                    type="text"
                    required
                    placeholder="เช่น ทริปทะเลหัวหิน หรือ เดทแรก"
                    className="form-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">วันที่เกิดเหตุการณ์</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">หมวดหมู่</label>
                  <select
                    className="form-select"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="LOVE">ความรัก & คู่รัก ❤️</option>
                    <option value="BIRTHDAY">วันเกิด 🎂</option>
                    <option value="ANNIVERSARY">วันครบรอบ 💍</option>
                    <option value="TRAVEL">ท่องเที่ยว ✈️</option>
                    <option value="FIRST_TIME">ครั้งแรก 🌟</option>
                    <option value="FRIENDSHIP">มิตรภาพ 👥</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">เรื่องราว / บันทึกความในใจ</label>
                  <textarea
                    rows={4}
                    placeholder="เล่าความรู้สึก บรรยากาศ หรือเหตุการณ์น่ารักๆ ในวันนั้น..."
                    className="form-textarea"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">ลิงก์รูปภาพ</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    className="form-input"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">สถานที่</label>
                  <input
                    type="text"
                    placeholder="เช่น เชียงใหม่, หัวหิน, คาเฟ่ริมน้ำ"
                    className="form-input"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "24px" }}>
                  <button type="button" className="btn btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                    ยกเลิก
                  </button>
                  <button type="submit" className="btn btn-primary">
                    บันทึกความทรงจำ
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
