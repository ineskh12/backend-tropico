const multer = require('multer');
const util = require("util");
const path = require("path");
const fs = require('fs');
const { execSync } = require("child_process");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (
            !fs.existsSync(
                path.join(__dirname, '../public')
            )
        ) {
            execSync(
                `mkdir "${path.join(
                    __dirname, '../public'
                )}"`
            );
        }
        cb(null, './public');
    },
    filename: function (req, file, cb) {
        // console.log(file);
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
}).single('imageData');

const uploadFile = util.promisify(upload);

module.exports = {
    uploadFile: uploadFile
};
