import type { APIContext } from 'astro';


export async function POST(context: APIContext): Promise<Response> {
  try {
    const formData = await context.request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Basic validation
    if (!name || !email || !message) {
      return new Response(JSON.stringify({ message: 'Name, email, and message are required.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Mailgun integration
    // Access environment variables via import.meta.env for Astro local dev and build.
    // When deployed to Cloudflare Pages, these will be populated from Pages environment variables.
 
  const MAILGUN_API_KEY = import.meta.env.MAILGUN_API_KEY;
  const MAILGUN_DOMAIN = import.meta.env.MAILGUN_DOMAIN;
  const TO_EMAIL = import.meta.env.TO_EMAIL;

    console.log('Cloudflare Environment Variables:');
    console.log('MAILGUN_API_KEY:', MAILGUN_API_KEY ? 'Set' : 'Not Set');
    console.log('MAILGUN_DOMAIN:', MAILGUN_DOMAIN ? 'Set' : 'Not Set');
    console.log('TO_EMAIL:', TO_EMAIL);

    if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
      console.error('Mailgun API key or domain is not set in environment variables.');
      return new Response(JSON.stringify({ message: 'Server configuration error: Mailgun credentials missing.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const mailgunFormData = new FormData();
    mailgunFormData.append('from', `Contact Form <mailgun@${MAILGUN_DOMAIN}>`);
    mailgunFormData.append('to', TO_EMAIL);
    mailgunFormData.append('subject', `New Contact Form Submission from ${name}`);
    mailgunFormData.append('text', `Name: ${name}\nEmail: ${email}\nMessage: ${message}`);

    const mailgunResponse = await fetch(`https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${btoa(`api:${MAILGUN_API_KEY}`)}`,
      },
      body: mailgunFormData,
    });

    if (!mailgunResponse.ok) {
      const errorData = await mailgunResponse.json();
      console.error('Mailgun email sending failed:', errorData);
      return new Response(JSON.stringify({ message: 'Failed to send email via Mailgun.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    console.log('Contact form submission received and email sent via Mailgun:');
    console.log(`Name: ${name}`);
    console.log(`Email: ${email}`);
    console.log(`Message: ${message}`);

    return new Response(JSON.stringify({ message: 'Form submitted successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return new Response(JSON.stringify({ message: 'An unexpected error occurred.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}