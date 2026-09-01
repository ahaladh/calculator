"use server";

import { Resend } from "resend";

const CONTACT_RECIPIENT = "ahaladhm10@gmail.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactFormState {
  status: "idle" | "success" | "error";
  message: string;
}

export async function submitContactForm(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot — real users never fill this hidden field in.
  if (formData.get("company")) {
    return { status: "success", message: "Thanks — your message has been sent." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || name.length > 200) {
    return { status: "error", message: "Please enter your name." };
  }
  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Please enter a valid email address." };
  }
  if (!message || message.length > 5000) {
    return { status: "error", message: "Please enter a message (up to 5000 characters)." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set — contact form cannot send email.");
    return {
      status: "error",
      message: "Sorry, the contact form isn't configured yet. Please try again later.",
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "Calculator Hub <onboarding@resend.dev>",
      to: CONTACT_RECIPIENT,
      replyTo: email,
      subject: `Calculator Hub contact form: ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return {
        status: "error",
        message: "Sorry, something went wrong sending your message. Please try again.",
      };
    }

    return { status: "success", message: "Thanks — your message has been sent." };
  } catch (err) {
    console.error("Contact form send failed:", err);
    return {
      status: "error",
      message: "Sorry, something went wrong sending your message. Please try again.",
    };
  }
}
