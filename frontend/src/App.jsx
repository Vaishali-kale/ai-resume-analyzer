
import { useState } from "react";
import "./App.css";

function App() {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      setMessage("Please upload a PDF file.");
      setResume(null);
      return;
    }

    setResume(file);
    setAnalysis("");
    setMessage(`Selected: ${file.name}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume) {
      setMessage("Please upload your resume.");
      return;
    }

    if (!jobDescription.trim()) {
      setMessage("Please enter the job description.");
      return;
    }

    try {
      setLoading(true);
      setMessage("Analyzing your resume...");
      setAnalysis("");

      const formData = new FormData();

      formData.append("resume", resume);
      formData.append("jobDescription", jobDescription);

      const response = await fetch(
        "http://localhost:5000/api/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      console.log("Backend response:", data);

      if (!response.ok) {
        throw new Error(
          data.error ||
          data.message ||
          "AI analysis failed"
        );
      }

      if (data.success && data.analysis) {
        setAnalysis(data.analysis);
        setMessage(
          "Resume analysis completed successfully!"
        );
      } else {
        setMessage(
          "AI returned an empty response."
        );
      }

    } catch (error) {
      console.error("Analysis error:", error);

      setMessage(
        error.message ||
        "Something went wrong."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">

      <div className="container">

        <h1>AI Resume Analyzer</h1>

        <p className="subtitle">
          Upload your resume and compare it with a job description.
        </p>

        <form onSubmit={handleSubmit}>

          {/* Resume Upload */}

          <div className="form-group">

            <label>
              Upload Resume PDF
            </label>

            <input
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleResumeChange}
            />

            {resume && (
              <div className="file-name">
                📄 {resume.name}
              </div>
            )}

          </div>

          {/* Job Description */}

          <div className="form-group">

            <label>
              Job Description
            </label>

            <textarea
              rows="12"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(e.target.value)
              }
            />

          </div>

          {/* Analyze */}

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Analyzing Resume..."
              : "Analyze Resume"}
          </button>

        </form>

        {/* Message */}

        {message && (
          <div className="message">
            {message}
          </div>
        )}

        {/* AI Result */}

        {analysis && (
          <div className="result">

            <h2>
              AI Resume Analysis
            </h2>

            <div className="analysis-box">
              {analysis}
            </div>

          </div>
        )}

      </div>

    </div>
  );
}

export default App;
