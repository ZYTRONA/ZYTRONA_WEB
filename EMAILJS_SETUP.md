# ZYTRONA EmailJS Complete Setup Guide

This guide contains everything needed to connect **EmailJS** to the ZYTRONA website for live email delivery from:
- **Project Discovery & Contact Modals** ([`App.jsx`](file:///c:/project/ZYTRONA_WEB/src/App.jsx))
- **Service Technical Discovery Modals** ([`ServiceDetail.jsx`](file:///c:/project/ZYTRONA_WEB/src/pages/ServiceDetail.jsx))
- **Talent Hire & Career Application Modals** ([`About.jsx`](file:///c:/project/ZYTRONA_WEB/src/pages/About.jsx))

---

## 1. Environment Variables Needed

Add these to your local [`.env`](file:///c:/project/ZYTRONA_WEB/.env) and your **Vercel Project Settings > Environment Variables**:

```env
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxxxx
VITE_EMAILJS_TEMPLATE_ID_OWNER=template_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID_REPLY=template_yyyyyyy
```

---

## 2. Template Variables Used by the Website

When any form is submitted, the code passes the following variables to EmailJS:

| Variable | Description | Example |
| :--- | :--- | :--- |
| `{{from_name}}` | Sender's full name | `Jordan Lee` |
| `{{reply_to}}` | Sender's email address | `jordan@company.com` |
| `{{service_type}}` | Service or role selected | `Web Development & SaaS Platforms` |
| `{{message}}` | Project brief / scope / notes | `Looking to build a multi-tenant SaaS MVP...` |
| `{{type}}` | Type of inquiry | `Service Technical Discovery` or `Talent Hire Request` |
| `{{stage}}` | Project stage (if selected) | `Early-Stage MVP / Prototype` |
| `{{budget}}` | Budget (if selected) | `$5,000 - $15,000` |
| `{{submission_date}}` | Date and time submitted | `Sep 21, 2026, 03:40 PM GMT+5:30` |

---

## 3. Template 1: Owner Notification Template (`VITE_EMAILJS_TEMPLATE_ID_OWNER`)

This email is sent to **`zytronabusiness@gmail.com`** whenever a client submits an inquiry or application.

### Email Settings:
- **To Email:** `zytronabusiness@gmail.com`
- **From Name:** `ZYTRONA Web System`
- **Reply To:** `{{reply_to}}`
- **Subject:** `New Inquiry: [{{type}}] - {{from_name}} ({{service_type}})`

### Content (HTML / Rich Text):
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E0E0E0; border-radius: 8px; background-color: #FFFFFF;">
  <div style="border-bottom: 2px solid #4CAF4F; padding-bottom: 12px; margin-bottom: 20px;">
    <h2 style="color: #263238; margin: 0;">🚀 New ZYTRONA Inquiry Received</h2>
    <p style="color: #717171; font-size: 13px; margin: 4px 0 0 0;">Received on {{submission_date}}</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
    <tr>
      <td style="padding: 8px 0; color: #717171; width: 140px; font-weight: bold;">Inquiry Type:</td>
      <td style="padding: 8px 0; color: #4CAF4F; font-weight: bold;">{{type}}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #717171; font-weight: bold;">Client Name:</td>
      <td style="padding: 8px 0; color: #263238; font-weight: bold;">{{from_name}}</td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #717171; font-weight: bold;">Email Address:</td>
      <td style="padding: 8px 0; color: #263238;"><a href="mailto:{{reply_to}}" style="color: #4CAF4F; text-decoration: none;">{{reply_to}}</a></td>
    </tr>
    <tr>
      <td style="padding: 8px 0; color: #717171; font-weight: bold;">Service / Role:</td>
      <td style="padding: 8px 0; color: #263238;">{{service_type}}</td>
    </tr>
    {{#if stage}}
    <tr>
      <td style="padding: 8px 0; color: #717171; font-weight: bold;">Project Stage:</td>
      <td style="padding: 8px 0; color: #263238;">{{stage}}</td>
    </tr>
    {{/if}}
    {{#if budget}}
    <tr>
      <td style="padding: 8px 0; color: #717171; font-weight: bold;">Budget:</td>
      <td style="padding: 8px 0; color: #263238;">{{budget}}</td>
    </tr>
    {{/if}}
  </table>

  <div style="background-color: #F5F7FA; padding: 16px; border-radius: 6px; border-left: 4px solid #4CAF4F; margin-bottom: 24px;">
    <h4 style="margin: 0 0 8px 0; color: #263238; font-size: 13px; text-transform: uppercase;">Project Scope / Brief:</h4>
    <p style="margin: 0; color: #4D4D4D; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">{{message}}</p>
  </div>

  <div style="text-align: center; border-top: 1px solid #E0E0E0; padding-top: 16px;">
    <a href="mailto:{{reply_to}}?subject=Re:%20ZYTRONA%20Discovery%20Session%20-%20{{from_name}}" style="display: inline-block; background-color: #4CAF4F; color: #FFFFFF; text-decoration: none; padding: 10px 24px; border-radius: 4px; font-weight: bold; font-size: 14px;">Reply to Client</a>
  </div>
</div>
```

---

## 4. Template 2: Auto-Reply Client Confirmation (`VITE_EMAILJS_TEMPLATE_ID_REPLY`)

This email is sent automatically to the client (`{{reply_to}}`) confirming that their request was received.

### Email Settings:
- **To Email:** `{{reply_to}}`
- **From Name:** `ZYTRONA Engineering Studio`
- **Reply To:** `zytronabusiness@gmail.com`
- **Subject:** `Discovery Request Confirmed — ZYTRONA Engineering Studio`

### Content (HTML / Rich Text):
```html
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #E0E0E0; border-radius: 8px; background-color: #FFFFFF;">
  <div style="border-bottom: 2px solid #4CAF4F; padding-bottom: 12px; margin-bottom: 20px;">
    <h2 style="color: #263238; margin: 0;">Discovery Request Received</h2>
    <p style="color: #4CAF4F; font-size: 13px; font-weight: bold; margin: 4px 0 0 0;">ZYTRONA Software Engineering Studio</p>
  </div>

  <p style="color: #263238; font-size: 15px; line-height: 1.6;">Hello <strong>{{from_name}}</strong>,</p>

  <p style="color: #4D4D4D; font-size: 14px; line-height: 1.6;">
    Thank you for reaching out to <strong>ZYTRONA</strong> regarding <strong>{{service_type}}</strong>.
  </p>

  <div style="background-color: #F5F7FA; padding: 16px; border-radius: 6px; border-left: 4px solid #4CAF4F; margin: 20px 0;">
    <h4 style="margin: 0 0 6px 0; color: #263238; font-size: 13px;">What happens next:</h4>
    <ul style="margin: 0; padding-left: 20px; color: #4D4D4D; font-size: 13px; line-height: 1.6;">
      <li>Our senior technical team will review your project scope.</li>
      <li>We will reply within <strong>24 hours</strong> to coordinate a technical discovery call.</li>
      <li>All discussions and documents are protected under our mutual NDA standards.</li>
    </ul>
  </div>

  <p style="color: #717171; font-size: 13px; line-height: 1.6;">
    If you have any immediate architectural specifications or NDA requirements, feel free to reply directly to this email at <a href="mailto:zytronabusiness@gmail.com" style="color: #4CAF4F;">zytronabusiness@gmail.com</a>.
  </p>

  <div style="border-top: 1px solid #E0E0E0; padding-top: 16px; margin-top: 24px; font-size: 12px; color: #9E9E9E;">
    <p style="margin: 0;"><strong>ZYTRONA</strong> — High-Performance Software Engineering Studio</p>
    <p style="margin: 4px 0 0 0;"><a href="https://zytrona.vercel.app" style="color: #4CAF4F; text-decoration: none;">https://zytrona.vercel.app</a></p>
  </div>
</div>
```

---

## 5. Step-by-Step Setup on EmailJS.com

1. **Sign in to EmailJS**: Go to [https://dashboard.emailjs.com](https://dashboard.emailjs.com)
2. **Add Email Service**:
   - Go to **Email Services** > **Add New Service**.
   - Select **Gmail** (or custom SMTP).
   - Connect `zytronabusiness@gmail.com`.
   - Copy your **Service ID** (e.g. `service_abc1234`) into `VITE_EMAILJS_SERVICE_ID`.
3. **Create Owner Template**:
   - Go to **Email Templates** > **Create New Template**.
   - Paste the **Template 1** code from above.
   - Set the recipient email to `zytronabusiness@gmail.com`.
   - Save and copy the **Template ID** into `VITE_EMAILJS_TEMPLATE_ID_OWNER`.
4. **Create Auto-Reply Template (Optional but recommended)**:
   - Create a second template and paste the **Template 2** code from above.
   - Set the recipient email to `{{reply_to}}`.
   - Save and copy the **Template ID** into `VITE_EMAILJS_TEMPLATE_ID_REPLY`.
5. **Get Public Key**:
   - Go to **Account** > **API Keys**.
   - Copy the **Public Key** into `VITE_EMAILJS_PUBLIC_KEY`.
6. **Deploy**:
   - In **Vercel Dashboard > Project Settings > Environment Variables**, add the 4 variables so live production uses them.
