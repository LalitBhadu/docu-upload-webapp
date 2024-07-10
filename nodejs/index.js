const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");

const userRoutes = require('./routes/userRoutes');

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);
app.get("/apitest", (req, res) => {
    res.send({
      message: "Welcome to my ecom app",
    });
  });

// Database Connection
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(
        `Server Running on http://localhost:${PORT}`
    );
});