const schedule = require('node-schedule');
const notificationService = require('../notificationService'); // Ensure this path is correct

// Schedule the task to run every minute
schedule.scheduleJob('* * * * *', async () => {
  try {
    await notificationService.sendNotifications();
    console.log('Scheduled notifications sent');
  } catch (error) {
    console.error('Error sending scheduled notifications:', error.message);
  }
});
