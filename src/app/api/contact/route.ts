import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Initialize Nodemailer Transporter (Google Workspace)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, eventDate, eventType, guestCount, location, message } = body

    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required fields' },
        { status: 400 }
      )
    }

    const formattedEventDate = eventDate 
      ? new Date(eventDate).toLocaleDateString('en-IN', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      : 'Not specified'

    // =====================
    // BUSINESS EMAIL HTML
    // =====================
    const emailContent = `
      <div style="font-family: Arial; max-width: 600px; margin: auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #7c3aed, #ec4899); padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
          <h2 style="color: white;">New Contact Form Submission</h2>
          <p style="color: #e879f9;">Pune Caterers</p>
        </div>

        <div style="background: #f8fafc; padding: 20px; border: 1px solid #e2e8f0;">
          <h3 style="color: #334155;">Contact Information</h3>
          <table style="width: 100%;">
            <tr><td><b>Name:</b></td><td>${name}</td></tr>
            <tr><td><b>Email:</b></td><td>${email}</td></tr>
            <tr><td><b>Phone:</b></td><td>${phone}</td></tr>
          </table>

          <h3 style="color: #334155; margin-top: 20px;">Event Details</h3>
          <table style="width: 100%;">
            <tr><td><b>Event Type:</b></td><td>${eventType || 'Not specified'}</td></tr>
            <tr><td><b>Event Date:</b></td><td>${formattedEventDate}</td></tr>
            <tr><td><b>Guest Count:</b></td><td>${guestCount || 'Not specified'}</td></tr>
            <tr><td><b>Location:</b></td><td>${location || 'Not specified'}</td></tr>
          </table>

          ${message ? `
            <h3 style="color: #334155; margin-top: 20px;">Message</h3>
            <div style="background: white; padding: 15px; border-left: 4px solid #7c3aed;">
              <p>${message}</p>
            </div>
          ` : ''}
        </div>

        <div style="background: #1e293b; padding: 15px; border-radius: 0 0 10px 10px; text-align: center;">
          <p style="color: #94a3b8; font-size: 12px;">Form submitted from Pune Caterers website</p>
        </div>
      </div>
    `

    // Send to business
    await transporter.sendMail({
      from: `"Pune Caterers Website" <${process.env.SMTP_USER}>`,
      to: "thepunecaterers@gmail.com",
      replyTo: email,
      subject: `🎉 New Catering Inquiry from ${name} (${eventType || 'General Inquiry'})`,
      html: emailContent,
    })

    // =====================
    // CUSTOMER CONFIRMATION EMAIL
    // =====================
    const confirmationEmailContent = `
      <div style="font-family: Arial; max-width: 600px; margin: auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #f59e0b, #d97706); padding: 20px; text-align: center;">
          <h2 style="color: white;">Thank you for your inquiry!</h2>
          <p style="color: #fed7aa;">Pune Caterers</p>
        </div>

        <div style="background: #fffbeb; padding: 20px;">
          <p>Dear ${name},</p>
          <p>We received your inquiry and our team will contact you within 24 hours.</p>
          <p style="margin-top: 10px;"><b>Your Inquiry Summary:</b></p>

          <table style="width: 100%;">
            <tr><td><b>Event Type:</b></td><td>${eventType || 'Not specified'}</td></tr>
            <tr><td><b>Event Date:</b></td><td>${formattedEventDate}</td></tr>
            <tr><td><b>Guests:</b></td><td>${guestCount || 'Not specified'}</td></tr>
            <tr><td><b>Location:</b></td><td>${location || 'Not specified'}</td></tr>
          </table>

          <p style="margin-top: 20px;">For urgent queries call: <b>+91-8087889252</b></p>
          <p>Best regards,<br><b>Pune Caterers Team</b></p>
        </div>

        <div style="background: #78350f; padding: 15px; text-align: center;">
          <p style="color: #d6d3d1; font-size: 12px;">This is an automated email.</p>
        </div>
      </div>
    `

    // Send to user
    await transporter.sendMail({
      from: `"Pune Caterers" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "🎉 Thank you for contacting Pune Caterers!",
      html: confirmationEmailContent,
    })

    return NextResponse.json(
      { 
        message: 'Form submitted successfully! Check your email for confirmation.',
        success: true 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error("Email error:", error)
    
    return NextResponse.json(
      { 
        error: 'Failed to send email. Please try again or contact us at +91-8087889252.',
        success: false 
      },
      { status: 500 }
    )
  }
}
