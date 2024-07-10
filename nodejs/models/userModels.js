const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    file: { type: String, required: true }
});

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    residentialAddress: {
        street1: { type: String, required: true },
        street2: { type: String, required: true }
    },
    permanentAddress: {
        street1: { type: String, required: function () { return !this.isSameAddress; } },
        street2: { type: String, required: function () { return !this.isSameAddress; } }
    },
    isSameAddress: { type: Boolean, default: true },
    documents: [documentSchema]
});


const user = mongoose.model('User', userSchema);

module.exports = user;