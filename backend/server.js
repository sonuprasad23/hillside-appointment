// backend/server.js
const express = require('express');
const cors = require('cors');
const { createObjectCsvWriter } = require('csv-writer');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();


const allowedOrigins = [
  'https://hillsideappointment.netlify.app/', 
  'http://localhost:5173' 
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
};

// Use the new CORS options
app.use(cors(corsOptions));
// --- END OF THE FIX ---

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ... the rest of your server.js code remains exactly the same ...
// (The app.post('/api/appointments', ...) function does not need to change)

function formatDateTimeForGoogleCalendar(dateStr, timeStr) {
  const date = new Date(dateStr);
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':');
  if (hours === '12') {
    hours = '00';
  }
  if (modifier === 'PM') {
    hours = parseInt(hours, 10) + 12;
  }
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}${month}${day}T${hours.toString().padStart(2, '0')}${minutes}00`;
}

app.post('/api/appointments', async (req, res) => {
  const formData = req.body;
  const { clinic, name, dob, phone, email, location, doctor, date, time } = formData;

  if (!clinic || !name || !email) {
    return res.status(400).json({ message: 'Missing required form data.' });
  }

  const filename = `${clinic}_appointments.csv`;

  const csvWriter = createObjectCsvWriter({
    path: filename,
    header: [
      { id: 'name', title: 'Patient Name' },
      { id: 'dob', title: "Patient's DOB" },
      { id: 'phone', title: 'Phone Number' },
      { id: 'email', title: 'Email Address' },
      { id: 'location', title: 'Clinic Location' },
      { id: 'doctor', title: 'Doctor' },
      { id: 'date', title: 'Appointment Date' },
      { id: 'time', title: 'Appointment Time' },
    ],
    append: true,
  });

  const record = [{ name, dob, phone, email, location, doctor, date, time }];

  try {
    await csvWriter.writeRecords(record);
    console.log(`Appointment for ${name} saved to ${filename}`);
  } catch (error) {
    console.error('Error writing to CSV:', error);
    return res.status(500).json({ message: 'Failed to save appointment data.' });
  }

  const clinicNames = {
    universal: 'Universal Section Clinics',
    womens: "Women's Wellness of SA",
    psychiatry: 'Psychiatry of SA',
  };
  
  const startDate = formatDateTimeForGoogleCalendar(date, time);
  const endDate = formatDateTimeForGoogleCalendar(date, time.replace(/(\d+):/, (match, p1) => `${parseInt(p1) + 1}:`));

  const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`Appointment with ${doctor}`)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(`Patient: ${name}\nClinic: ${clinicNames[clinic]}`)}&location=${encodeURIComponent(location)}`;
  
  const logoUrl = 'https://hillsideappointment.netlify.app/hsmg.png';

  const emailHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #333; line-height: 1.6;">
      <div style="max-width: 600px; margin: 20px auto; border: 1px solid #dfe3e8; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.08);">
        <div style="padding: 20px; text-align: center; border-bottom: 1px solid #dfe3e8;">
          <img src="${logoUrl}" alt="Hillside Medical Group Logo" style="max-height: 50px; margin-bottom: 15px;">
          <h2 style="margin: 0; font-size: 24px; font-weight: 600; color: #005A9C;">Appointment Confirmed</h2>
        </div>
        <div style="padding: 25px;">
          <p style="font-size: 16px;">Dear ${name},</p>
          <p>Your appointment is scheduled. Here are the details:</p>
          <div style="background-color: #f7f9fa; border: 1px solid #dfe3e8; border-radius: 5px; padding: 20px; margin-top: 20px; font-size: 15px;">
            <p style="margin: 8px 0;"><strong>Clinic:</strong> ${clinicNames[clinic]}</p>
            <p style="margin: 8px 0;"><strong>Doctor:</strong> ${doctor}</p>
            <p style="margin: 8px 0;"><strong>Location:</strong> ${location}</p>
            <p style="margin: 8px 0;"><strong>Date & Time:</strong> ${date} at ${time}</p>
          </div>
          <div style="text-align: center; margin-top: 30px;">
            <a href="${googleCalendarUrl}" target="_blank" style="background-color: #007bff; color: white; padding: 12px 25px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              Add to Google Calendar
            </a>
          </div>
          <p style="margin-top: 30px; font-size: 14px; color: #555;">If you need to reschedule, please contact our office directly.</p>
        </div>
        <div style="background-color: #f7f9fa; text-align: center; padding: 15px; font-size: 12px; color: #888; border-top: 1px solid #dfe3e8;">
          © ${new Date().getFullYear()} Hillside Medical Group
        </div>
      </div>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Hillside Medical Group" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Appointment Confirmed: ${doctor} on ${date}`,
      html: emailHtml,
    });
    console.log(`Confirmation email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }

  res.status(200).json({ message: 'Appointment created successfully!' });
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Backend server is running on http://localhost:${PORT}`);
});