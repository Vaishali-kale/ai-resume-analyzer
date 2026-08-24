const express = require("express");
const cors = require("cors");
const multer = require("multer");
const dotenv = require("dotenv");
const { GoogleGenerativeAI } = require("@google/generative-ai");

dotenv.config();

console.log(
  "Gemini API Key:",
  process.env.GEMINI_API_KEY ? "Loaded" : "Missing"
);

const app = express();

app.use(cors());
app.use(express.json());

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024,
  },
});

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

app.get("/", (req, res) => {
  res.json({
    message: "AI Resume Analyzer API is running",
  });
});

app.post(
  "/api/analyze",
  upload.single("resume"),
  async (req, res) => {
    try {
      console.log("Analyze request received");

      // Check Gemini API key
      if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({
          message: "Gemini API key is missing",
        });
      }

      // Check resume
      if (!req.file) {
        return res.status(400).json({
          message: "Resume PDF is required",
        });
      }

      console.log("Resume:", req.file.originalname);
      console.log("File type:", req.file.mimetype);
      console.log("File size:", req.file.size);

      // Only PDF
      if (req.file.mimetype !== "application/pdf") {
        return res.status(400).json({
          message: "Please upload a PDF file",
        });
      }

      // Check job description
      const jobDescription = req.body.jobDescription;

      if (!jobDescription || !jobDescription.trim()) {
        return res.status(400).json({
          message: "Job description is required",
        });
      }

      // Convert PDF to Base64
      const resumeBase64 =
        req.file.buffer.toString("base64");

      console.log("Sending resume to Gemini...");

      // Gemini model
      const model = genAI.getGenerativeModel({
        model: "gemini-3.6-flash",
      });

      const prompt = `
You are an expert technical recruiter.

Analyze the uploaded resume against the job description.

JOB DESCRIPTION:
${jobDescription}

Return the analysis in exactly this structure:

RESUME SCORE:
Give a score from 0 to 100.

MATCHING SKILLS:
- List skills that match the job description.

MISSING SKILLS:
- List important skills required by the job but missing from the resume.

STRENGTHS:
- Give 3 to 5 strengths.

WEAKNESSES:
- Give 3 to 5 weaknesses.

SUGGESTIONS:
- Give 4 to 6 practical suggestions to improve the resume.

SUMMARY:
- Give a short recruiter-style summary.

IMPORTANT:
- Only use information actually present in the resume.
- Do not invent skills, education, experience, or projects.
- Compare the resume carefully with the job description.
`;

      const result = await model.generateContent([
        {
          inlineData: {
            mimeType: "application/pdf",
            data: resumeBase64,
          },
        },
        prompt,
      ]);

      const response = result.response;
      const analysis = response.text();

      console.log("Gemini response received");

      res.json({
        success: true,
        analysis: analysis,
      });

    } catch (error) {
      console.error("========== GEMINI ERROR ==========");
      console.error("Message:", error.message);
      console.error("Status:", error.status);
      console.error("Code:", error.code);
      console.error("==================================");

      res.status(500).json({
        message: "AI analysis failed",
        error: error.message || "Unknown error",
      });
    }
  }
);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});