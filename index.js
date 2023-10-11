const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const username = "adikataxi";
const password = "*h0TJH1aAe33;-x[!8T#";
const template_id = 'otp';
const server = 'https://sms.yegara.com/api2/send';

app.use(bodyParser.json());

// Generate a random 4-digit OTP
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000);
}

app.post('/send-otp', async (req, res) => {
    const phoneNumber = req.body.phoneNumber || req.query.phoneNumber;

    if (!phoneNumber) {
        return res.status(400).json({ success: false, message: 'Phone number is required.' });
    }

    const otp = generateOTP();
    const requestBody = {
        username: username,
        password: password,
        to: phoneNumber,
        message: otp.toString(),
        template_id: template_id
    };
    console.log(otp.toString());
    try {
        // Send OTP via SMS using the specified endpoint
        const response = await axios.post('https://sms.yegara.com/api2/send', requestBody);
        console.log(response.data);
        res.json({ success: true, message: 'OTP sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to send OTP.' });
    }
});
// Endpoint to verify OTP
app.post('/verify-otp', (req, res) => {
    const phoneNumber = req.body.phoneNumber;
    const enteredOTP = req.body.otp;
  
    if (!phoneNumber || !enteredOTP) {
      return res.status(400).json({ success: false, message: 'Phone number and OTP are required.' });
    }
  
    const storedOTP = users[phoneNumber];
  
    if (storedOTP === enteredOTP) {
      delete users[phoneNumber]; // Remove the OTP from the database after successful verification
      res.json({ success: true, message: 'OTP verified successfully!' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid OTP.' });
    }
  });

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});