import { NextResponse } from "next/server";
import { studentSubmissionSchema } from "@/lib/schema";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { resend, isResendConfigured } from "@/lib/resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = studentSubmissionSchema.parse(body);

    let savedRecordId: string = "mock-" + Date.now();

    // 1. Save to Supabase if configured
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from("student_submissions")
          .insert([
            {
              submission_type: validatedData.submissionType,
              full_name: validatedData.fullName,
              university: validatedData.university,
              email: validatedData.email,
              project_title: validatedData.projectTitle || null,
              message: validatedData.message,
              project_link: validatedData.projectLink || null,
              created_at: new Date().toISOString(),
            },
          ])
          .select("id")
          .single();

        if (error) {
          console.warn("Supabase insert warning:", error.message);
        } else if (data?.id) {
          savedRecordId = data.id;
        }
      } catch (dbErr) {
        console.warn("Supabase connection error:", dbErr);
      }
    } else {
      console.log("[DEV MODE] Student Submission received:", validatedData);
    }

    // 2. Send email via Resend if configured
    if (isResendConfigured && resend) {
      try {
        await resend.emails.send({
          from: "HAT Tech Expo <notifications@hattechmedia.com>",
          to: [process.env.ORGANIZER_EMAIL || "info@hattechmedia.com"],
          subject: `New Student Submission: ${validatedData.fullName} (${validatedData.university})`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 8px;">
              <h2 style="color: #0284c7; margin-top: 0;">New Student / Project Submission</h2>
              <p><strong>Type:</strong> ${validatedData.submissionType}</p>
              <p><strong>Name:</strong> ${validatedData.fullName}</p>
              <p><strong>University:</strong> ${validatedData.university}</p>
              <p><strong>Email:</strong> ${validatedData.email}</p>
              ${validatedData.projectTitle ? `<p><strong>Project Title:</strong> ${validatedData.projectTitle}</p>` : ""}
              ${validatedData.projectLink ? `<p><strong>Project Link:</strong> <a href="${validatedData.projectLink}">${validatedData.projectLink}</a></p>` : ""}
              <div style="background: #f8fafc; padding: 16px; border-radius: 6px; margin-top: 16px;">
                <strong>Message / Project Description:</strong>
                <p style="white-space: pre-wrap; margin-top: 8px;">${validatedData.message}</p>
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
      message: "Submission received successfully!",
      id: savedRecordId,
    });
  } catch (error: any) {
    console.error("API error in student submission:", error);
    return NextResponse.json(
      {
        success: false,
        error: error.errors || error.message || "Invalid submission data",
      },
      { status: 400 }
    );
  }
}
