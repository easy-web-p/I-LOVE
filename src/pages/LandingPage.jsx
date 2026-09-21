import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { TEMPLATES } from "../config/templates";
import {
  Sparkles,
  Heart,
  ArrowRight,
  Gift,
  Clock,
  Lock,
  Calendar,
  Layers,
  ChevronDown,
  Check,
  Play,
  Eye,
  Star
} from "lucide-react";
import confetti from "canvas-confetti";

export function LandingPage({ setActivePage, onOpenAuth, onSelectTemplate }) {
  const { currentUser } = useApp();
  const [activeFaq, setActiveFaq] = useState(null);
  const [previewHeartCount, setPreviewHeartCount] = useState(128);

  const handleHeroHeart = () => {
    setPreviewHeartCount((c) => c + 1);
    confetti({
      particleCount: 25,
      spread: 45,
      origin: { y: 0.55 },
      colors: ["#E85D8E", "#FF69B4", "#FFC0CB"]
    });
  };

  const faqs = [
    {
      q: "จำเป็นต้องมีความรู้เรื่องการเขียนโค้ดไหม?",
      a: "ไม่ต้องเลยครับ! ระบบ ILOVE ออกแบบมาให้ทุกคนสามารถเลือก Template ปรับแต่งข้อความ อัปโหลดรูปภาพ และกดเผยแพร่เว็บไซต์ได้ภายในเวลาไม่กี่นาที"
    },
    {
      q: "สามารถส่งเป็นของขวัญเซอร์ไพรส์ที่เปิดตามเวลาได้ไหม?",
      a: "ได้แน่นอนครับ! ฟีเจอร์ Scheduled Reveal ช่วยให้คุณตั้งวันและเวลาเปิดเว็บล่วงหน้าได้ เช่น เวลาเที่ยงคืนวันเกิด เมื่อผู้รับเปิดลิงก์ก่อนเวลาจะเจอกล่องของขวัญและตัวนับถอยหลัง"
    },
    {
      q: "ล็อกรหัสผ่านเว็บไซต์ได้หรือไม่?",
      a: "สามารถทำได้ครับ คุณสามารถตั้งค่า Privacy เป็นแบบใส่รหัสผ่าน เพื่อให้เฉพาะคนที่คุณบอกรหัสผ่านเท่านั้นที่สามารถเปิดดูเรื่องราวของคุณได้"
    },
    {
      q: "ข้อมูลและรูปภาพจะหายไปไหมหลังจากสร้างเสร็จ?",
      a: "ไม่หายแน่นอนครับ ระบบมีคลังความทรงจำ (Memory Library) ระยะยาว ข้อมูลรูปภาพและเหตุการณ์ต่างๆ จะถูกบันทึกไว้ในระบบ Cloud คุณสามารถนำข้อมูลเดิมไปสร้างเว็บไซต์ในโอกาสต่อๆ ไปได้ตลอดเวลา"
    }
  ];

  return (
    <div style={{ overflowX: "hidden" }}>
      {/* 1. HERO SECTION */}
      <section
        style={{
          position: "relative",
          padding: "70px 20px 80px",
          background: "radial-gradient(ellipse at top, rgba(232, 93, 142, 0.12) 0%, rgba(255, 249, 251, 1) 70%)"
        }}
      >
        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          {/* Floating Pill Badge */}
          <div
            className="badge badge-pill-primary"
            style={{
              padding: "8px 18px",
              fontSize: "14px",
              marginBottom: "20px",
              display: "inline-flex"
            }}
          >
            <Sparkles size={16} style={{ marginRight: "6px" }} />
            แพลตฟอร์มสร้างเว็บไซต์ความทรงจำ & เซอร์ไพรส์อันดับ 1
          </div>

          {/* Headline */}
          <h1
            style={{
              fontSize: "clamp(34px, 5.5vw, 62px)",
              fontFamily: "var(--font-heading)",
              lineHeight: 1.2,
              marginBottom: "20px",
              color: "var(--color-text-primary)"
            }}
          >
            เปลี่ยนความทรงจำ <br />
            <span
              style={{
                background: "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}
            >
              ให้กลายเป็นเว็บไซต์แสนพิเศษ
            </span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(16px, 2.5vw, 20px)",
              color: "var(--color-text-secondary)",
              maxWidth: "680px",
              margin: "0 auto 36px",
              lineHeight: 1.6
            }}
          >
            สร้างเว็บไซต์วันเกิด วันครบรอบ บอกรัก และรวมเรื่องราวสุดประทับใจได้ง่ายๆ จาก Template สำเร็จรูป โดยไม่ต้องเขียนโค้ดแม้แต่บรรทัดเดียว
          </p>

          {/* CTA Buttons */}
          <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap", marginBottom: "50px" }}>
            <button
              onClick={() => setActivePage("project-wizard")}
              className="btn btn-primary btn-lg"
            >
              <Gift size={20} />
              สร้างเว็บไซต์ฟรี
            </button>
            <button
              onClick={() => {
                const sec = document.getElementById("templates-preview");
                if (sec) sec.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn btn-secondary btn-lg"
            >
              <Eye size={20} />
              ดูเว็บไซต์ตัวอย่าง
            </button>
          </div>

          {/* Interactive Hero Live Preview Card */}
          <div
            className="card"
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              padding: "30px 24px",
              borderRadius: "var(--radius-lg)",
              background: "#FFFFFF",
              border: "2px solid rgba(232, 93, 142, 0.2)",
              boxShadow: "0 20px 50px rgba(232, 93, 142, 0.15)",
              textAlign: "center",
              position: "relative"
            }}
          >
            <div
              style={{
                position: "absolute",
                top: "14px",
                right: "16px",
                fontSize: "12px",
                background: "var(--color-primary-light)",
                color: "var(--color-primary)",
                padding: "4px 10px",
                borderRadius: "var(--radius-pill)",
                fontWeight: 600
              }}
            >
              ✨ ลองสัมผัสตัวอย่างสด
            </div>

            <div style={{ fontSize: "36px", marginBottom: "10px" }}>🎂💌</div>
            <h3 style={{ fontFamily: "var(--font-heading)", fontSize: "24px", color: "var(--color-primary)", marginBottom: "8px" }}>
              Happy Birthday เมย์ ❤️
            </h3>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "15px", maxWidth: "520px", margin: "0 auto 16px" }}>
              “ขอบคุณที่เข้ามาเป็นรอยยิ้มและความสดใสในชีวิตนะ ขอให้มีความสุขที่สุดในโลก!”
            </p>

            <div style={{ display: "flex", justifyContent: "center", gap: "12px", alignItems: "center" }}>
              <button
                onClick={handleHeroHeart}
                className="btn btn-primary btn-sm"
                style={{ borderRadius: "var(--radius-pill)" }}
              >
                <Heart size={16} fill="#FFF" />
                ส่งความรัก ({previewHeartCount})
              </button>
              <button
                onClick={() => setActivePage("project-wizard")}
                className="btn btn-secondary btn-sm"
              >
                ใช้เทมเพลตนี้สร้างทันที
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS (3 Simple Steps) */}
      <section style={{ padding: "60px 20px", background: "var(--color-surface)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "28px", color: "var(--color-text-primary)", marginBottom: "10px" }}>
              สร้างเว็บไซต์ใน 3 ขั้นตอนง่ายๆ
            </h2>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "16px" }}>
              เปลี่ยนเรื่องราวของคุณให้เป็นของขวัญที่มีความหมายที่สุด
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "24px"
            }}
          >
            {[
              {
                step: "01",
                title: "เลือก Template ที่ใช่",
                desc: "มีรูปแบบเฉพาะสำหรับวันเกิด วันครบรอบ บอกรัก หรือทริปท่องเที่ยว",
                icon: Layers
              },
              {
                step: "02",
                title: "ใส่เรื่องราว & รูปภาพ",
                desc: "พิมพ์ข้อความแทนใจ แนบรูปถ่าย และเลือกลูกเล่นกล่องของขวัญลับ",
                icon: Heart
              },
              {
                step: "03",
                title: "แชร์ให้คนสำคัญ",
                desc: "ส่งลิงก์ หรือ QR Code ให้ผู้รับเปิดดูได้ทั้งบนคอมพิวเตอร์และมือถือ",
                icon: Sparkles
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="card card-hoverable"
                  style={{
                    padding: "32px 24px",
                    textAlign: "center",
                    position: "relative",
                    borderRadius: "var(--radius-lg)"
                  }}
                >
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "16px",
                      background: "var(--color-primary-light)",
                      color: "var(--color-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 18px"
                    }}
                  >
                    <Icon size={26} />
                  </div>
                  <div
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "var(--color-primary)",
                      marginBottom: "6px",
                      letterSpacing: "1px"
                    }}
                  >
                    STEP {item.step}
                  </div>
                  <h3 style={{ fontSize: "18px", marginBottom: "8px", color: "var(--color-text-primary)" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. POPULAR TEMPLATES */}
      <section id="templates-preview" style={{ padding: "70px 20px", background: "var(--color-bg)" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <div className="badge badge-pill-primary" style={{ marginBottom: "8px" }}>
                TEMPLATES
              </div>
              <h2 style={{ fontSize: "28px", color: "var(--color-text-primary)" }}>
                Template ยอดนิยม
              </h2>
            </div>
            <button
              onClick={() => setActivePage("templates")}
              className="btn btn-ghost"
              style={{ color: "var(--color-primary)", fontWeight: 600 }}
            >
              ดู Template ทั้งหมด ({TEMPLATES.length})
              <ArrowRight size={16} />
            </button>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px"
            }}
          >
            {TEMPLATES.slice(0, 3).map((tpl) => (
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
                <div style={{ position: "relative", height: "190px", overflow: "hidden" }}>
                  <img
                    src={tpl.thumbnail}
                    alt={tpl.name}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <span
                    className="badge badge-published"
                    style={{
                      position: "absolute",
                      top: "12px",
                      left: "12px",
                      background: "rgba(255, 255, 255, 0.9)",
                      color: "var(--color-primary)"
                    }}
                  >
                    {tpl.category}
                  </span>
                </div>

                <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--color-text-primary)", marginBottom: "6px" }}>
                    {tpl.name}
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-secondary)", marginBottom: "18px", flex: 1 }}>
                    {tpl.description}
                  </p>

                  <button
                    onClick={() => {
                      if (onSelectTemplate) onSelectTemplate(tpl.id);
                      setActivePage("project-wizard");
                    }}
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                  >
                    ใช้ Template นี้สร้างเว็บไซต์
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. KEY FEATURES (Memory, Timeline, Countdown, Scheduled Reveal, Password) */}
      <section style={{ padding: "70px 20px", background: "var(--color-surface)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <h2 style={{ fontSize: "28px", color: "var(--color-text-primary)", marginBottom: "10px" }}>
              ฟีเจอร์ที่ออกแบบมาเพื่อความทรงจำโดยเฉพาะ
            </h2>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "16px" }}>
              ครบครันทุกสิ่งที่จำเป็นสำหรับสร้างความประทับใจให้คนสำคัญ
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: "20px"
            }}
          >
            {[
              {
                icon: Heart,
                title: "คลังความทรงจำส่วนตัว",
                desc: "เก็บรูปภาพ เรื่องราว และวันสำคัญไว้ระยะยาว นำมาสร้างเว็บใหม่ได้หลายครั้ง"
              },
              {
                icon: Clock,
                title: "Timeline & Countdown",
                desc: "เส้นเวลาเล่าเรื่องราวความผูกพัน พร้อมตัวนับวันคู่รักและเวลานับถอยหลัง"
              },
              {
                icon: Gift,
                title: "Scheduled Reveal 🎁",
                desc: "ตั้งเวลาเปิดเซอร์ไพรส์ล่วงหน้า เมื่อเปิดก่อนเวลาจะเจอกล่องของขวัญล็อกไว้"
              },
              {
                icon: Lock,
                title: "Password Protection",
                desc: "ล็อกรหัสผ่านเฉพาะคุณกับคนสำคัญ ปลอดภัยและเป็นส่วนตัวสูงสุด"
              }
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={i}
                  className="card card-hoverable"
                  style={{
                    padding: "24px",
                    borderRadius: "var(--radius-md)"
                  }}
                >
                  <div
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "12px",
                      background: "var(--color-primary-light)",
                      color: "var(--color-primary)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "14px"
                    }}
                  >
                    <Icon size={22} />
                  </div>
                  <h3 style={{ fontSize: "17px", color: "var(--color-text-primary)", marginBottom: "6px" }}>
                    {f.title}
                  </h3>
                  <p style={{ fontSize: "13.5px", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. PRICING PREVIEW */}
      <section style={{ padding: "70px 20px", background: "var(--color-bg)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "28px", color: "var(--color-text-primary)", marginBottom: "10px" }}>
            ราคาที่เข้าถึงได้เพื่อทุกความทรงจำ
          </h2>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "16px", marginBottom: "40px" }}>
            เริ่มใช้งานฟรี หรืออัปเกรดเพื่อฟีเจอร์ระดับพรีเมียม
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "24px",
              maxWidth: "860px",
              margin: "0 auto"
            }}
          >
            {/* Free Tier */}
            <div
              className="card"
              style={{
                padding: "32px 24px",
                borderRadius: "var(--radius-lg)",
                textAlign: "left"
              }}
            >
              <h3 style={{ fontSize: "20px", marginBottom: "4px" }}>แผนฟรี (FREE)</h3>
              <p style={{ fontSize: "13.5px", color: "var(--color-text-secondary)", marginBottom: "16px" }}>
                สำหรับสร้างเว็บไซต์ของขวัญทั่วไป
              </p>
              <div style={{ fontSize: "32px", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "20px" }}>
                ฿0 <span style={{ fontSize: "14px", fontWeight: 400, color: "var(--color-text-muted)" }}>/ ตลอดไป</span>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", marginBottom: "24px" }}>
                <li>✓ สร้างเว็บไซต์และเผยแพร่ได้</li>
                <li>✓ ใช้ Template ฟรี</li>
                <li>✓ อัปโหลดรูปภาพได้</li>
                <li>✓ ฟังก์ชัน Countdown</li>
              </ul>
              <button
                onClick={() => setActivePage("project-wizard")}
                className="btn btn-secondary"
                style={{ width: "100%" }}
              >
                เริ่มสร้างฟรี
              </button>
            </div>

            {/* Premium Tier */}
            <div
              className="card"
              style={{
                padding: "32px 24px",
                borderRadius: "var(--radius-lg)",
                textAlign: "left",
                border: "2px solid var(--color-primary)",
                position: "relative",
                background: "linear-gradient(180deg, #FFFFFF 0%, #FFF9FB 100%)"
              }}
            >
              <span
                className="badge badge-published"
                style={{
                  position: "absolute",
                  top: "-12px",
                  right: "20px",
                  background: "var(--color-primary)",
                  color: "#FFF"
                }}
              >
                ⭐ แนะนำ
              </span>
              <h3 style={{ fontSize: "20px", marginBottom: "4px" }}>พรีเมียม (PREMIUM)</h3>
              <p style={{ fontSize: "13.5px", color: "var(--color-text-secondary)", marginBottom: "16px" }}>
                สำหรับคู่รักและผู้ที่ต้องการความสมบูรณ์แบบ
              </p>
              <div style={{ fontSize: "32px", fontWeight: 700, color: "var(--color-primary)", marginBottom: "20px" }}>
                ฿199 <span style={{ fontSize: "14px", fontWeight: 400, color: "var(--color-text-muted)" }}>/ ปี</span>
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", marginBottom: "24px" }}>
                <li>✓ ปลดล็อก Template พรีเมียมทั้งหมด</li>
                <li>✓ ตั้งเวลาเปิดของขวัญ (Scheduled Reveal)</li>
                <li>✓ ล็อกรหัสผ่านเว็บไซต์ (Password Lock)</li>
                <li>✓ เครื่องเล่นเพลงความรักในเว็บ</li>
                <li>✓ ปิดโลโก้ ILOVE (Remove Branding)</li>
              </ul>
              <button
                onClick={() => setActivePage("billing")}
                className="btn btn-primary"
                style={{ width: "100%" }}
              >
                ดูรายละเอียดแพ็กเกจ
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FAQ ACCORDION */}
      <section style={{ padding: "60px 20px", background: "var(--color-surface)" }}>
        <div className="container" style={{ maxWidth: "760px" }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <h2 style={{ fontSize: "26px", color: "var(--color-text-primary)", marginBottom: "8px" }}>
              คำถามที่พบบ่อย (FAQ)
            </h2>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "15px" }}>
              ข้อสงสัยเกี่ยวกับการใช้งานและการสร้างเว็บไซต์
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="card"
                style={{
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden"
                }}
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    padding: "18px 20px",
                    background: "transparent",
                    border: "none",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    cursor: "pointer",
                    textAlign: "left",
                    fontSize: "15.5px",
                    fontWeight: 600,
                    color: "var(--color-text-primary)"
                  }}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    size={18}
                    style={{
                      transform: activeFaq === i ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 0.2s ease"
                    }}
                  />
                </button>
                {activeFaq === i && (
                  <div style={{ padding: "0 20px 20px", fontSize: "14.5px", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CALL TO ACTION */}
      <section
        style={{
          padding: "70px 20px",
          background: "linear-gradient(135deg, #FFF0F5 0%, #F4F1FE 100%)",
          textAlign: "center"
        }}
      >
        <div className="container" style={{ maxWidth: "600px" }}>
          <Heart size={36} fill="var(--color-primary)" color="var(--color-primary)" className="animate-float" style={{ margin: "0 auto 16px" }} />
          <h2 style={{ fontFamily: "var(--font-heading)", fontSize: "30px", marginBottom: "12px", color: "var(--color-text-primary)" }}>
            พร้อมสร้างของขวัญชิ้นพิเศษแล้วหรือยัง?
          </h2>
          <p style={{ fontSize: "16px", color: "var(--color-text-secondary)", marginBottom: "28px" }}>
            เริ่มบันทึกและรวบรวมเรื่องราวดีๆ เพื่อคนที่คุณรักได้แล้ววันนี้
          </p>
          <button
            onClick={() => setActivePage("project-wizard")}
            className="btn btn-primary btn-lg"
          >
            <Sparkles size={20} />
            เริ่มสร้างเว็บไซต์ฟรีทันที
          </button>
        </div>
      </section>
    </div>
  );
}
