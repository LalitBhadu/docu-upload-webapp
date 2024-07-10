const userModel = require('../models/userModels.js');

exports.createUsers = async (req, res) => {
    try {
        const { firstName, lastName, dob, residentialAddress, permanentAddress, sameAsResidential, documents } = req.body;

        // Validate age
        const age = new Date().getFullYear() - new Date(dob).getFullYear();
        if (age < 18) {
            return res.status(400).json({ message: 'user must be at least 18 years old' });
        }

        // Validate documents
        if (documents.length < 2) {
            return res.status(400).json({ message: 'At least two documents are required' });
        }

        const user = new user({
            firstName,
            lastName,
            dob,
            residentialAddress,
            permanentAddress,
            sameAsResidential,
            documents
        });

        await userModel.save();
        res.status(201).json({ message: 'user created successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
