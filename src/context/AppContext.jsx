import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { TEMPLATES } from "../config/templates";
import { createSanitizedPublicSnapshot } from "../utils/security";

const AppContext = createContext(null);

const STORAGE_KEYS = {
  USER: "ilove_user",
  PROJECTS: "ilove_projects",
  MEMORIES: "ilove_memories",
  DATES: "ilove_important_dates",
  NOTIFICATIONS: "ilove_notifications",
  PUBLISHED: "ilove_published_sites"
};

// Initial Seed Data based on UXUI specification & sample data
const SEED_USER = {
  uid: "usr-may-001",
  name: "เมย์ สุจิตรา",
  email: "may.sujitra@example.com",
  photoURL: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80",
  plan: "FREE",
  role: "USER",
  storageUsedMB: 38,
  storageTotalMB: 100,
  createdAt: new Date().toISOString()
};

const SEED_MEMORIES = [
  {
    id: "mem-01",
    title: "Valentine ครั้งแรก 🌹",
    description: "ไปดินเนอร์ใต้แสงเทียนริมแม่น้ำเจ้าพระยา เมย์ชอบช่อดอกกุหลาบสีชมพูมากๆ รอยยิ้มวันนั้นน่ารักที่สุด",
    eventDate: "2026-02-14",
    category: "LOVE",
    location: { name: "Bangkok, Thailand" },
    images: [
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80"
    ],
    tags: ["valentine", "first-time", "love"],
    createdAt: "2026-02-14T20:00:00Z"
  },
  {
    id: "mem-02",
    title: "ทริปเชียงใหม่ ตะลุยดอยอินทนนท์ ⛰️",
    description: "ตื่นเช้าไปดูหมอกหนาวและพระอาทิตย์ขึ้นด้วยกัน จิบชาร้อนๆ กลางอากาศ 12 องศา สนุกและอบอุ่นมาก",
    eventDate: "2026-01-02",
    category: "TRAVEL",
    location: { name: "Chiang Mai, Thailand" },
    images: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80"
    ],
    tags: ["travel", "chiangmai", "winter"],
    createdAt: "2026-01-02T10:00:00Z"
  },
  {
    id: "mem-03",
    title: "เจอกันครั้งแรกที่ร้านหนังสือ ☕📖",
    description: "วันที่ฝนตกหนักแล้วเราติดฝนอยู่ร้านกาแฟด้วยกัน คุยกันเรื่องหนังสือจนร้านปิด จุดเริ่มต้นของทุกสิ่ง",
    eventDate: "2025-12-20",
    category: "FIRST_TIME",
    location: { name: "Siam Square, Bangkok" },
    images: [
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80"
    ],
    tags: ["first-meeting", "cafe"],
    createdAt: "2025-12-20T17:30:00Z"
  }
];

const SEED_PROJECTS = [
  {
    id: "proj-birthday-may",
    ownerId: "usr-may-001",
    title: "Happy Birthday เมย์ ❤️",
    description: "เว็บไซต์ของขวัญวันเกิดสุดพิเศษสำหรับเมย์คนเก่ง",
    slug: "happy-birthday-may",
    category: "BIRTHDAY",
    templateId: "birthday-pink-01",
    status: "PUBLISHED",
    visibility: "UNLISTED",
    views: 142,
    coverImage: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80",
    theme: {
      backgroundColor: "#FFF9FB",
      textColor: "#33252E",
      accentColor: "#E85D8E",
      headingFont: "Mali",
      bodyFont: "Noto Sans Thai"
    },
    sections: TEMPLATES[0].sections,
    revealAt: null,
    expiresAt: null,
    publishedAt: "2026-02-10T12:00:00Z",
    createdAt: "2026-02-05T10:00:00Z",
    updatedAt: "2026-02-10T12:00:00Z"
  },
  {
    id: "proj-anniversary",
    ownerId: "usr-may-001",
    title: "Our 2nd Anniversary เซอร์ไพรส์ 🎁",
    description: "ของขวัญวันครบรอบ 2 ปีที่ตั้งใจทำไว้ให้ล่วงหน้า",
    slug: "our-anniversary-2026",
    category: "ANNIVERSARY",
    templateId: "anniversary-rose-02",
    status: "SCHEDULED",
    visibility: "SCHEDULED",
    views: 18,
    coverImage: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600&auto=format&fit=crop&q=80",
    theme: {
      backgroundColor: "#FCF8F9",
      textColor: "#2B2129",
      accentColor: "#E04F80",
      headingFont: "Pridi",
      bodyFont: "Noto Sans Thai"
    },
    sections: TEMPLATES[1].sections,
    revealAt: "2026-10-20T00:00:00+07:00",
    expiresAt: null,
    publishedAt: "2026-03-01T08:00:00Z",
    createdAt: "2026-02-28T14:00:00Z",
    updatedAt: "2026-03-01T08:00:00Z"
  },
  {
    id: "proj-travel-cm",
    ownerId: "usr-may-001",
    title: "รวมมิตรทริปเชียงใหม่ 2026 🚗",
    description: "ไดอารี่การเดินทางและรูปภาพสวยๆ",
    slug: null,
    category: "TRAVEL",
    templateId: "travel-adventures-04",
    status: "DRAFT",
    visibility: "PRIVATE",
    views: 0,
    coverImage: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80",
    theme: {
      backgroundColor: "#F4F9FA",
      textColor: "#1D2C33",
      accentColor: "#3B82F6",
      headingFont: "Mali",
      bodyFont: "Noto Sans Thai"
    },
    sections: TEMPLATES[3].sections,
    revealAt: null,
    expiresAt: null,
    publishedAt: null,
    createdAt: "2026-03-05T09:00:00Z",
    updatedAt: "2026-03-10T16:00:00Z"
  }
];

