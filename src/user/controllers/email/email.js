const sendMail = require('../../services/emailServices/email');

const SendCallConfirmationUserMail = async (user, paymentdetails) => {
  try {
    const info = sendMail({
      toEmail: user.email,
      subject: 'Payment Received-Confirmation for Interior Design Service',
      // text: `${emailFrom} shared a file with you.`,
      html: require('../../services/emailServices/paymentconfirmation')(
        user.name,
        paymentdetails,
        'Call Consultancy Service'
      ),
    })
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });

    if (info) return true;
  } catch (err) {
    throw new Error(err);
  }
};

const SendCallConfirmationUserMailtoMe = async (user, paymentdetails) => {
  try {
    const info = sendMail({
      toEmail: 'tarashainterior@gmail.com',
      subject: 'Client Payment Confirmation',
      // text: `${emailFrom} shared a file with you.`,
      html: require('../../services/emailServices/paymentConfirmationtoMe')(
        user,
        paymentdetails,
        'Call Consultancy Service'
      ),
    })
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });

    if (info) return true;
  } catch (err) {
    throw new Error(err);
  }
};

const SendInquiryConfirmationUserMail = async (user) => {
  try {
    const info = sendMail({
      toEmail: user.email,
      subject: 'Inquiry Received - Interior Design Services',
      // text: `${emailFrom} shared a file with you.`,
      html: require('../../services/emailServices/enquirymailTemplate')(
        user.name
      ),
    })
      .then(() => {
        return true;
      })
      .catch((err) => {
        console.log(err);
        throw new Error(err);
      });
    if (info) return true;
  } catch (err) {
    throw new Error(err);
  }
};

const SendInquiryConfirmationUserMailtoMe = async (
  user,
  Inquirydata,
  package_info
) => {
  try {
    const info = sendMail({
      toEmail: 'tarashainterior@gmail.com',
      subject: 'Client Inquiry Confirmation',
      // text: `${emailFrom} shared a file with you.`,
      html: require('../../services/emailServices/InquiryConfirmationtoMe')(
        user,
        Inquirydata,
        package_info.package_name,
        package_info.package_option
      ),
    })
      .then(() => {
        console.log('Hi in mail2');
        return true;
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });

    if (info) return true;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  SendCallConfirmationUserMail,
  SendInquiryConfirmationUserMail,
  SendCallConfirmationUserMailtoMe,
  SendInquiryConfirmationUserMailtoMe,
};
