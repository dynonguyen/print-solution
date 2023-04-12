const express = require("express");
const bodyParser = require("body-parser");
const upload = require("./multer");
const { countPageFromListFiles } = require("./utils");

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Route for uploading a folder
app.post("/upload", upload.any(), async function (req, res) {
  try {
    // Loop through each uploaded file
    await countPageFromListFiles(req.files);
    res.status(200).send(`Done`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error");
  }
});

app.listen(3245, { timeout: 60000 }, function () {
  console.log("Server listening on port 3245");
});
