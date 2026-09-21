import React from "react";
import {
  X,
  Sparkles,
  MessageSquareHeart,
  Image,
  Clock,
  Timer,
  BarChart3,
  Gift,
  Quote,
  Music,
  Video,
  MousePointer,
  Heart
} from "lucide-react";

export const AVAILABLE_SECTION_TYPES = [
  {
    type: "HERO",
    name: "Hero เปิดตัว",
    description: "ส่วนเปิดตัวพร้อมรูปภาพ หัวข้อ และปุ่มเปิดเรื่องราว",
    icon: Sparkles,
    defaultContent: {
      title: "สุขสันต์วันพิเศษนะ ❤️",
      subtitle: "ขอให้วันนี้เป็นวันที่ดีที่สุดในชีวิต",
      badge: "✨ Special Day",
      imageURL: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600",
      buttonText: "เปิดดูเรื่องราวของเรา",
      buttonTarget: ""
    }
  },
  {
    type: "MESSAGE",
    name: "จดหมาย / ความในใจ",
    description: "การ์ดจดหมายเล่าความในใจสุดซึ้งและคำอวยพร",
    icon: MessageSquareHeart,
    defaultContent: {
      heading: "ข้อความจากใจถึงเธอ 💕",
      message: "ขอบคุณที่เข้ามาเป็นส่วนหนึ่งในชีวิตนะ ขอบคุณสำหรับทุกรอยยิ้ม ความอบอุ่น และความเข้าใจที่มีให้กันเสมอมา",
      author: "จาก... คนที่รักเธอที่สุด",
      date: "ตลอดไป"
    }
  },
  {
    type: "GALLERY",
    name: "อัลบั้มรูปภาพ",
    description: "คลังรูปภาพความทรงจำพร้อมเอฟเฟกต์ Lightbox",
    icon: Image,
    defaultContent: {
      title: "อัลบั้มรูปแห่งความสุข 📸",
      subtitle: "ทุกภาพถ่ายคือรอยยิ้มที่เรามีร่วมกัน",
      images: [
        { url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600", caption: "วันแรกที่เราเจอกัน" },
        { url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600", caption: "รอยยิ้มที่ชอบที่สุด" }
      ]
    }
  },
  {
    type: "TIMELINE",
    name: "เส้นเวลาความรัก",
    description: "ไทม์ไลน์เล่าเรื่องราวตามลำดับวันและเวลา",
    icon: Clock,
    defaultContent: {
      title: "เส้นทางความทรงจำ 👣",
      subtitle: "บันทึกก้าวสำคัญของเรา",
      events: [
        { date: "วันแรก", title: "ได้พบกัน", description: "จุดเริ่มต้นของเรื่องราวดีๆ" },
        { date: "ปัจจุบัน", title: "มีเธออยู่ข้างๆ", description: "และจะเดินไปด้วยกันตลอดไป" }
      ]
    }
  },
  {
    type: "COUNTDOWN",
    name: "นับเวลา / นับวันคู่รัก",
    description: "นับถอยหลังถึงวันสำคัญ หรือนับเวลาที่อยู่ด้วยกัน",
    icon: Timer,
    defaultContent: {
      title: "เรารู้จักและรักกันมาแล้ว...",
      startDate: "2024-02-14",
      mode: "COUNT_UP",
      note: "และจะรักกันมากขึ้นในทุกๆ วัน"
    }
  },
  {
    type: "MEMORY_STATISTICS",
    name: "สถิติความรัก",
    description: "การ์ดสรุปตัวเลขความทรงจำ เช่น จำนวนรูป จำนวนทริป",
    icon: BarChart3,
    defaultContent: {
      title: "สถิติเรื่องราวของเรา 📊",
      stats: [
        { label: "ทริปที่ไปด้วยกัน", value: "12", unit: "ครั้ง" },
        { label: "รูปภาพความสุข", value: "500+", unit: "รูป" },
        { label: "รอยยิ้มและเสียงหัวเราะ", value: "100%", unit: "เต็มหัวใจ" }
      ]
    }
  },
  {
    type: "SECRET_MESSAGE",
    name: "กล่องของขวัญลับ",
    description: "กล่องของขวัญเซอร์ไพรส์ แตะหรือขูดเพื่อเปิดอ่าน",
    icon: Gift,
    defaultContent: {
      title: "ของขวัญชิ้นพิเศษ 🎁",
      subtitle: "แตะที่กล่องเพื่อเปิดอ่านข้อความลับ",
      secretText: "รักเธอนะครับ และมีของขวัญเตรียมไว้ให้ด้วยนะ! ❤️",
      buttonLabel: "แตะเพื่อเปิด"
    }
  },
  {
    type: "QUOTE",
    name: "คำคมความรัก",
    description: "ประโยคซึ้งๆ ตราตรึงใจตัวหนังสือสวยงาม",
    icon: Quote,
    defaultContent: {
      quote: "การได้รักและถูกรัก คือของขวัญที่ดีที่สุดในชีวิต",
      author: "จากใจ"
    }
  }
];

export function AddSectionModal({ isOpen, onClose, onAddSection }) {
  if (!isOpen) return null;

  const handleSelect = (templateItem) => {
    const newSection = {
      id: "sec-" + templateItem.type.toLowerCase() + "-" + Date.now().toString(36),
      type: templateItem.type,
      name: templateItem.name,
      enabled: true,
      order: Date.now(),
      content: JSON.parse(JSON.stringify(templateItem.defaultContent)),
      styles: {
        backgroundColor: "transparent",
        alignment: "center"
      },
      animation: {
        type: "fade",
        duration: 600
      }
    };
    onAddSection(newSection);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: "680px", padding: "30px 26px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <h2 style={{ fontSize: "20px", color: "var(--color-text-primary)" }}>เพิ่ม Section ใหม่</h2>
            <p style={{ fontSize: "13.5px", color: "var(--color-text-secondary)" }}>
              เลือกรูปแบบ Section ที่ต้องการใส่ในเว็บไซต์ของคุณ
            </p>
          </div>
          <button className="btn-icon" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "14px",
            maxHeight: "65vh",
            overflowY: "auto",
            paddingRight: "6px"
          }}
        >
          {AVAILABLE_SECTION_TYPES.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.type}
                className="card card-hoverable"
                onClick={() => handleSelect(item)}
                style={{
                  padding: "16px",
                  cursor: "pointer",
                  display: "flex",
                  gap: "14px",
                  alignItems: "flex-start",
                  borderRadius: "var(--radius-md)"
                }}
              >
                <div
                  style={{
                    width: "42px",
                    height: "42px",
                    borderRadius: "12px",
                    background: "var(--color-primary-light)",
                    color: "var(--color-primary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                  }}
                >
                  <Icon size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: "16px", fontWeight: 600, marginBottom: "4px", color: "var(--color-text-primary)" }}>
                    {item.name}
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.4 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
