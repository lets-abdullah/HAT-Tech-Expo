import { Resend } from "resend";

export const isResendConfigured = Boolean(process.env.RESEND_API_KEY);

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
