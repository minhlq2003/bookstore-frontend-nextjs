import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: "Email is required" }, { status: 400 });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  });

  const mailOptions = {
    from: "GREAT BOOK <no-reply@greatbook.com>",
    to: email,
    subject: "Your OTP Code",
    html: `<p>Your OTP code is: <strong>${otp}</strong></p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: "OTP sent", otp });
  } catch (err) {
    return NextResponse.json(
      { message: "Failed to send email", error: err },
      { status: 500 }
    );
  }
}
