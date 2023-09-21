const UserInquiry = require('../../models/user.inquiry.model');

const saveUserInquiry = async (ownerId, inquiryData, packageInfo) => {
  try {
    const userInquiry = new UserInquiry({
      owner: ownerId,
      Inquiry_data: [],
      package_info: packageInfo,
    });

    inquiryData.forEach((item) => {
      userInquiry.Inquiry_data.push({
        Question: item.Question,
        Answer: item.Answer,
      });
    });

    const savedInquiry = await userInquiry.save();

    console.log('User inquiry saved successfully.', savedInquiry);
    return savedInquiry;
  } catch (error) {
    console.error('Error saving user inquiry:', error);
    throw new Error(error);
  }
};

module.exports = { saveUserInquiry };
