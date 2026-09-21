import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { TEMPLATES, CATEGORIES } from "../config/templates";
import {
  Sparkles,
  Heart,
  ArrowRight,
  ArrowLeft,
  Check,
  Calendar,
  Image,
  Layers,
  Gift
} from "lucide-react";

export function ProjectWizardPage({ setActivePage, selectedTemplateId }) {
  const { createProject, memories } = useApp();

  const [step, setStep] = useState(1); // 1: Occasion, 2: Template, 3: Basic Info, 4: Images & Memories

  // Form State
  const [occasion, setOccasion] = useState("BIRTHDAY");
  const [templateId, setTemplateId] = useState(selectedTemplateId || "birthday-pink-01");
  const [title, setTitle] = useState("Happy Birthday คนพิเศษ 🎂");
  const [recipientName, setRecipientName] = useState("คนพิเศษ");
  const [eventDate, setEventDate] = useState("2026-10-20");
  const [coverImage, setCoverImage] = useState("https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800");
  const [selectedMemoryIds, setSelectedMemoryIds] = useState([]);

  const occasions = [
    { id: "BIRTHDAY", label: "วันเกิด 🎂", desc: "ส่งคำอวยพรและเค้กวันเกิดสุดพิเศษ" },
    { id: "ANNIVERSARY", label: "วันครบรอบ 💍", desc: "เฉลิมฉลองการเดินทางความรักของเรา" },
    { id: "LOVE", label: "บอกรัก & ความรู้สึก ❤️", desc: "สารภาพรักและส่งจดหมายแทนใจ" },
    { id: "SURPRISE", label: "ของขวัญเซอร์ไพรส์ 🎁", desc: "กล่องของขวัญลับล็อกเวลาเปิด" },
    { id: "TRAVEL", label: "ทริปท่องเที่ยว ✈️", desc: "บันทึกรูปภาพและเส้นทางท่องเที่ยว" },
    { id: "GRADUATION", label: "วันรับปริญญา 🎓", desc: "แสดงความยินดีในวันแห่งความสำเร็จ" },
    { id: "FRIENDSHIP", label: "เพื่อน & มิตรภาพ 🌟", desc: "รวมภาพและความทรงจำกับเพื่อนรัก" },
    { id: "WEDDING", label: "งานแต่งงาน 👰🤵", desc: "บันทึกวันสำคัญที่สุดของชีวิตคู่" }
  ];

  const handleFinish = () => {
    const newProj = createProject({
      title,
      description: `สำหรับ ${recipientName}`,
      category: occasion,
      templateId,
      coverImage
    });
    setActivePage("builder");
  };

  const stepsList = ["โอกาส", "Template", "ข้อมูลพื้นฐาน", "รูป & ความทรงจำ"];

  return (
    <div style={{ padding: "40px 20px 80px" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Step Progress Bar */}
        <div style={{ marginBottom: "36px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", position: "relative", marginBottom: "12px" }}>
            <div
              style={{
                position: "absolute",
                top: "14px",
                left: "24px",
                right: "24px",
                height: "2px",
                background: "var(--color-border)",
                zIndex: 1
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "14px",
                left: "24px",
                width: `${((step - 1) / (stepsList.length - 1)) * 100}%`,
                height: "2px",
                background: "var(--color-primary)",
                zIndex: 1,
                transition: "width 0.3s ease"
              }}
            />

            {stepsList.map((stLabel, idx) => {
              const currentStepIdx = idx + 1;
              const isCompleted = step > currentStepIdx;
              const isActive = step === currentStepIdx;

              return (
                <div
                  key={idx}
                  style={{
                    position: "relative",
                    zIndex: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                  }}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      background: isCompleted || isActive ? "var(--color-primary)" : "var(--color-surface)",
                      color: isCompleted || isActive ? "#FFF" : "var(--color-text-muted)",
                      border: `2px solid ${isCompleted || isActive ? "var(--color-primary)" : "var(--color-border)"}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "13px",
                      fontWeight: 700,
                      marginBottom: "6px"
                    }}
                  >
                    {isCompleted ? <Check size={16} /> : currentStepIdx}
                  </div>
                  <span
                    style={{
                      fontSize: "12.5px",
                      fontWeight: isActive ? 600 : 400,
                      color: isActive ? "var(--color-primary)" : "var(--color-text-muted)"
                    }}
                  >
                    {stLabel}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Container */}
        <div
          className="card"
          style={{
            padding: "36px 30px",
            borderRadius: "var(--radius-lg)"
          }}
        >
          {/* ================= STEP 1: CHOOSE OCCASION ================= */}
          {step === 1 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: "28px" }}>
                <h2 style={{ fontSize: "24px", color: "var(--color-text-primary)", marginBottom: "6px" }}>
                  เลือกโอกาสสำคัญของคุณ
                </h2>
                <p style={{ fontSize: "14.5px", color: "var(--color-text-secondary)" }}>
                  คุณกำลังจะสร้างเว็บไซต์เนื่องในโอกาสอะไร?
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "14px",
                  marginBottom: "32px"
                }}
              >
                {occasions.map((occ) => {
                  const isSelected = occasion === occ.id;
                  return (
                    <div
                      key={occ.id}
                      onClick={() => {
                        setOccasion(occ.id);
                        if (occ.id === "BIRTHDAY") setTitle("Happy Birthday คนพิเศษ 🎂");
                        if (occ.id === "ANNIVERSARY") setTitle("Happy Our Anniversary 🌹");
                        if (occ.id === "LOVE") setTitle("มีข้อความพิเศษอยากบอกเธอ ❤️");
                        if (occ.id === "TRAVEL") setTitle("ไดอารี่ทริปท่องเที่ยวของเรา ✈️");
                      }}
                      className="card"
                      style={{
                        padding: "18px",
                        cursor: "pointer",
                        borderRadius: "var(--radius-md)",
                        border: isSelected
                          ? "2px solid var(--color-primary)"
                          : "1px solid var(--color-border)",
                        background: isSelected ? "var(--color-primary-light)" : "var(--color-surface)",
                        transition: "all 0.15s ease"
                      }}
                    >
                      <div style={{ fontSize: "17px", fontWeight: 600, color: "var(--color-text-primary)", marginBottom: "4px" }}>
                        {occ.label}
                      </div>
                      <div style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.4 }}>
                        {occ.desc}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= STEP 2: CHOOSE TEMPLATE ================= */}
          {step === 2 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: "28px" }}>
                <h2 style={{ fontSize: "24px", color: "var(--color-text-primary)", marginBottom: "6px" }}>
                  เลือก Template ที่ชอบ
                </h2>
                <p style={{ fontSize: "14.5px", color: "var(--color-text-secondary)" }}>
                  Template สำเร็จรูปพร้อมธีมสีและสไตล์ที่เข้ากัน
                </p>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "16px",
                  marginBottom: "32px"
                }}
              >
                {TEMPLATES.map((tpl) => {
                  const isSelected = templateId === tpl.id;
                  return (
                    <div
                      key={tpl.id}
                      onClick={() => setTemplateId(tpl.id)}
                      className="card"
                      style={{
                        borderRadius: "var(--radius-md)",
                        overflow: "hidden",
                        cursor: "pointer",
                        border: isSelected ? "2px solid var(--color-primary)" : "1px solid var(--color-border)",
                        boxShadow: isSelected ? "0 8px 24px rgba(232, 93, 142, 0.25)" : "none"
                      }}
                    >
                      <img
                        src={tpl.thumbnail}
                        alt={tpl.name}
                        style={{ width: "100%", height: "130px", objectFit: "cover" }}
                      />
                      <div style={{ padding: "14px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                          <span style={{ fontSize: "15px", fontWeight: 600, color: "var(--color-text-primary)" }}>
                            {tpl.name}
                          </span>
                          {isSelected && <Check size={16} color="var(--color-primary)" />}
                        </div>
                        <p style={{ fontSize: "12.5px", color: "var(--color-text-secondary)", lineHeight: 1.4 }}>
                          {tpl.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= STEP 3: BASIC INFO ================= */}
          {step === 3 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: "28px" }}>
                <h2 style={{ fontSize: "24px", color: "var(--color-text-primary)", marginBottom: "6px" }}>
                  กรอกข้อมูลพื้นฐาน
                </h2>
                <p style={{ fontSize: "14.5px", color: "var(--color-text-secondary)" }}>
                  ระบบจะนำข้อมูลนี้ไปสร้างหน้าเว็บไซต์ให้ทันที
                </p>
              </div>

              <div style={{ maxWidth: "520px", margin: "0 auto 28px" }}>
                <div className="form-group">
                  <label className="form-label">ชื่อเว็บไซต์ / หัวข้อของขวัญ</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="เช่น Happy Birthday เมย์ ❤️"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">ชื่อผู้รับ (คนสำคัญ)</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="เช่น เมย์, แฟน, คุณแม่"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">วันสำคัญ (Event Date)</label>
                  <input
                    type="date"
                    required
                    className="form-input"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 4: IMAGES & MEMORIES ================= */}
          {step === 4 && (
            <div>
              <div style={{ textAlign: "center", marginBottom: "28px" }}>
                <h2 style={{ fontSize: "24px", color: "var(--color-text-primary)", marginBottom: "6px" }}>
                  รูปภาพ & ความทรงจำ
                </h2>
                <p style={{ fontSize: "14.5px", color: "var(--color-text-secondary)" }}>
                  เลือกรูปหน้าปก หรือเลือกดึงความทรงจำจากคลังเข้ามาจัดวาง
                </p>
              </div>

              <div style={{ maxWidth: "560px", margin: "0 auto 28px" }}>
                <div className="form-group">
                  <label className="form-label">ลิงก์รูปภาพหน้าปก (Cover Image)</label>
                  <input
                    type="text"
                    className="form-input"
                    value={coverImage}
                    onChange={(e) => setCoverImage(e.target.value)}
                  />
                  {coverImage && (
                    <div style={{ marginTop: "12px", borderRadius: "10px", overflow: "hidden", maxHeight: "180px" }}>
                      <img src={coverImage} alt="Cover Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  )}
                </div>

                {memories.length > 0 && (
                  <div className="form-group">
                    <label className="form-label">เลือกความทรงจำจากคลัง ({memories.length} รายการ)</label>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      {memories.map((mem) => {
                        const isChecked = selectedMemoryIds.includes(mem.id);
                        return (
                          <div
                            key={mem.id}
                            onClick={() => {
                              setSelectedMemoryIds((prev) =>
                                isChecked ? prev.filter((id) => id !== mem.id) : [...prev, mem.id]
                              );
                            }}
                            style={{
                              padding: "10px 14px",
                              borderRadius: "var(--radius-sm)",
                              border: "1px solid var(--color-border)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              cursor: "pointer",
                              background: isChecked ? "var(--color-primary-light)" : "var(--color-surface)"
                            }}
                          >
                            <span style={{ fontSize: "14px", fontWeight: 500 }}>{mem.title}</span>
                            <span style={{ fontSize: "12px", color: "var(--color-text-muted)" }}>{mem.eventDate}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{ display: "flex", justifyContent: "space-between", borderTop: "1px solid var(--color-border)", paddingTop: "20px" }}>
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="btn btn-secondary"
              >
                <ArrowLeft size={16} /> ย้อนกลับ
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setActivePage("dashboard")}
                className="btn btn-ghost"
              >
                ยกเลิก
              </button>
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="btn btn-primary"
              >
                ถัดไป <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleFinish}
                className="btn btn-primary"
              >
                <Sparkles size={16} />
                สร้างและเข้าสู่ Website Builder
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
