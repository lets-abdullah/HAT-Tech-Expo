import { NextResponse } from "next/server";
import { partnerInquirySchema } from "@/lib/schema";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { resend, isResendConfigured } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = partnerInquirySchema.parse(body);

    let savedRecordId: string = "mock-partner-" + Date.now();

    // 1. Save to Supabase if configured
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase
          .from("partner_inquiries")
          .insert([
            {
              company_name: validatedData.companyName,
              contact_person: validatedData.contactPerson,
              email: validatedData.email,
              phone: validatedData.phone,
              selected_package: validatedData.selectedPackage,
              goals: validatedData.goals || "",
              created_at: new Date().toISOString(),
            },
          ]);

        if (error) {
          console.warn("Supabase insert warning:", error.message);
        } else {
          console.log("Supabase insert SUCCESS for partner:", validatedData.companyName);
        }
      } catch (dbErr) {
        console.warn("Supabase connection error:", dbErr);
      }
    } else {
      console.log("[DEV MODE] Partner Inquiry received:", validatedData);
    }

    // 2. Send email via Resend if configured
    if (isResendConfigured && resend) {
      try {
        await resend.emails.send({
          from: "HAT Tech Expo <notifications@hattechmedia.com>",
          to: [process.env.ORGANIZER_EMAIL || "info@hattechmedia.com"],
          subject: `New Sponsorship Inquiry: ${validatedData.companyName} (${validatedData.selectedPackage})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #0055ff; margin-top: 0;">New Sponsorship & Partnership Inquiry</h2>
              <p><strong>Area of Interest:</strong> ${validatedData.selectedPackage}</p>
              <p><strong>Company:</strong> ${validatedData.companyName}</p>
              <p><strong>Industry:</strong> ${validatedData.industry}</p>
              <p><strong>City / Address:</strong> ${validatedData.city} ${validatedData.address ? `(${validatedData.address})` : ""}</p>
              <p><strong>Contact Person:</strong> ${validatedData.contactPerson} ${validatedData.designation ? `(${validatedData.designation})` : ""}</p>
              <p><strong>Email:</strong> ${validatedData.email}</p>
              <p><strong>Mobile Phone:</strong> ${validatedData.phone}</p>
              ${validatedData.website ? `<p><strong>Website:</strong> ${validatedData.website}</p>` : ""}
              <div style="background: #f8fafc; padding: 16px; border-radius: 6px; margin-top: 16px;">
                <strong>Goals & Message:</strong>
                <p style="white-space: pre-wrap; margin-top: 8px;">${validatedData.goals || "N/A"}</p>
              </div>
            </div>
          `,
        });
      } catch (emailErr) {
        console.warn("Resend email delivery warning:", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Partnership inquiry submitted successfully!",
      id: savedRecordId,
    });
  } catch (error: any) {
    console.error("API error in partner inquiry:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.errors || error.message || "Invalid inquiry data",
      },
      { status: 400 }
    );
  }
}
