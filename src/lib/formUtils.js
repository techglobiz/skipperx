// Form validation utilities
export const validateField = (name, value) => {
  switch (name) {
    case 'firstName':
      if (!value || value.trim().length < 2) {
        return 'First name must be at least 2 characters long';
      }
      if (!/^[a-zA-Z\s]+$/.test(value)) {
        return 'First name should only contain letters';
      }
      break;
      
    case 'email':
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value || !emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
      break;
      
    case 'collegeName':
      if (!value || value.trim().length < 3) {
        return 'College name must be at least 3 characters long';
      }
      break;
      
    case 'areaOfInterest':
      if (!value) {
        return 'Please select your area of interest';
      }
      break;
      
    case 'phoneNumber':
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!value || !phoneRegex.test(value)) {
        return 'Please enter a valid 10-digit phone number';
      }
      break;
      
    default:
      return null;
  }
  return null;
};

export const validateForm = (formData) => {
  const errors = {};
  
  Object.keys(formData).forEach(field => {
    const error = validateField(field, formData[field]);
    if (error) {
      errors[field] = error;
    }
  });
  
  return errors;
};

export const submitToGoogleSheets = async (formData, scriptUrl) => {
  try {
    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      mode: 'no-cors' // Required for Google Apps Script
    });
    
    // Note: Due to CORS restrictions with Google Apps Script,
    // we can't read the response directly. You might need to use
    // a different approach like a proxy server or JSONP
    
    return { status: 'success', message: 'Form submitted successfully!' };
  } catch (error) {
    console.error('Submission error:', error);
    return { status: 'error', message: 'Failed to submit form. Please try again.' };
  }
};
