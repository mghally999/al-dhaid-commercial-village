import { Resend } from 'resend';

type Mail = { subject: string; text: string; replyTo?: string };

/**
 * Sends through Resend when RESEND_API_KEY and CONTACT_TO_EMAIL are set.
 * Otherwise logs the submission on the server so the forms work end-to-end before the key exists.
 */
export async function sendMail(mail: Mail): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.info(
      `[forms] Email not configured (RESEND_API_KEY / CONTACT_TO_EMAIL). Submission logged instead:\n${mail.subject}\n${mail.text}`,
    );
    return;
  }
  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM ?? 'Al Dhaid Village <onboarding@resend.dev>',
    to,
    subject: mail.subject,
    text: mail.text,
    replyTo: mail.replyTo,
  });
  if (error) throw new Error(error.message);
}
