# Memory Website Builder

**Project Type:** Personal Memory & Surprise Website Builder  
**Document Version:** 1.0  
**สถานะ:** Product Specification / UX/UI / System Architecture  
**เทคโนโลยีหลัก:** React, Node.js, Firebase และ GitHub

## 1. ภาพรวมโครงการ

Memory Website Builder คือแพลตฟอร์มสำหรับบันทึกความทรงจำ รูปภาพ เรื่องราว และวันสำคัญ แล้วนำข้อมูลเหล่านั้นมาสร้างเป็นเว็บไซต์ส่วนตัวจาก Template โดยผู้ใช้ไม่จำเป็นต้องเขียนโค้ด

ตัวอย่างเว็บไซต์ที่ผู้ใช้สามารถสร้างได้:

- เว็บไซต์วันเกิด
- เว็บไซต์วันครบรอบ
- เว็บไซต์บอกรัก
- เว็บไซต์เซอร์ไพรส์
- เว็บไซต์รวมความทรงจำ
- เว็บไซต์เล่าเรื่องราวของคู่รัก
- เว็บไซต์ทริปท่องเที่ยว
- เว็บไซต์วันรับปริญญา
- เว็บไซต์สำหรับเพื่อน
- เว็บไซต์งานหรือโอกาสสำคัญ

แนวคิดหลักของผลิตภัณฑ์คือ:

> เก็บเรื่องราว → เก็บรูปภาพ → เก็บวันสำคัญ → เลือก Template → สร้างเว็บไซต์ → Preview → Publish → แชร์ให้คนสำคัญ

ระบบไม่ได้เป็นเพียงเครื่องมือสร้างเว็บไซต์ครั้งเดียว แต่เป็นคลังความทรงจำระยะยาว ผู้ใช้สามารถกลับมาเพิ่มข้อมูล และนำข้อมูลเดิมไปสร้างเว็บไซต์ใหม่ในโอกาสต่าง ๆ ได้

## 2. เป้าหมายของระบบ

### 2.1 เป้าหมายระยะสั้น

พัฒนา MVP ที่ผู้ใช้สามารถ:

- สมัครสมาชิกและเข้าสู่ระบบ
- สร้าง Project
- เลือก Template
- แก้ไขข้อความ
- อัปโหลดรูปภาพ
- ดูตัวอย่างเว็บไซต์
- บันทึก Draft
- Publish เว็บไซต์
- แชร์เว็บไซต์ผ่านลิงก์

### 2.2 เป้าหมายระยะกลาง

เพิ่มระบบ:

- คลังความทรงจำ
- Timeline
- วันสำคัญ
- Countdown
- Privacy
- Password Protection
- Scheduled Reveal
- Premium Template
- Payment

### 2.3 เป้าหมายระยะยาว

พัฒนาเป็นแพลตฟอร์มเต็มรูปแบบที่รองรับ:

- สร้างเว็บไซต์อัตโนมัติจากข้อมูลความทรงจำ
- ระบบช่วยเขียนข้อความ
- Analytics
- Custom Domain
- ระบบแจ้งเตือนวันสำคัญ
- Subscription
- เว็บไซต์หลายภาษา
- Advanced Website Editor
- Mobile Application

## 3. กลุ่มผู้ใช้งาน

### 3.1 ผู้ใช้ทั่วไป

ผู้ที่ต้องการสร้างเว็บไซต์เป็นของขวัญหรือเซอร์ไพรส์ เช่น:

- คนรัก
- คู่สมรส
- เพื่อน
- ครอบครัว
- รุ่นพี่หรือรุ่นน้อง
- ผู้สำเร็จการศึกษา
- ผู้จัดงานขนาดเล็ก

### 3.2 ผู้ใช้ระยะยาว

ผู้ที่ต้องการ:

- บันทึกความทรงจำเป็นประจำ
- เก็บรูปภาพและเหตุการณ์สำคัญ
- สร้างเว็บไซต์หลายครั้ง
- สร้าง Year in Review
- จัดเก็บ Timeline ความสัมพันธ์
- ตั้ง Reminder สำหรับวันสำคัญ

### 3.3 ผู้ดูแลระบบ

ผู้ดูแลระบบสามารถ:

- จัดการผู้ใช้
- จัดการ Template
- ตรวจสอบเว็บไซต์
- ดูรายการ Report
- จัดการแผนสมาชิก
- ตรวจสอบ Payment
- ตรวจสอบการใช้ Storage
- ดูสถิติภาพรวมของระบบ

## 4. จุดขายของผลิตภัณฑ์

