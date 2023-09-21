const mongoose = require('mongoose');
require('dotenv').config();
const userInquirySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TarashaUser',
      required: true,
    },
    Inquiry_data: [
      {
        Question: {
          type: String,
          required: true,
        },
        Answer: { type: String, required: true },
      },
    ],
    package_info: {
      package_name: { type: String, required: true },
      package_option: { type: String, required: true },
    },
  },
  {
    timestamps: true,
  }
);

const UserInquiry = mongoose.model('UserInquiry', userInquirySchema);

module.exports = UserInquiry;
