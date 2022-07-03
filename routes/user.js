const express = require('express');
const UserController = require('../controllers/user');
const checkAuth = require('../middleware/check-auth');
const { fileUpload } = require('../middleware/fileUpload');
const router = express.Router();

router.post("/signup", UserController.createUser);
router.post("/login", UserController.userLogin);
router.post("/upload-resume", checkAuth, fileUpload.single('file'), UserController.uploadResume);
router.get("/candidate/:id", checkAuth, UserController.getUserData)

module.exports = router;