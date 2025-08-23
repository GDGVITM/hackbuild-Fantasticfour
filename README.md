# 📱 EduMitra

<div align="center">

**Your All-in-One Mobile App for Education & Career**

</div>

## 📌 The Challenge: A Disconnected Student Journey

Today's students navigate a maze of disconnected tools. They juggle different apps for lessons, exam prep, scheduling, and job applications, often struggling with:

* **Connectivity Barriers**: Learning stops the moment Wi-Fi drops, making it hard to study on the go.
* **Lack of Personalization**: Generic platforms fail to address individual learning paths and career goals.
* **Information Overload**: Finding relevant courses, scholarships, and career advice is overwhelming.
* **Inaccessibility**: Many apps lack proper support for screen readers, offline use, or features for users with disabilities.

This fragmentation creates a stressful and inefficient experience, right on the device students use most—their phone.

## 💡 Our Solution: A True Mobile Companion

**StudySphere** is a native mobile app for iOS and Android that unifies a student's entire journey. Built with a powerful offline-first core, it empowers learners with personalized tools, real-time community support, and robust accessibility features, ensuring their academic and career hub is always in their pocket.

With the StudySphere app, students can:

* 📚 **Learn Anytime, Anywhere**: Access all course materials, notes, and quizzes directly from their phone, even without an internet connection.
* 📊 **Track Progress Visually**: Monitor academic performance, attendance, and career goals on a personal, mobile-friendly dashboard.
* 🚀 **Prepare for the Future**: Build resumes, map skills, and practice for interviews with integrated career tools.
* 💬 **Connect and Collaborate**: Engage with peers and mentors in real-time chat forums.
* 🌐 **Stay Organized**: Seamlessly sync with LMS platforms like Moodle and Google Classroom.

**StudySphere** brings everything a student needs into one intuitive, accessible, and powerful mobile application.

## ✨ Key Features

| Feature                       | Description                                                                  |
| ----------------------------- | ---------------------------------------------------------------------------- |
| 🔒 **Offline-First Core**     | Access lessons, notes, quizzes, and timetables offline with seamless sync.   |
| 📊 **Personal Dashboards**    | Track academics, attendance, goals, applications, and scores with visuals.   |
| 📚 **Content Hub**            | Explore courses, exam prep, scholarships, and internships.                   |
| 🔔 **Push Notifications**     | Get native mobile reminders for deadlines, study streaks, and updates.       |
| 🛠️ **Career Tools**          | Build resumes, map skills, take mock tests, and prepare for interviews.      |
| 💬 **Community & Mentorship** | Real-time chat and Q\&A with user presence and typing indicators.            |
| 🔄 **LMS Integrations**       | Connect to platforms like Moodle, Google Classroom, and college ERP systems. |
| 👨‍👩‍👧 **Parental View**    | Provide consent-based academic summaries for parents and guardians.          |
| ♿ **Advanced Accessibility**  | Full support for native screen readers (VoiceOver/TalkBack) and offline TTS. |
| 📷 **Auto-Timetable Scan**    | Use the phone's camera to extract schedules from images via OCR.             |
| 🌐 **Multilingual Content**   | Access learning materials and UI in multiple languages.                      |



## 🛠️ Tech Stack: Web-Powered, Native-Compiled

StudySphere uses a modern, web-native stack. We build the user interface with Next.js for speed and then compile it into a true native mobile application using Capacitor, giving us full access to native device features.

```
┌───────────────────────────────────────────────────────────────────────────┐
│ 📱 NATIVE MOBILE APP (iOS & Android) │
├───────────────────────────────────────────────────────────────────────────┤
│ │
│ 🔋 Capacitor 6.x (Native Bridge) │
│ ├─ Access to Native APIs: Camera, Storage, Push, TTS │
│ └─ Compiles Web Code into a Native Shell │
│ │
│ ▲ │
│ │
│ 🌐 Next.js 14 (UI Layer) │
│ ├─ Responsive, Mobile-First UI Components │
│ └─ Static Export (`output: 'export'`) for Performance │
│ │
└───────────────────────────────────────────────────────────────────────────┘
│
▼
┌───────────────────────────────────────────────────────────────────────────┐
│ ⚙️ BACKEND SERVICES │
├───────────────────────────────────────────────────────────────────────────┤
│ │
│ 🗄️ Supabase (Data & Auth) 🤝 Liveblocks (Real-Time) │
│ │
└───────────────────────────────────────────────────────────────────────────┘
```

## 🚀 Getting Started

### 📋 Prerequisites

* **Node.js** v18+ and npm/yarn
* **Android Studio** and/or **Xcode** for building the mobile apps
* **Capacitor CLI**: `npm install -g @capacitor/cli`
* A **Supabase** and **Liveblocks** account

### ⚡ Local Setup & Build

```bash
# 1. Clone the repository
git clone [https://github.com/your-username/studysphere.git](https://github.com/your-username/studysphere.git)
cd studysphere

# 2. Install web dependencies
npm install

# 3. Configure environment variables in .env.local
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY=...

# 4. Build the Next.js static assets
npm run build

# 5. Add your desired mobile platform
npx cap add ios
npx cap add android

# 6. Sync the web build with the native project
npx cap sync

# 7. Open the native project in its IDE to run on a device or simulator
npx cap open ios
npx cap open android
```

## 🔮 Future Roadmap

* 🌐 **Enhanced AI Features**: Implement on-device, low-data recommendation systems for courses and career paths.
* 🎓 **Institutional Dashboards**: Provide tools for schools and colleges to manage student progress and engagement.
* 🤝 **Expanded Integrations**: Add support for more LMS and ERP systems to broaden compatibility.
* 🤖 **AI-Powered Mentorship**: Introduce an AI mentor to provide guidance and answer student queries 24/7.
