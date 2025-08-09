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
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { type, data }: EmailRequest = await req.json()
    
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')
    const TO_EMAIL = 'info@wivision.co.za'
    
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY not configured')
    }

    // Generate email content
    let subject = ''
    let text = ''

    if (type === 'free-trial') {
      subject = 'New Free Trial Request - WiVision'
      text = `
FREE TRIAL REQUEST

Company: ${data.company}
Size: ${data.companySize}
Country: ${data.country}

Contact: ${data.firstName} ${data.lastName}
Email: ${data.businessEmail}
Phone: ${data.businessPhone}

Additional Info: ${data.additionalInfo || 'None'}
Email Consent: ${data.emailConsent ? 'Yes' : 'No'}
      `.trim()
    } else if (type === 'partner') {
      subject = 'New Partnership Application - WiVision'
      text = `
PARTNERSHIP APPLICATION

Company: ${data.company}
Size: ${data.companySize}
Country: ${data.country}
Partner Status: ${data.partnerStatus || 'Not specified'}

Contact: ${data.firstName} ${data.lastName}
Email: ${data.businessEmail}
Phone: ${data.businessPhone}

Additional Info: ${data.additionalInfo || 'None'}
Email Consent: ${data.emailConsent ? 'Yes' : 'No'}
      `.trim()
    } else if (type === 'contact') {
      subject = 'New Contact Form - WiVision'
      text = `
CONTACT FORM SUBMISSION

Name: ${data.name}
Email: ${data.email}
Company: ${data.company || 'Not provided'}
Phone: ${data.phone || 'Not provided'}

Message:
${data.message}
      `.trim()
    }

    // Send via Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'WiVision Website <noreply@wivision.co.za>',
        to: [TO_EMAIL],
        subject: subject,
        text: text,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      throw new Error(`Resend API error: ${error}`)
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )

  } catch (error) {
    console.error('Email error:', error)
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})