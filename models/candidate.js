const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const candidateSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
  resume: { type: String, required: true}
});

candidateSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Candidate', candidateSchema);
