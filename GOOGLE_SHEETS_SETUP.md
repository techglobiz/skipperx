# Google Sheets Form Integration Setup Guide

## Prerequisites
- A Google account
- A Google Sheet to store form submissions

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new sheet
3. Name it "AR/VR Program Registrations" (or any name you prefer)
4. The headers will be automatically created by the script:
   - Timestamp
   - First Name
   - Email
   - College Name
   - Area of Interest
   - Phone Number
   - Program

## Step 2: Set up Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Click "New Project"
3. Replace the default code with the code from `google-apps-script-example.js`
4. Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Google Sheet ID
   - To find your Sheet ID: Look at the URL of your Google Sheet
   - URL format: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`
   - Copy the SHEET_ID part

## Step 3: Deploy the Google Apps Script

1. In the Apps Script editor, click "Deploy" → "New deployment"
2. Choose type: "Web app"
3. Set execute as: "Me"
4. Set access: "Anyone" (this allows your website to send data)
5. Click "Deploy"
6. Copy the web app URL (it will look like: `https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec`)

## Step 4: Update your React Component

1. In `ARVREngineering.js`, find this line:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';
   ```
2. Replace `YOUR_SCRIPT_ID` with the actual script ID from your deployment URL

## Step 5: Test the Integration

1. Start your Next.js development server:
   ```bash
   npm run dev
   ```
2. Navigate to your AR/VR page
3. Fill out the form with test data
4. Submit the form
5. Check your Google Sheet to see if the data appears

## Features Included

### Form Validation
- ✅ Real-time field validation
- ✅ Email format validation
- ✅ Phone number validation (Indian format)
- ✅ Required field validation
- ✅ Name and college name length validation

### User Experience
- ✅ Loading states during submission
- ✅ Success/error messages
- ✅ Form reset after successful submission
- ✅ Visual error indicators

### Google Sheets Integration
- ✅ Automatic data storage
- ✅ Duplicate email detection
- ✅ Server-side validation
- ✅ Timestamp recording
- ✅ Automatic confirmation emails

## Troubleshooting

### Common Issues

1. **CORS Errors**: Google Apps Script has CORS restrictions. The form will still work, but you might not be able to read the response directly.

2. **403 Forbidden**: Make sure your Google Apps Script is deployed with "Anyone" access.

3. **Data not appearing**: Check that your Google Sheet ID is correct in the Apps Script.

### Alternative Solutions

If you face CORS issues, consider:

1. **Using a proxy server**: Set up a simple Node.js proxy
2. **JSONP approach**: Modify the Google Apps Script to support JSONP
3. **Server-side submission**: Handle form submission through your Next.js API routes

## Security Considerations

- The current setup allows anyone to submit to your Google Sheet
- Consider adding rate limiting in the Google Apps Script
- Add honeypot fields to prevent spam
- Implement CAPTCHA for production use

## Email Configuration

The script includes automatic confirmation emails. To customize:

1. Edit the `sendConfirmationEmail` function in the Google Apps Script
2. Modify the email subject and body as needed
3. Add your company branding

## Data Privacy

- Ensure GDPR compliance if collecting EU user data
- Add privacy policy links to your form
- Consider data retention policies
- Implement user consent mechanisms
