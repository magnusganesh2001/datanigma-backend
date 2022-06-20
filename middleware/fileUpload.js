const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/resumes");
    },
    filename: (req, file, cb) => {
        console.log(file);
        var filetype = "";
        if (file.mimetype === "x-pdf") {
            filetype = "pdf";
        }
        if (file.mimetype === "application/pdf") {
            filetype = "pdf";
        }
        cb(null, "resume_" + req.userData.id + '_' + Date.now() + "." + filetype);
    },
});

exports.fileUpload = multer({ storage: storage });