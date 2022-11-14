const express = require('express')
const multer = require('multer');
const fs = require('fs');
const http = require('http');
const crypto = require("crypto-js");
var path = require('path')

const app = express();
const port = process.env.PORT || 4000

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);        
    }
  })
     
  var upload = multer({ storage: storage })
 
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html'); 
});

app.post('/upload', upload.single('myFile'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }

    let sqlServerName = 33;
    let databaseName = 37;
    let databasePass = 41;
    let settingUser = 54;
    let settingPass = 59;
    let verName = 75;
    let mail1 = 201;
    let host = 208;
    let mail2 = 212;
    let mailPass = 216;
    let portt = 220;
    let ssl = 224;
    var data = fs.readFileSync('uploads/'+file.filename).toString().split("\n");
    data.splice(sqlServerName-1, 1, req.body.sqlServerName);
    data.splice(databaseName-1, 1, req.body.databaseName);
    data.splice(databasePass-1, 1, req.body.databasePass);
    data.splice(settingUser-1, 1, `"${req.body.settingUser}"`);
    data.splice(settingPass-1, 1, `"${req.body.settingPass}"`);
    data.splice(verName-1, 1, `"${req.body.verName}"`);
    data.splice(mail1-1, 1, `"${req.body.mail}"`);
    data.splice(host-1, 1, `"${req.body.host}"`);
    data.splice(mail2-1, 1, `"${req.body.mail}"`);
    data.splice(mailPass-1, 1, `"${req.body.mailPass}"`);
    data.splice(portt-1, 1, `"${req.body.portt}"`);
    data.splice(ssl-1, 1, `"${req.body.ssl}"`);
    var text = data.join("\n");

    const homeDir = require('os').homedir();
    const desktopDir = `${homeDir}/Desktop`;
    console.log('desktopDir : ',desktopDir)

    fs.writeFile(desktopDir+ '/' +file.filename, text, function (err) {
    if (err) return console.log(err);
    });

    res.setHeader(`Content-type`,'text/html')
    res.send('<a href="/">Back</a><p>done! you can find your file on your desktop</p>')
  })
 
app.listen(port, () => 
    console.log(`Server started on port ${port}`)
);