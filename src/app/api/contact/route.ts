import { NextResponse } from "next/server";
import { contactInquirySchema } from "@/lib/schema";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { resend, isResendConfigured } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactInquirySchema.parse(body);

    let savedRecordId: string = "mock-contact-" + Date.now();

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("contact_messages")
          .insert([
            {
              name: validatedData.name,
              email: validatedData.email,
              phone: validatedData.phone || null,
              subject: validatedData.subject,
              message: validatedData.message,
              created_at: new Date().toISOString(),
            },
          ])
          .select("id");

        if (error) {
          console.warn("Supabase contact warning:", error.message);
        } else if (data && data[0]?.id) {
          savedRecordId = data[0].id;
        }
      } catch (err) {
        console.warn("Supabase contact err:", err);
      }
    } else {
      console.log("[DEV MODE] Contact Message received:", validatedData);
    }

    if (isResendConfigured && resend) {
      try {
        await resend.emails.send({
          from: "HAT Tech Expo <notifications@hattechmedia.com>",
          to: [process.env.ORGANIZER_EMAIL || "info@hattechmedia.com"],
          subject: `General Contact: ${validatedData.subject} (${validatedData.name})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #0284c7; margin-top: 0;">New Contact Form Message</h2>
              <p><strong>Name:</strong> ${validatedData.name}</p>
              <p><strong>Email:</strong> ${validatedData.email}</p>
              ${validatedData.phone ? `<p><strong>Phone:</strong> ${validatedData.phone}</p>` : ""}
              <p><strong>Subject:</strong> ${validatedData.subject}</p>
              <div style="background: #f8fafc; padding: 16px; border-radius: 6px; margin-top: 16px;">
                <strong>Message:</strong>
                <p style="white-space: pre-wrap; margin-top: 8px;">${validatedData.message}</p>
              </div>
            </div>
          `,
        });
      } catch (err) {
        console.warn("Resend contact warning:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Message received! We will be in touch shortly.",
      id: savedRecordId,
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        error: error.errors || error.message || "Invalid contact form data",
      },
      { status: 400 }
    );
  }
}
