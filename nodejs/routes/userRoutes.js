const express = require('express');
const { createUsers } = require('../controllers/userContrlr.js');
const multer = require('multer');
const router = express.Router();


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });
  
  const upload = multer({
    storage,
    limits: { files: 10 } // Limit the number of files to 10
  });

router.post('/users',upload.array('documents', 10), createUsers);

module.exports = router;
