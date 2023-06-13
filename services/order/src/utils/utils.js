const { PDFDocument } = require('pdf-lib');
const axios = require('axios');
const { libreExtensionAccept } = require('~/utils/constant');
const FormData = require('form-data');

const countPageEachFile = async (dataBase64, fileName = '') => {
  try {
    const extension = fileName.split('.').pop().trim().toLowerCase();

    if (libreExtensionAccept.includes(extension)) {
      const base64Data = dataBase64.replace(/^data:.*?;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      if (extension === 'pdf') {
        const pdfDoc = await PDFDocument.load(buffer);
        const count = pdfDoc.getPages().length;
        console.log(fileName, ': ', count);
        return count;
      } else {
        const form = new FormData();
        form.append('files', buffer, {
          filename: fileName,
          contentType: 'application/pdf'
        });

        const response = await axios.post('https://demo.gotenberg.dev/forms/libreoffice/convert', form, {
          headers: form.getHeaders(),
          responseType: 'arraybuffer'
        });

        const pageCountTemp = await PDFDocument.load(response.data);
        const count = pageCountTemp.getPages().length;
        console.log(fileName, ': ', count);

        return count;
      }
    } else {
      return fileName
    }
  } catch (error) {
    return fileName;
  }
};

module.exports = {
  countPageEachFile
};
