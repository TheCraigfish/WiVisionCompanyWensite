// Direct Resend email service
const RESEND_API_KEY = 're_cSHAhkeD_GRCPN4azRHMmJGXULiREGK4b';
const TO_EMAIL = 'craig@wivision.co.za';
const FROM_EMAIL = 'WiVision Website <noreply@wivision.co.za>';

interface EmailData {
  type: 'free-trial' | 'partner' | 'contact';
  data: any;
}

export const sendEmail = async ({ type, data }: EmailData): Promise<boolean> => {
  try {
    // Generate email content based on form type
    let subject = '';
    let htmlContent = '';

    switch (type) {
      case 'free-trial':
        subject = '🔒 New Free Trial Request - WiVision Website';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1e293b, #334155); color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">🔒 New Free Trial Request</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">From WiVision Website</p>
            </div>
            
            <div style="padding: 30px; background: #f8fafc;">
              <h2 style="color: #1e293b; margin-bottom: 20px;">Company Information</h2>
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <p><strong>Company:</strong> ${data.company}</p>
                <p><strong>Company Size:</strong> ${data.companySize}</p>
                <p><strong>Country:</strong> ${data.country}</p>
              </div>

              <h2 style="color: #1e293b; margin-bottom: 20px;">Contact Information</h2>
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
                <p><strong>Email:</strong> ${data.businessEmail}</p>
                <p><strong>Phone:</strong> ${data.businessPhone}</p>
                ${data.additionalInfo ? `<p><strong>Additional Info:</strong> ${data.additionalInfo}</p>` : ''}
                <p><strong>Email Consent:</strong> ${data.emailConsent ? 'Yes' : 'No'}</p>
              </div>

              <div style="background: #2d7384; color: white; padding: 15px; border-radius: 8px; text-align: center;">
                <p style="margin: 0;"><strong>Action Required:</strong> Set up free trial for ${data.company}</p>
              </div>
            </div>
          </div>
        `;
        break;

      case 'partner':
        subject = '🤝 New Partnership Application - WiVision Website';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1e293b, #334155); color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">🤝 New Partnership Application</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">From WiVision Website</p>
            </div>
            
            <div style="padding: 30px; background: #f8fafc;">
              <h2 style="color: #1e293b; margin-bottom: 20px;">Company Information</h2>
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <p><strong>Company:</strong> ${data.company}</p>
                <p><strong>Company Size:</strong> ${data.companySize}</p>
                <p><strong>Country:</strong> ${data.country}</p>
                <p><strong>Current Partner Status:</strong> ${data.partnerStatus}</p>
              </div>

              <h2 style="color: #1e293b; margin-bottom: 20px;">Contact Information</h2>
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <p><strong>Name:</strong> ${data.firstName} ${data.lastName}</p>
                <p><strong>Email:</strong> ${data.businessEmail}</p>
                <p><strong>Phone:</strong> ${data.businessPhone}</p>
                ${data.additionalInfo ? `<p><strong>Additional Info:</strong> ${data.additionalInfo}</p>` : ''}
                <p><strong>Email Consent:</strong> ${data.emailConsent ? 'Yes' : 'No'}</p>
              </div>

              <div style="background: #2d7384; color: white; padding: 15px; border-radius: 8px; text-align: center;">
                <p style="margin: 0;"><strong>Action Required:</strong> Review partnership application from ${data.company}</p>
              </div>
            </div>
          </div>
        `;
        break;

      case 'contact':
        subject = '📧 New Contact Form Submission - WiVision Website';
        htmlContent = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1e293b, #334155); color: white; padding: 30px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px;">📧 New Contact Form Submission</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">From WiVision Website</p>
            </div>
            
            <div style="padding: 30px; background: #f8fafc;">
              <h2 style="color: #1e293b; margin-bottom: 20px;">Contact Information</h2>
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
                ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ''}
              </div>

              <h2 style="color: #1e293b; margin-bottom: 20px;">Message</h2>
              <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                <p style="line-height: 1.6;">${data.message.replace(/\n/g, '<br>')}</p>
              </div>

              <div style="background: #2d7384; color: white; padding: 15px; border-radius: 8px; text-align: center;">
                <p style="margin: 0;"><strong>Action Required:</strong> Respond to ${data.name}'s inquiry</p>
              </div>
            </div>
          </div>
        `;
        break;

      default:
        throw new Error('Invalid form type');
    }

    // Send email using Resend API
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        subject: subject,
        html: htmlContent,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API error:', errorText);
      throw new Error(`Email service error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    console.log('Email sent successfully:', result.id);
    return true;

  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};