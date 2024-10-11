const { Resend } = require('resend');

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Function to send email
const sendEmailReport = async (req, res) => {
  console.log('Sending email report');
  try {
    const user = req.user; // Assuming user is added to req in the middleware
    const { firstName, lastName, email, username, height, weight, sex, totalScans, recentSymptoms, chatHistory } = req.body;

    // Generate a personalized health tip
    const healthTips = [
      "Stay hydrated! Aim for 8 glasses of water a day.",
      "Take a 10-minute walk to boost your mood and energy.",
      "Practice deep breathing for 5 minutes to reduce stress.",
      "Eat a rainbow of fruits and vegetables for optimal nutrition.",
      "Get 7-9 hours of sleep for better overall health.",
    ];
    const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];

    // Create a progress bar for total scans
    const progressBarWidth = Math.min(totalScans * 10, 100); // Cap at 100%
    const progressBar = `
      <div style="background-color: #e0e7ff; height: 20px; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #4f46e5; width: ${progressBarWidth}%; height: 100%;"></div>
      </div>
    `;

    // Import your email template here (could be generated or a pre-built string)
    const emailTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your HealthLens Health Report</title>
      </head>
      <body style="background-color: #f6f9fc; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 15px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #4f46e5; padding: 40px 20px; text-align: center;">
            <h1 style="color: #ffffff; font-size: 28px; margin: 0;">Your HealthLens Health Report</h1>
          </div>
          <div style="padding: 40px 20px;">
            <p style="font-size: 18px; color: #333333; line-height: 1.6;">Hello ${firstName},</p>
            <p style="font-size: 16px; color: #666666; line-height: 1.6;">We hope this email finds you well. Here's a cozy summary of your health information and recent activity on HealthLens:</p>

            <div style="background-color: #f0f4f8; border-radius: 10px; padding: 20px; margin-top: 30px;">
              <h2 style="color: #4f46e5; font-size: 22px; margin-top: 0;">Personal Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e7ff;"><strong>Name:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e7ff;">${firstName} ${lastName}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e7ff;"><strong>Email:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e7ff;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e7ff;"><strong>Username:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e7ff;">${username}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e7ff;"><strong>Height:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e7ff;">${height} cm</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e7ff;"><strong>Weight:</strong></td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e0e7ff;">${weight} kg</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0;"><strong>Sex:</strong></td>
                  <td style="padding: 10px 0;">${sex}</td>
                </tr>
              </table>
            </div>

            <div style="background-color: #f0f4f8; border-radius: 10px; padding: 20px; margin-top: 30px;">
              <h2 style="color: #4f46e5; font-size: 22px; margin-top: 0;">Activity Summary</h2>
              <p style="font-size: 16px; color: #666666;">Total Scans: ${/*totalScans*/ '90'}</p>
              ${progressBar}
              <p style="font-size: 16px; color: #666666; margin-top: 20px;">Recent Symptoms:</p>
              <ul style="padding-left: 20px;">
                ${/*recentSymptoms.map(symptom => `<li style="color: #666666; margin-bottom: 5px;">${symptom}</li>`).join('')*/''}
              </ul>
            </div>

            <div style="background-color: #f0f4f8; border-radius: 10px; padding: 20px; margin-top: 30px;">
              <h2 style="color: #4f46e5; font-size: 22px; margin-top: 0;">Recent Chat History</h2>
              ${/*}
              ${chatHistory.map(chat => `
                <div style="margin-bottom: 15px; padding-bottom: 15px; border-bottom: 1px solid #e0e7ff;">
                  <p style="font-size: 14px; color: #888888; margin: 0;">${chat.date}</p>
                  <p style="font-size: 16px; color: #333333; margin: 5px 0 0 0;">${chat.message}</p>
                </div>
              `).join('')}
              */''}
            </div>

            <div style="background-color: #e0e7ff; border-radius: 10px; padding: 20px; margin-top: 30px;">
              <h2 style="color: #4f46e5; font-size: 22px; margin-top: 0;">Your Daily Health Tip</h2>
              <p style="font-size: 16px; color: #333333; font-style: italic;">"${randomTip}"</p>
            </div>

            <p style="font-size: 16px; color: #666666; line-height: 1.6; margin-top: 30px;">Thank you for using HealthLens to monitor your health. We're here to support you on your wellness journey!</p>

            <p style="font-size: 16px; color: #666666; line-height: 1.6;">Best regards,<br>The HealthLens Team</p>
          </div>
          <div style="background-color: #4f46e5; padding: 20px; text-align: center;">
            <p style="color: #ffffff; font-size: 14px; margin: 0;">© 2023 HealthLens. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send the email
    const { data, error } = await resend.emails.send({
      from: 'HealthLens <no-reply@healthlens.app>',
      //to: [user.email],
      to: 'ericgonzalezduro@gmail.com',
      subject: 'Your HealthLens Health Report',
      html: emailTemplate,
    });

    if (error) {
      return res.status(500).json({ message: 'Failed to send email', error });
    }

    return res.status(200).json({ message: 'Report sent successfully', data });
  } catch (error) {
    console.error('Error sending report:', error);
    return res.status(500).json({ message: 'Error sending report', error });
  }
};

module.exports = { sendEmailReport };