ผลิตภัณฑ์ไม่ควรแข่งขันกับเครื่องมือสร้างเว็บไซต์ทั่วไปโดยตรง เช่น Wix หรือเครื่องมือออกแบบอิสระ แต่ควรเน้นจุดขายว่า:

> เปลี่ยนความทรงจำของคุณให้กลายเป็นเว็บไซต์แสนพิเศษ

จุดแตกต่างสำคัญ:

- มีคลังความทรงจำส่วนตัว
- สร้างเว็บไซต์จากข้อมูลเดิมได้หลายครั้ง
- มี Template เฉพาะสำหรับโอกาสสำคัญ
- ไม่ต้องมีความรู้ด้านการเขียนโค้ด
- สร้างเว็บไซต์ได้รวดเร็ว
- รองรับ Timeline และ Countdown
- ตั้งเวลาเปิดเว็บไซต์เซอร์ไพรส์ได้
- ออกแบบมาเพื่อใช้งานกับเนื้อหาส่วนตัวโดยเฉพาะ

## 5. Technology Stack

| ส่วน | เทคโนโลยี |
|---|---|
| Frontend | React + Vite |
| Styling | Tailwind CSS / Modern Vanilla CSS Design System |
| Routing | React Router / SPA Router |
| State Management | Context API / Reactive Store |
| Backend | Node.js |
| Serverless Backend | Firebase Cloud Functions |
| Authentication | Firebase Authentication |
| Database | Cloud Firestore |
| File Storage | Firebase Storage |
| Hosting | Firebase Hosting |
| Version Control | GitHub |
| Local Development | Vite Dev Server |
| Package Manager | npm |

## 6. System Architecture

```text
ผู้ใช้
  ↓
React Web Application
  ├── Authentication UI
  ├── Dashboard
  ├── Memory Library
  ├── Template Gallery
  ├── Website Builder
  ├── Preview
  └── Published Website
  ↓
Firebase SDK
  ├── Firebase Authentication
  ├── Cloud Firestore
  ├── Firebase Storage
  └── Cloud Functions
  ↓
Firebase Hosting
```

## 7. แนวทางการ Render เว็บไซต์

ระบบไม่จำเป็นต้องสร้างไฟล์ HTML ใหม่แยกทุกเว็บไซต์ ผู้ใช้แต่ละคนจะมี Project ซึ่งประกอบด้วย:

- Template ID
- Theme
- Sections
- Content
- Images
- Memories
- Privacy
- Publish Configuration

เมื่อมีคนเปิด URL ระบบจะ:

```text
เปิด URL
→ อ่าน Slug
→ โหลด Published Site จาก Firestore
→ ตรวจสอบ Privacy
→ ตรวจสอบ Reveal Date
→ ตรวจสอบวันหมดอายุ
→ โหลด Template
→ Render Sections
→ แสดงเว็บไซต์
```

ตัวอย่าง URL:

```text
https://ilove.app/s/happy-birthday-may
```

## 8. ระบบสมาชิก

### 8.1 Authentication

ระบบสมาชิกควรรองรับ:

- สมัครด้วย Email และ Password
- Login ด้วย Email และ Password
- Login ด้วย Google
- Logout
- ลืมรหัสผ่าน
- แก้ไขชื่อ / รูป Profile

### 8.2 User Roles & Plans
- FREE / PREMIUM / LIFETIME / ADMIN

## 9. Information Architecture & Routes

```text
/                       -> Landing Page
/dashboard              -> Dashboard
/projects/new           -> Create Project Wizard
/projects/:id/edit      -> 3-Column Website Builder
/projects/:id/preview   -> Fullscreen Preview
/memories               -> Memory Library (Timeline & Grid)
/important-dates        -> Important Dates & Countdown
/templates              -> Template Gallery
/billing                -> Pricing & Plans
/settings               -> Settings & Profile
/s/:slug                -> Published Website (Public recipient view)
```

## 10. Design System Tokens

- Primary: `#E85D8E` (Rose Pink)
- Primary Hover: `#D9467A`
- Secondary: `#8B7CF6` (Lavender)
- Background: `#FFF9FB`
- Surface: `#FFFFFF`
- Text Primary: `#33252E`
- Text Secondary: `#756871`
- Border: `#EDE5E9`
- Fonts: `Mali`, `Noto Sans Thai`, `Inter`, `Itim`, `Pridi`
- Radius: `8px`, `14px`, `24px`, `999px`
- Shadows: `0 8px 30px rgba(51, 37, 46, 0.08)`, `0 20px 60px rgba(51, 37, 46, 0.16)`
