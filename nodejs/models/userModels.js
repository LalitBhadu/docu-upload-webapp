const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    file: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dob: { type: Date, required: true },
    residentialAddress: {
        street1: { type: String, required: true },
        street2: { type: String }
    },
    permanentAddress: {
        street1: { type: String, required: function () { return !this.sameAsResidential; } },
        street2: { type: String, required: function () { return !this.sameAsResidential; } }
    },
    sameAsResidential: { type: Boolean, default: false },
    documents: { type: [documentSchema], required: true }
});

module.exports = mongoose.model('User', userSchema);
