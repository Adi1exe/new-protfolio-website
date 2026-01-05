import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    // Validate input
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Configure your email service here
    // Using Gmail as an example - you can change this to your preferred service
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Send email to you
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "adityadolas.dev@gmail.com",
      subject: `✉️ New Message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background: #f5f5f5;">
            <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px;">
              <div style="max-width: 600px; width: 100%; background: #ffffff; border-radius: 10px; border: 1px solid #e5e5e5; overflow: hidden;">
                
                <!-- Header -->
                <div style="background: #0a0a0a; padding: 40px 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">New Contact Message</h1>
                  <p style="margin: 10px 0 0 0; color: #a3a3a3; font-size: 14px;">From your portfolio website</p>
                </div>

                <!-- Content -->
                <div style="padding: 40px 30px;">
                  
                  <!-- Greeting -->
                  <p style="margin: 0 0 30px 0; font-size: 16px; color: #333333; line-height: 1.6;">
                    You've got a new message from a visitor.
                  </p>

                  <!-- Contact Info Cards -->
                  <div style="background: #fafafa; border-radius: 10px; padding: 24px; margin-bottom: 30px; border: 1px solid #e5e5e5;">
                    
                    <!-- From Name -->
                    <div style="margin-bottom: 20px;">
                      <p style="margin: 0; font-size: 12px; font-weight: 700; color: #0a0a0a; text-transform: uppercase; letter-spacing: 0.5px;">From</p>
                      <p style="margin: 8px 0 0 0; font-size: 18px; font-weight: 600; color: #0a0a0a;">${name}</p>
                    </div>

                    <!-- Email -->
                    <div style="margin-bottom: 20px; padding-bottom: 20px; border-bottom: 1px solid #e5e5e5;">
                      <p style="margin: 0; font-size: 12px; font-weight: 700; color: #0a0a0a; text-transform: uppercase; letter-spacing: 0.5px;">Email</p>
                      <a href="mailto:${email}" style="margin: 8px 0 0 0; display: block; font-size: 16px; color: #0a0a0a; text-decoration: none; font-weight: 500;">${email}</a>
                    </div>

                    <!-- Message -->
                    <div>
                      <p style="margin: 0; font-size: 12px; font-weight: 700; color: #0a0a0a; text-transform: uppercase; letter-spacing: 0.5px;">Message</p>
                      <p style="margin: 12px 0 0 0; font-size: 15px; color: #333333; line-height: 1.8; white-space: pre-wrap; word-wrap: break-word;">${message}</p>
                    </div>

                  </div>

                  <!-- Quick Reply Button -->
                  <div style="text-align: center; margin-bottom: 30px;">
                    <a href="mailto:${email}?subject=Re: Your message from your portfolio" style="display: inline-block; background: #0a0a0a; color: #ffffff; padding: 12px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px;">
                      Reply to Message
                    </a>
                  </div>

                  <!-- Footer Info -->
                  <div style="background: #fafafa; border-left: 3px solid #0a0a0a; padding: 15px; border-radius: 6px; margin-top: 30px;">
                    <p style="margin: 0; font-size: 13px; color: #333333;">
                      <strong>Tip:</strong> Click the "Reply to Message" button above to respond directly to this visitor.
                    </p>
                  </div>

                </div>

                <!-- Footer -->
                <div style="background: #fafafa; padding: 30px; border-top: 1px solid #e5e5e5; text-align: center;">
                  <p style="margin: 0 0 10px 0; font-size: 12px; color: #737373;">
                    Sent from your portfolio website
                  </p>
                  <p style="margin: 0; font-size: 11px; color: #a3a3a3;">
                    © 2026 Aditya Dolas. All rights reserved.
                  </p>
                </div>

              </div>
            </div>
          </body>
        </html>
      `,
    });

    // Optional: Send confirmation email to the visitor
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "✓ Message Received - Thank You!",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
          </head>
          <body style="margin: 0; padding: 0; background: #f5f5f5;">
            <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px;">
              <div style="max-width: 600px; width: 100%; background: #ffffff; border-radius: 10px; border: 1px solid #e5e5e5; overflow: hidden;">
                
                <!-- Header -->
                <div style="background: #0a0a0a; padding: 40px 30px; text-align: center;">
                  <div style="width: 60px; height: 60px; margin: 0 auto 20px; background: #1a1a1a; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid #333333;">
                    <span style="font-size: 32px; color: #ffffff;">✓</span>
                  </div>
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">Message Received!</h1>
                  <p style="margin: 10px 0 0 0; color: #a3a3a3; font-size: 14px;">Thank you for reaching out</p>
                </div>

                <!-- Content -->
                <div style="padding: 40px 30px;">
                  
                  <!-- Greeting -->
                  <p style="margin: 0 0 10px 0; font-size: 16px; color: #0a0a0a; line-height: 1.6;">
                    <strong>Hi ${name},</strong>
                  </p>

                  <p style="margin: 0 0 20px 0; font-size: 15px; color: #555555; line-height: 1.7;">
                    Thanks so much for getting in touch! I've received your message and appreciate you taking the time to reach out.
                  </p>

                  <!-- Message Summary Box -->
                  <div style="background: #fafafa; border-left: 3px solid #0a0a0a; padding: 20px; border-radius: 8px; margin: 30px 0; border: 1px solid #e5e5e5;">
                    <p style="margin: 0 0 12px 0; font-size: 12px; font-weight: 700; color: #0a0a0a; text-transform: uppercase; letter-spacing: 0.5px;">Your Message</p>
                    <p style="margin: 0; font-size: 14px; color: #333333; line-height: 1.7; white-space: pre-wrap; word-wrap: break-word;">${message}</p>
                  </div>

                  <!-- Response Info -->
                  <div style="background: #fafafa; border-left: 3px solid #737373; padding: 20px; border-radius: 8px; margin: 30px 0; border: 1px solid #e5e5e5;">
                    <p style="margin: 0; font-size: 14px; color: #333333; line-height: 1.7;">
                      <strong>I'll get back to you soon!</strong> I try to respond to all messages within 24-48 hours. Keep an eye on your inbox.
                    </p>
                  </div>

                  <!-- Contact Info -->
                  <p style="margin: 30px 0 10px 0; font-size: 14px; color: #555555;">
                    In the meantime, feel free to check out my work or connect with me on social media.
                  </p>

                </div>

                <!-- Footer -->
                <div style="background: #fafafa; padding: 30px; border-top: 1px solid #e5e5e5; text-align: center;">
                  <p style="margin: 0 0 15px 0; font-size: 13px; color: #0a0a0a;">
                    <strong>Aditya Dolas</strong>
                  </p>
                  <p style="margin: 0 0 10px 0; font-size: 12px; color: #737373;">
                    Sent from your portfolio website
                  </p>
                  <p style="margin: 0; font-size: 11px; color: #a3a3a3;">
                    © 2026 Aditya Dolas. All rights reserved.
                  </p>
                </div>

              </div>
            </div>
          </body>
        </html>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