const SEED_DATES = [
  {
    id: "date-01",
    title: "วันครบรอบของเรา 💍",
    targetDate: "2026-10-20",
    type: "ANNIVERSARY",
    repeatYearly: true,
    reminderDays: 7,
    notes: "จองร้านอาหารวิวสวย และเตรียมของขวัญเซอร์ไพรส์"
  },
  {
    id: "date-02",
    title: "วันเกิดเมย์ 🎂",
    targetDate: "2026-11-15",
    type: "BIRTHDAY",
    repeatYearly: true,
    reminderDays: 14,
    notes: "สั่งเค้กสตรอว์เบอร์รี่ร้านโปรด"
  }
];

const SEED_NOTIFICATIONS = [
  {
    id: "notif-01",
    userId: "usr-may-001",
    type: "IMPORTANT_DATE_REMINDER",
    title: "อีก 7 วันจะถึงวันครบรอบของเรา 💍",
    message: "อย่าลืมเตรียมของขวัญและเซอร์ไพรส์พิเศษสำหรับวันที่ 20 ต.ค. นะครับ",
    relatedResource: { type: "IMPORTANT_DATE", id: "date-01" },
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString()
  },
  {
    id: "notif-02",
    userId: "usr-may-001",
    type: "MILESTONE_VIEW",
    title: "เว็บไซต์ Happy Birthday มียอดชมครบ 142 ครั้งแล้ว! 🎉",
    message: "ความทรงจำของคุณสร้างรอยยิ้มและเสียงหัวเราะอย่างงดงาม",
    relatedResource: { type: "PROJECT", slug: "happy-birthday-may" },
    read: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()
  },
  {
    id: "notif-03",
    userId: "usr-may-001",
    type: "SYSTEM_TIP",
    title: "ยินดีต้อนรับสู่ ILOVE Memory Website Builder ❤️",
    message: "เริ่มต้นด้วยการสร้างความทรงจำแรก หรือเลือก Template สวยงามได้เลย",
    relatedResource: null,
    read: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString()
  }
];

