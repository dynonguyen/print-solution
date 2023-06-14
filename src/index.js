const express = require("express");
const bodyParser = require("body-parser");
const upload = require("./multer");
const { countPageFromListFiles } = require("./utils");
const { QRGenerator } = require("./bankService");

const app = express();
app.use(express.json()); // <==== parse request body as JSON

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/PoC-01-upload-files", (req, res) => {
  res.sendFile(__dirname + "/views/PoC_01.html");
});

app.get("/PoC-02-bank-qrcode", (req, res) => {
  res.sendFile(__dirname + "/views/PoC_02.html");
});

// Route for uploading a folder
app.post("/upload", upload.any(), async function (req, res) {
  try {
    // Loop through each uploaded file
    console.log("_______________________\n");
    const results = await countPageFromListFiles(req.files);
    console.log("_______________________");
    res.status(200).send(results);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

// Route for generate qr code
app.post("/generate-qr-code", function (req, res) {
  try {
    const { bank, stk, amount, description } = req.body;
    const QRCode = QRGenerator(bank, stk, amount, description);

    res.status(200).send(QRCode);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.listen(3245, { timeout: 60000 }, function () {
  console.log("Server listening on port 3245: http://localhost:3245/");
});
