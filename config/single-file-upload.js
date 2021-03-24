const util = require("util");
const path = require("path");
const multer = require("multer");
const { execSync } = require("child_process");
const fs = require('fs');


var storage = multer.diskStorage({
    destination: (req, file, callback) => {
      console.log();
      if (
        !fs.existsSync(
          path.join(__dirname,'../public')
        )
      ) {
        execSync(
          `mkdir "${path.join(
            __dirname,'../public'
          )}"`
        );
      }
      callback(
        null,
        path.join(__dirname,'../public')
      );
    },
    filename: (req, file, callback) => {
      var filename = `${file.originalname}`;
      callback(null, filename);
    },
  });

var uploadFile = require('multer')({ storage: storage }).single('file');
var upload = util.promisify(uploadFile);

module.exports = {
  uploadFile: upload
};
