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
        <title>HealthLens Health Report</title>
    </head>
    <body style="background-color: #f5f3ff; font-family: Arial, sans-serif; margin: 0; padding: 40px 0; color: #333333;">
        <table cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
            <tr>
                <td style="padding: 40px;">
                    <table cellpadding="0" cellspacing="0" style="width: 100%;">
                        <tr>
                            <td>
                                <img src="/placeholder.svg?height=40&width=40" alt="HealthLens Logo" style="width: 40px; height: 40px;" />
                            </td>
                            <td style="text-align: right;">
                                <h1 style="color: #4338ca; font-size: 24px; margin: 0;">Health Report</h1>
                            </td>
                        </tr>
                    </table>
                    
                    <p style="font-size: 14px; color: #6366f1; margin-top: 20px; margin-bottom: 30px;">
                        Track your health journey with HealthLens. <a href="#" style="color: #4338ca; text-decoration: none;">View your dashboard</a>
                    </p>

                    <table cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 30px;">
                        <tr>
                            <td style="width: 50%;">
                                <p style="font-size: 14px; color: #6366f1; margin: 0 0 5px 0;">HEALTHLENS ID</p>
                                <p style="font-size: 14px; margin: 0 0 15px 0;">john.doe@example.com</p>
                                <p style="font-size: 14px; color: #6366f1; margin: 0 0 5px 0;">REPORT DATE</p>
                                <p style="font-size: 14px; margin: 0;">October 11, 2024</p>
                            </td>
                            <td style="width: 50%;">
                                <p style="font-size: 14px; color: #6366f1; margin: 0 0 5px 0;">REPORT TO</p>
                                <p style="font-size: 14px; margin: 0 0 5px 0;">John Doe</p>
                                <p style="font-size: 14px; margin: 0 0 5px 0;">johndoe</p>
                                <p style="font-size: 14px; margin: 0;">USA</p>
                            </td>
                        </tr>
                    </table>

                    <table cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 30px;">
                        <tr>
                            <td style="width: 50%;">
                                <p style="font-size: 14px; color: #6366f1; margin: 0 0 5px 0;">REPORT ID</p>
                                <p style="font-size: 14px; margin: 0;">HLA1B2C3D4</p>
                            </td>
                            <td style="width: 50%;">
                                <p style="font-size: 14px; color: #6366f1; margin: 0 0 5px 0;">DOCUMENT NO.</p>
                                <p style="font-size: 14px; margin: 0;">123456789</p>
                            </td>
                        </tr>
                    </table>

                    <h2 style="font-size: 18px; margin-bottom: 20px; color: #4338ca;">Health Summary</h2>

                    <table cellpadding="0" cellspacing="0" style="width: 100%; margin-bottom: 30px;">
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #f5f3ff;">
                                <p style="font-size: 16px; margin: 0;">Total Scans</p>
                            </td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #f5f3ff; text-align: right;">
                                <p style="font-size: 16px; margin: 0;">90</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #f5f3ff;">
                                <p style="font-size: 16px; margin: 0;">Height</p>
                            </td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #f5f3ff; text-align: right;">
                                <p style="font-size: 16px; margin: 0;">180 cm</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0; border-bottom: 1px solid #f5f3ff;">
                                <p style="font-size: 16px; margin: 0;">Weight</p>
                            </td>
                            <td style="padding: 10px 0; border-bottom: 1px solid #f5f3ff; text-align: right;">
                                <p style="font-size: 16px; margin: 0;">75 kg</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 0;">
                                <p style="font-size: 16px; margin: 0;">Sex</p>
                            </td>
                            <td style="padding: 10px 0; text-align: right;">
                                <p style="font-size: 16px; margin: 0;">Male</p>
                            </td>
                        </tr>
                    </table>

                    <div style="background-color: #f5f3ff; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                        <h3 style="color: #4338ca; font-size: 18px; margin: 0 0 10px 0;">Your Daily Health Tip</h3>
                        <p style="font-size: 16px; margin: 0;">"Get 7-9 hours of sleep for better overall health."</p>
                    </div>

                    <div style="background-color: #f5f3ff; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                        <h3 style="color: #4338ca; font-size: 18px; margin: 0 0 10px 0;">Recent Symptoms</h3>
                        <ul style="padding: 0 0 0 20px; margin: 0;">
                            <li style="font-size: 16px; margin-bottom: 5px;">Headache</li>
                            <li style="font-size: 16px; margin-bottom: 5px;">Fatigue</li>
                        </ul>
                    </div>

                    <div style="background-color: #f5f3ff; border-radius: 8px; padding: 20px; margin-bottom: 30px;">
                        <h3 style="color: #4338ca; font-size: 18px; margin: 0 0 10px 0;">Recent Chat History</h3>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; color: #6366f1; margin: 0;">2023-10-10</p>
                            <p style="font-size: 16px; margin: 5px 0 0 0;">Discussed recent blood test results</p>
                        </div>
                        <div style="margin-bottom: 10px;">
                            <p style="font-size: 14px; color: #6366f1; margin: 0;">2023-10-05</p>
                            <p style="font-size: 16px; margin: 5px 0 0 0;">Inquired about new diet plan</p>
                        </div>
                    </div>

                    <table cellpadding="0" cellspacing="0" style="width: 100%;">
                        <tr>
                            <td style="text-align: center;">
                                <img src="/placeholder.svg?height=40&width=40" alt="HealthLens Icon" style="width: 40px; height: 40px;" />
                                <h2 style="color: #4338ca; font-size: 24px; margin: 10px 0;">HealthLens</h2>
                                <p style="font-size: 16px; margin: 0 0 20px 0;">Your personal health companion.</p>
                                <a href="#" style="display: inline-block; background-color: #6366f1; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-size: 16px; font-weight: bold;">
                                    Open HealthLens App
                                </a>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
      </body>
      </html>
    `;

    // Send the email
    const { data, error } = await resend.emails.send({
      from: 'HealthLens <no-reply@healthlens.app>',
      //to: [user.email],
      to: "daniel11ftw@gmail.com",
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