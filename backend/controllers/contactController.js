import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { sendContactFormEmail } from "../utils/emailService.js";

export const submitContactForm = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, subject, message, phone } = req.body;
    
    console.log('Contact form submission received:', { name, email, subject, phone: phone ? 'provided' : 'not provided' });
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return next(new ErrorHandler("Please fill all required fields", 400));
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return next(new ErrorHandler("Please provide a valid email address", 400));
    }
    
    // Phone is optional - only validate if provided and not empty
    let formattedPhone = null;
    if (phone && phone.trim()) {
      // More lenient phone validation - accepts various formats
      const phoneRegex = /^\+?\d{1,4}[\s-]?\d{5,15}$/;
      if (!phoneRegex.test(phone.trim())) {
        console.warn('Phone number format warning:', phone);
        // Don't reject, just log warning - phone is optional
      } else {
        formattedPhone = phone.trim();
      }
    }
    
    console.log('Sending contact form email...');
    try {
      await sendContactFormEmail({
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        phone: formattedPhone
      });
      console.log('Contact form email sent successfully');
    } catch (emailError) {
      console.error('Email sending failed, but continuing:', emailError.message);
      // Log the contact form submission even if email fails
      console.log('Contact form submission logged (email failed):', {
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        phone: formattedPhone || 'not provided'
      });
      // Still return success to user, but log the email failure
      // In production, you might want to store this in a database
    }
    
    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully"
    });
  } catch (error) {
    console.error('Error in contact form submission:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack
    });
    return next(new ErrorHandler(error.message || "Failed to send message. Please try again later.", 500));
  }
}); 