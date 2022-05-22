const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  salary: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, required: true },
  employer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
});

module.exports = mongoose.model('Job', jobSchema);
