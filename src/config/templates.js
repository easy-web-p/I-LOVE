export const TEMPLATES = [
  {
    id: "birthday-pink-01",
    name: "Sweet Birthday Pink",
    description: "ธีมวันเกิดโทนชมพูหวานละมุน พร้อมกล่องของขวัญเซอร์ไพรส์และตัวนับวันเกิด",
    category: "BIRTHDAY",
    isPremium: false,
    thumbnail: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80",
    theme: {
      backgroundColor: "#FFF9FB",
      textColor: "#33252E",
      accentColor: "#E85D8E",
      headingFont: "Mali",
      bodyFont: "Noto Sans Thai"
    },
    sections: [
      {
        id: "sec-hero-1",
        type: "HERO",
        name: "ข้อความต้อนรับ",
        enabled: true,
        order: 1,
        content: {
          title: "สุขสันต์วันเกิดนะ คนเก่งของเค้า 🎂✨",
          subtitle: "ขอให้ปีนี้และทุกๆ ปีของเธอเต็มไปด้วยรอยยิ้มและความสุขที่สุดในโลก",
          badge: "🎉 Happy Birthday!",
          imageURL: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=900&auto=format&fit=crop&q=80",
          buttonText: "เปิดดูความทรงจำของเรา",
          buttonTarget: "sec-message-2"
        },
        styles: {
          alignment: "center",
          backgroundColor: "transparent",
          textColor: "#33252E"
        },
        animation: { type: "fade", duration: 600 }
      },
      {
        id: "sec-message-2",
        type: "MESSAGE",
        name: "จดหมายอวยพร",
        enabled: true,
        order: 2,
        content: {
          heading: "ข้อความจากใจถึงเธอ ❤️",
          message: "ขอบคุณที่เข้ามาเป็นรอยยิ้มและความสดใสในชีวิตนะ ไม่ว่าวันข้างหน้าจะเป็นยังไง จะคอยอยู่ข้างๆ ให้กำลังใจ และจับมือผ่านทุกเรื่องราวไปด้วยกันเสมอ มีความสุขมากๆ ในวันเกิดนะ!",
          author: "จาก... คนที่รักเธอที่สุด",
          date: "วันนี้ & ตลอดไป"
        },
        styles: {
          backgroundColor: "#FFFFFF",
          textColor: "#33252E"
        },
        animation: { type: "slideUp", duration: 700 }
      },
      {
        id: "sec-gallery-3",
        type: "GALLERY",
        name: "อัลบั้มรอยยิ้ม",
        enabled: true,
        order: 3,
        content: {
          title: "ช่วงเวลาสุดพิเศษของเรา 📸",
          subtitle: "ทุกรูปภาพคือบันทึกความสุขที่เราได้ใช้ร่วมกัน",
          images: [
            {
              url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80",
              caption: "รอยยิ้มแรกที่เราได้ไปเที่ยวด้วยกัน"
            },
            {
              url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80",
              caption: "คาเฟ่โปรดกับกาแฟแก้วโปรด"
            },
            {
              url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80",
              caption: "ไม่ว่าจะไปที่ไหน ถ้ามีเธออยู่ด้วยก็มีความสุข"
            }
          ]
        },
        styles: {
          backgroundColor: "transparent"
        },
        animation: { type: "fade", duration: 600 }
      },
      {
        id: "sec-secret-4",
        type: "SECRET_MESSAGE",
        name: "กล่องของขวัญลับ",
        enabled: true,
        order: 4,
        content: {
          title: "ของขวัญชิ้นพิเศษที่เตรียมไว้ให้ 🎁",
          subtitle: "คลิกที่กล่องเพื่อเปิดอ่านข้อความลับสุดพิเศษ",
          secretText: "วันหยุดนี้เตรียมตัวนะ เค้าจองทริปและดินเนอร์วิวสวยๆ ไว้ให้เธอเรียบร้อยแล้ว รักเธอนะครับ! 🥂🏖️",
          buttonLabel: "แตะเพื่อเปิดของขวัญ"
        },
        styles: {
          backgroundColor: "#FFF2F6"
        },
        animation: { type: "zoom", duration: 500 }
      },
      {
        id: "sec-footer-5",
        type: "FOOTER",
        name: "ส่วนท้าย",
        enabled: true,
        order: 5,
        content: {
          text: "Made with all my heart for you 💕",
          subtext: "สร้างด้วย ILOVE Memory Website Builder"
        },
        styles: {
          backgroundColor: "transparent"
        }
      }
    ]
  },
  {
    id: "anniversary-rose-02",
    name: "Romantic Anniversary",
    description: "ธีมวันครบรอบสุดโรแมนติก พร้อมเส้นเวลาความสัมพันธ์และตัวนับวันเวลาที่อยู่ด้วยกัน",
    category: "ANNIVERSARY",
    isPremium: false,
    thumbnail: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80",
    theme: {
      backgroundColor: "#FCF8F9",
      textColor: "#2B2129",
      accentColor: "#E04F80",
      headingFont: "Pridi",
      bodyFont: "Noto Sans Thai"
    },
    sections: [
      {
        id: "sec-hero-1",
        type: "HERO",
        name: "ข้อความต้อนรับ",
        enabled: true,
        order: 1,
        content: {
          title: "Happy Our Anniversary 🌹",
          subtitle: "อีกหนึ่งปีแห่งความทรงจำ และจะมีความทรงจำดีๆ แบบนี้ต่อไปอีกนับร้อยปี",
          badge: "💍 365 Days of Love",
          imageURL: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=900&auto=format&fit=crop&q=80",
          buttonText: "ดูการเดินทางของเรา",
          buttonTarget: "sec-countdown-2"
        },
        styles: {
          alignment: "center",
          backgroundColor: "transparent",
          textColor: "#2B2129"
        },
        animation: { type: "fade", duration: 600 }
      },
      {
        id: "sec-countdown-2",
        type: "COUNTDOWN",
        name: "นับเวลาแห่งความรัก",
        enabled: true,
        order: 2,
        content: {
          title: "เรารู้จักและรักกันมาแล้ว...",
          startDate: "2024-02-14",
          mode: "COUNT_UP",
          note: "และทุกๆ วินาทีมีค่ามากกว่าเดิมเสมอ"
        },
        styles: {
          backgroundColor: "#FFFFFF"
        },
        animation: { type: "slideUp", duration: 600 }
      },
      {
        id: "sec-timeline-3",
        type: "TIMELINE",
        name: "เส้นทางความรัก",
        enabled: true,
        order: 3,
        content: {
          title: "บันทึกก้าวสำคัญของเรา 👣",
          subtitle: "จากวันแรกที่ไม่รู้จัก สู่คนสำคัญที่สุดในหัวใจ",
          events: [
            {
              date: "14 ก.พ. 2024",
              title: "วันที่เราเจอกันครั้งแรก",
              description: "ที่ร้านกาแฟริมแม่น้ำ วันนั้นเธอใส่เสื้อสีขาวกับรอยยิ้มที่จำได้ไม่เคยลืม"
            },
            {
              date: "25 เม.ย. 2024",
              title: "ทริปต่างจังหวัดครั้งแรก",
              description: "เดินทางไปรับลมทะเลหัวหิน นั่งดูพระอาทิตย์ตกดินด้วยกัน"
            },
            {
              date: "1 ม.ค. 2025",
              title: "เคาต์ดาวน์ปีใหม่แรกของเรา",
              description: "สัญญาว่าจะดูแลกันแบบนี้ไปทุกๆ ปีใหม่ตลอดไป"
            }
          ]
        },
        styles: {
          backgroundColor: "transparent"
        },
        animation: { type: "fade", duration: 600 }
      },
      {
        id: "sec-quote-4",
        type: "QUOTE",
        name: "คำสัญญา",
        enabled: true,
        order: 4,
        content: {
          quote: "ความรักไม่ใช่การมองตากัน แต่คือการมองไปในทิศทางเดียวกัน และจับมือกันก้าวไปข้างหน้า",
          author: "สัญญาจากหัวใจ"
        },
        styles: {
          backgroundColor: "#FFF0F5"
        },
        animation: { type: "slideUp", duration: 500 }
      },
      {
        id: "sec-footer-5",
        type: "FOOTER",
        name: "ส่วนท้าย",
        enabled: true,
        order: 5,
        content: {
          text: "Forever & Always With You 💕",
          subtext: "สร้างด้วย ILOVE Memory Website Builder"
        },
        styles: {
          backgroundColor: "transparent"
        }
      }
    ]
  },
  {
    id: "love-confession-03",
    name: "Secret Love Confession",
    description: "ธีมบอกรักสุดพิเศษ เรียบง่าย อบอุ่น พร้อมลูกเล่นคำถามเซอร์ไพรส์",
    category: "LOVE",
    isPremium: false,
    thumbnail: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=600&auto=format&fit=crop&q=80",
    theme: {
      backgroundColor: "#FFF8F8",
      textColor: "#33222B",
      accentColor: "#E85D8E",
      headingFont: "Itim",
      bodyFont: "Noto Sans Thai"
    },
    sections: [
      {
        id: "sec-hero-1",
        type: "HERO",
        name: "ข้อความต้อนรับ",
        enabled: true,
        order: 1,
        content: {
          title: "มีเรื่องสำคัญที่อยากบอกเธอมานานแล้ว...",
          subtitle: "ตั้งใจทำหน้านี้ขึ้นมาเพื่อเธอโดยเฉพาะ ลองเลื่อนอ่านดูนะ",
          badge: "💌 A Little Letter for You",
          imageURL: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=900&auto=format&fit=crop&q=80",
          buttonText: "เปิดอ่านจดหมาย",
          buttonTarget: "sec-message-2"
        },
        styles: {
          alignment: "center",
          backgroundColor: "transparent"
        },
        animation: { type: "fade", duration: 600 }
      },
      {
        id: "sec-message-2",
        type: "MESSAGE",
        name: "ความในใจ",
        enabled: true,
        order: 2,
        content: {
          heading: "เธอคือความสุขในทุกๆ วันนะ",
          message: "ตั้งแต่มีเธอเข้ามาในชีวิต โลกใบเดิมก็สดใสขึ้นมาก ทุกช่วงเวลาที่ได้คุย ได้หัวเราะ ได้แชร์เรื่องราวต่างๆ มันมีความหมายมากๆ ขอบคุณสำหรับทุกความน่ารักและความใส่ใจนะ",
          author: "คนที่คิดถึงเธอเสมอ",
          date: ""
        },
        styles: {
          backgroundColor: "#FFFFFF"
        },
        animation: { type: "slideUp", duration: 600 }
      },
      {
        id: "sec-secret-3",
        type: "SECRET_MESSAGE",
        name: "คำถามเซอร์ไพรส์",
        enabled: true,
        order: 3,
        content: {
          title: "คำถามสุดท้ายก่อนจะไป... 💖",
          subtitle: "ช่วยแตะเปิดอ่านคำถามนี้หน่อยนะ",
          secretText: "เป็นแฟนกันนะ? ❤️ (ถ้าตกลงอย่าลืมแคปหน้าจอนี้ส่งมาบอกกันนะ!)",
          buttonLabel: "แตะเพื่อเปิดคำถาม"
        },
        styles: {
          backgroundColor: "#FFF0F4"
        },
        animation: { type: "zoom", duration: 500 }
      },
      {
        id: "sec-footer-4",
        type: "FOOTER",
        name: "ส่วนท้าย",
        enabled: true,
        order: 4,
        content: {
          text: "Love You to the Moon and Back 🌙✨",
          subtext: "สร้างด้วย ILOVE"
        },
        styles: {
          backgroundColor: "transparent"
        }
      }
    ]
  },
  {
    id: "travel-adventures-04",
    name: "Wanderlust Journey",
    description: "ธีมรวมทริปท่องเที่ยว เรื่องราวการเดินทาง รูปภาพสถานที่ และสถิติการเดินทาง",
    category: "TRAVEL",
    isPremium: true,
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    theme: {
      backgroundColor: "#F4F9FA",
      textColor: "#1D2C33",
      accentColor: "#3B82F6",
      headingFont: "Mali",
      bodyFont: "Noto Sans Thai"
    },
    sections: [
      {
        id: "sec-hero-1",
        type: "HERO",
        name: "ข้อความต้อนรับ",
        enabled: true,
        order: 1,
        content: {
          title: "การเดินทางของเราสองคน ✈️🌊",
          subtitle: "ทุกที่ที่ก้าวเดินไปด้วยกัน คือความทรงจำที่ล้ำค่าที่สุด",
          badge: "🌏 Travel Journal",
          imageURL: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&auto=format&fit=crop&q=80",
          buttonText: "ออกเดินทางไปด้วยกัน",
          buttonTarget: "sec-stats-2"
        },
        styles: {
          alignment: "center",
          backgroundColor: "transparent"
        },
        animation: { type: "fade", duration: 600 }
      },
      {
        id: "sec-stats-2",
        type: "MEMORY_STATISTICS",
        name: "สถิติการเดินทาง",
        enabled: true,
        order: 2,
        content: {
          title: "บันทึกตัวเลขการเดินทางของเรา 📊",
          stats: [
            { label: "จังหวัดที่ไปเยือน", value: "14", unit: "จังหวัด" },
            { label: "ระยะทางเดินทาง", value: "3,850", unit: "กิโลเมตร" },
            { label: "รูปภาพความทรงจำ", value: "1,240+", unit: "รูป" },
            { label: "ความสุขและรอยยิ้ม", value: "100%", unit: "เต็มอิ่ม" }
          ]
        },
        styles: {
          backgroundColor: "#FFFFFF"
        },
        animation: { type: "slideUp", duration: 600 }
      },
      {
        id: "sec-gallery-3",
        type: "GALLERY",
        name: "ไฮไลท์รูปภาพ",
        enabled: true,
        order: 3,
        content: {
          title: "ภาพถ่ายสถานที่โปรด 📸",
          subtitle: "ทะเล ภูเขา และเธอ",
          images: [
            {
              url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
              caption: "เดินป่ารับหมอกยามเช้าที่เขาใหญ่"
            },
            {
              url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
              caption: "ดำน้ำดูปะการังที่เกาะเต่า"
            }
          ]
        },
        styles: {
          backgroundColor: "transparent"
        },
        animation: { type: "fade", duration: 600 }
      },
      {
        id: "sec-footer-4",
        type: "FOOTER",
        name: "ส่วนท้าย",
        enabled: true,
        order: 4,
        content: {
          text: "To the Next Journey Together 🗺️✨",
          subtext: "สร้างด้วย ILOVE"
        },
        styles: {
          backgroundColor: "transparent"
        }
      }
    ]
  },
  {
    id: "love-booth-05",
    name: "Love Booth & Time Capsule 📸",
    description: "ตู้สติกเกอร์เกาหลี 4 ช่อง (Photo Strip) พร้อมแคปซูลกาลเวลาและสถิติความทรงจำสุดคิ้วท์",
    category: "ANNIVERSARY",
    isPremium: false,
    thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80",
    theme: {
      backgroundColor: "#FFF5F8",
      textColor: "#2D1B28",
      accentColor: "#E0368B",
      headingFont: "Mali",
      bodyFont: "Noto Sans Thai"
    },
    sections: [
      {
        id: "sec-lb-hero",
        type: "HERO",
        name: "ข้อความต้อนรับโฟโต้บูธ",
        enabled: true,
        order: 1,
        content: {
          title: "Love Booth & Memory Capsule 📸💕",
          subtitle: "ตู้สติกเกอร์บันทึกทุกรอยยิ้ม และแคปซูลกาลเวลาแห่งความสุขของเราสองคน",
          badge: "✨ Photo Booth Edition",
          imageURL: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&auto=format&fit=crop&q=80",
          buttonText: "เปิดดูรูปในตู้สติกเกอร์",
          buttonTarget: "sec-lb-gallery"
        },
        styles: {
          alignment: "center",
          backgroundColor: "transparent",
          textColor: "#2D1B28"
        },
        animation: { type: "fade", duration: 600 }
      },
      {
        id: "sec-lb-gallery",
        type: "GALLERY",
        name: "โฟโต้บูธ 4 ช่อง (Photo Strip)",
        enabled: true,
        order: 2,
        content: {
          title: "Photo Strip Memories 🎞️",
          subtitle: "สแนปช็อตรอยยิ้ม 4 ช็อตสุดน่ารักที่ไม่มีวันลืม",
          images: [
            {
              url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80",
              caption: "Shot 1: เจอกันครั้งแรก ยิ้มเขินๆ 🌹"
            },
            {
              url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80",
              caption: "Shot 2: หัวเราะจนแก้มปริ 🎈"
            },
            {
              url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
              caption: "Shot 3: สบตากันใต้หมอกหนาว ⛰️"
            },
            {
              url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80",
              caption: "Shot 4: ยิ้มกว้างไปด้วยกันตลอดไป ✨"
            }
          ]
        },
        styles: {
          backgroundColor: "#FFFFFF"
        },
        animation: { type: "scale", duration: 600 }
      },
      {
        id: "sec-lb-timeline",
        type: "TIMELINE",
        name: "แคปซูลกาลเวลา (Time Capsule)",
        enabled: true,
        order: 3,
        content: {
          title: "Time Capsule Timeline ⏳💌",
          subtitle: "ช่วงเวลาสำคัญที่ถูกบันทึกและล็อกไว้ในแคปซูล",
          events: [
            {
              date: "2025-11-20",
              title: "เปิดแคปซูลบทแรก ☕",
              description: "วันแรกที่ได้นั่งคุยกันเรื่องหนังสือในร้านกาแฟ จุดเริ่มต้นของทุกสิ่ง",
              image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600"
            },
            {
              date: "2026-01-02",
              title: "ทริปสัมผัสลมหนาว ⛰️",
              description: "กุมมือกันดูหมอกและพระอาทิตย์ขึ้นดอยอินทนนท์ อากาศหนาวแต่ใจอุ่นมาก",
              image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600"
            },
            {
              date: "2026-02-14",
              title: "วาเลนไทน์ดินเนอร์ 🌹",
              description: "มอบช่อดอกกุหลาบสีชมพูพร้อมคำสัญญาจากหัวใจว่าจะดูแลกันอย่างดีที่สุด",
              image: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600"
            }
          ]
        },
        styles: {
          backgroundColor: "transparent"
        },
        animation: { type: "slideUp", duration: 700 }
      },
      {
        id: "sec-lb-stats",
        type: "MEMORY_STATISTICS",
        name: "สถิติความรักของเรา",
        enabled: true,
        order: 4,
        content: {
          title: "Love Statistics 📊❤️",
          subtitle: "ตัวเลขความสุขและความผูกพันที่เราสร้างขึ้นด้วยกัน",
          stats: [
            { label: "รูปถ่ายคู่กัน", value: "1,420+", icon: "Camera" },
            { label: "ชั่วโมงที่คุยกัน", value: "3,890", icon: "Clock" },
            { label: "ทริปที่ไปด้วยกัน", value: "12 ทริป", icon: "MapPin" },
            { label: "ความรักที่มีให้", value: "100% เต็ม", icon: "Heart" }
          ]
        },
        styles: {
          backgroundColor: "#FFFFFF"
        },
        animation: { type: "fade", duration: 600 }
      },
      {
        id: "sec-lb-secret",
        type: "SECRET_MESSAGE",
        name: "ข้อความลับในแคปซูล",
        enabled: true,
        order: 5,
        content: {
          title: "กล่องความรู้สึกลับในแคปซูล 🎁",
          hint: "แตะเพื่อเปิดฝาแคปซูลอ่านข้อความพิเศษ",
          secret: "ขอบคุณที่เข้ามาเป็นความสดใสและรอยยิ้มในทุกวันนะ สัญญาว่าจะจับมือเธอไว้แน่นๆ แบบนี้ตลอดไป รักนะคะ 💕"
        },
        styles: {
          backgroundColor: "transparent"
        },
        animation: { type: "scale", duration: 600 }
      },
      {
        id: "sec-lb-footer",
        type: "FOOTER",
        name: "ส่วนท้าย",
        enabled: true,
        order: 6,
        content: {
          text: "Stored Forever in Love Booth & Memory Capsule 💕",
          subtext: "สร้างด้วย ILOVE Memory Website Builder"
        },
        styles: {
          backgroundColor: "transparent"
        }
      }
    ]
  },
  {
    id: "velvet-neon-06",
    name: "Velvet Neon Romance & Surprise 🌌",
    description: "ธีมดาร์กนีออนเวลเวทสุดหรู พร้อม Love Time Counter, จดหมายพิมพ์ดีด และซองของขวัญดิจิทัลเซอร์ไพรส์",
    category: "SURPRISE",
    isPremium: true,
    thumbnail: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80",
    theme: {
      backgroundColor: "#0F071D",
      textColor: "#F3E8FF",
      accentColor: "#F43F5E",
      headingFont: "Pridi",
      bodyFont: "Noto Sans Thai"
    },
    sections: [
      {
        id: "sec-vn-hero",
        type: "HERO",
        name: "ข้อความต้อนรับนีออน",
        enabled: true,
        order: 1,
        content: {
          title: "Happy Anniversary ที่รักของเค้า 🌌💖",
          subtitle: "ของขวัญเซอร์ไพรส์ชิ้นพิเศษที่ตั้งใจทำไว้ให้เธอคนเดียวในจักรวาลนี้",
          badge: "✨ Velvet Neon Edition",
          imageURL: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=900&auto=format&fit=crop&q=80",
          buttonText: "เปิดรับของขวัญเซอร์ไพรส์",
          buttonTarget: "sec-vn-counter"
        },
        styles: {
          alignment: "center",
          backgroundColor: "transparent",
          textColor: "#F3E8FF"
        },
        animation: { type: "fade", duration: 600 }
      },
      {
        id: "sec-vn-counter",
        type: "COUNTDOWN",
        name: "Love Time Counter (เรารักกันมาแล้ว)",
        enabled: true,
        order: 2,
        content: {
          title: "LOVE TIME COUNTER ⏱️",
          subtitle: "เรารัก ดูแล และมีความสุขร่วมกันมาแล้วเป็นเวลา",
          startDate: "2025-02-14T09:38:00+07:00",
          mode: "COUNT_UP"
        },
        styles: {
          backgroundColor: "rgba(30, 16, 45, 0.7)"
        },
        animation: { type: "scale", duration: 600 }
      },
      {
        id: "sec-vn-letter",
        type: "MESSAGE",
        name: "จดหมายรักพิมพ์ดีด (Typewriter Letter)",
        enabled: true,
        order: 3,
        content: {
          heading: "สุขสันต์วันครบรอบนะคะคนเก่ง 💌",
          message: "ขอบคุณสำหรับรอยยิ้ม ความน่ารัก และความอบอุ่นที่มีให้กันในทุกๆ วัน ไม่ว่าจะผ่านเรื่องอะไรมา เค้าสัญญาว่าจะคอยอยู่เคียงข้าง และรักเธอเพิ่มขึ้นในทุกๆ วันนะ รักเธอที่สุดเลยค่ะ 🥰",
          author: "จาก... เค้าเองคนดี ❤️",
          date: "ตลอดไปและตลอดกาล"
        },
        styles: {
          backgroundColor: "rgba(30, 16, 45, 0.8)",
          textColor: "#F3E8FF"
        },
        animation: { type: "slideUp", duration: 700 }
      },
      {
        id: "sec-vn-gift",
        type: "SECRET_MESSAGE",
        name: "ซองของขวัญเซอร์ไพรส์ (Gift Voucher)",
        enabled: true,
        order: 4,
        content: {
          title: "ซองของขวัญเซอร์ไพรส์สำหรับคนเก่ง 🎁🧧",
          hint: "แตะเพื่อเปิดซองของขวัญและคูปองพิเศษ",
          secret: "🎉 ยินดีด้วยค่ะ! ได้รับคูปองพิเศษ: 'ตามใจแฟน 1 วันเต็ม + บุฟเฟต์ของหวานไม่อั้น!' พร้อมซองของขวัญพิเศษจากใจเค้าเลย 💕"
        },
        styles: {
          backgroundColor: "transparent"
        },
        animation: { type: "scale", duration: 600 }
      },
      {
        id: "sec-vn-gallery",
        type: "GALLERY",
        name: "แกลเลอรี่ความทรงจำใต้แสงนีออน",
        enabled: true,
        order: 5,
        content: {
          title: "Our Memories Under the Stars 🌟",
          subtitle: "ทุกความทรงจำคือแสงสว่างที่งดงามที่สุดในใจ",
          images: [
            {
              url: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80",
              caption: "แสงเทียนและดอกไม้ในค่ำคืนวันสำคัญ 🌹"
            },
            {
              url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80",
              caption: "รอยยิ้มวันครบรอบที่สดใสที่สุด 🎈"
            },
            {
              url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
              caption: "ท้องฟ้าและพระอาทิตย์ตกริมทะเลด้วยกัน 🌅"
            }
          ]
        },
        styles: {
          backgroundColor: "rgba(30, 16, 45, 0.7)"
        },
        animation: { type: "fade", duration: 600 }
      },
      {
        id: "sec-vn-footer",
        type: "FOOTER",
        name: "ส่วนท้าย",
        enabled: true,
        order: 6,
        content: {
          text: "Loved You Yesterday, Love You Still, Always Have, Always Will 🌌💖",
          subtext: "สร้างด้วย ILOVE Memory Website Builder"
        },
        styles: {
          backgroundColor: "transparent"
        }
      }
    ]
  }
];

export const CATEGORIES = [
  { id: "ALL", label: "ทั้งหมด" },
  { id: "BIRTHDAY", label: "วันเกิด 🎂" },
  { id: "ANNIVERSARY", label: "วันครบรอบ 💍" },
  { id: "LOVE", label: "บอกรัก & ความรู้สึก ❤️" },
  { id: "SURPRISE", label: "ของขวัญเซอร์ไพรส์ 🎁" },
  { id: "TRAVEL", label: "ทริปท่องเที่ยว ✈️" },
  { id: "GRADUATION", label: "วันรับปริญญา 🎓" },
  { id: "FRIENDSHIP", label: "เพื่อน & มิตรภาพ 🌟" }
];
