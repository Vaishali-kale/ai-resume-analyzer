# 🤖 AI Resume Analyzer

An AI-powered full-stack web application that analyzes a resume against a job description and provides intelligent feedback on resume strength, matching skills, missing skills, and improvement suggestions.

## 🚀 Live Demo

🌐 **Live Application:**  
https://ai-resume-analyzer-phi-lake.vercel.app/

🔗 **Backend API:**  
https://ai-resume-analyzer-ouf6.onrender.com/

🔗 **GitHub Repository:**  
https://github.com/Vaishali-kale/ai-resume-analyzer

---

## 📌 Features

- 📄 Upload resume in PDF format
- 📝 Enter or paste a job description
- 🤖 AI-powered resume analysis
- 🎯 Resume compatibility score
- ✅ Matching skills identification
- ❌ Missing skills identification
- 💪 Resume strengths
- ⚠️ Resume weaknesses
- 💡 Personalized improvement suggestions
- 📋 Recruiter-style resume summary
- 🔄 Real-time frontend and backend communication
- 🌐 Fully deployed web application

---

## 🛠️ Tech Stack

### Frontend
- React.js
- JavaScript
- HTML5
- CSS3
- Vite

### Backend
- Node.js
- Express.js
- Multer
- CORS
- REST API

### AI
- Google Gemini API
- Gemini Flash Model

### Tools & Deployment
- Git
- GitHub
- Vercel
- Render
- VS Code

---

## 🏗️ Project Architecture

```text
                    ┌───────────────────┐
                    │     User          │
                    │ Resume + Job JD   │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │   React Frontend  │
                    │      Vercel       │
                    └─────────┬─────────┘
                              │
                         REST API
                              │
                              ▼
                    ┌───────────────────┐
                    │ Node.js + Express │
                    │      Render       │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │    Gemini AI      │
                    │ Resume Analysis   │
                    └─────────┬─────────┘
                              │
                              ▼
                    ┌───────────────────┐
                    │  Analysis Result  │
                    │ Score + Feedback  │
                    └───────────────────┘

📂 Project Structure
ai-resume-analyzer/
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .gitignore
│
├── .gitignore
└── README.md


⚙️ How It Works
1. Upload Resume

The user uploads a resume in PDF format.

2. Enter Job Description

The user pastes the job description for the position they are applying for.

3. Send Request

React sends the resume and job description to the Node.js/Express backend using a REST API.

4. AI Processing

The backend sends the resume and job description to the Google Gemini API.

5. Resume Analysis

Gemini analyzes the resume and compares it with the job requirements.

6. Display Results

The analysis is returned to the React frontend and displayed to the user.

📊 Analysis Output

The AI analyzes:

Resume Score
Matching Skills
Missing Skills
Strengths
Weaknesses
Suggestions for Improvement
Short Summary
💻 Run Locally
Clone the repository
git clone https://github.com/Vaishali-kale/ai-resume-analyzer.git
cd ai-resume-analyzer
Frontend Setup
cd frontend

Install dependencies:

npm install

Start development server:

npm run dev

Frontend will run at:

http://localhost:5173
Backend Setup

Open another terminal:

cd backend

Install dependencies:

npm install

Create a .env file:

GEMINI_API_KEY=your_gemini_api_key

Start the backend:

node server.js

Backend will run at:

http://localhost:5000

🔐 Environment Variables

Never commit your API key to GitHub.

Backend .env:

GEMINI_API_KEY=your_gemini_api_key

The .env file should be included in .gitignore.

🚀 Deployment
Frontend

Deployed using:

Vercel

Live URL:

https://ai-resume-analyzer-phi-lake.vercel.app/

Backend

Deployed using:

Render

Backend URL:

https://ai-resume-analyzer-ouf6.onrender.com/

AI Service

Powered by:

Google Gemini API

🔮 Future Improvements
📈 Visual resume score dashboard
📊 Skill-match percentage charts
🔑 Keyword/ATS optimization analysis
📄 Download AI-generated resume report
👤 User authentication
💾 Resume analysis history
🎯 Job-specific resume recommendations
🌙 Dark mode
📱 Improved mobile responsiveness
👩‍💻 Author

Vaishali Kale

GitHub:
https://github.com/Vaishali-kale

⭐ If you find this project useful

Give the repository a ⭐ on GitHub!


### Save and push it

From your project folder:

```powershell
cd C:\Users\ADMIN\ai-resume-analyzer

git add README.md

git commit -m "Add professional README"

git push

Then refresh your GitHub repository:

AI Resume Analyzer GitHub Repository

Your GitHub project will now look much more professional for resume/job applications.
