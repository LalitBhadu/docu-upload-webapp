const userModel = require('../models/userModels.js');

exports.createUsers = async (req, res) => {
    try {
        const { firstName, lastName, email, dateOfBirth, residentialAddress, permanentAddress, isSameAddress, documents } = req.body;

        // Validate date of birth (minimum age 18)
        const minAge = 18;
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        const age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();

        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }

        if (age < minAge) {
            return res.status(400).json({ message: 'user must be at least 18 years old.' });
        }
        
        const candidate = new userModel({
            firstName,
            lastName,
            email,
            dateOfBirth,
            residentialAddress,
            permanentAddress: isSameAddress ? residentialAddress : permanentAddress,
            isSameAddress,
            documents
        });

        await candidate.save();
        res.status(201).json({ message: 'user created successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
};