export function AppProvider({ children }) {
  // 1. Auth State
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.USER);
    return saved ? JSON.parse(saved) : SEED_USER;
  });

  // 2. Projects State
  const [projects, setProjects] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    return saved ? JSON.parse(saved) : SEED_PROJECTS;
  });

  // 3. Memories State
  const [memories, setMemories] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MEMORIES);
    return saved ? JSON.parse(saved) : SEED_MEMORIES;
  });

  // 4. Important Dates
  const [importantDates, setImportantDates] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DATES);
    return saved ? JSON.parse(saved) : SEED_DATES;
  });

  // 5. Notifications State (Section 21)
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : SEED_NOTIFICATIONS;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  const markNotificationAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast("อ่านการแจ้งเตือนทั้งหมดแล้ว", "success");
  };

  const deleteNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    showToast("ลบการแจ้งเตือนแล้ว", "info");
  };

  const addNotification = (notif) => {
    const newNotif = {
      id: "notif-" + Date.now().toString(36),
      userId: currentUser?.uid || "usr-guest",
      read: false,
      createdAt: new Date().toISOString(),
      ...notif
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  // 6. Active Builder Project
  const [activeProjectId, setActiveProjectId] = useState("proj-birthday-may");
  const [saveStatus, setSaveStatus] = useState("saved"); // 'saved' | 'saving' | 'error'
  const autoSaveTimerRef = useRef(null);

  // 6. Toasts
  const [toasts, setToasts] = useState([]);

  // Persistence Effects
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MEMORIES, JSON.stringify(memories));
  }, [memories]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DATES, JSON.stringify(importantDates));
  }, [importantDates]);

  // Toast Helper
  const showToast = (message, type = "success") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  // Auth Operations
  const loginWithEmail = (email, password) => {
    const user = {
      ...SEED_USER,
      email: email || "may.sujitra@example.com",
      name: email ? email.split("@")[0] : "เมย์ สุจิตรา"
    };
    setCurrentUser(user);
    showToast("เข้าสู่ระบบเรียบร้อยแล้ว ยินดีต้อนรับกลับมาครับ! ✨");
    return true;
  };

  const loginWithGoogle = () => {
    setCurrentUser(SEED_USER);
    showToast("เข้าสู่ระบบด้วย Google สำเร็จ! 🎉");
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    showToast("ออกจากระบบเรียบร้อยแล้ว", "info");
  };

  // Entitlements & Role Separation (Section 2 & 20)
  const entitlements = {
    canUsePremiumTemplates: currentUser?.plan !== "FREE",
    canPasswordProtect: currentUser?.plan !== "FREE",
    canScheduleReveal: currentUser?.plan !== "FREE",
    canUploadVideo: currentUser?.plan !== "FREE",
    canCustomMusic: currentUser?.plan !== "FREE",
    canRemoveBranding: currentUser?.plan !== "FREE",
    maxProjects: currentUser?.plan === "FREE" ? 3 : 50,
    maxStorageMB: currentUser?.plan === "FREE" ? 100 : 5000,
    canAccessAdmin: currentUser?.role === "ADMIN" || currentUser?.role === "SUPER_ADMIN"
  };

  const switchUserRole = (newRole) => {
    setCurrentUser((prev) => prev ? { ...prev, role: newRole } : prev);
    showToast(`เปลี่ยนสิทธิ์ผู้ใช้เป็น: ${newRole}`);
  };

  const switchUserPlan = (newPlan) => {
    setCurrentUser((prev) => prev ? { ...prev, plan: newPlan } : prev);
    showToast(`ปรับเปลี่ยนแพ็กเกจเป็น: ${newPlan} เรียบร้อยแล้ว 🎉`);
  };

  // Template Switching with Content Preservation (Section 9.3)
  const changeProjectTemplate = (projectId, newTemplateId) => {
    const template = TEMPLATES.find((t) => t.id === newTemplateId);
    if (!template) return;

    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const existingSections = p.sections || [];
          const newTemplateSections = template.sections || [];

          const mergedSections = newTemplateSections.map((newSec) => {
            const matchedExisting = existingSections.find((ex) => ex.type === newSec.type);
            if (matchedExisting) {
              return {
                ...newSec,
                content: { ...newSec.content, ...matchedExisting.content }
              };
            }
            return newSec;
          });

          return {
            ...p,
            templateId: newTemplateId,
            theme: { ...template.theme },
            sections: mergedSections,
            updatedAt: new Date().toISOString()
          };
        }
        return p;
      })
    );
    showToast(`เปลี่ยน Template เป็น "${template.name}" พร้อมคงเนื้อหาเดิมเรียบร้อย ✨`);
  };

  // Project Operations
  const activeProject = projects.find((p) => p.id === activeProjectId) || projects[0];

  const createProject = (initialData) => {
    const template = TEMPLATES.find((t) => t.id === initialData.templateId) || TEMPLATES[0];
    const newProject = {
      id: "proj-" + Date.now(),
      ownerId: currentUser ? currentUser.uid : "guest",
      title: initialData.title || "เว็บไซต์ความทรงจำใหม่",
      description: initialData.description || "",
      slug: (initialData.slug || ("love-" + Date.now().toString(36))).toLowerCase().replace(/[^a-z0-9-]/g, "-"),
      category: initialData.category || template.category,
      templateId: template.id,
      status: "DRAFT",
      visibility: "UNLISTED",
      views: 0,
      coverImage: initialData.coverImage || template.thumbnail,
      theme: { ...template.theme },
      sections: JSON.parse(JSON.stringify(template.sections)),
      revealAt: initialData.revealAt || null,
      expiresAt: null,
      publishedAt: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProjects((prev) => [newProject, ...prev]);
    setActiveProjectId(newProject.id);
    showToast("สร้างโปรเจกต์ใหม่สำเร็จ 🎉");
    return newProject;
  };

  const updateProject = (updatedFields, debounce = true) => {
    setSaveStatus("saving");
    if (autoSaveTimerRef.current) clearTimeout(autoSaveTimerRef.current);

    const applyUpdate = () => {
      setProjects((prev) =>
        prev.map((p) => {
          if (p.id === activeProjectId) {
            return {
              ...p,
              ...updatedFields,
              updatedAt: new Date().toISOString()
            };
          }
          return p;
        })
      );
      setSaveStatus("saved");
    };

    if (debounce) {
      autoSaveTimerRef.current = setTimeout(applyUpdate, 800);
    } else {
      applyUpdate();
    }
  };

  const duplicateProject = (projectId) => {
    const original = projects.find((p) => p.id === projectId);
    if (!original) return;
    const duplicated = {
      ...original,
      id: "proj-" + Date.now(),
      title: `${original.title} (สำเนา)`,
      slug: `${original.slug || "site"}-copy-${Date.now().toString(36)}`,
      status: "DRAFT",
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setProjects((prev) => [duplicated, ...prev]);
    showToast("ทำสำเนาเว็บไซต์เรียบร้อยแล้ว");
  };

  const deleteProject = (projectId) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    showToast("ลบเว็บไซต์เรียบร้อยแล้ว", "info");
    if (activeProjectId === projectId) {
      const remaining = projects.filter((p) => p.id !== projectId);
      if (remaining.length > 0) setActiveProjectId(remaining[0].id);
    }
  };

  const publishProject = (projectId, publishConfig) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const status = publishConfig.revealAt && new Date(publishConfig.revealAt) > new Date()
            ? "SCHEDULED"
            : (publishConfig.visibility === "PASSWORD" ? "PRIVATE" : "PUBLISHED");

          return {
            ...p,
            slug: publishConfig.slug || p.slug,
            visibility: publishConfig.visibility,
            passwordHash: publishConfig.passwordHash || null,
            revealAt: publishConfig.revealAt || null,
            expiresAt: publishConfig.expiresAt || null,
            status: status,
            publishedAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          delete updated.password; // Prevent storing plaintext password
          return updated;
        }
        return p;
      })
    );
    showToast("เผยแพร่เว็บไซต์ของคุณเรียบร้อยแล้ว! 🎉");
  };

  const unpublishProject = (projectId) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, status: "DRAFT" } : p))
    );
    showToast("ยกเลิกการเผยแพร่เว็บไซต์แล้ว กลับสู่สถานะแบบร่าง", "info");
  };

  // Memory Operations
  const createMemory = (memoryData) => {
    const newMemory = {
      id: "mem-" + Date.now(),
      title: memoryData.title,
      description: memoryData.description || "",
      eventDate: memoryData.eventDate || new Date().toISOString().split("T")[0],
      category: memoryData.category || "LOVE",
      location: memoryData.location || { name: "" },
      images: memoryData.images || [],
      tags: memoryData.tags || [],
      createdAt: new Date().toISOString()
    };
    setMemories((prev) => [newMemory, ...prev]);
    showToast("บันทึกความทรงจำใหม่เรียบร้อย ❤️");
    return newMemory;
  };

  const deleteMemory = (memoryId) => {
    setMemories((prev) => prev.filter((m) => m.id !== memoryId));
    showToast("ลบความทรงจำเรียบร้อยแล้ว", "info");
  };

  // Create Project from Selected Memories (Section 12.3)
  const createProjectFromMemories = (selectedMemoryIds, projectTitle, category = "LOVE") => {
    const chosen = memories.filter((m) => selectedMemoryIds.includes(m.id));
    const timelineEvents = chosen.map((m) => ({
      date: m.eventDate,
      title: m.title,
      description: m.description,
      image: m.images[0] || ""
    }));

    const galleryImages = chosen.flatMap((m) =>
      m.images.map((img) => ({ url: img, caption: m.title }))
    );

    const baseTemplate = TEMPLATES[1]; // Romantic Anniversary / Love
    const newProject = {
      id: "proj-" + Date.now(),
      ownerId: currentUser ? currentUser.uid : "guest",
      title: projectTitle || "รวมเรื่องราวความทรงจำแสนพิเศษ 💖",
      description: `สร้างจากความทรงจำ ${chosen.length} เรื่องราว`,
      slug: "our-memories-" + Date.now().toString(36),
      category: category,
      templateId: baseTemplate.id,
      status: "DRAFT",
      visibility: "UNLISTED",
      views: 0,
      coverImage: galleryImages[0]?.url || baseTemplate.thumbnail,
      theme: { ...baseTemplate.theme },
      sections: [
        {
          id: "sec-hero-mem",
          type: "HERO",
          name: "ข้อความต้อนรับ",
          enabled: true,
          order: 1,
          content: {
            title: projectTitle || "รวมเรื่องราวความทรงจำแสนพิเศษ 💖",
            subtitle: "ทุกช่วงเวลาที่เราได้สร้างร่วมกัน คือสิ่งที่มีค่าที่สุด",
            badge: "✨ Memory Journal",
            imageURL: galleryImages[0]?.url || baseTemplate.thumbnail,
            buttonText: "เปิดดูเส้นทางความทรงจำ",
            buttonTarget: "sec-timeline-mem"
          },
          styles: { alignment: "center" }
        },
        {
          id: "sec-timeline-mem",
          type: "TIMELINE",
          name: "เส้นเวลาความทรงจำ",
          enabled: true,
          order: 2,
          content: {
            title: "ไทม์ไลน์เรื่องราวของเรา 👣",
            subtitle: "การเดินทางและเหตุการณ์ที่น่าประทับใจ",
            events: timelineEvents
          },
          styles: { backgroundColor: "transparent" }
        },
        {
          id: "sec-gallery-mem",
          type: "GALLERY",
          name: "ภาพถ่ายความทรงจำ",
          enabled: true,
          order: 3,
          content: {
            title: "อัลบั้มรูปภาพ 📸",
            subtitle: "รอยยิ้มและสถานที่แห่งความสุข",
            images: galleryImages.slice(0, 8)
          },
          styles: { backgroundColor: "#FFFFFF" }
        },
        {
          id: "sec-footer-mem",
          type: "FOOTER",
          name: "ส่วนท้าย",
          enabled: true,
          order: 4,
          content: {
            text: "รักและมีความสุขในทุกวัน 💕",
            subtext: "สร้างจากคลังความทรงจำ ILOVE"
          },
          styles: { backgroundColor: "transparent" }
        }
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setProjects((prev) => [newProject, ...prev]);
    setActiveProjectId(newProject.id);
    showToast("สร้างเว็บไซต์จากความทรงจำเรียบร้อยแล้ว! 🎉");
    return newProject;
  };

  // Important Dates Operations
  const createImportantDate = (dateData) => {
    const newDate = {
      id: "date-" + Date.now(),
      title: dateData.title,
      targetDate: dateData.targetDate,
      type: dateData.type || "OTHER",
      repeatYearly: dateData.repeatYearly ?? true,
      reminderDays: dateData.reminderDays || 7,
      notes: dateData.notes || ""
    };
    setImportantDates((prev) => [...prev, newDate]);
    showToast("เพิ่มวันสำคัญเรียบร้อยแล้ว ✨");
    return newDate;
  };

  const deleteImportantDate = (dateId) => {
    setImportantDates((prev) => prev.filter((d) => d.id !== dateId));
    showToast("ลบวันสำคัญแล้ว", "info");
  };

  // Published Site Public Finder (Sanitized Public Snapshot - Section 16.2)
  const getPublishedSiteBySlug = (slug) => {
    const found = projects.find(
      (p) => (p.slug && p.slug.toLowerCase() === slug.toLowerCase()) || p.id === slug
    );
    if (!found) return null;
    return createSanitizedPublicSnapshot(found);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        loginWithEmail,
        loginWithGoogle,
        logout,
        projects,
        activeProject,
        activeProjectId,
        setActiveProjectId,
        createProject,
        updateProject,
        duplicateProject,
        deleteProject,
        publishProject,
        unpublishProject,
        saveStatus,
        memories,
        createMemory,
        deleteMemory,
        createProjectFromMemories,
        importantDates,
        createImportantDate,
        deleteImportantDate,
        notifications,
        unreadNotificationsCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        deleteNotification,
        addNotification,
        getPublishedSiteBySlug,
        entitlements,
        switchUserRole,
        switchUserPlan,
        changeProjectTemplate,
        toasts,
        showToast
      }}
    >
      {children}
      {/* Global Toast Render */}
      <div className="toast-container">
        {toasts.map((toast) => (
          <div key={toast.id} className="toast" style={{ borderLeftColor: toast.type === "info" ? "var(--color-info)" : "var(--color-primary)" }}>
            <span style={{ fontSize: "18px" }}>
              {toast.type === "info" ? "ℹ️" : "💖"}
            </span>
            <span style={{ fontSize: "14px", fontWeight: 500 }}>{toast.message}</span>
          </div>
        ))}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within an AppProvider");
  return context;
}
