import { z } from "zod";

export const studentSubmissionSchema = z.object({
  submissionType: z.enum([
    "submit_project",
    "contribute",
    "contact_organizers",
  ]),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  university: z.string().min(2, "University or institute is required"),
  email: z.string().email("Please enter a valid email address"),
  projectTitle: z.string().optional(),
  message: z.string().min(10, "Please provide at least 10 characters for your description or message"),
  projectLink: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

export type StudentSubmissionFormData = z.infer<typeof studentSubmissionSchema>;

export const partnerInquirySchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  industry: z.string().min(2, "Industry is required"),
  city: z.string().min(2, "City is required"),
  address: z.string().optional(),
  companyPhone: z.string().optional(),
  website: z.string().optional(),
  contactPerson: z.string().min(2, "Full name is required"),
  designation: z.string().optional(),
  phone: z.string().min(6, "Mobile number is required"),
  email: z.string().email("Please enter a valid email address"),
  selectedPackage: z.string().min(1, "Please select an area of interest"),
  goals: z.string().optional(),
});

export type PartnerInquiryFormData = z.infer<typeof partnerInquirySchema>;

export const contactInquirySchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type ContactInquiryFormData = z.infer<typeof contactInquirySchema>;
