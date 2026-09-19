import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || ''
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || ''
const TEMPLATE_ID_OWNER = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_OWNER || ''
const TEMPLATE_ID_REPLY = import.meta.env.VITE_EMAILJS_TEMPLATE_ID_REPLY || ''

/**
 * Checks if EmailJS is fully configured with environment variables
 * @returns {boolean}
 */
export function isEmailConfigured() {
  return Boolean(SERVICE_ID && PUBLIC_KEY && TEMPLATE_ID_OWNER)
}

/**
 * Sends an email inquiry or application via EmailJS
 * @param {Object} data - The payload to send
 * @param {string} [customTemplateId] - Optional custom template ID
 * @returns {Promise<{success: boolean, message?: string, error?: string, simulated?: boolean}>}
 */
export async function sendEmail(data = {}, customTemplateId = null) {
  const templateId = customTemplateId || TEMPLATE_ID_OWNER

  // If credentials are not yet configured in .env, simulate realistic sending
  if (!SERVICE_ID || !PUBLIC_KEY || !templateId) {
    console.warn(
      '⚠️ [EmailJS] Missing environment variables in .env:\n' +
      (!SERVICE_ID ? '  - VITE_EMAILJS_SERVICE_ID\n' : '') +
      (!PUBLIC_KEY ? '  - VITE_EMAILJS_PUBLIC_KEY\n' : '') +
      (!templateId ? '  - VITE_EMAILJS_TEMPLATE_ID_OWNER\n' : '') +
      'Running in simulated mode. Add these variables to your .env file or Vercel dashboard to enable live email delivery.'
    )
    
    // Simulate network delay for UX testing
    await new Promise((resolve) => setTimeout(resolve, 1200))
    
    return {
      success: true,
      simulated: true,
      message: 'Inquiry received! (Dev mode: add EmailJS keys in .env for live inbox delivery)'
    }
  }

  // Format template parameters to match standard EmailJS templates
  const templateParams = {
    from_name: data.fullName || data.name || 'Anonymous Client',
    reply_to: data.email || '',
    service_type: data.service || data.role || data.stage || data.talentNeeded || data.primaryDiscipline || 'General Inquiry',
    message: data.projectScope || data.scope || data.portfolio || data.message || 'No additional scope details provided',
    budget: data.budget || 'Not specified',
    submission_date: new Date().toLocaleString('en-US', {
      timeZoneName: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    ...data
  }

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      templateId,
      templateParams,
      PUBLIC_KEY
    )

    // Optional: send automated confirmation reply to the user if configured
    if (TEMPLATE_ID_REPLY && data.email) {
      try {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID_REPLY,
          templateParams,
          PUBLIC_KEY
        )
      } catch (replyError) {
        console.warn('Auto-reply confirmation could not be sent:', replyError)
      }
    }

    return {
      success: true,
      message: 'Your inquiry has been successfully sent! Our engineering team will review it and reply within 24 hours.',
      response
    }
  } catch (error) {
    console.error('❌ [EmailJS Send Error]:', error)
    const errorMessage = error?.text || error?.message || 'Failed to send your message. Please verify your connection or reach us directly at zytronabusiness@gmail.com.'
    return {
      success: false,
      error: errorMessage
    }
  }
}

export default sendEmail
