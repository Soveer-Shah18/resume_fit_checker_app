
const pdfParse = require('pdf-parse').PDFParse;

const extractTextFromPDF = async (fileBuffer) => {

    const parser = new pdfParse({data: fileBuffer});
    const result = await parser.getText();
    await parser.destroy();
    return result.text
    
}

module.exports = {extractTextFromPDF};