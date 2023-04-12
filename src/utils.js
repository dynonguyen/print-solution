const fs = require("fs-extra");
const { PDFDocument } = require("pdf-lib");
const axios = require("axios");
const FormData = require("form-data");
const path = require("path");

const libre = require("libreoffice-convert");
const { libreExtensionAccept } = require("./constant");
libre.convertAsync = require("util").promisify(libre.convert);

async function convertToPdfAndCountPage(path) {
  try {
    const form = new FormData();
    form.append("files", fs.createReadStream(path));

    const response = await axios.post(
      "http://localhost:3000/forms/libreoffice/convert",
      form,
      {
        headers: form.getHeaders(),
        responseType: "arraybuffer",
      }
    );

    const pageCountTemp = await PDFDocument.load(response.data);
    return pageCountTemp.getPages().length;
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      console.error("ERROR: pls start gotenberg server");
    } else {
      console.error(error);
    }
    return null;
  }
}

async function countPagePDF(path) {
  const pdfBuffer = await fs.readFile(path);
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  return pdfDoc.getPages().length;
}

function getExtension(filename) {
  var ext = path.extname(filename || "").split(".");
  return ext[ext.length - 1];
}

async function countPageFromListFiles(listFile = []) {
  for (const file of listFile) {
    const ext = getExtension(file.originalname);
    if (ext === "pdf") {
      const totalPagePdf = await countPagePDF(file.path);
      console.log(file.originalname, ": ", totalPagePdf);
    } else if (libreExtensionAccept.includes(ext)) {
      const countTotalPage = await convertToPdfAndCountPage(file.path);
      console.log(file.originalname, ": ", countTotalPage);
    }
  }
}

module.exports = {
  countPageFromListFiles,
};
