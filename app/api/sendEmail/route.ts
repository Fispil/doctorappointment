
import EmailTemplate from "@/emails";
import { NextResponse } from "next/server";
import { Resend } from "resend";


const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: any, res: any) {
  const { email, subject, message } = req.body;
  const response = await req.json();

  try {
    const data = await resend.emails.send({
      from: "Doctor-book-app@smallchainproduction.com",
      to: [response.data.Email],
      subject: 'Booking confirmation',
      react: EmailTemplate({ userFirstname: response }),
    });

    if (response) {
      return NextResponse.json({ data });
    }
  } catch (error) {
    return NextResponse.json({ error });
  }
};