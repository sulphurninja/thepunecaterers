import { NextRequest, NextResponse } from 'next/server'
import sgMail from '@sendgrid/mail'

// Initialize SendGrid
if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY is not set in environment variables')
}

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, eventDate, eventType, guestCount, location, message } = body

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required fields' },
        { status: 400 }
      )
    }

    // Format the event date
    const formattedEventDate = eventDate 
      ? new Date(eventDate).toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : 'Not specified'

    // Create email content with proper HTML escaping
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #7c3aed, #ec4899); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
          <h2 style="color: white; margin: 0;">New Contact Form Submission</h2>
          <p style="color: #e879f9; margin: 5px 0 0 0;">Pune Caterers</p>
        </div>
        
        <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0;">
          <h3 style="color: #334155; border-bottom: 2px solid #7c3aed; padding-bottom: 10px;">Contact Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Name:</td><td style="padding: 8px 0; color: #64748b;">${name}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Email:</td><td style="padding: 8px 0; color: #64748b;">${email}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Phone:</td><td style="padding: 8px 0; color: #64748b;">${phone}</td></tr>
          </table>

          <h3 style="color: #334155; border-bottom: 2px solid #7c3aed; padding-bottom: 10px; margin-top: 30px;">Event Details</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Event Type:</td><td style="padding: 8px 0; color: #64748b;">${eventType || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Event Date:</td><td style="padding: 8px 0; color: #64748b;">${formattedEventDate}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Guest Count:</td><td style="padding: 8px 0; color: #64748b;">${guestCount || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0; font-weight: bold; color: #475569;">Location:</td><td style="padding: 8px 0; color: #64748b;">${location || 'Not specified'}</td></tr>
          </table>

          ${message ? `
            <h3 style="color: #334155; border-bottom: 2px solid #7c3aed; padding-bottom: 10px; margin-top: 30px;">Message</h3>
            <div style="background: white; padding: 15px; border-radius: 8px; border-left: 4px solid #7c3aed;">
              <p style="color: #64748b; line-height: 1.6; margin: 0;">${message}</p>
            </div>
          ` : ''}
        </div>
        
        <div style="background: #1e293b; padding: 15px; border-radius: 0 0 10px 10px; text-align: center;">
          <p style="color: #94a3b8; font-size: 12px; margin: 0;">This inquiry was submitted through the Pune Caterers website contact form</p>
          <p style="color: #94a3b8; font-size: 12px; margin: 5px 0 0 0;">Timestamp: ${new Date().toLocaleString('en-IN')}</p>
        </div>
      </div>
    `

    // Use a verified sender email - this is crucial for avoiding 403 errors
    // You need to verify this email in your SendGrid account
    const verifiedSenderEmail = process.env.SENDGRID_VERIFIED_SENDER || 'thepunecaterers@gmail.com'

    // Email configuration for business notification
    const msg = {
      to: 'thepunecaterers@gmail.com',
      from: {
        email: verifiedSenderEmail,
        name: 'Pune Caterers Website'
      },
      replyTo: {
        email: email,
        name: name
      },
      subject: `🎉 New Catering Inquiry from ${name} - ${eventType || 'General Inquiry'}`,
      html: emailContent,
    }

    // Send business notification email
    await sgMail.send(msg)

    // Send confirmation email to customer
    const confirmationEmailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
          <h2 style="color: white; margin: 0;">Thank you for your inquiry!</h2>
          <p style="color: #fed7aa; margin: 5px 0 0 0;">Pune Caterers</p>
        </div>
        
        <div style="background: #fffbeb; padding: 20px; border: 1px solid #fbbf24;">
          <p style="color: #92400e; font-size: 16px; line-height: 1.6;">Dear ${name},</p>
          
          <p style="color: #92400e; line-height: 1.6;">We have received your catering inquiry and our team is excited to help make your event memorable! We will get back to you within 24 hours with a personalized quote and recommendations.</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #f59e0b;">
            <h3 style="color: #92400e; margin-top: 0;">Your Inquiry Summary:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 6px 0; font-weight: bold; color: #b45309;">Event Type:</td><td style="padding: 6px 0; color: #d97706;">${eventType || 'Not specified'}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold; color: #b45309;">Event Date:</td><td style="padding: 6px 0; color: #d97706;">${formattedEventDate}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold; color: #b45309;">Guest Count:</td><td style="padding: 6px 0; color: #d97706;">${guestCount || 'Not specified'}</td></tr>
              <tr><td style="padding: 6px 0; font-weight: bold; color: #b45309;">Location:</td><td style="padding: 6px 0; color: #d97706;">${location || 'Not specified'}</td></tr>
            </table>
          </div>

          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #92400e; margin: 0 0 10px 0;">What happens next?</h4>
            <ul style="color: #b45309; margin: 0; padding-left: 20px;">
              <li>Our event specialist will review your requirements</li>
              <li>We'll prepare a customized menu and quote</li>
              <li>You'll receive a detailed proposal within 24 hours</li>
              <li>We'll schedule a consultation to finalize details</li>
            </ul>
          </div>

          <div style="background: #dc2626; color: white; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center;">
            <h4 style="margin: 0 0 10px 0;">Need immediate assistance?</h4>
            <p style="margin: 0; font-size: 18px; font-weight: bold;">📞 Call us: +91-8087889252</p>
            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Available 24/7 for urgent queries</p>
          </div>
          
          <p style="color: #92400e; line-height: 1.6;">We're committed to making your event extraordinary with our fresh ingredients, professional service, and attention to detail.</p>
          
          <p style="color: #92400e; margin-bottom: 0;">Best regards,<br>
          <strong>The Pune Caterers Team</strong></p>
        </div>
        
        <div style="background: #78350f; padding: 15px; border-radius: 0 0 10px 10px; text-align: center;">
          <p style="color: #d6d3d1; font-size: 12px; margin: 0;">This is an automated confirmation email. Please do not reply directly to this email.</p>
          <p style="color: #d6d3d1; font-size: 12px; margin: 5px 0 0 0;">For support, contact us at thepunecaterers@gmail.com</p>
        </div>
      </div>
    `

    const confirmationMsg = {
      to: email,
      from: {
        email: verifiedSenderEmail,
        name: 'Pune Caterers'
      },
      subject: '🎉 Thank you for contacting Pune Caterers! We\'ll be in touch soon.',
      html: confirmationEmailContent,
    }

    await sgMail.send(confirmationMsg)

    return NextResponse.json(
      { 
        message: 'Form submitted successfully! Check your email for confirmation. We will contact you within 24 hours.',
        success: true 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    
    // Log more detailed error information
    if (error.response) {
      console.error('SendGrid response:', error.response.body)
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to send email. Please try again or call us directly at +91-8087889252.',
        success: false 
      },
      { status: 500 }
    )
  }
}