import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailRequest {
  type: 'free-trial' | 'partner' | 'contact';
  data: any;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { type, data }: EmailRequest = await req.json()

    // Email configuration
    const SMTP_HOST = Deno.env.get('SMTP_HOST') || 'smtp.gmail.com'
    const SMTP_PORT = Deno.env.get('SMTP_PORT') || '587'
    const SMTP_USER = Deno.env.get('SMTP_USER')
    const SMTP_PASS = Deno.env.get('SMTP_PASS')
    const TO_EMAIL = Deno.env.get('TO_EMAIL') || 'info@wivision.co.za'

    if (!SMTP_USER || !SMTP_PASS) {
      throw new Error('SMTP credentials not configured')
    }

    // Generate email content based on form type
    let subject = ''
    let htmlContent = ''

    switch (type) {
      case 'free-trial':
        subject = '🔒 New Free Trial Request - WiVision Website'
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
        `
        break

      case 'partner':
        subject = '🤝 New Partnership Application - WiVision Website'
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
        `
        break

      case 'contact':
        subject = '📧 New Contact Form Submission - WiVision Website'
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
        `
        break

      default:
        throw new Error('Invalid form type')
    }

    // Send email using a service like Resend, SendGrid, or SMTP
    // For this example, I'll use a simple fetch to a mail service
    // You'll need to configure your preferred email service

    const emailData = {
      to: TO_EMAIL,
      subject: subject,
      html: htmlContent,
      from: SMTP_USER
    }

    // Example using Resend API (you can replace with your preferred service)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    })

    if (!response.ok) {
      throw new Error(`Email service error: ${response.statusText}`)
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})