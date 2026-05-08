# Web3Forms Setup Guide

Your contact form is fully implemented and ready to use! You just need to add your Web3Forms access key to make it work.

## Steps to Complete Setup:

### 1. Get Your Web3Forms Access Key (Free)

1. Visit: https://web3forms.com
2. Click "Get Started" or "Sign Up"
3. Enter your email: **saikumard912@gmail.com**
4. Verify your email
5. Copy your Access Key from the dashboard

### 2. Add Access Key to Your Code

Open `components/sections/ContactForm.tsx` and find line ~115:

```typescript
access_key: "YOUR_ACCESS_KEY_HERE", // Replace this
```

Replace `YOUR_ACCESS_KEY_HERE` with your actual access key from Web3Forms.

### 3. Test Your Form

1. Run your development server: `npm run dev`
2. Navigate to the contact form section
3. Fill out the form with test data
4. Click "Send Message"
5. Check your email at **saikumard912@gmail.com** for the message

## What's Already Working:

✅ Phone validation (exactly 10 digits, numeric only)
✅ Email validation (must end with .com or .in)
✅ Real-time error messages
✅ Visual feedback (red borders for errors, green checkmark for valid)
✅ Success/error messages after submission
✅ Form reset after successful submission
✅ Direct email sending (no mail app popup)

## Form Features:

- **Cyan/turquoise theme** matching your design
- **Animated borders** and glowing effects
- **Responsive layout** (2 columns on desktop, 1 on mobile)
- **Disabled submit button** when validation fails
- **Loading state** while sending
- **Auto-clear success message** after 5 seconds

## Troubleshooting:

If emails aren't being received:
1. Check spam/junk folder
2. Verify the access key is correct
3. Check Web3Forms dashboard for delivery status
4. Ensure your email (saikumard912@gmail.com) is verified in Web3Forms

## Alternative Email Services:

If you prefer a different service, you can also use:
- EmailJS (emailjs.com)
- Formspree (formspree.io)
- SendGrid API

But Web3Forms is the simplest and requires no backend code!
