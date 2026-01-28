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
        const rawgeminiReply = await geminiAnalyzer({resumeText,companyName,jobDescription});

        let parsedReply;

        try{
            parsedReply = JSON.parse(rawgeminiReply)
        }
        catch(err){
            res.status(500).json({
                message: "Gemini could not Respond"
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