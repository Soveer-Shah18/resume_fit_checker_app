# Resume Fit Checker 🔍🤖

An AI-powered web application that analyzes how well a resume matches a specific job description and company context. The system extracts resume content from PDFs, evaluates alignment using the Gemini AI model, and provides structured, actionable feedback to help candidates improve their chances before applying.

---

## 🚀 Live Demo

- **Frontend:** https://resume-fit-checker-app.vercel.app  
- **Backend API:** https://resume-fit-checker-app.onrender.com  

---

## 📌 Features

- 📄 Upload resume in **PDF format**
- 🏢 Provide **company name** and **job description**
- 🧠 AI-driven analysis using **Gemini API**
- 📊 Generates:
  - Overall fit score (0–100)
  - Readiness to apply (Yes / Needs Improvement)
  - Strengths for the role
  - Gaps against job requirements
  - Resume improvement suggestions
  - Skill recommendations
  - Final hiring recommendation
- 📱 Fully **responsive UI** (mobile + desktop)
- 🎨 Modern **dark glassmorphism UI**
- ⚠️ Graceful handling of AI rate limits & errors

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- Fetch API
- Deployed on **Vercel**

### Backend
- Node.js
- Express.js
- Multer (file upload)
- pdf-parse (PDF text extraction)
- Gemini API (AI analysis)
- Deployed on **Render**

---

## 🧠 How It Works

1. User uploads a resume (PDF)
2. Backend extracts text from the PDF
3. Resume text + job description + company name are sent to Gemini AI
4. AI returns structured JSON analysis
5. Frontend displays results in categorized sections (Pros / Cons / Suggestions)

---

## 📂 Project Structure

Resume-Fit-Checker/
├── client/ # Frontend (React + Tailwind)
│ ├── src/
│ └── vite.config.js
│
├── server/ # Backend (Node + Express)
│ ├── src/
│ │ ├── controllers/
│ │ ├── routes/
│ │ └── services/
│ └── package.json

1️⃣ Start Backend
cd server
npm install
cd src
nodemon app.js

2️⃣ Start Frontend
cd client
npm install
npm run dev

---

⚠️ Known Limitations :-
Gemini API free tier has daily request limits
Large resumes may be truncated for performance
Analysis depends on clarity of job description

---

🌱 Future Enhancements :-
Resume history & comparison
Cloud storage (Cloudinary)
Caching AI responses
User authentication
PDF export of analysis
Paid AI tier support