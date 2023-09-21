const UserTransactions = require('../../models/user.transactions.model');
const savePaymentDetails = async (userId, payment_details, booking_type) => {
  try {
    const [bookingday, bookingmonth, bookingyear] =
      payment_details.booking_date.split('-');

    // Create a Date object by specifying year, month (0-based index), and day
    const booking_date = new Date(bookingyear, bookingmonth - 1, bookingday);
    const [paymentday, paymentmonth, paymentyear] =
      payment_details.payment_date.split('-');

    // Create a Date object by specifying year, month (0-based index), and day
    const payment_date = new Date(paymentyear, paymentmonth - 1, paymentday);

    console.log(payment_date, booking_date);
    // Create a new UserTransaction document
    const transaction = new UserTransactions({
      owner: userId,
      razorpay_payment_id: payment_details.payment_id,
      amount_paid: payment_details.amount,
      booking_type: booking_type,
      is_payment_success: payment_details.isPaymentSuccess,
      payment_method: payment_details.payment_method,
      booking_remarks:
        'Call Consultancy Service between  ' + payment_details.slot,
      payment_date: new Date(payment_details.payment_date),
      booking_date: new Date(payment_details.booking_date),
    });

    const savedTransaction = await transaction.save();

    return savedTransaction;
  } catch (error) {
    // Handle any errors here
    console.error('Error saving payment details:', error);
    throw error;
  }
};

module.exports = { savePaymentDetails };
