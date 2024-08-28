const nodemailer = require('nodemailer');
const Reminder = require('./server/models/reminderModel');


const fetchRemindersFromDatabase = async () => {
  const now = new Date();
  const upcomingTime = new Date(now.getTime() + 10 * 60 * 1000); // 10 minutes from now
  // Adjust path and schema according to your actual model and field names
  return await Reminder.find({ dueTime: { $gte: now, $lte: upcomingTime } });
};

const sendNotifications = async () => {
  // Set up email transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Use your email service
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS, // Your email password
    },
  });

  // Fetch reminders from the database
  const reminders = await fetchRemindersFromDatabase();

  // Loop through reminders and send emails
  reminders.forEach(async (reminder) => {
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: reminder.userEmail,
        subject: 'Reminder Notification',
        text: `Reminder: ${reminder.text}`,
      });
      console.log(`Reminder sent to ${reminder.userEmail}`);
    } catch (error) {
      console.error(`Failed to send reminder to ${reminder.userEmail}:`, error.message);
    }
  });
};

module.exports = { sendNotifications };
