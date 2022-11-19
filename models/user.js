const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
<<<<<<< HEAD
    name: { type: String, required: true },
    company: { type: String },
    companyUrl: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    resume: { type: String },
    languagesKnown: { type: String },
    skills: [{ type: String }],
    technologies: [{ type: String }],
    location: { type: String },
    // currentPosition: { type: String }
=======
  name: { type: String, required: true},
  company: { type: String },
  companyUrl : { type: String, required: true},
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  resume: { type: String },
  languagesKnown: { type: String },
  skills: [{ type: String }],
  technologies: [{ type: String }],
  location: { type: String }
>>>>>>> 7007143 (update url)
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);