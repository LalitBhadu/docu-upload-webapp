const mongoose = require('mongoose');
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
        street1: { type: String, required: true },
        street2: { type: String, required: true }
    },
    documents: [
        {
            fileName: { type: String, required: true },
            fileType: { type: String, required: true },
            fileUrl: { type: String, required: true }
        }
    ]
}, { timestamps: true });


const user = mongoose.model('User', userSchema);

module.exports = user;