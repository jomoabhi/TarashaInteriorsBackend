class UserRequestValidator {
  validateSignupRequest(req, res, next) {
    const { name, email, password } = req.body;
    const errors = {};

    if (!name) {
      errors.name = 'Name is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Validate email using a regular expression

    // Validate password using a regular expression (e.g., at least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character)

    // If all validations pass, continue to the next middleware
    next();
  }

  validateLoginRequest(req, res, next) {
    const { email, password } = req.body;
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
    }

    if (!password) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Validate email using a regular expression

    // Validate password using a regular expression (e.g., at least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character)

    // If all validations pass, continue to the next middleware
    next();
  }
  validateForgetPassword(req, res, next) {
    const { email } = req.body;
    const errors = {};

    if (!email) {
      errors.email = 'Email is required';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // Validate email using a regular expression

    // Validate password using a regular expression (e.g., at least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character)

    // If all validations pass, continue to the next middleware
    next();
  }
  validatePaymentSuccessRequest(req, res, next) {
    const { payment_details, eventId } = req.body;
    const errors = {};

    // Validate payment_details object
    if (!payment_details || typeof payment_details !== 'object') {
      errors.payment_details = 'Payment details object is required';
    } else {
      const {
        payment_id,
        amount,
        isPaymentSuccess,
        payment_method,
        slot,
        payment_date,
        booking_date,
      } = payment_details;

      if (!payment_id) {
        errors.payment_id = 'Payment ID is required';
      }

      if (!amount) {
        errors.amount = 'Amount is required';
      }

      if (typeof isPaymentSuccess !== 'boolean') {
        errors.isPaymentSuccess = 'isPaymentSuccess should be a boolean';
      }

      if (!payment_method) {
        errors.payment_method = 'Payment method is required';
      }

      if (!slot) {
        errors.slot = 'Slot is required';
      }

      // Validate date fields using a regular expression for "MM-DD-YYYY" format
      const datePattern = /^\d{2}-\d{2}-\d{4}$/;
      if (!payment_date || !datePattern.test(payment_date)) {
        errors.payment_date = 'Invalid payment_date format. Use MM-DD-YYYY';
      }

      if (!booking_date || !datePattern.test(booking_date)) {
        errors.booking_date = 'Invalid booking_date format. Use MM-DD-YYYY';
      }
    }

    // Validate eventId field
    if (!eventId) {
      errors.eventId = 'Event ID is required';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }

    // If all validations pass, continue to the next middleware
    next();
  }
  validatePaymentDetailsAPI(req, res, next) {
    // const { pay } = req.body;
    const { paymentId } = req.body;

    const errors = {};

    if (!paymentId) {
      errors.email = 'paymentID is required';
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ success: false, errors });
    }
    next();
  }
}
module.exports = UserRequestValidator;
