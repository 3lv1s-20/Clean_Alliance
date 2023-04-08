const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2/promise');
const crypto = require('crypto');
const app = express();

// Generate a new random code based on email
const generateCode = (email) => {
  const hash = crypto.createHash('sha256').update(email).digest('hex');
  const code = parseInt(hash.slice(0, 10), 16);
  return code;
};

const pool = mysql.createPool({
  connectionLimit: 10,
  host: '172.31.82.193',
  user: 'G_53',
  password: 'BC5h5MmHs8',
  database: 'G_53_DB'
});
 
// Serve static files in the public folder
app.use(express.static('front-end'));

// Parse incoming request bodies in a middleware before your handlers, available under the req.body property
app.use(bodyParser.urlencoded({ extended: true }));

// Construct an absolute path to the directory one level above this file's directory
const parentDir = path.join(__dirname, '..');

// Construct a path to the folder named 'front-end' located in the parent directory
const frontendFolder = path.join(parentDir, 'front-end');

app.get('/', (req, res) => {
  res.sendFile(frontendFolder + '/referral.html');
});

// Handle POST requests to send email
app.post('/send-email', async (req, res) => {
  const { email } = req.body;
  const code = generateCode(email);

  try {
    // Check if the email already exists in the database
    const [rows] = await pool.execute('SELECT COUNT(*) AS count FROM referrals WHERE email = ?', [email]);
    const count = rows[0].count;
    if (count > 0) {
      res.status(400).send('Email has already been used');
      return;
    }

    // Insert the new referral record
    await pool.execute('INSERT INTO referrals (code, email) VALUES (?, ?)', [code, email]);

    // Create a transporter object using SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'Outlook',
      auth: {
        user: 'cleanalliance@outlook.com',
        pass: 'TEsting1234'
      }
    });

    // Set up email options
    const mailOptions = {
      from: 'cleanalliance@outlook.com',
      to: email,
      subject: 'Referral Invitation',
      text: `You have been invited to join our referral program! Please visit our website and enter your unique code: ${code}`
    };

    // Send email and insert referral code into database
    transporter.sendMail(mailOptions, async (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.status(200).send('Email sent successfully');
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error inserting referral into database');
  }
});


app.use(express.urlencoded({ extended: true }));

// Function to check if a code exists in the database
async function checkCode(code) {
  const [rows] = await pool.query('SELECT COUNT(*) AS count FROM referrals WHERE code = ?', [code]);
  const count = rows[0].count;
  return count > 0;
}

// Handle POST requests to verify referral code
app.post('/verify-referral', async (req, res) => {
  const codeToCheck = req.body.code; // The code entered by the user in the HTML form
  try {
    const exists = await checkCode(codeToCheck);
    if (exists) {
      res.send(`The code ${codeToCheck} is valid, Thank you.`);
    } else {
      res.send(`The code ${codeToCheck} is not valid, please try again.`);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
});

// Start the server 
app.listen(3000, () => {
  console.log('Server started on port 3000');
});