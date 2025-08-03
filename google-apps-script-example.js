// Google Apps Script code to handle form submissions
// Deploy this as a web app in Google Apps Script console

function doPost(e) {
  try {
    // Replace with your actual Google Sheet ID
    const sheetId = 'YOUR_GOOGLE_SHEET_ID_HERE';
    const sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
    
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Server-side validation
    const errors = validateFormData(data);
    if (errors.length > 0) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: 'Validation failed',
          errors: errors
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Check if email already exists (optional)
    const emailColumn = 3; // Email is in column C (3rd column)
    const existingEmails = sheet.getRange(2, emailColumn, sheet.getLastRow() - 1, 1).getValues();
    const emailExists = existingEmails.some(row => row[0] === data.email);
    
    if (emailExists) {
      return ContentService
        .createTextOutput(JSON.stringify({
          status: 'error',
          message: 'This email is already registered'
        }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Prepare the row data
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.firstName,
      data.email,
      data.collegeName,
      data.areaOfInterest,
      data.phoneNumber,
      'AR/VR Engineering Program'
    ];
    
    // Add headers if sheet is empty
    if (sheet.getLastRow() === 0) {
      const headers = ['Timestamp', 'First Name', 'Email', 'College Name', 'Area of Interest', 'Phone Number', 'Program'];
      sheet.appendRow(headers);
    }
    
    // Add the data to the sheet
    sheet.appendRow(rowData);
    
    // Send confirmation email (optional)
    sendConfirmationEmail(data.email, data.firstName);
    
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Registration successful! We will contact you soon.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error:', error);
    return ContentService
      .createTextOutput(JSON.stringify({
        status: 'error',
        message: 'Server error occurred. Please try again.'
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function validateFormData(data) {
  const errors = [];
  
  // Validate first name
  if (!data.firstName || data.firstName.trim().length < 2) {
    errors.push('First name must be at least 2 characters long');
  }
  
  // Validate email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email)) {
    errors.push('Please enter a valid email address');
  }
  
  // Validate college name
  if (!data.collegeName || data.collegeName.trim().length < 3) {
    errors.push('College name must be at least 3 characters long');
  }
  
  // Validate area of interest
  const validInterests = ['ar-development', 'vr-development', '3d-modeling', 'game-development', 'ui-ux-design', 'mobile-ar', 'enterprise-solutions'];
  if (!data.areaOfInterest || !validInterests.includes(data.areaOfInterest)) {
    errors.push('Please select a valid area of interest');
  }
  
  // Validate phone number (Indian format)
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!data.phoneNumber || !phoneRegex.test(data.phoneNumber)) {
    errors.push('Please enter a valid 10-digit phone number');
  }
  
  return errors;
}

function sendConfirmationEmail(email, firstName) {
  try {
    const subject = 'Welcome to AR/VR Engineering Program - Skipper';
    const body = `
      Dear ${firstName},
      
      Thank you for registering for our AR/VR Engineering Program!
      
      We have received your application and will contact you within 24 hours with further details.
      
      Program Highlights:
      • 2 months duration
      • Industry certification
      • Hands-on projects
      • Expert mentorship
      
      Best regards,
      Skipper Team
    `;
    
    MailApp.sendEmail(email, subject, body);
  } catch (error) {
    console.error('Email sending failed:', error);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('AR/VR Form Handler is running')
    .setMimeType(ContentService.MimeType.TEXT);
}
