const {extractTextFromPDF} = require('../services/pdf.service')
const geminiAnalyzer = require("../services/gemini.service")

const analyzeResume = async (req,res)=>{

    try{

        const {companyName, jobDescription} = req.body;
        
        if(!req.file){
            return res.status(400).json({
                message: "Resume file is Required"
            })
        }
        const resumeText = await extractTextFromPDF(req.file.buffer);

        let rawGeminiReply;
        try {
          rawGeminiReply = await geminiAnalyzer({
            resumeText,
            companyName,
            jobDescription,
          });
        } catch (err) {
          if (err?.error?.code === 429) {
            return res.status(429).json({
              message: "AI usage limit reached",
              error: "Please try again later",
            });
          }
        
          return res.status(500).json({
            message: "AI analysis failed",
          });
        }

        let parsedReply;
        try{
            parsedReply = JSON.parse(rawGeminiReply)
        }
        catch(err){
            res.status(500).json({
                message: "Invalid response from AI"
            })
        }

        res.status(200).json({
            message: "Resume Analyzed Successfully",
            analysis: parsedReply
        })
    }
    catch(err){
        res.status(500).json({
            message: "Failed to Analyze Resume",
            error: err.message
        })
    }
}

module.exports = analyzeResume;