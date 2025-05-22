import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(req: NextRequest) {
  try {
    const { email, emailTo, subject, content } = await req.json();

    if (!content) {
      return NextResponse.json(
        { message: "Thông tin không đầy đủ!" },
        { status: 400 }
      );
    }

    const mailOptions = {
      from: "GREAT BOOK <no-reply@greatbook.com>",
      to: emailTo,
      bcc: "quocminhly23@gmail.com",
      subject: subject,
      html: content,
    };
    await transporter.sendMail(mailOptions);
    return NextResponse.json(
      { message: "Gửi mail thành công!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { message: "Đã xảy ra lỗi khi gửi mail!", error: error },
      { status: 500 }
    );
  }
}
