# I-LOVE (Memory Website Builder) 💖

> A modern, elegant web application for creating romantic memory websites, interactive timelines, photo galleries, and digital love letters for anniversaries, birthdays, Valentine's Day, and special moments.

---

## ✨ Features

- 🎨 **Templates Gallery**: Pre-designed romantic templates (Romantic Classic, Modern Love, Anniversary Special, Birthday Surprise, and more).
- 🛠️ **Visual Website Builder**: Intuitive live editor to customize sections, colors, fonts, music, and layout.
- 📸 **Memory Library**: Organize photos, video links, stories, and timestamps of your most cherished memories.
- 💌 **Love Letters & Messages**: Interactive envelopes and flip cards for heart-touching messages.
- ⏳ **Days Together / Countdown Timer**: Real-time counter celebrating days spent together or counting down to special dates.
- 🎵 **Background Music Player**: Romantic background tunes with custom playback controls.
- 🔒 **Password Protection & Privacy**: Option to protect published memory pages with private passcodes.
- 🚀 **1-Click Publishing & Sharing**: Generate unique slugs (`/s/your-slug`) with QR code generation and direct link sharing.
- 🔥 **Firebase Integration**: Authentication, Firestore database, and cloud storage ready.

---

## 🚀 Tech Stack

- **Frontend**: React 19, Vite
- **Icons**: Lucide React
- **Animations & Effects**: Canvas Confetti, Vanilla CSS animations
- **Backend / Database**: Firebase (Auth, Firestore, Storage)

---

## 📦 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/easy-web-p/I-LOVE.git
cd I-LOVE
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
Create a `.env` file in the root directory based on `.env.example`:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Run locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 5. Build for production
```bash
npm run build
```

---

## 📄 License

This project is licensed under the MIT License.
