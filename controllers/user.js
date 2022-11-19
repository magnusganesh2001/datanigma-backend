const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("dotenv");
const User = require("../models/user");

config.config();

const JWT_KEY = process.env.JWT_KEY;
const ENDPOINT = process.env.ENDPOINT;

exports.createUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        console.log(hash);
        const user = new User({
            name: req.body.name,
            company: req.body.company,
            companyUrl: req.body.companyUrl,
            phone: req.body.phone,
            email: req.body.email,
            password: hash,
            type: req.body.type,
        });
        console.log(user);
        user.save()
            .then((user) => {
                console.log(user);
                res.status(201).json({
                    message: "User created",
                    user: user,
                });
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Invalid authentication credentials",
                });
            });
    });
};

exports.userLogin = (req, res, next) => {
    console.log(req.body);
    let fetchedUser;
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    message: "User not found!",
                });
            }
            fetchedUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then((result) => {
            if (!result) {
                return res.status(401).json({
                    message: "Auth failed",
                });
            }
            const token = jwt.sign({
                    name: fetchedUser.name,
                    company: fetchedUser.company,
                    email: fetchedUser.email,
                    type: fetchedUser.type,
                    id: fetchedUser._id,
                },
                JWT_KEY
            );
            res.status(200).json({
                token: token,
                id: fetchedUser._id,
                name: fetchedUser.name,
                email: fetchedUser.email,
                type: fetchedUser.type,
                expiresIn: 3600,
            });
        })
        .catch((err) => {
            return res.status(401).json({
                message: "Invalid authentication credentials",
            });
        });
};

exports.getUserData = async(req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        if (user != null)
            res.status(200).json({
                message: "User Data fetched successfully",
                user: user,
            });
        else
            throw new Error();
    } catch (error) {
        res.status(500).json({
            message: 'No such user exists',
        });
    }
};

exports.uploadResume = async(req, res, next) => {
    if (!req.file)
        return res.status(500).json({
            message: "Upload fail",
        });
    let user = await User.findById(req.userData.id);
    user.resume = ENDPOINT + "resumes/" + req.file.filename;
    user.save()
        .then((user) => {
            console.log(user);
            res.status(201).json({
                message: "Resume uploaded successfully",
                user: user,
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Failed to upload resume.\nPlease try again...",
            });
        });
};