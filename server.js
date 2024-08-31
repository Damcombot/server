const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true })); // To parse URL-encoded data from POST requests

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle form submission
app.post('/submit', (req, res) => {
    const { fname, lname, email, message } = req.body;
    const formData = `First Name: ${fname}\nLast Name: ${lname}\nEmail: ${email}\nMessage: ${message}\n\n`;

    // Write the data to the text file
    fs.appendFile('data.txt', formData, (err) => {
        if (err) {
            console.error('Error writing to file', err);
            res.status(500).send('Server error');
        } else {
            res.send('Thank you for your submission!');
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
