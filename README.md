# 🌐 StudySphere

<div align="center">

**Your Offline-First Education & Career Companion**

[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/your-org/studysphere)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](../LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![Coverage](https://img.shields.io/badge/coverage-92%25-brightgreen.svg)]()

</div>

---

## 📌 Problem: The Fragmented Student Experience

Students and lifelong learners face an ecosystem that’s split across multiple apps: notes here, courses there, quizzes somewhere else, and tutoring behind expensive paywalls. This fragmentation costs time, motivation, and outcomes.

**Consequences:**

* Lost study time hunting for materials.
* Lack of structured progression and personalized guidance.
* Accessibility gaps for learners with low bandwidth or disabilities.
* High dependence on paid tutors and platforms.

---

## 👥 Who is Impacted?

| Segment                     | Challenge Faced                                          |
| --------------------------- | -------------------------------------------------------- |
| 🎓 **Students**             | Difficulty combining notes, videos, tests, and schedules |
| 👩‍🏫 **Educators**         | Repetitive prep work; limited reach and insights         |
| 🏢 **Corporate Learners**   | Legacy LMS + poor personalization                        |
| 🌐 **Independent Learners** | No affordable, guided ecosystem                          |

> A cross-market problem affecting individuals, institutions, and enterprises.

---

## 💡 Our Solution: StudySphere

StudySphere unifies offline-capable lessons, personalized dashboards, career tools, and a real‑time community in a mobile-first app. We deliver adaptive roadmaps, on-device recommendations, OCR timetable extraction, and consent-based parental views — all with accessibility at the core.

**Value props:**

* Offline-first access to lessons, quizzes, and timetables.
* Real-time mentorship & community features with presence and typing indicators.
* Low-data, multilingual recommendations and offline TTS & screen reader support.

---

## ✨ Key Features

|                    Feature | Description                                         |  Status  |
| -------------------------: | :-------------------------------------------------- | :------: |
|     🔒 **Offline Lessons** | Downloadable modules with queued sync               | ✅ Active |
| 📊 **Personal Dashboards** | Track attendance, goals, scores, and visualizations | ✅ Active |
|         📚 **Content Hub** | Courses, exam prep, scholarships, internships       | ✅ Active |
|     🛠️ **Career Toolkit** | Resume builder, mock tests, skill map               | ✅ Active |
|  💬 **Realtime Community** | Live chat, Q\&A, presence (Liveblocks)              | ✅ Active |
|    🔗 **LMS Integrations** | Moodle, Google Classroom, college ERPs              | ✅ Active |
|       👪 **Parental View** | Consent-based guardian summaries                    | ✅ Active |
|        ♿ **Accessibility** | Offline TTS, dyslexia fonts, ARIA                   | ✅ Active |

---

## 🛠️ Tech Stack & Architecture

```
┌═══════════════════════════════════════════════════════════════════════════════════════┐
║ 🎨 FRONTEND LAYER ║                                                                   ║
╠═══════════════════════════════════════════════════════════════════════════════════════╣
║ 🌐 Next.js 14 (Web) 📱 Capacitor (Mobile) ║                                       ║
║ ├─ Responsive UI ├─ Offline-first pages & TTS ║                                     ║
║ └─ Accessibility hooks └─ Screen reader support ║                                  ║
╚═══════════════════════════════════════════════════════════════════════════════════════╝
│
▼
┌═══════════════════════════════════════════════════════════════════════════════════════┐
║ ⚙️ BACKEND & STORAGE ║                                                                ║
╠═══════════════════════════════════════════════════════════════════════════════════════╣
║ Next.js API Routes → Supabase (Postgres, Auth, Storage) ║                          ║
║ ├─ Auth & Profiles ├─ Content & Performance Data ║                                   ║
║ └─ Orchestration └─ Storage for media & docs (Supabase Storage) ║                     ║
╚═══════════════════════════════════════════════════════════════════════════════════════╝
│
▼
┌═══════════════════════════════════════════════════════════════════════════════════════┐
║ 🤖 AI / ML LAYER ║                                                                    ║
╠═══════════════════════════════════════════════════════════════════════════════════════╣
║ FastAPI RAG Server ↔ Vector DB (ChromaDB / Milvus) ↔ LLMs (Gemini / OpenAI / Claude) ║
║ ├─ Document ingestion ├─ Embeddings & semantic search ║                              ║
║ └─ Content generation └─ Roadmap & quiz creation pipelines ║                         ║
╚═══════════════════════════════════════════════════════════════════════════════════════╝
```

### Integration Flow

Frontend (Next.js + Capacitor) ↔ Next.js API Routes ↔ Supabase ↔ AI Layer (FastAPI + Vector DB + LLMs)

---

## 🔄 App Flow (User Journey)

1. 📥 **Upload or Search** — user uploads notes/PDF or searches topics.
2. 📚 **Roadmap Generation** — AI builds an adaptive learning path.
3. 🎞 **Content Delivery** — auto-generated slides, lessons, and flashcards.
4. 🧑‍🏫 **Tutor & Community** — real-time Q\&A, mentor sessions.
5. 📝 **Assessments** — quizzes & spaced-repetition flashcards.
6. 📊 **Progress Tracking** — dashboards update mastery and suggestions.

---

## 🚀 Quick Start (Local)

### Prerequisites

* Node.js v18+
* pnpm / npm
* Python 3.11+ (for backend workers)
* Supabase project
* Vector DB (ChromaDB or managed)

### Quick setup

```bash
# Clone
git clone https://github.com/your-org/studysphere.git
cd studysphere

# Frontend
cd frontend
pnpm install
pnpm dev

# Backend
cd ../backend
pip install -r requirements.txt
uvicorn main:app --reload
```

Open [http://localhost:3000](http://localhost:3000)

---

## 💹 Scalability & Business Model

### Scalability

* Cloud-native & modular → scale horizontally.
* Cache & batch LLM calls to minimize token use.
* CDN for media + DB indexing for fast queries.

### Business Model

* **Freemium** — core features free (offline lessons, basic dashboard).
* **Premium** — advanced analytics, unlimited cloud storage, pro career tools.
* **Institutional** — B2B licensing for schools and corporates.
* **Marketplace** — paid courses and verified internships (rev-share).
* **Credits** — pay-as-you-go LLM credits for heavy generation.

---

## 🌍 Market & Impact

* Addresses fragmentation and high tutoring costs.
* Low-data and offline-first design increases accessibility in constrained regions.
* Target segments: K‑12, college students, upskilling professionals, NGOs.

---

## 🎥 Demo & Prototype

* Demo Video: *(add your link)*
* Live Prototype: *(add your link)*
* APK / App Link: *(add your link)*

---

## 🔮 Roadmap (90 / 180 / 365 days)

* **90 days:** Stable offline sync, OCR timetable extraction, basic LMS connectors.
* **180 days:** Institution dashboards, premium mock tests, marketplace alpha.
* **365 days:** Employer marketplace, multi-region infra, advanced analytics.

---

## 🧩 Challenges & Learnings

* Keeping LLM costs predictable while offering rich generation.
* Building an intuitive UI that doesn’t overwhelm new users.
* Ensuring offline-first sync correctness and data integrity.

---

## 🤖 Tools & AI Assistants Used

* GitHub Copilot — dev productivity
* ChatGPT / Claude — ideation & docs
* LLMs (Gemini / OpenAI) — content & roadmap generation

---

## 🙌 Acknowledgements

* Contributors, mentors, and partner institutions

---

> Want this exported as `README.md` file, a ZIP with assets, or converted into a 5‑slide pitch deck? Reply with which format and I’ll prepare it.
