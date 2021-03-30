const util = require("util");
const path = require("path");
const multer = require("multer");
const { execSync } = require("child_process");
const fs = require('fs');


var storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log();
    /* if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    } */
    if (
      !fs.existsSync(
        path.join(__dirname, "../public/" )
      )
    ) {
      // execSync(`mkdir -p "${path.join(ENV.MEDIA.DIRECTORY, mediaDirectory)}"`);
      execSync(
        `mkdir "${path.join(
          __dirname, "../public/"
        )}"`
      );
    }
    callback(
      null,
      path.join(__dirname, "../public/")
    );
  },
  filename: (req, file, callback) => {
    //var filename = `${file.originalname}`;
    callback(null, file.originalname);
  },
});



var uploadFiles = multer({ storage: storage }).array("files", 2);
var upload = util.promisify(uploadFiles);

const multipleUpload = async (req, res, next) => {
    try {
      await upload(req, res);
      //console.log(req.body);
      next();
    } catch (error) {
      console.log(error);
  
      if (error.code === "LIMIT_UNEXPECTED_FILE") {
        return res.send("Too many files to upload.");
      }
      return res.send(`Error when trying upload many files: ${error}`);
    }
  };
  
  module.exports = {
    multipleUpload: multipleUpload,
  };