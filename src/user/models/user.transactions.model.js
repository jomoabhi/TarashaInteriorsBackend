const mongoose = require('mongoose');
require('dotenv').config();
const userTransactionSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TarashaUser',
      required: true,
    },
    razorpay_payment_id: {
      type: String,
      required: true,
    },
    amount_paid: {
      type: Number,
      required: true,
    },
    booking_type: {
      type: String,
    },
    is_payment_success: {
      type: Boolean,
    },
    booking_method: {
      type: String,
    },
    booking_remarks: {
      type: String,
    },
    payment_date: {
      type: String,
      required: true,
    },
    booking_date: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserTransactions = mongoose.model(
  'UserTransaction',
  userTransactionSchema
);

module.exports = UserTransactions;
