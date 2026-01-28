import { useState, useEffect } from "react";
import { Upload } from "lucide-react";

export default function App() {
  const [companyName, setCompanyName] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const isFormValid =
    companyName.trim() !== "" &&
    jobDescription.trim() !== "" &&
    resumeFile !== null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setResumeFile(file);
    } else {
      alert("PDF only");
    }
  };

  const handleAnalyze = async () => {
    if (!isFormValid) return;

    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      const formData = new FormData();
      formData.append("resume", resumeFile);
      formData.append("companyName", companyName);
      formData.append("jobDescription", jobDescription);

      const res = await fetch(import.meta.env.API_KEY, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setAnalysisResult(data.analysis);
    } catch (err) {
      console.error(err);
      alert("Analysis failed");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="fixed top-0 left-0 w-screen h-14 bg-linear-to-r from-[#000000d1] to-[#1a0532] border-b border-white/10 z-50 flex items-center justify-between px-6">
        <div className="flex items-center gap-2 text-white font-semibold">
          <span className="tracking-wide">Resume Fit Checker</span>
        </div>
        <div className="text-xs text-gray-400 tracking-wider">
          PRECISION ANALYSIS
        </div>
      </div>

      {/* MAIN */}
      <div className="pt-16 min-h-screen bg-linear-to-br from-[#09185a] via-[#2e023e] to-black text-gray-200 overflow-hidden">
        <div className="flex h-full gap-8 px-6">
          {/* LEFT PANEL */}
          <div className="w-[38%] backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-8 overflow-y-auto">
            <div className="space-y-6">
              <div>
                <label className="block mb-2 text-xs tracking-widest text-gray-400 uppercase">
                  Job Context
                </label>
                <input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Target Company Name..."
                  className="w-full px-4 py-2.5 rounded-md bg-[#020617] border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-xs tracking-widest text-gray-400 uppercase">
                  Job Description
                </label>
                <textarea
                  rows={7}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here..."
                  className="w-full px-4 py-2.5 rounded-md bg-[#020617] border border-white/10 text-gray-200 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
                />
              </div>

              <div>
                <label className="block mb-2 text-xs tracking-widest text-gray-400 uppercase">
                  Resume Upload
                </label>
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const file = e.dataTransfer.files[0];
                    if (file?.type === "application/pdf") setResumeFile(file);
                  }}
                  className={`border border-dashed rounded-md p-6 text-center bg-[#020617] border-white/20 ${
                    isDragging ? "border-cyan-400" : ""
                  }`}
                >
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    className="hidden"
                    id="resume"
                  />
                  <label htmlFor="resume" className="cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    {resumeFile ? (
                      <p className="text-sm text-gray-200">
                        {resumeFile.name}
                      </p>
                    ) : (
                      <>
                        <p className="text-sm text-gray-300">
                          Click or Drop PDF
                        </p>
                        <p className="text-xs text-red-500 mt-1">PDF ONLY</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={!isFormValid || isAnalyzing}
                className={`w-full py-2.5 rounded-md text-sm font-semibold transition-all ${
                  isFormValid && !isAnalyzing
                    ? "bg-cyan-500 text-black hover:bg-cyan-400"
                    : "bg-white/5 text-gray-500 cursor-not-allowed"
                }`}
              >
                {isAnalyzing ? "Analyzing..." : "Run Fit Analysis"}
              </button>
            </div>
          </div>

          {/* RIGHT PANEL */}
    <div className="w-[62%] backdrop-blur-lg bg-white/5 border border-white/10 rounded-xl p-10 overflow-y-auto">

  {/* SKELETON LOADER (highest priority) */}
  {isAnalyzing && (
    <div className="space-y-6 animate-pulse">
      <div className="h-20 rounded-lg bg-white/10"></div>
      <div className="h-24 rounded-lg bg-white/10"></div>
      <div className="h-32 rounded-lg bg-white/10"></div>
      <div className="h-28 rounded-lg bg-white/10"></div>
    </div>
  )}

  {/* 2️⃣ RESULTS */}
  {!isAnalyzing && analysisResult && (
    <div className="space-y-6">

      {/* SUMMARY + SCORE (compact) */}
      <div className="bg-cyan-400/10 border border-cyan-400/20 rounded-lg p-4">
        <p className="text-xs text-gray-400 mb-1">
          {analysisResult.company && analysisResult.company !== "string"
            ? analysisResult.company
            : "Company not provided"}
        </p>

        <p className="text-sm text-gray-200 mb-3 leading-relaxed">
          {jobDescription.trim()
            ? analysisResult.jobRoleMatchSummary
            : "Job description not provided. Resume evaluated based on general profile strength."}
        </p>

        <div className="flex items-center justify-between">
          <p className="text-xl font-bold text-cyan-400">
            {analysisResult.overallFitScore}/100
          </p>

          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              analysisResult.readyToApply === "Yes"
                ? "bg-green-400/20 text-green-400"
                : "bg-yellow-400/20 text-yellow-400"
            }`}
          >
            {analysisResult.readyToApply === "Yes"
              ? "Ready to Apply"
              : "Needs Improvement"}
          </span>
        </div>
      </div>

      {/* PROS */}
      <div className="bg-green-400/10 border border-green-400/20 rounded-lg p-5">
        <h2 className="text-green-400 mb-3 font-semibold">
          What's Working Well
        </h2>

        <ul className="list-disc list-inside space-y-2 text-sm text-gray-200">
          {analysisResult.strengthsForThisRole.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* CONS */}
      <div className="bg-red-400/10 border border-red-400/20 rounded-lg p-5">
        <h2 className="text-red-400 mb-3 font-semibold">
          Gaps & Improvements Needed
        </h2>

        <ul className="list-disc list-inside space-y-2 text-sm text-gray-200">
          {analysisResult.gapsAgainstJobDescription.map((item, i) => (
            <li key={`gap-${i}`}>{item}</li>
          ))}
          {analysisResult.resumeImprovements.map((item, i) => (
            <li key={`imp-${i}`}>{item}</li>
          ))}
        </ul>
      </div>

      {/* SKILLS */}
      <div className="bg-purple-400/10 border border-purple-400/20 rounded-lg p-5">
        <h2 className="text-purple-400 mb-3 font-semibold">
          Skill Suggestions
        </h2>

        <ul className="list-disc list-inside space-y-2 text-sm text-gray-200">
          {analysisResult.skillSuggestions.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>

      {/* FINAL RECOMMENDATION */}
      <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-5">
        <h2 className="text-yellow-400 mb-2 font-semibold">
          Final Recommendation
        </h2>

        <p className="text-sm text-gray-200">
          {analysisResult.finalRecommendation}
        </p>
      </div>
    </div>
  )}

  {/* PLACEHOLDER */}
  {!isAnalyzing && !analysisResult && (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
      <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center mb-4">
        🔍
      </div>
      <p className="text-sm font-medium text-gray-300">
        Ready for Analysis
      </p>
      <p className="text-xs mt-1">
        Provide company details and your resume to get instant AI-driven insights.
      </p>
    </div>
  )}
</div>

        </div>
      </div>
    </>
  )
}
